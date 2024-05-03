import { NgModule} from "@angular/core";
import {ApiRequesterService} from "./http/ApiRequesterService";
import {HttpClientModule} from "@angular/common/http";
import {BasicHttpInterceptorProviders} from "./http/BasicHttpInterceptorProviders";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    BasicHttpInterceptorProviders,
    ApiRequesterService
  ],
  exports: [
    ApiRequesterService
  ]
})
export class ServicesModule { }
