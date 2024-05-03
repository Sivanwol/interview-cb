import {NgModule} from "@angular/core";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {ZoneComponent} from "./zone.component";
import {SharedModule} from "../shared/shared.module";
import {MenuModule} from "primeng/menu";
import {AccordionModule} from "primeng/accordion";
import {ZoneLocationItemComponent} from "./location-item.component";
import {ListboxModule} from "primeng/listbox";
import {BadgeModule} from "primeng/badge";

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    PanelModule,
    AvatarModule,
    AccordionModule,
    ListboxModule,
    MenuModule,
    BadgeModule
  ],
  declarations: [ZoneComponent,ZoneLocationItemComponent],
  exports: [ZoneComponent],
})
export class ZoneModule {}
