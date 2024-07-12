import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designation } from 'app/classes/rnr/Designation';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;


// httpOptions.headers =
//   httpOptions.headers.set('Authorization', 'my-new-auth-token');


@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {  }

  getDesignations(desCategoryId: number) {
    return this.http.get<Designation[]>(BASE_URL + '/' + WAR + '/designationCategories/' + desCategoryId + '/designations',
      this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllDesignations(){
    return this.http.get<Designation[]>(BASE_URL + '/' + WAR + '/designations', this.httpOptions).pipe(
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
  };
}
