import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.RESOURCE_ALLOCATION_WAR;
const MAIN_URL = 'http://localhost:8080';


let httpOptions;
@Injectable({
  providedIn: 'root'
})
export class AllocationViewService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'charset': 'utf-8',
        'Accept': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getAllocatedEmp(weekName: string) {
    return this.http.get(`${MAIN_URL}/allocation/getAllocatedEmployees/${weekName}`, httpOptions);
  }

  getBenchEmp(weekName: string) {
    return this.http.get(`${MAIN_URL}/allocation/getBench/${weekName}`, httpOptions);
  }

  updateAllocatedEmpArray(payload: any[]) {
    const reqList = [];
    payload.forEach( item => {
      reqList.push(this.http.put(`${MAIN_URL}/allocation/allocateEmployees`, item, httpOptions));
    });
    return forkJoin(reqList);
  }

  getProjects() {
    return this.http.get(`${MAIN_URL}/allocation/projects`, httpOptions);
  }

  getAllocatedEmployeesForRequest(status: string): Observable<any> {
    return this.http.get(`${MAIN_URL}/allocation/getAllocatedEmployeesForRequests/${status}`, httpOptions);
  }

}
