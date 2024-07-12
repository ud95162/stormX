import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Profile} from "app/_global/profile";
import {environment} from "../../environments/environment";

const BASE_URL = environment.API_PATH;
let httpOptions;

@Injectable({
  providedIn: 'root'
})

export class FacilityManagementServiceService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };

  }


  fetchFaciityTypes() {
    return this.http.get(`/facility-request/admin-req-facility/types`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/types`,httpOptions);
  }

  fetchFaciityVenues() {
    return this.http.get(`/facility-request/admin-req-facility/venues`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/venues`,httpOptions);
  }
  fetchFaciityRequestSummary(empNo: string, requestingFrom: string) {
    return this.http.get(`/facility-request/admin-req-facility/summary?loggedInEmpNO=${empNo}&requestingFrom=${requestingFrom}`, httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/summary/${empNo}`,httpOptions);
  }
  fetchAllFacilityRequests(empNo: string) {
    return this.http.get(`/facility-request/admin-req-facility/load/${empNo}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/load/${empNo}`,httpOptions);
  }
  fetchSpecificFacilityRequests(empNo: string, facilityId: string) {
    return this.http.get(`/facility-request/admin-req-facility/load/${facilityId}/${empNo}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/load/${facilityId}/${empNo}`,httpOptions);
  }

  fetchEmployeesForEachType(empNo: string) {
    return this.http.get(`/facility-request/admin-req-facility/assign-employee-list/${empNo}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/${empNo}`,httpOptions);
  }


  assignEmployee(payload) {
   return this.http.post(`/facility-request/admin-req-facility/assign-employee`, payload,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/assign-employee`,httpOptions);
  }

  changeStatus(payload) {
    return this.http.post(`/facility-request/admin-req-facility/change-status`, payload,httpOptions);
    // return this.http.post(`http://localhost:8081/admin-req-facility/change-status`, payload, httpOptions);
  }

  fetchUserFacilityRequests(empNo: string) {
    return this.http.get(`/facility-request/admin-req-facility/user-load/${empNo}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/user-load/${empNo}`,httpOptions);
  }

  deleteUserFacilityRequests(facilityId: string) {
    return this.http.get(`/facility-request/admin-req-facility/delete-request/${facilityId}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/delete-request/${facilityId}`,httpOptions);
  }

  saveFeedback(payload) {
    return this.http.post(`/facility-request/admin-req-facility/save-feedback`, payload,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/save-feedback`,httpOptions);
  }
  filterLetterRequestByDate (empNo: string, fromDate: string, toDate: string) {
    return this.http.get(`/facility-request/admin-req-facility/filter-facility-requests-date/${empNo}/${fromDate}/${toDate}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/filter-facility-requests-date/${empNo}/${fromDate}/${toDate}`,httpOptions);
  }
  filterLetterRequestByStatus (empNo: string, status: string) {
    return this.http.get(`/facility-request/admin-req-facility/filter-facility-requests-status/${empNo}/${status}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/filter-facility-requests-status/${empNo}/${status}`,httpOptions);
  }

  fetchAssignedUserFacilityRequests(empNo: string) {
    return this.http.get(`/facility-request/admin-req-facility/assigned-user-load/${empNo}`,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/assigned-user-load/${empNo}`,httpOptions);
  }
  saveExtendRequest(payload) {
    return this.http.post(`/facility-request/admin-req-facility/extend-request`, payload,httpOptions);
    // return this.http.post(`http://localhost:8081/admin-req-facility/extend-request`, payload, httpOptions);
  }

  respondToRequest(payload) {
    return this.http.post(`/facility-request/admin-req-facility/extend-request-response`, payload,httpOptions);
    //return this.http.get(`http://localhost:8081/admin-req-facility/extend-request-response`,httpOptions);
  }

  fetchFacilityRequestData(empID: any, fromDate: any, toDate: any, requestingFrom: any, loggedInEmpID: any) {
    return this.http.get(`/facility-request/admin-req-facility/summary?empNO=${empID}&requestingFrom=${requestingFrom}&fromDate=${fromDate}&toDate=${toDate}&loggedInEmpNO=${loggedInEmpID}`, httpOptions);
  }

  fetchEmployeeFacilityRequests(status: any, fromDate: any, toDate: any, empID: any, loggedInEmpID: any, requestingFrom: any) {
    if (status === 'All') {
      return this.http.get(`/facility-request/admin-req-facility/filter-facility-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&limit=100000&offSet=0`, httpOptions);
    } else {
      return this.http.get(`/facility-request/admin-req-facility/filter-facility-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&status=${status}&limit=100000&offSet=0`, httpOptions);
    }
  }

  filterFacilityRequests(status: any, fromDate: any, toDate: any, empID: any, loggedInEmpID: any, requestingFrom: any, limit: any, offSet: any) {
    if (empID === 'All') {
      return this.http.get(`/facility-request/admin-req-facility/filter-facility-requests?from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&status=${status}&limit=${limit}&offSet=${offSet}`, httpOptions);
    } else {
      return this.http.get(`/facility-request/admin-req-facility/filter-facility-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&status=${status}&limit=${limit}&offSet=${offSet}`, httpOptions);
    }
  }

}
