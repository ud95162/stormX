import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Profile} from '../_global/profile';

@Injectable({
  providedIn: 'root'
})
export class IssueLetterServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN,
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {
  }

  // Fetch the letter request
  fetchAllLetterRequest(empNo: string) {
    //return this.http.get(`http://127.0.0.1:8080/admin-issue/letter-requests/${empNo}`,this.httpOptions);
    return this.http.get(`/issue-letter/admin-issue/letter-requests/${empNo}`,this.httpOptions);
  }

  fetchLetterNameById(id: number) {
    return this.http.get(`/issue-letter/admin-issue/letter-type/${id}`,this.httpOptions);
  }

  // Fetch letter request from request id

  // Fetch employee ids for letter template
  fetchEmployeeIdsFromLetterType(id: number) {
    return this.http.get(`/issue-letter/admin-issue/employee-ids/${id}`,this.httpOptions);
  }

  // Fetch the Letter template by permission


  // Fetch letter Types
  fetchLetterTypesByPermision(empNo: string) {
    return this.http.get(`/issue-letter/admin-issue/letter-types/${empNo}`,this.httpOptions);
  }

  // Fetch request count
  fetchRequestCountByStatusName(status: string, empNo: string) {
    return this.http.get(`/issue-letter/admin-issue/request-count/${status}/${empNo}`,this.httpOptions);
  }

  // Update the letter
  putSaveLetter(payload) {
    return this.http.post(`/issue-letter/admin-issue/save-letter`, payload,this.httpOptions);
  }

  // Fetch saved letter by Id
  fetchSavedLetterById(letterid: number) {
    return this.http.get(`/issue-letter/admin-issue/load-letter/${letterid}`,this.httpOptions);
  }

  // Change status of letter
  changeLetterStatus(letterId: number, statusId: number, creatorEmpNo: string) {
    return this.http.get(`/issue-letter/admin-issue/change-status/${letterId}/${statusId}/${creatorEmpNo}`,this.httpOptions);
  }

  fetchPrintedReadyAndCompletedLetterRequest(empNo: string) {
    return this.http.get(`/issue-letter/admin-issue/load-request-ready-completed/${empNo}`,this.httpOptions);
  }

  fetchLetterTemplateByPermission(permission: string) {
    return this.http.get(`/issue-letter/admin-issue/letter-template/${permission}`,this.httpOptions);
  }

  //fetch employee letter request
  fetchSpecificEmployeesLetterRequests(empNo: string){
    return this.http.get(`/issue-letter/admin-issue/user-letter-requests/${empNo}`,this.httpOptions);
  }

  deleteRequestByLetterId(letterId: string) {
    return this.http.delete(`/issue-letter/admin-issue/letter-requests/${letterId}`,this.httpOptions);
  }

  filterLetterRequestByDate (empNo: string, fromDate: string, toDate: string) {
    return this.http.get(`/issue-letter/admin-issue/filter-letter-requests-date/${empNo}/${fromDate}/${toDate}`,this.httpOptions);
  }
  filterLetterRequestByStatus (empNo: string, status: string) {
    return this.http.get(`/issue-letter/admin-issue/filter-letter-requests-status/${empNo}/${status}`,this.httpOptions);
  }

  fetchSubLetterTypes(permission: string, superLetterId: number){
    return this.http.get(`/issue-letter/admin-issue/sub-letter-template/${permission}/${superLetterId}`,this.httpOptions);
  }

  fetchEmployeeLetterRequests(fromDate: any, toDate: any, status: any, empID: any, loggedInEmpID: any, requestingFrom: any) {
    if (status === 'All') {
      return this.http.get(`/issue-letter/admin-issue/filter-letter-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}`, this.httpOptions);
    } else {
      return this.http.get(`/issue-letter/admin-issue/filter-letter-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&status=${status}`, this.httpOptions);
    }
  }

  fetchLetterRequestCounts(requestingFrom: any, loggedInEmpID: any) {
    return this.http.get(`/issue-letter/admin-issue/request-count?requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}`, this.httpOptions);
  }

  filterLetterRequests(status: any, fromDate: any, toDate: any, empID: any, loggedInEmpID: any, requestingFrom: any) {
    if (empID === 'All') {
      if (status === 'All') {
        return this.http.get(`/issue-letter/admin-issue/filter-letter-requests?from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}`, this.httpOptions);
      }
      return this.http.get(`/issue-letter/admin-issue/filter-letter-requests?from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&status=${status}`, this.httpOptions);
    } else {
      if (status === 'All') {
        return this.http.get(`/issue-letter/admin-issue/filter-letter-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}`, this.httpOptions);
      }
      return this.http.get(`/issue-letter/admin-issue/filter-letter-requests?empNO=${empID}&from=${fromDate}&to=${toDate}&requestingFrom=${requestingFrom}&loggedInEmpNO=${loggedInEmpID}&status=${status}`, this.httpOptions);
    }
  }
}
