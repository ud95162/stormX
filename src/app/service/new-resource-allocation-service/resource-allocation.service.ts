import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../../_global/profile';
import {environment} from '../../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = 'new-kriyo-resource-allocation';

const MAIN_URL = BASE_URL + '/' + WAR;

@Injectable({
  providedIn: 'root'
})
export class ResourceAllocationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };

  constructor(private http: HttpClient) {
  }


  getResourceRequests(allocationPercentage: any, cadreId: any, designationId: any, empProfileId: any, projectId: any,
                      startDate: any, endDate: any, priority: any, status: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${MAIN_URL}/resource-request/get-requests?allocationPercentage=${allocationPercentage}&cadreId=${cadreId}&designationId=${designationId}&empProfileId=${empProfileId}&endDate=${endDate}&priority=${priority}&projectId=${projectId}&startDate=${startDate}&status=${status}`, this.httpOptions);
  }

  getAssignedResourceRequests(allocationPercentage: any, cadreId: any, designationId: any, empProfileId: any, projectId: any,
                              startDate: any, endDate: any, priority: any, status: any, deptId: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${MAIN_URL}/resource-request/get-assigned-requests?allocationPercentage=${allocationPercentage}&cadreId=${cadreId}&departmentId=${deptId}&designationId=${designationId}&empProfileId=${empProfileId}&endDate=${endDate}&priority=${priority}&projectId=${projectId}&startDate=${startDate}&status=${status}`, this.httpOptions);
  }

  getResourceRequestById(id: any) {
    return this.http.get(`${MAIN_URL}/resource-request/get-requests-by-id?request-id=${id}`, this.httpOptions);
  }

  saveResourceRequest(payload: any) {
    return this.http.post(`${MAIN_URL}/resource-request/save-request`, payload, this.httpOptions);
  }

  updateResourceRequestStatus(payload: any) {
    return this.http.put(`${MAIN_URL}/resource-request/update-status`, payload, this.httpOptions);
  }

  deleteResourceRequest(requestId: any, comment: any) {
    return this.http.delete(`${MAIN_URL}/resource-request/delete-request?comment=${comment}&requestId=${requestId}`, this.httpOptions);
  }

  // Get Employees with their allocation to projects

  getEmployeesAllocationSummary(allocationDate: any, allocationPercentage: any, designationId: any, empProfileId: any, empName: any, projectId: any, companyId: any, cadreId: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${MAIN_URL}/employee-request/get-employee-allocations/summary?allocation-date=${allocationDate}&allocation_percentage=${allocationPercentage}&designation_id=${designationId}&emp_profile_id=${empProfileId}&emp_name=${empName}&project_id=${projectId}&company_id=${companyId}&cadre_id=${cadreId}`, this.httpOptions);
  }

  getEmployeesAllocations(startDate: any, endDate: any, empProfileId: any) {
    if (startDate === '' && endDate === '') {
      return this.http.get(`${MAIN_URL}/employee-request/get-employee-allocations?emp_profile_id=${empProfileId}`, this.httpOptions);
    } else {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${MAIN_URL}/employee-request/get-employee-allocations?emp_profile_id=${empProfileId}&end_date=${endDate}&start_date=${startDate}`, this.httpOptions);
    }
  }

  changeEmployeeAllocations(allocationId: any, payload: any) {
    return this.http.put(`${MAIN_URL}/employee-request/change-employee-allocation/${allocationId}`, payload, this.httpOptions);
  }

  removeEmployeeAllocations(allocationId: any) {
    return this.http.put(`${MAIN_URL}/employee-request/remove-employee-allocation/${allocationId}`, this.httpOptions);
  }

  getResourceRequestHistory(requestId: any) {
    return this.http.get(`${MAIN_URL}/request-history/get-request-history?request-id=${requestId}`, this.httpOptions);
  }

  getBestMatchEmployees(availablePercentage: any, designationId: any, cadreId: any, companyId: any, startDate: any, endDate: any, empName: any, empProfileId: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${MAIN_URL}/employee-request/get-best-match?available_percentage=${availablePercentage}&cadre_id=${cadreId}&company_id=${companyId}&designation_id=${designationId}&effectiveFrom=${startDate}&effectiveTo=${endDate}&emp_name=${empName}&emp_profile_id=${empProfileId}`, this.httpOptions);
  }

  getRequestByEmployee(emp: any) {
    return this.http.get(`${MAIN_URL}/resource-request/get-requests-by-employee?emp-profile-id=${emp}`, this.httpOptions);
  }

  getResourceHeaderData() {
    return this.http.get(`${MAIN_URL}/resource-request-header/get-header-data`, this.httpOptions);
  }

  getResourceAllocationUsers(empNo: any, empType: any) {
    return this.http.get(`${MAIN_URL}/resource-users/get-users?emp-no=${empNo}&emp-type=${empType}`, this.httpOptions);
  }

  saveResourceAllocationUsers(payload: any, group: any) {
    if (group === '') {
      return this.http.post(`${MAIN_URL}/resource-users/save-users`, payload, this.httpOptions);
    } else {
      return this.http.post(`${MAIN_URL}/resource-users/save-users?group=${group}`, payload, this.httpOptions);
    }
  }

  deleteResourceAllocationUser(id: any) {
    return this.http.delete(`${MAIN_URL}/resource-users/remove-users/${id}`, this.httpOptions);
  }

  saveResourceAllocationComments(payload: any) {
    return this.http.post(`${MAIN_URL}/request-history/save-comment`, payload, this.httpOptions);

  }

  changeDefaultUser(payload: any) {
    return this.http.put(`${MAIN_URL}/resource-users/change-default-user`, payload, this.httpOptions);
  }

  getUsersByDepartment(deptId: any) {
    return this.http.get(`${MAIN_URL}/resource-users/get-dept-users?dept-id${deptId}`, this.httpOptions);
  }

  getEmployeeSkills(empProfileId: any) {
    return this.http.get(`${MAIN_URL}/employee-request/get-employee-skills/${empProfileId}`, this.httpOptions);
  }

  getProjectMangersAndCoordinators(projectId: any){
    return this.http.get(`${MAIN_URL}/resource-users/get-pms-and-pcs?project-id=${projectId}`, this.httpOptions);
  }

}
