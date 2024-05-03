import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, retry, switchMap, throwError} from "rxjs";
import {ZoneDefinition, ZonesDefinition} from "../../models/zone-definition.model";


@Injectable()
export class ApiRequesterService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  public FetchData(): Observable<ZonesDefinition> {
    const call =  this.http.get('data').pipe(retry(1), catchError(this.handleError));
    return call.pipe(map((data: any, index) => {
      const zones = data.items.find((tt: ZoneDefinition) => tt.type === "zones")!;
      const sites = data.items.find((tt: ZoneDefinition) => tt.type === "sites")!;
      const placesMarks = data.items.find((tt: ZoneDefinition) => tt.type === "places")!;
      const layers = data.items.find((tt: ZoneDefinition) => tt.type === "layers")!;
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
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
