import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {ApiRequesterService} from "./services/http/ApiRequesterService";
import {Observable, Subject, takeUntil} from "rxjs";
import {ZonesDefinition} from "./models/zone-definition.model";

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
  public zones: ZonesDefinition = {
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

  constructor(private apiService: ApiRequesterService) {
  }

  private clearZones() {
    this.zones = {
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
      takeUntil(this.destroy$)
    ).subscribe((data)=> {
      this.clearZones()
      this.zones = data;
    });
  }
}
