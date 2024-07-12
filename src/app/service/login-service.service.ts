import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const  APPRAISAL_WAR = 'appraisal';

@Injectable()
export class LoginServiceService {
  timestamp = new Date();
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'loginTimeStamp': this.timestamp.toString(),
      'loginTimeZone': this.timezone
    })
  };

  constructor(private http: HttpClient) {
    console.log(this.timestamp);
    console.log(this.timezone);
  }

  // Login Data get
  loadAuthLoginData() {
    return this.http.get(`${BASE_URL}/${WAR}/user/token`, this.httpOptions);
  }

  // Logout
  logoutUser() {
    return this.http.get(`${BASE_URL}/${WAR}/logouts`);
  }

  // check token
  checkTokenStatus() {
    return this.http.get(`${BASE_URL}/${WAR}/user/checkauthenticated`);
  }

  // Login Header
  loadLoginData(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/load/${empID}`);
  }

  // Permission views
  loadPermissionViews() {
    return this.http.get(`${BASE_URL}/${WAR}/permission/frontend`);
  }

  getApplicationPermission() {
    return this.http.get(`${BASE_URL}/${WAR}/permission/on-user-login`);
  }

  savedemovisitor(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/ddc-visitor`, payload, this.httpOptions);
  }


  getPerformanceAppraisalPermission(){
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/nav-bar-permission`);
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/permTree.json");
  }

}
