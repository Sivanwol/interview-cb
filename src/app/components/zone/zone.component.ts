import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Location} from "../../models/location.model";

@Component({
  selector: "app-zone",
  templateUrl: "./zone.component.html",
  styleUrls: ["./zone.component.scss"],
})
export class ZoneComponent  implements OnInit {
  @Input() name: string = "";
  @Input() icon: string = "";
  @Input() items: Location[] = [];

  ngOnInit(): void {}
}
