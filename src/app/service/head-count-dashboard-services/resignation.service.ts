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
export class ResignationService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getRecruitmentVsResignationData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-recruitment-resignation-month-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-recruitment-resignation-month-year', httpOptions);
  }

  getResignationBreakdownData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-month-year`, httpOptions);
     //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-month-year', httpOptions);
  }

  getTurnoverBasedOnPerformanceTypeData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-performance-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-performance-year', httpOptions);
  }

  getTurnoverBasedOnExperienceData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-experience-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-experience-year', httpOptions);
  }

  getResignationGenderCountBasedOnExperienceData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-gender-experience-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-gender-experience-year', httpOptions);
  }

  getTurnoverBasedOnResignationTypeData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-resignation-type-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-resignation-type-year', httpOptions);
  }

  getResignationByProjectCodeData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-project-year`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignationgrouped-by-project-year', httpOptions);
  }

  getInternationalTravelData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-international-travel`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-international-travel', httpOptions);
  }

  getInternationalTravelProjectWiseData() {
    return this.http.get(`${BASE_URL}/${WAR}/resignation/grouped-by-international-travel-projectwise`, httpOptions);
    //return this.http.get('http://119.235.9.12:7070/head-count-db/resignation/grouped-by-international-travel-projectwise', httpOptions);
  }
}
