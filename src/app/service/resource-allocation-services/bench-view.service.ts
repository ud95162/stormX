import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.RESOURCE_ALLOCATION_WAR;
const MAIN_URL = 'http://localhost:8080';

let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class BenchViewService {
  start_date: string;
  status: string;

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  sendRequest(payload: any) {
    return this.http.post(`${MAIN_URL}/resource-request/save`, payload, httpOptions);
  }


  getBenchElements(): Observable<any> {
    return this.http.post(`${MAIN_URL}/bench/getBenchElements`, this.start_date, httpOptions);
  }

  getRequests(): Observable<any> {
    return this.http.get(`${MAIN_URL}/resource-request/getAll`, httpOptions);
  }

  updateStatus(payload: any) {
    return this.http.put(`${MAIN_URL}/resource-request/update-status`, payload, httpOptions);
  }

  updateResourceRequest(payload: any) {
    return this.http.put(`${MAIN_URL}/resource-request/update-request`, payload, httpOptions);
  }

  saveApprovedRequest(payload: any) {
    return this.http.post(`${MAIN_URL}/approved-request/save`, payload, httpOptions);
  }

  getBenchCounts(): Observable<any> {
    return this.http.post(`${MAIN_URL}/bench/getCountsByCardre`, this.start_date, httpOptions);
  }

  getLeaveEmployees(): Observable<any> {
    return this.http.post(`${MAIN_URL}/bench/getLeaveEmployees`, this.start_date, httpOptions);
  }

  getAllApprovedRequests(): Observable<any> {
    return this.http.get(`${MAIN_URL}/approved-request/getAllApprovedRequests`, httpOptions);
  }

  getRequestsByStatus(): Observable<any> {
    return this.http.post(`${MAIN_URL}/approved-request/getRequestsByStatus`, this.status, httpOptions);
    // return this.http.post(`http://127.0.0.1:8080/approved-request/getRequestsByStatus`, this.status, httpOptions);
  }

  updateRequestStatus(payload: any) {
    return this.http.put(`${MAIN_URL}/approved-request/updateRequestStatus`, payload, httpOptions);
  }

  updateAssignedEmployee(payload: any) {
    return this.http.put(`${MAIN_URL}/approved-request/updateAssignedEmployee`, payload, httpOptions);
  }

  getAllProjects(): Observable<any> {
    return this.http.get(`${MAIN_URL}/resource-request/getAllProjects`, httpOptions);
  }

  getAllDesignations(): Observable<any> {
    return this.http.get(`${MAIN_URL}/resource-request/getAllDesignations`, httpOptions);
  }

  getRequestsByEmpNo( empNo: string ): Observable<any> {
    // return this.http.post(`${MAIN_URL}/approved-request/getRequestsByStatus`, this.status, httpOptions);
    return this.http.post(`http://127.0.0.1:8080/approved-request/getRequestsByEmpNo`, empNo, httpOptions);
  }

  getAllHrPeoples() {
    return this.http.get(`${MAIN_URL}/approved-request/getHrPeoples`, httpOptions);
    // return this.http.get('http://127.0.0.1:8080/approved-request/getHrPeoples', httpOptions);
  }

}
