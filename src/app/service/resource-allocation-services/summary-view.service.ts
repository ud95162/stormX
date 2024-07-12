import { Injectable } from '@angular/core';
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

export class SummaryViewService {

  constructor(private http: HttpClient) {
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  }; }

  getProjectAllocationCountByEmpCadre(weekName: string) {
    return this.http.get(`${MAIN_URL}/summary/cadre/${weekName}`, httpOptions);
  }

  getProjectAllocationCountByRoleGroup(weekName: string) {
    return this.http.get(`${MAIN_URL}/summary/role/${weekName}`, httpOptions);
  }
}
