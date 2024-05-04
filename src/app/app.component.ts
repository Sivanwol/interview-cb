import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {ApiRequesterService} from "./services/http/ApiRequesterService";
import {BehaviorSubject, catchError, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {ZoneDefinition, ZonesDefinition} from "./models/zone-definition.model";
import {ApplicationStateService} from "./services/ApplicationStateService";
import {ApplicationRequester} from "./models/ApplicationRequester";
import {MessageService} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";
import {ZoneDefinitionService} from "./services/ZoneDefinitionService";
import {Location} from "./models/location.model";

type SearchItem = {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular 17 Crud example';
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = true;
  searchItems: SearchItem[] = [];
  private readonly destroy$ = new Subject();
  public zones$: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  public sites$:BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  public places$:BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  public layers$:BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  searchForm = this.formBuilder.group({
    searchGroupSelect: [{name: 'Places', code: 'places'}, Validators.required],
    searchText: ["", Validators.required],
  })

  constructor(private apiService: ApiRequesterService,
              private applicationStateService: ApplicationStateService,
              private ref: ChangeDetectorRef,
              public zoneDefinitionService: ZoneDefinitionService,
              private formBuilder: FormBuilder,
              private ngZone: NgZone) {
  }

  private clearZones() {

    this.ngZone.run( () => {
      this.zones$.next([]);
      this.sites$.next([]);
      this.places$.next([]);
      this.layers$.next([]);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    console.log("Killed")
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      this.zoneDefinitionService.FilterData(this.searchForm.value.searchGroupSelect!, this.searchForm.value.searchText! as string)
    }
  }

  onReset(): void {
    this.zoneDefinitionService.ClearFilter();
    this.clearZones();
  }

  ngOnInit(): void {
    this.searchItems = [
      {name: 'Places', code: 'places'},
      {name: 'Zones', code: 'zones'},
      {name: 'Sites', code: 'sites'},
      {name: 'Layers', code: 'layers'}
    ];
    this.zoneDefinitionService.GetData().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      console.log('rerenderer', data);
      this.ngZone.run( () => {
        this.zones$.next(data.zones.items);
        this.sites$.next(data.sites.items);
        this.layers$.next(data.layers.items);
        this.places$.next(data.placesMarks.items);
        this.ref.detectChanges();
      });
    })
    this.apiService.FetchData().pipe(
      takeUntil(this.destroy$),
      tap((data: ZonesDefinition) => {
        this.zoneDefinitionService.LoadingData(data);
      })
    ).subscribe((data) => {
    });
    this.applicationStateService.messages.pipe(
      takeUntil(this.destroy$)
    ).subscribe((message: ApplicationRequester) => {
      if (message.autoRetry) {
        this.applicationStateService.SetTimeout(5000).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          console.log("reload")
          this.apiService.FetchData();
        })
      }
    })
  }
}
