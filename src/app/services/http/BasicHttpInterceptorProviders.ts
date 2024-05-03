import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {GeneralHttpInterceptor} from "./providers/GeneralHttpInterceptor";
import {LoggingInterceptor} from "./providers/LoggingInterceptor";
import {APIInterceptor} from "./providers/APIInterceptor";

export const BasicHttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: GeneralHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
