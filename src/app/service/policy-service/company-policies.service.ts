import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Profile} from "../../_global/profile";
import {environment} from "../../../environments/environment";
let httpOptions;
const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class CompanyPoliciesService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getCompanyPolicyCategories() {
    return this.http.get(`${BASE_URL}/${WAR}/policies/categories`, httpOptions);
  }

  getCompanyPolicyDetails(category: any, searchName) {
    if (Number(category) === 0) {
      if (searchName === '') {
        return this.http.get(`${BASE_URL}/${WAR}/policies`, httpOptions);
      } else {
        return this.http.get(`${BASE_URL}/${WAR}/policies?name=${searchName}`, httpOptions);
      }
    } else {
      if (searchName === '') {
        return this.http.get(`${BASE_URL}/${WAR}/policies?categoryID=${category}`, httpOptions);
      } else {
        return this.http.get(`${BASE_URL}/${WAR}/policies?name=${searchName}&categoryID=${category}`, httpOptions);
      }
    }
  }

  addNewPolicy(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/policies`, payload, httpOptions);
  }

  editPolicy(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/policies`, payload, httpOptions);
  }

  updatePublishedFile(payload) {
    return this.http.put(`${BASE_URL}/${WAR}/policies/file`, payload, httpOptions);
  }

  updatePublishedVersion(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/policies/publish`, payload, httpOptions);
  }

  addNewVersionToPolicy(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/policies/version`, payload, httpOptions);
  }

  deletePolicy(payload) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN,
        'PermCode': ''
      }),
      body: payload,
    };
    return this.http.request('delete', `${BASE_URL}/${WAR}/policies`, options);
  }

  acknowledgePolicy(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/policies/acknowledge`, payload, httpOptions);
  }

  getSelectedPolicyAcknowledgedUsers(id: any) {
    return this.http.get(`${BASE_URL}/${WAR}/policies/${id}/ack-employees`, httpOptions);
  }
}
