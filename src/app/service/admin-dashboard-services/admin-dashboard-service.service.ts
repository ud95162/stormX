import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAdminDashboardGraphsListByUser() {
    return this.http.get(`${BASE_URL}/${WAR}/dashboard/graphs`);
  }

  postAdminDashboardGraph(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-dashboard/graphs/individual`, payload, this.httpOptions);
  }

  getAdminDashboardGraphsPreData() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-dashboard/preData`);
  }

  getAdminDashboardGraph(userGraphId, fromDate, toDate, companyId, officeId) {
    return this.http.get(`${BASE_URL}/${WAR}/dashboard/graph/?userGraphId=${userGraphId}&fromDate=${fromDate}&toDate=${toDate}&companyId=${companyId}&officeId=${officeId}`);
  }

  getAdminDashboardSuggestedGraphsOnCreate() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-dashboard/suggestGraphs`);
  }

  getAdminDashboardPublicGraphsOnCreate() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-dashboard/publicGraphs`);
  }

  getAdminDashboardMyGraphsOnCreate() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-dashboard/myGraphs`);
  }

  saveAdminDashboardMyGraphsOnCreate(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-dashboard/userGraphs`, payload, this.httpOptions);
  }

  postAddExistingGraphsToMyGraphs(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-dashboard/existingGraphs/to/myGraphs`, payload, this.httpOptions);
  }

  putMoveGraphsFromMyGraphsToExisting(graphId: number) {
    return this.http.put(`${BASE_URL}/${WAR}/admin-dashboard/myGraphs?id=${graphId}`, this.httpOptions);
  }

  deleteMyGraphsPermanently(graphId: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/admin-dashboard/myGraphs?id=${graphId}`);
  }

  editMyGraphs(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/admin-dashboard/userGraphs`, payload, this.httpOptions);
  }
}
