import {Component, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";

type SearchItem = {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Angular 17 Crud example';
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = true;
  searchItems: SearchItem[] = [];
  selectedSearch: SearchItem | null = null;
  selectedSearchValue: string | null = null;
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }
  ngOnInit(): void {
    this.searchItems =  [
      { name: 'Placemarks', code: 'pm' },
      { name: 'Zones', code: 'zone' },
      { name: 'Locations', code: 'loc' }
    ]
  }
}
