import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
  }

  getDesignations(){
    return this.http.get(`${BASE_URL}/${WAR}/designation/all`, httpOptions);
  }

  getProjects(){
    return this.http.get(`${BASE_URL}/${WAR}/project/load/all`, httpOptions);
  }

  getFilterList(filterLoad: any){
      return this.http.post(`${BASE_URL}/${WAR}/employee-filter/data-profiles`, filterLoad, httpOptions);
  }
}
