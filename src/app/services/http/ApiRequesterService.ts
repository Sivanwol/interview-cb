import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, retry, switchMap, throwError} from "rxjs";
import {ZoneDefinition, ZonesDefinition} from "../../models/zone-definition.model";
import {ApplicationStateService} from "../ApplicationStateService";
import {MessageService} from "primeng/api";


@Injectable()
export class ApiRequesterService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient,
              private appStateService: ApplicationStateService,
              private messageService: MessageService) {
  }

  public FetchData(): Observable<ZonesDefinition> {
    const call =  this.http.get('data').pipe(retry(1), catchError(this.handleError.bind(this)));
    return call.pipe(map((data: any, index) => {
      const zones = data.find((tt: ZoneDefinition) => tt.type === "zones")!;
      const sites = data.find((tt: ZoneDefinition) => tt.type === "sites")!;
      const placesMarks = data.find((tt: ZoneDefinition) => tt.type === "places")!;
      const layers = data.find((tt: ZoneDefinition) => tt.type === "layers")!;
      const zoneDef: ZonesDefinition = {
        zones,
        sites,
        placesMarks,
        layers
      };
      return zoneDef;
    }))
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    const requesterId = error.headers.get('request-id');
    this.appStateService.SetApiServiceFailed({
      requesterId,
      message: errorMessage,
      autoRetry: false
    });
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed with request', life: 20000 })
    return throwError(() => {
      return errorMessage;
    });
  }

}
