import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class NotificationServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getNotificationsOnHeader(empID: string, offsetCount: number) {
    return this.http.get(`${BASE_URL}/${WAR}/notification/load/header-notifications/${empID}/${offsetCount}`);
  }

  getNotifications(empID: string, offsetCount: number) {
    return this.http.get(`${BASE_URL}/${WAR}/notification/load/${empID}/${offsetCount}`);
  }


  getRequests(empID: string, offsetCount: number) {
    return this.http.get(`${BASE_URL}/${WAR}/notification/load/request_notifications/${empID}/${offsetCount}`);
  }

  getNotificationMaxOffset(empID: string, type: string) {
    return this.http.get(`${BASE_URL}/${WAR}/notification/offsetcount/${empID}/${type}`);
  }

  getFeedNotifications() {
    return this.http.get(`${BASE_URL}/${WAR}/notification/feed-notifications`);
  }

  readNotification(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/notification/read`, payload, this.httpOptions);
  }

  readAllNotifications(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/notification/read/all`, payload, this.httpOptions);
  }

  getBirthdays(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/birthday/${empID}`);
  }

  getEvents() {
    return this.http.get(`${BASE_URL}/${WAR}/event/load/all`);
  }

  notificationRequestAccept(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/skill/request/acknowledgement`, payload, this.httpOptions);
  }
}
