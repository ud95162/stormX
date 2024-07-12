import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expectation } from 'app/classes/rnr/Expectation';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'environments/environment';
import {DesignationPillarExpectation} from '../../classes/rnr/DesignationPillarExpectation';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;


// httpOptions.headers =
//   httpOptions.headers.set('Authorization', 'my-new-auth-token');

@Injectable({
  providedIn: 'root'
})
export class ExpectationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {  }

  getExpectations(rnrPillarId: number, desId: number, year: string): Observable<DesignationPillarExpectation[]>{
    return this.http.get<DesignationPillarExpectation[]>(
      BASE_URL + '/' + WAR + '/designations/' + desId + '/rnrPillars/' + rnrPillarId + '/expectations/' + year,
      // 'http://localhost:8080' + '/designations/' + desId + '/rnrPillars/' + rnrPillarId + '/expectations/' + year,
      this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getExpectationIdByName(name : string): Observable<number>{
    return this.http.get<number>(BASE_URL + '/' + WAR + '/expectations/' + name, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      window.alert('Network error occured');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        window.alert(`Internal server error`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  addExpectation(expectation: Expectation, desId: number, rnrId: number, year: string ): Observable<Expectation>{
    console.log(desId);
    // tslint:disable-next-line:max-line-length
    return this.http.post<Expectation>(
      BASE_URL + '/' + WAR + '/designations/' + desId + '/rnrPillars/' + rnrId + '/expectations/' + year, expectation,
      // 'http://localhost:8080' + '/designations/' + desId + '/rnrPillars/' + rnrId + '/expectations/' + year, expectation,
      this.httpOptions).
    pipe(
      catchError(this.handleError)
    );

  }

  deleteExpectation(id: number){
    console.log(id);
    return this.http.delete(BASE_URL + '/' + WAR + '/expectations/' + id, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // deleteExpectationByDesignationId(dId: number, expectationId: number){
  //   return this.http.delete(WAR + '/designations/' + dId + '/expectations/' + expectationId, httpOptions).pipe(
  //     catchError(this.handleError)
  //   );
  deleteExpectationByDesPillarIdYear(dId: number, expectationId: number, pId: number, year: string){
    // tslint:disable-next-line:max-line-length
    return this.http.delete(BASE_URL + '/' + WAR + '/designations/' + dId + '/expectations/' + expectationId +
      '/pillar/' +  pId + '/year/' + year, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateExpectation(expectation: Expectation, rnrPillarId: number, year: string, dId: number): Observable<Expectation>{
    return this.http.put<Expectation>(BASE_URL + '/' + WAR + '/rnrPillars/' + rnrPillarId + '/expectations/' +
      expectation.id + '/year/' + year + '/des/' + dId, expectation, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
