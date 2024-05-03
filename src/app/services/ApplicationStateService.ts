import {Injectable} from "@angular/core";
import {Observable, Subject, timer} from "rxjs";
import {ApplicationRequester} from "../models/ApplicationRequester";
import {ZonesDefinition} from "../models/zone-definition.model";

@Injectable()
export class ApplicationStateService {
  private data$: Observable<ZonesDefinition>= new Observable<ZonesDefinition>();
  private message$ : Subject<ApplicationRequester> = new Subject<ApplicationRequester>();
  public messages : Observable<ApplicationRequester> = this.message$.asObservable();
  public SetApiServiceFailed(request: ApplicationRequester): void {
    this.message$.next(request);
  }

  public SetTimeout(timeout: number) {
    return timer(0, timeout);
  }
}
