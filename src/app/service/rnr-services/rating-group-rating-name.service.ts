import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatingName } from 'app/classes/rnr/RatingName';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { RatingGroupRatingName } from 'app/classes/rnr/RatingGroupRatingName';
import { environment } from 'environments/environment';
import {RatingGroupRatingNameObj} from '../../classes/rnr/RatingGroupRatingNameObj';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;


// httpOptions.headers =
//   httpOptions.headers.set('Authorization', 'my-new-auth-token');


@Injectable({
  providedIn: 'root'
})
export class RatingGroupRatingNameService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {
  }

  getRatingGroupNames() {
    return this.http.get<RatingName[]>(BASE_URL + '/' + WAR + '/ratingNames', this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getRatingNamesByGroup(groupId: number){
    return this.http.get<RatingName[]>( BASE_URL + '/' + WAR + '/ratingGroups/' + groupId + '/ratingNames', this.httpOptions).pipe(
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

  addRatingGroupName(ratingName : RatingName): Observable<RatingName>{
    return this.http.post<RatingName>(BASE_URL + '/' + WAR + '/ratingNames', ratingName, this.httpOptions).
    pipe(
      catchError(this.handleError)
    );

  }

  addRatingGroupRatingName(ratingGroupRatingName: RatingGroupRatingNameObj): Observable<RatingGroupRatingName>{
    console.log(ratingGroupRatingName);
    return this.http.post<RatingGroupRatingName>(BASE_URL + '/' + WAR + '/ratingGroupRatingNames',
      ratingGroupRatingName, this.httpOptions).
    pipe(
      catchError(this.handleError)
    );

  }

  // deleteRatingName(id: number){
  //   return this.http.delete('http://localhost:8080/ratingNames/' + id, httpOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  deleteRatingGroupRatingName(rgId: number, rId: number){
    return this.http.delete(BASE_URL + '/' + WAR + '/ratingGroups/' + rgId + '/RatingNames/' + rId, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateRatingName(ratingName : RatingName): Observable<RatingName>{
    return this.http.put<RatingName>( BASE_URL + '/' + WAR + '/ratingNames/' + ratingName.id, ratingName,
      this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
