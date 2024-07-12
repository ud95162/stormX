import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from "../../_global/profile";

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const KPI_WAR = environment.KPI_WAR;

@Injectable({
  providedIn: 'root'
})
export class KpiServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
    })
  };

  constructor(private http: HttpClient) { }

  getKpiGraph() {
    // return this.http.post(`http://127.0.0.1:8080/kpi/graph/`, {});
    // return this.http.post(`${BASE_URL}/${KPI_WAR}/kpi/graph/`, {});
  }

  getAllData() {
    //return this.http.get('http://127.0.0.1:8080/kpi/all',this.httpOptions);
    return this.http.get(`${BASE_URL}/${KPI_WAR}/kpi/all`,this.httpOptions);
  }

  updateCurrentMonth(payload: any) {
    // return this.http.post(`http://127.0.0.1:8080/kpi/update/`, payload);
    // return this.http.post(`${BASE_URL}/${KPI_WAR}/kpi/update/`, payload);
  }
}
