import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from 'app/_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class TransportServiceService {


  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }


  getTransportPreLoadData(){
    return this.http.get(`${BASE_URL}/${WAR}/transport/requests/pre-data`,httpOptions);
  }

  postTransportRequest(payLoad: any) {
    return this.http.post(`${BASE_URL}/${WAR}/transport/requests`, payLoad, httpOptions);
  }

  changeTransportRequestDepartureTime(inTime: any, departureTime: any){
    return this.http.get(`${BASE_URL}/${WAR}/transport/in-out/timeDifference?inTime=${inTime}&departureTime=${departureTime}`,httpOptions);
  }

  changeTransportRequestProject(projectId: any){
    return this.http.get(`${BASE_URL}/${WAR}/transport/project/supervisors?projectId=${projectId}`,httpOptions);
  }

  getPendingTransportRequest(){
    return this.http.get(`${BASE_URL}/${WAR}/transport/requests/admin`,httpOptions);
  }

  approveTransportRequest(payLoad:any){
    return this.http.put(`${BASE_URL}/${WAR}/transport/requests/approve-status`,payLoad,httpOptions);
  }

  getApprovedRequest(){
    return this.http.get(`${BASE_URL}/${WAR}/transport/requests/front-desk`,httpOptions);
  }

  getTransportRequestStatus(){
    return this.http.get(`${BASE_URL}/${WAR}/transport/request/status`,httpOptions);
  }

  getCheckedStatus(payLoad:any){
    return this.http.put(`${BASE_URL}/${WAR}/transport/requests/check-status`,payLoad,httpOptions);
  }

  getLoggedEmployeeTransportHistory( startDate: string, endDate: string ) {
    return this.http.get(`${BASE_URL}/${WAR}/transport/requests/user?fromDate=${startDate}&toDate=${endDate}`, httpOptions);
  }

  getAllTaxiRequests( startDate: string, endDate: string ) {
    return this.http.get( `${BASE_URL}/${WAR}/transport/requests/all?fromDate=${startDate}&toDate=${endDate}`, httpOptions );
  }

  getTaxiRequestsSummary( startDate: string, endDate: string ) {
    return this.http.get( `${BASE_URL}/${WAR}/transport/requests/summary?fromDate=${startDate}&toDate=${endDate}`, httpOptions );
  }

  deleteTaxiRequest( requestID: number, taxiRequest: any ){
    return this.http.put( `${BASE_URL}/${WAR}/transport/requests/${requestID}/user-cancel`, taxiRequest, httpOptions);
  }

}
