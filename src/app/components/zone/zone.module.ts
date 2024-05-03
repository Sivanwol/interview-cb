import {NgModule} from "@angular/core";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {ZoneComponent} from "./zone.component";
import {SharedModule} from "../shared/shared.module";
import {MenuModule} from "primeng/menu";
import {AccordionModule} from "primeng/accordion";
import {ZoneLocationItemComponent} from "./location-item.component";
import {BadgeModule} from "primeng/badge";
import {TreeModule} from "primeng/tree";

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    PanelModule,
    AvatarModule,
    AccordionModule,
    MenuModule,
    BadgeModule,
    TreeModule
  ],
  declarations: [ZoneComponent,ZoneLocationItemComponent],
  exports: [ZoneComponent],
})
export class ZoneModule {}
