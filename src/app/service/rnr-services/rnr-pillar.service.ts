import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, retry} from 'rxjs/operators';
import { RnRPillar } from 'app/classes/rnr/RnRPillar';
import { Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;


// httpOptions.headers =
//   httpOptions.headers.set('Authorization', 'my-new-auth-token');


@Injectable({
  providedIn: 'root'
})
export class RnrPillarService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {  }

  getRnRPillars() {
    return this.http.get<RnRPillar[]>(BASE_URL + '/' + WAR + '/rnrPillars', this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getRnRPillarsByDescatId(desCategoryId: number) {
    return this.http.get<RnRPillar[]>(BASE_URL + '/' + WAR + '/designationCategories/' + desCategoryId + '/rnrPillars', this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getRnRPillarId(name: string) {
    return this.http.get<RnRPillar>(BASE_URL + '/' + WAR + '/rnrPillars/' + name, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getRnRPillarsByYear(year: string) {
    return this.http.get<RnRPillar[]>(BASE_URL + '/' + WAR + '/rnrPillars/year/' + year, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getRnRPillarResponse(): Observable<HttpResponse<RnRPillar[]>>{
    return this.http.get<RnRPillar[]>(BASE_URL + '/' + WAR + '/rnrPillars', {observe: 'response'});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // window.alert('Network error occured');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        // window.alert(` Internal server error`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  addRnRPillar(rnrPillar : RnRPillar): Observable<RnRPillar>{
    return this.http.post<RnRPillar>(BASE_URL + '/' + WAR + '/rnrPillars', rnrPillar, this.httpOptions).
    pipe(
      catchError(this.handleError)
    );

  }

  deleteRnRPillar(rnrPillar: RnRPillar){
    return this.http.delete(BASE_URL + '/' + WAR + '/rnrPillar/' + rnrPillar.id + '/' + rnrPillar.year, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateRnRPillar(rnrPillar: RnRPillar): Observable<RnRPillar>{
    return this.http.put<RnRPillar>( BASE_URL + '/' + WAR + '/rnrPillars/' + rnrPillar.id, rnrPillar,
      this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRnrFilteredYears() {
    return this.http.get<String[]>(BASE_URL + '/' + WAR + '/rnrPillars/years', this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
}
