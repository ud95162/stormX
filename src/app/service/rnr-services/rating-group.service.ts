import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { RatingGroup } from 'app/classes/rnr/RatingGroup';
import { Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;



// httpOptions.headers =
//   httpOptions.headers.set('Authorization', Profile.USER_TOKEN);


@Injectable({
  providedIn: 'root'
})
export class RatingGroupService {

  public error= false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {
  }


  getRatingGroups(){

    return this.http.get<RatingGroup[]>(BASE_URL + '/' + WAR + '/ratingGroups', this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getRatingGroupName(id: number){
    return this.http.get<RatingGroup>(BASE_URL + '/' + WAR + '/ratingGroups/' + id, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    this.error = true;
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
      // window.alert(`Internal server error`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  addRatingGroup(ratingGroup : RatingGroup): Observable<RatingGroup>{
    return this.http.post<RatingGroup>(BASE_URL + '/' + WAR + '/ratingGroups', ratingGroup, this.httpOptions).
    pipe(
      catchError(this.handleError)
    );

  }

  deleteRatingGroup(ratingGroup: RatingGroup){
    return this.http.delete(BASE_URL + '/' + WAR + '/ratingGroups/' + ratingGroup.name, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteRatingNamesUnderRatingGroup(ratingGroup: RatingGroup){
    return this.http.delete(BASE_URL + '/' + WAR + '/ratingGroups/' + ratingGroup.id, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateRatingGroup(ratingGroup: RatingGroup): Observable<RatingGroup>{
    return this.http.put<RatingGroup>( BASE_URL + '/' + WAR + '/ratingGroups/' +
      ratingGroup.id, ratingGroup, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
