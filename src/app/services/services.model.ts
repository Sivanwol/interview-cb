import { NgModule} from "@angular/core";
import {ApiRequesterService} from "./http/ApiRequesterService";
import {HttpClientModule} from "@angular/common/http";
import {BasicHttpInterceptorProviders} from "./http/BasicHttpInterceptorProviders";
import {ApplicationStateService} from "./ApplicationStateService";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    BasicHttpInterceptorProviders,
    ApplicationStateService,
    MessageService,
    ApiRequesterService
  ]
})
export class ServicesModule { }
