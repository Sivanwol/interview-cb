import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private API_URL: string = 'http://localhost:3000/';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.API_URL}/${req.url}` });
    return next.handle(apiReq);
  }
}
