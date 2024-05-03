import {Injectable} from "@angular/core";
import {Observable, Subject, timer} from "rxjs";
import {ApplicationRequester} from "../models/ApplicationRequester";

@Injectable()
export class ApplicationStateService {
  private message$ : Subject<ApplicationRequester> = new Subject<ApplicationRequester>();
  public messages : Observable<ApplicationRequester> = this.message$.asObservable();
  public SetApiServiceFailed(request: ApplicationRequester): void {
    this.message$.next(request);
  }
  public SetTimeout(timeout: number) {
    return timer(0, timeout);
  }
}
