import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = 'face-rec-attendance';
const CODEGEN_WAR = environment.API_WAR;
const TRACKER_WAR = 'kriyo-work-from-home';
// let httpOptions;


@Injectable({
  providedIn: 'root'
})
export class FaceRecAttendanceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAttendanceDataForSelectDate(currentDate: string) {
    return this.http.get(`${BASE_URL}/${WAR}/faceRecAttendance/attendance-data/` + currentDate , this.httpOptions);
    // return this.http.get(`http://119.235.9.12:7070/${WAR}/faceRecAttendance/attendance-data/` + currentDate , this.httpOptions);
  }

  getAttendanceDataForSelectEmployee(currentDate: string, empNo: string) {
    // return this.http.get(`${BASE_URL}/${WAR}/faceRecAttendance/attendance-data/` + currentDate , this.httpOptions);
    // return this.http.get
    // (`http://119.235.9.12:7070/${WAR}/faceRecAttendance/attendance-data-for-selected-employee/` + currentDate + empNo, this.httpOptions);
  }


}
