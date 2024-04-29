import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [CommonModule,
    FormsModule,
    TranslateModule],
  exports: [CommonModule, FormsModule, TranslateModule]
})
export class SharedModule {
}
