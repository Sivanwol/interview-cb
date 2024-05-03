import {Injectable} from "@angular/core";
import {filter, map, Observable, of, Subject, tap} from "rxjs";
import {ZonesDefinition} from "../models/zone-definition.model";
import {Location} from "../models/location.model";

@Injectable()
export class ZoneDefinitionService {
  private data$: Subject<ZonesDefinition>= new Subject<ZonesDefinition>();
  private dataOrig!: ZonesDefinition;
  private dataObservable: Observable<ZonesDefinition> = this.data$.asObservable();

  private filterSelect: {name: string, code: string} = {name: '', code: ''};
  private filterValue: string = '';

  public LoadingData(data: ZonesDefinition) {
    this.data$.next(data);
    this.dataOrig = data;
  }

  public FilterData(select: {name: string, code: string}, value: string){
    this.filterSelect= select;
    this.filterValue = value;
  }

  public ClearFilter(): void {
    this.filterSelect = {name: '', code: ''};
    this.filterValue = '';
    this.data$.next(this.dataOrig)
  }
  public GetData(): Observable<ZonesDefinition> {
    return this.dataObservable.pipe(
      map((data) => {
        if (this.filterSelect.code !== '' && this.filterValue !== "" && this.filterValue.length > 2) {
          let items: Location[] = [];
          switch (this.filterSelect.code) {
            case "zones":
              items = data.zones.items;
              data.layers.items = [];
              data.sites.items = [];
              data.placesMarks.items = [];
              data.zones.items = [];
              for (const item of items) {
                const filteredItems = item.items.filter((item) => item.name.includes(this.filterValue));
                item.items = filteredItems;
                data.zones.items.push(item);
              }
              break;
            case "layers":
              items = data.layers.items;
              data.layers.items = [];
              data.sites.items = [];
              data.placesMarks.items = [];
              data.zones.items = [];
              for (const item of items) {
                const filteredItems = item.items.filter((item) => item.name.includes(this.filterValue));
                item.items = filteredItems;
                data.layers.items.push(item);
              }
              break;
            case "sites":
              items = data.sites.items;
              data.layers.items = [];
              data.sites.items = [];
              data.placesMarks.items = [];
              data.zones.items = [];
              for (const item of items) {
                const filteredItems = item.items.filter((item) => item.name.includes(this.filterValue));
                item.items = filteredItems;
                data.sites.items.push(item);
              }
              break;
            case "places":
              items = data.placesMarks.items;
              data.layers.items = [];
              data.sites.items = [];
              data.placesMarks.items = [];
              data.zones.items = [];
              for (const item of items) {
                const filteredItems = item.items.filter((item) => item.name.includes(this.filterValue));
                item.items = filteredItems;
                data.zones.items.push(item);
              }
              break;
          }
        }

        return data;
      })
    );
  }


}
