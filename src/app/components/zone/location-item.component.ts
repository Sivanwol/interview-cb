import {Component, Input, OnInit} from "@angular/core";
import {LocationItem} from "../../models/location-item.model";

@Component({
  selector: "app-zone-location-item",
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
})
export class ZoneLocationItemComponent   implements OnInit {
    @Input() public location: LocationItem = {
      translationKey: '',
      name: '',
      icon: '',
      isWired: false,
      isBufferedConnection: false,
      isConnect: false
    }
    ngOnInit(): void {
    }

}
