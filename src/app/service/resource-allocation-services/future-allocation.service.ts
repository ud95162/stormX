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

export class FutureAllocationService {

  constructor(private http: HttpClient) {

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'charset': 'utf-8',
        'Accept': 'application/json',
        'Authorization': Profile.USER_TOKEN,
      })
    };
  }

  getFutureAllocation() {
    return this.http.get(`${MAIN_URL}/allocation/getFutureAllocation`, httpOptions);
  }

  getWeekStartDates() {
    return this.http.get(`${MAIN_URL}/allocation/getWeekStartDates`, httpOptions);
  }

  getProjectCodes() {
    return this.http.get(`${MAIN_URL}/allocation/getProjectCodes`, httpOptions);
  }

  saveAllocation(payload: any) {
    return this.http.post(`${MAIN_URL}/allocation/allocateEmployees`, payload, httpOptions);
  }

  getNewFutureAllocation() {
    return this.http.get(`${MAIN_URL}/allocation/getFutureAllocationNew`, httpOptions);
  }

  searchAllocation(payload: any) {
    return this.http.post(`${MAIN_URL}/allocation/searchAllocations`, payload, httpOptions);
  }
}
