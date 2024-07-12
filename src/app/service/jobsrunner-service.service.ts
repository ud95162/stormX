import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const WEB_TRACKER_WAR = environment.WEB_TRACKER_API_WAR;
const LEAVE_WAR = 'jobsrunner';

@Injectable({
  providedIn: 'root'
})
export class JobsrunnerServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }


  getAttendanceDeviceStatus(date: any) {
    return this.http.get(`${BASE_URL}/jobsrunner/attendance-sync/devices/status?date=${date}`, this.httpOptions);
  }


}
