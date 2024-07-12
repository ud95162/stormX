import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class DashboardOverallDataServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getSkills() {
    return this.http.get(`${BASE_URL}/${WAR}/skill/load`);
  }

  getProjects() {
    return this.http.get(`${BASE_URL}/${WAR}/project/distribution`);
  }

  getAdminDashboard(graph) {
    return this.http.get(`${BASE_URL}/${WAR}/dashboard/graph/${graph}`);
  }

  /*---------------------------------------------------
   GRAPHS
   ---------------------------------------------------*/
  getDesignations() {
    return this.http.get(`${BASE_URL}/${WAR}/designation/load`, this.httpOptions);
  }

  getGenderData() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/gender/load`, this.httpOptions);
  }

  getGenderAgeData() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/gender/age`, this.httpOptions);
  }

  getEmpCadre() {
    return this.http.get(`${BASE_URL}/${WAR}/cadre`, this.httpOptions);
  }

  getEmpCadreLoad() {
    return this.http.get(`${BASE_URL}/${WAR}/cadre/load`, this.httpOptions);
  }

  getEmpCadreRecruitment() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/load`, this.httpOptions);
  }

  getDegreeClassesData() {
    return this.http.get(`${BASE_URL}/${WAR}/degree/classes`, this.httpOptions);
  }

  getUniTypesData() {
    return this.http.get(`${BASE_URL}/${WAR}/degree/university`, this.httpOptions);
  }

  getDegreeClassificationData() {
    return this.http.get(`${BASE_URL}/${WAR}/degree/classification`, this.httpOptions);
  }

  getYearsWithCGData() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/years`, this.httpOptions);
  }

  getResignationTypeData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/group/type`, this.httpOptions);
  }

  getResignationDesignationData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/group/designation`, this.httpOptions);
  }
}
