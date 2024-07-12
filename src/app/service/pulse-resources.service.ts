import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const PULSE_API = environment.PULSE_API;

@Injectable({
  providedIn: 'root'
})
export class PulseResourcesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.PULSE_USER}:${environment.PULSE_PASS}`)
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllProjectTeams() {
    return this.http.post(`${PULSE_API}/resources/project-teams`,null);
  }

  saveProjectTeam(project: string, team: string) {
    return this.http.post(`${PULSE_API}/resources/project-team?project=${project}&team=${team}`,null);
  }

  getUtilizationHistory(empId: string) {
    return this.http.post(`${PULSE_API}/resources/project-team-utils?empId=${empId}`, null);
  }

  saveEmployeeUtilization(utilRecord: UtilRecord) {
    return this.http.post(`${PULSE_API}/resources/project-team-util`, utilRecord);
  }

  deleteEmployeeUtilization(key: string) {
    return this.http.delete(`${PULSE_API}/resources/project-team-util?key=${key}`);
  }

  getCurrentProjectsOfAll() {
    return this.http.post(`${PULSE_API}/resources/all-current-projects`, null);
  }

  getCurrentProjectsOfEmployee(empId: string) {
    return this.http.post(`${PULSE_API}/resources/current-projects?empId=${empId}`, null);
  }

  getProjectAllocation( projectCode: string ) {
    return this.http.post(`${PULSE_API}/resources/projects-allocations?project=${projectCode}`, null);
  }

  getAllProjectsAllocations() {
    return this.http.post(`${PULSE_API}/resources/all-projects-allocations`, null);
  }
}

// TODO: move to a class
export class UtilRecord {
  empId: string;
  project: string;
  team: string;
  fromDate: string;
  toDate: string;
  value: number;
}
