import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LeaveTypeDAO} from '../../classes/leave/leave-type-d-a-o';
import {environment} from '../../../environments/environment';
import {Profile} from "../../_global/profile";


const BASE_URL = environment.API_PATH;
const WAR = environment.KG_WAR;

// const BASE_URL = 'http://localhost:8080';
// const WAR = '/';



@Injectable({
  providedIn: 'root'
})
export class KnowledgeExtractionCsrService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
    })
  };

  constructor(private http: HttpClient) { }

  getCSRData(){
    return this.http.get(`${BASE_URL}/${WAR}/csr-admin-graph/getCSRData`,this.httpOptions);
  }

  getProjectList() {
    //return this.http.get(` http://localhost:8080/csr-admin-graph/getProjectList`,this.httpOptions);

    return this.http.get(`${BASE_URL}/${WAR}/csr-admin-graph/getProjectList`,this.httpOptions);
  }

  getCSRList(data){
    //return this.http.post(`http://localhost:8080/csr-admin-graph/getCSRList`,data,this.httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/csr-admin-graph/getCSRList`,data,this.httpOptions);
  }

  getFilterData(data) {
    //return this.http.post(`http://localhost:8080/csr-admin-graph/getCSRFilteredData`, data,this.httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/csr-admin-graph/getCSRFilteredData`, data,this.httpOptions);
  }

}
