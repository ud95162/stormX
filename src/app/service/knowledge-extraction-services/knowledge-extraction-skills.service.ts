import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {delay, map, retry} from 'rxjs/internal/operators';
import {Profile} from "../../_global/profile";

// const BASE_URL = environment.KG_IMPL_PYTHON_API;
const BASE_URL = environment.API_PATH;
const WAR = environment.KG_WAR;

@Injectable({
  providedIn: 'root'
})
export class KnowledgeExtractionSkillsService {
  private serverData: JSON;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
    })
  };
  constructor(private http: HttpClient) {

  }


  getSkillDataById(employeeId): Observable<any> {
    // const url = BASE_URL + '/getDataById/' + employeeId ;
    // return this.http.get<any>(url);

    //return this.http.post(`http://localhost:8080/skills-graph/getDataById`, employeeId,this.httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/skills-graph/getDataById`, employeeId,this.httpOptions);
  }

  getSkillData():Observable<any> {
    // const url = BASE_URL + '/getData';
    //return this.http.get<any>(`http://localhost:8080/skills-graph/getData`,this.httpOptions);
    return this.http.get<any>(`${BASE_URL}/${WAR}/skills-graph/getData`,this.httpOptions);
  }

  getEmpDetails(){
    // const url = BASE_URL + '/getDataProject';
    //return this.http.get<any>(`http://localhost:8080/skills-graph/getProjectDetails`,this.httpOptions);
    return this.http.get<any>(`${BASE_URL}/${WAR}/skills-graph/getProjectDetails`,this.httpOptions);
  }




}
