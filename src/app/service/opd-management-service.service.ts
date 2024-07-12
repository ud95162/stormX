import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../_global/profile';


let authorizationHttpOptions;

@Injectable({
  providedIn: 'root'
})
export class OpdManagementServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN,
      'Access-Control-Allow-Origin': '*'
    })
  };


  setHeaders(perm_code) {
    authorizationHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN,
        'PermCode': perm_code
      })
    };
  }

  constructor(private http: HttpClient) {
  }

  // letter-request
  // perm_code = OPDRequests
  fetchOPDTypes(perm_code: String) {
    this.setHeaders(perm_code);
    return this.http.get(`/OPD-request/admin-req-OPD/types`, authorizationHttpOptions);
  }

  // opd managemnet header
  fetchOPDRequestSummary(empNo: string, startDate: any, endDate: any, year: any, empID: any) {
    this.setHeaders('OPDSummary');
    if (startDate === null && endDate === null) {
      return this.http.get(`/OPD-request/admin-req-OPD/summary?year=${year}&empNO=${empID}`, authorizationHttpOptions);
    }
    if (year === null && empID === null) {
      return this.http.get(`/OPD-request/admin-req-OPD/summary?fromDate=${startDate}&toDate=${endDate}`, authorizationHttpOptions);
    }
  }

  fetchOPDRequestHeader(startDate: any, endDate: any, empID: any) {
    if (empID === 'All') {
      return this.http.get(`/OPD-request/admin-req-OPD/summary?fromDate=${startDate}&toDate=${endDate}`, this.httpOptions);
    } else {
      return this.http.get(`/OPD-request/admin-req-OPD/summary?fromDate=${startDate}&toDate=${endDate}&empNO=${empID}`, this.httpOptions);
    }
  }

  // opd-request
  fetchAllOPDRequest(empNo: string) {
    return this.http.get(`/OPD-request/admin-req-OPD/load`, this.httpOptions);
  }

  // opd-request
  // notilist - local individual
  fetchSpecificOPDRequest(OpdId: string, perm_code: string) {
    this.setHeaders(perm_code);
    return this.http.get(`/OPD-request/admin-req-OPD/load/${OpdId}`, authorizationHttpOptions);
  }

  // opd-request
  changeStatus(payload) {
    return this.http.post(`/OPD-request/admin-req-OPD/change-status`, payload, this.httpOptions);
  }

  // opd-request
  filterOpdRequestByDate(empNo: string, fromDate: string, toDate: string) {
    return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests-date/${empNo}/${fromDate}/${toDate}`, this.httpOptions);
  }

  // opd-request
  filterOPDRequestByStatus(year: any, empNo: string, status: string) {
    return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests-status/${year}/${empNo}/${status}`, this.httpOptions);
  }

  fetchOPDRequestByStatusAndDateRange(status: any, fromDate: any, toDate: any, empID: any, offset: any, limit: any) {
    if (empID === 'All') {
      if (status === 'All') {
        return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?from=${fromDate}&to=${toDate}&limit=${limit}&offSet=${offset}`, this.httpOptions);
      }
      return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?status=${status}&from=${fromDate}&to=${toDate}&limit=${limit}&offSet=${offset}`, this.httpOptions);
    } else {
      if (status === 'All') {
        return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?from=${fromDate}&to=${toDate}&empNO=${empID}&limit=${limit}&offSet=${offset}`, this.httpOptions);
      }
      return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?status=${status}&from=${fromDate}&to=${toDate}&empNO=${empID}&limit=${limit}&offSet=${offset}`, this.httpOptions);
    }
  }

  // noti-list
  fetchUserFacilityRequests(empNo: string, perm_code: string) {
    this.setHeaders(perm_code);
    return this.http.get(`/OPD-request/admin-req-OPD/user-load/${empNo}`, authorizationHttpOptions);
  }

  getOpdBalance(empNo: string, perm_code: string, year: any) {
    this.setHeaders(perm_code);
    return this.http.get(`/OPD-request/admin-req-OPD/getOpdBalance/${year}/${empNo}`, authorizationHttpOptions);
  }

  // perm_code = Ltter Request
  getCadre(empNo: string, perm_code: string) {
    this.setHeaders(perm_code);
    return this.http.get(`/OPD-request/admin-req-OPD/getCadre/${empNo}`, authorizationHttpOptions);
  }

  // perm_code = Ltter Request
  getMaritalStatus(empNo: string, perm_code: string) {
    this.setHeaders(perm_code);
    return this.http.get(`/OPD-request/admin-req-OPD/getMaritalStatus/${empNo}`, authorizationHttpOptions);
  }

  // filter opd requests
  fetchFilteredOpdRequests(empID: any, fromDate: any, toDate: any, status: any, permCode: any, year: any) {
    this.setHeaders(permCode);
    if (status === 'All') {
      // return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?empNO=${empID}&permCode=${permCode}&from=${fromDate}&to=${toDate}`, this.httpOptions);
      return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?empNO=${empID}&permCode=${permCode}&year=${year}`, authorizationHttpOptions);
    } else {
      // return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?empNO=${empID}&status=${status}&permCode=${permCode}&from=${fromDate}&to=${toDate}`, this.httpOptions);
      return this.http.get(`/OPD-request/admin-req-OPD/filter-opd-requests?empNO=${empID}&status=${status}&permCode=${permCode}&year=${year}`, authorizationHttpOptions);
    }
  }

  getOpdExceptionsData(designationID: any, year: any, offSet: number, limit: number) {
    if (Number(designationID) === 0) {
      return this.http.get(`/OPD-request/settings/opd-amounts-exceptions?year=${year}&offSet=${offSet}&limit=${limit}`, this.httpOptions);
    } else {
      return this.http.get(`/OPD-request/settings/opd-amounts-exceptions?year=${year}&offSet=${offSet}&limit=${limit}&designationID=${designationID}`, this.httpOptions);
    }
  }

  getOpdConfigurationDataWithMaritalStatus(year: any, offSet: number, limit: number) {
    return this.http.get(`/OPD-request/settings/opd-amounts?year=${year}&offSet=${offSet}&limit=${limit}`, this.httpOptions);
  }

  addNewOpdConfigurationWithMaritalStatus(payload: any) {
    return this.http.post(`/OPD-request/settings/opd-amounts`, payload, this.httpOptions);
  }

  editOpdConfigurationWithMaritalStatus(payload: any) {
    return this.http.put(`/OPD-request/settings/opd-amounts`, payload, this.httpOptions);
  }

  deleteOpdConfigurationWithMaritalStatus(id: any) {
    return this.http.delete(`/OPD-request/settings/opd-amounts/${id}`, this.httpOptions);
  }

  addOpdConfigurationsExceptionalData(payload: any) {
    return this.http.post(`/OPD-request/settings/opd-amounts-exceptions`, payload, this.httpOptions);
  }

  editOpdConfigurationsExceptionalData(payload: any) {
    return this.http.put(`/OPD-request/settings/opd-amounts-exceptions`, payload, this.httpOptions);
  }

  deleteOpdConfigurationsExceptionalData(id: any) {
    return this.http.delete(`/OPD-request/settings/opd-amounts-exceptions/${id}`, this.httpOptions);
  }

  updateEmployeeOPDDetails(payload: any) {
    return this.http.put(`/OPD-request/employee-opd/`, payload, this.httpOptions);
  }

}
