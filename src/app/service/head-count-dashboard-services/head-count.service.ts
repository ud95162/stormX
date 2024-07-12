import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from 'app/_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.HEAD_COUNT_DB_WAR;
let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class HeadCountService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getEmployeeGrowthBasedOnCompanyData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-company-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-company-year', httpOptions);
  }

  getCodegenGrowthBasedOnRoleData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-role-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-role-year', httpOptions);
  }

  getHeadCountExcludingTraineesData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-excluding-trainees-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-excluding-trainees-year', httpOptions);
  }

  getHeadCountIncludingTraineesData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-including-trainees-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-including-trainees-year', httpOptions);
  }

  getHeadCountByTBXProjectCodeData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-tbx-project-code-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-tbx-project-code-year', httpOptions);
  }

  getHeadCountByTBXInvestmentProjectCodeData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-tbx-investment-project-code-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-tbx-investment-project-code-year', httpOptions);
  }

  getHeadCountByNonTBXProjectCodeData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-non-tbx-project-code-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-non-tbx-project-code-year', httpOptions);
  }

  getHeadCountByOtherProjectCodeData() {
    return this.http.get(`${BASE_URL}/${WAR}/headcount/grouped-by-other-project-code-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/headcount/grouped-by-other-project-code-year', httpOptions);
  }

}
