import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.RESOURCE_ALLOCATION_WAR;
const MAIN_URL = 'http://localhost:8080';


let httpOptions;
@Injectable({
  providedIn: 'root'
})
export class AuditViewService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getCountByEmployeeCadre(year: number, month: number, week: number) {
    return this.http.get(`${MAIN_URL}/audit/${week}/${month}/${year}`, httpOptions);
  }

  getHeadCountByRoleGroup(weekName: String) {
    return this.http.get(`${MAIN_URL}/audit/head-count/${weekName}`, httpOptions);
  }

  getAllocationCountByRoleGroup(weekName: String) {
    return this.http.get(`${MAIN_URL}/audit/allocation-count/${weekName}`, httpOptions);
  }

  getBenchCountByRoleGroup(weekName: String) {
    return this.http.get(`${MAIN_URL}/audit/bench-count/${weekName}`, httpOptions);
  }

  getDifferenceByRole(group: String, weekName: String) {
    return this.http.get(`${MAIN_URL}/audit/difference/${group}/${weekName}`, httpOptions);
  }

}
