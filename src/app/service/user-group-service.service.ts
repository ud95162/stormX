import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class UserGroupServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  saveUserGroup(group: any) {
    return this.http.post(`${BASE_URL}/${WAR}/employee-group`, group, this.httpOptions);
  }

  getAllUserGroups() {
    return this.http.get(`${BASE_URL}/${WAR}/employee-group/all-groups-categorized`);
  }

  getAllUserGroupsAsTree() {
    return this.http.get(`${BASE_URL}/${WAR}/employee-group/all-groups-as-tree`);
  }

  getSystemDefinedUserGroups() {
    return this.http.get(`${BASE_URL}/${WAR}/employee-group/sys-defined-employee-groups`);
  }

  getPermissionAllowedUserGroups() {
    return this.http.get(`${BASE_URL}/${WAR}/employee-group/permission-grantable-groups`);
  }

  getUserGroupForUserById(empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee-group/${empNo}`);
  }

  getUserGroupTypes() {
    return this.http.get(`${BASE_URL}/${WAR}/employee-group/types`);
  }
}
