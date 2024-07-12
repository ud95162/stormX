import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Profile } from 'app/_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.HEAD_COUNT_DB_WAR;
let httpOptions;

@Injectable({
  providedIn: 'root'
})

export class RecruitmentService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getHiredCadreTypeData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-hired-cadre-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-hired-cadre-year', httpOptions);
  }

  getInterviewTypeData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-interview-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-interview-year', httpOptions);
  }

  getAllRecruitmentByRoleData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-all-role-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-all-role-year', httpOptions);
  }

  getRecruitmentByRoleData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-role-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-role-year', httpOptions);
  }

  getRecruitmentByMonthData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-month-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-month-year', httpOptions);
  }

  getRecruitmentByProjectData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-project`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-project', httpOptions);
  }

  getEffectivenessOfRecruitmentSourcesData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-channel`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-channel', httpOptions);
  }

  getResourceRequestsData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-resource-requests`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-resource-requests', httpOptions);
  }

  getRecruitmentProgressData() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/grouped-by-progress`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-interview-year', httpOptions);
  }

  getRoleInsert() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/role`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-progress', httpOptions);
  }

  recruitmentForecastTableOneSave(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/recruitment/create-recruitment-forecast-recr-res`, payload, httpOptions);
  }

  getRecruitmentForecastDataTableOne() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/get-recruitment-forecast-recr-res`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/grouped-by-interview-year', httpOptions);
  }

  updateRecruitmentForecastTableOne(payload: any, id: any) {
    return this.http.put(`${BASE_URL}/${WAR}/recruitment/update-recruitment-forecast-recr-res/${id}`, payload, httpOptions);
  }

  deleteRecruitmentForecastTableOne(id: any) {
    return this.http.delete(`${BASE_URL}/${WAR}/recruitment/delete-recruitment-forecast-recr-res/${id}`, httpOptions);
  }

  recruitmentForecastTableTwoSave(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/recruitment/create-recruitment-forecast-month-range`, payload, httpOptions);
  }

  getRecruitmentForecastDataTableTwo() {
    return this.http.get(`${BASE_URL}/${WAR}/recruitment/get-recruitment-forecast-month-range`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/recruitment/get-recruitment-forecast-month-range', httpOptions);
  }

  updateRecruitmentForecastTableTwo(payload: any, id: any) {
    return this.http.put(`${BASE_URL}/${WAR}/recruitment/update-recruitment-forecast-month-range/${id}`, payload, httpOptions);
  }

  deleteRecruitmentForecastTableTwo(id: any) {
    return this.http.delete(`${BASE_URL}/${WAR}/recruitment/delete-recruitment-forecast-month-range/${id}`, httpOptions);
  }

}
