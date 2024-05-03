import {Injectable} from "@angular/core";
import {Observable, Subject, timer} from "rxjs";
import {ApplicationRequester} from "../models/ApplicationRequester";
import {ZonesDefinition} from "../models/zone-definition.model";

@Injectable()
export class ApplicationStateService {
  private message$ : Subject<ApplicationRequester> = new Subject<ApplicationRequester>();
  public messages : Observable<ApplicationRequester> = this.message$.asObservable();

  private loading$: Subject<boolean> = new Subject<boolean>();

  public GetLoadingState$: Observable<boolean> = this.loading$.asObservable();


  public SetLoadingState(status: boolean) {
    this.loading$.next(status);
  }
  public SetApiServiceFailed(request: ApplicationRequester): void {
    this.message$.next(request);
  }

  public SetTimeout(timeout: number) {
    return timer(0, timeout);
  }
}
