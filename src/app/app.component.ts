import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {ApiRequesterService} from "./services/http/ApiRequesterService";
import {catchError, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {ZonesDefinition} from "./models/zone-definition.model";
import {ApplicationStateService} from "./services/ApplicationStateService";
import {ApplicationRequester} from "./models/ApplicationRequester";
import {MessageService} from "primeng/api";
import {FormBuilder, Validators} from "@angular/forms";
import {ZoneDefinitionService} from "./services/ZoneDefinitionService";

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
  selectedSearch: SearchItem | null = null;
  selectedSearchValue: string | null = null;
  private readonly destroy$ = new Subject();
  public data$: Observable<ZonesDefinition> = new Observable<ZonesDefinition>();
  public data: ZonesDefinition = {
    zones: {
      type: "zones",
      items: []
    },
    placesMarks: {
      type: "places",
      items: []
    },
    sites: {
      type: "sites",
      items: []
    },
    layers: {
      type: "layers",
      items: []
    }
  };

  searchForm = this.formBuilder.group({
    searchGroupSelect: [null, Validators.required],
    searchText: ["", Validators.required],
  })

  constructor(private apiService: ApiRequesterService,
              private applicationStateService: ApplicationStateService,
              private ref: ChangeDetectorRef,
              public zoneDefinitionService: ZoneDefinitionService,
              private formBuilder: FormBuilder) {
  }

  private clearZones() {
    this.data = {
      zones: {
        type: "zones",
        items: []
      },
      placesMarks: {
        type: "places",
        items: []
      },
      sites: {
        type: "sites",
        items: []
      },
      layers: {
        type: "layers",
        items: []
      }
    };
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
      console.log(data);
      this.clearZones();
      this.data = data;

      this.ref.detectChanges();
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
