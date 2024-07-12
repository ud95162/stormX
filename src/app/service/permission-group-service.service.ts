import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class PermissionGroupServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDefaultPermissionObject() {
    return this.http.get(`${BASE_URL}/${WAR}/permission/initial-object`);
  }

  getCustomPermissionObject(permissionName: string) {
    return this.http.get(`${BASE_URL}/${WAR}/permission/permission-group?permissionGroupName=${permissionName}`);
  }

  getExistingPermissionGroups() {
    return this.http.get(`${BASE_URL}/${WAR}/permission/permission-group-basic-data`);
  }

  savePermissionGroup(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/permission/permission-group`, payload, this.httpOptions);
  }

  editPermissionGroup(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/permission/permission-group`, payload, this.httpOptions);
  }

  savePermissionGroupsToUserGroup(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/permission/usergroup/assignment?granting=true`, payload, this.httpOptions);
  }

  deletePermissionGroup(permissionGroupId: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/permission//permission-group/` + permissionGroupId);
  }
}
