import { Injectable } from '@angular/core';
import {Profile} from '../../_global/profile';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// const BASE_URL = environment.API_PATH;
const BASE_URL = 'http://localhost:8080';

const WAR = environment.HIRING_WAR;

let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class HiringService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getLetterTemplate() {
    return this.http.get( `${BASE_URL}/${WAR}/noauth/letter/get-template`, httpOptions );
  }

  sendLetterTemplate( payload: any) {
    return this.http.put( `${BASE_URL}/${WAR}/noauth/letter/edit-template`, payload, httpOptions );
  }
}
