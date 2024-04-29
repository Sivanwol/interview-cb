import {NgModule} from "@angular/core";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {ZoneComponent} from "./zone.component";
import {SharedModule} from "../shared/shared.module";
import {MenuModule} from "primeng/menu";

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    PanelModule,
    AvatarModule,
    MenuModule
  ],
  declarations: [ZoneComponent],
  exports: [ZoneComponent],
})
export class ZoneModule {}
