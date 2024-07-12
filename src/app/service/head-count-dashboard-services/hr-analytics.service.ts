import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Profile} from "../../_global/profile";
import {
  AttritionFilters
} from "../../body/ess/home/home-main/home-body/home-tab-content/hr-analytics/hr-analytics-main/AttritionFilters";


const BASE_URL = environment.API_PATH;
const WAR = environment.HEAD_COUNT_DB_WAR;
let httpOptions;
@Injectable({
  providedIn: 'root'
})
export class HrAnalyticsService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getCompanyWiseEmployeeCountSummary() {
    return this.http.get(`${BASE_URL}/${WAR}/attrition/summary/employees`, httpOptions);
  }

  getEmployeeRecruitmentAndResignationSummary(payload: AttritionFilters) {
    return this.http.post(`${BASE_URL}/${WAR}/attrition/recruitments-resignation/employees`, payload, httpOptions);
  }

  getEmployeeHeadGrowthAndTurnOverSummary(payload: AttritionFilters) {
    return this.http.post(`${BASE_URL}/${WAR}/attrition/head-growth-vs-turnover/employees`, payload, httpOptions);
  }

  getDepartmentWiseEmployeeSummary(payload: AttritionFilters) {
    return this.http.post(`${BASE_URL}/${WAR}/attrition/summary/employees/departments`, payload, httpOptions);
  }

  getResignEmployeesExperienceSummary(payload: AttritionFilters) {
    return this.http.post(`${BASE_URL}/${WAR}/attrition/exp-wise-resignation-summary`, payload, httpOptions);
  }

}
