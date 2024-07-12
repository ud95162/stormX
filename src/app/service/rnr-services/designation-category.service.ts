import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DesignationCategory } from 'app/classes/rnr/DesignationCategory';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { DesignationCategoryPillar } from 'app/classes/rnr/DesignationCategoryPillar';
import { environment } from 'environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;




// httpOptions.headers =
//   httpOptions.headers.set('Authorization', Profile.USER_TOKEN);


@Injectable({
  providedIn: 'root'
})
export class DesignationCategoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {  }

  getDesCategories(){
    return this.http.get<DesignationCategory[]>(BASE_URL + '/' + WAR + '/designationCategories',  this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
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
  }

  addDesCategoryRnRPillar(desCategoryPillar: DesignationCategoryPillar): Observable<DesignationCategoryPillar>{

    const desCategoryPillarObject = { 'designationCategoryPillarId': desCategoryPillar };

    // let a = {}
    // a["designationCategoryPillarId"] = desCategoryPillar
    // a["designationCategory"] = desCategory
    // a["rnRPillar"] = rnrPillar
    // // console.log(desCategoryPillar)
    console.log(desCategoryPillarObject);
    // tslint:disable-next-line:max-line-length
    return this.http.post<DesignationCategoryPillar>(BASE_URL + '/' + WAR + '/designationCategoryPillars',
      desCategoryPillarObject, this.httpOptions).
    pipe(
      catchError(this.handleError)
    );

  }
}
