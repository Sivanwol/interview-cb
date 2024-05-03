import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {ApiRequesterService} from "./services/http/ApiRequesterService";
import {catchError, Observable, Subject, takeUntil} from "rxjs";
import {ZonesDefinition} from "./models/zone-definition.model";
import {ApplicationStateService} from "./services/ApplicationStateService";
import {ApplicationRequester} from "./models/ApplicationRequester";
import {MessageService} from "primeng/api";

type SearchItem = {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Angular 17 Crud example';
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = true;
  searchItems: SearchItem[] = [];
  selectedSearch: SearchItem | null = null;
  selectedSearchValue: string | null = null;
  private readonly destroy$ = new Subject();
  private data$: Observable<ZonesDefinition>= new Observable<ZonesDefinition>();
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

  constructor(private apiService: ApiRequesterService,
              private applicationStateService: ApplicationStateService) {
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
    }
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }
  ngOnInit(): void {
    this.searchItems =  [
      { name: 'Places', code: 'pm' },
      { name: 'Zones', code: 'zone' },
      { name: 'Locations', code: 'loc' }
    ];
    this.apiService.FetchData().pipe(
      takeUntil(this.destroy$),
    ).subscribe((data)=> {
      this.clearZones()
      this.data = data;
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
