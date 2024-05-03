import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {v4 as uuid} from "uuid";

@Injectable()
export class GeneralHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqCopy = req.clone()
    reqCopy.headers.set("SystemHeader", "Header");
    reqCopy.headers.set("Access-Control-Allow-Origin", "*");
    reqCopy.headers.set("request-id", uuid())
    return next.handle(reqCopy);
  }
}
