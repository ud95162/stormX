import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = 'appraisal';
const CODEGEN_WAR = 'codegen';
let httpOptions;
let httpOptions2;

@Injectable({
  providedIn: 'root'
})
export class AppraisalServiceService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN,
        'PermCode': ''
      })
    };
  }

  setHeaders(perm_code) {
    httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN,
        'PermCode': perm_code
      })
    };
  }

  getAppraisalCustomPermissions(employeeNo) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/permissions?empNo=${employeeNo}&year=2019`, httpOptions);
  }

  getLatestAppraisalCustomPermissions(employeeNo, perm_code) {
    this.setHeaders(perm_code);
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/permission?empNo=${employeeNo}`, httpOptions2);
  }

  getAppraisalYearWiseCustomSideBarPermissions(employeeNo) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/permission/year-wise?empNo=${employeeNo}`, httpOptions);
  }

  getAppraisalCustomSideBarPermissions(employeeNo,year) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/permissions?empNo=${employeeNo}&year=${year}`, httpOptions);
  }

  getPerformanceAppraisalForm(employeeNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/data?empNo=${employeeNo}&year=2019`, httpOptions);
  }

  getEmployeeDetails(employeeNo: string) {
    // return this.http.get(`http://localhost:8080/appraisal/employeeDetails?empNo=${employeeNo}`, httpOptions);
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/employeeDetails?empNo=${employeeNo}`, httpOptions);
  }

  getProjectName(employeeNo: string) {
    // return this.http.get(`http://localhost:8080/appraisal/teamName?empNo=${employeeNo}`, httpOptions);
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/teamName?empNo=${employeeNo}`, httpOptions);
  }

  getSupervisors(employeeNo: string, supENo: string, year: string, version : string) {
    // return this.http.get(`http://localhost:8080/appraisal/supervisors?empNo=${employeeNo}&supENo=${supENo}&year=${year}&version=${version}`, httpOptions);
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/supervisors?empNo=${employeeNo}&supENo=${supENo}&year=${year}&version=${version}`, httpOptions);
  }

  getCellIds(employeeNo: string, supENo: string,year: string, version : string) {
    // return this.http.get(`http://localhost:8080/supervisor/cellId?empNo=${employeeNo}&supervisorEmpNo=${supENo}&year=${year}&version=${version}`, httpOptions);
    return this.http.get(`${BASE_URL}/${WAR}/supervisor/cellId?empNo=${employeeNo}&supervisorEmpNo=${supENo}&year=${year}&version=${version}`, httpOptions);
  }

  getSelfAppraisalForm(employeeNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/load/2019/${employeeNo}`, httpOptions);
  }

  getAppraisees(employeeNo) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/my-appraisee/${employeeNo}`, httpOptions);
  }

  getLatestAppraisees(employeeNo,year) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/my-appraisee/2020-onwards/${employeeNo}/${year}`, httpOptions);
  }

  getAppraisalNotification() {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/notification/2019`, httpOptions);
  }

  getAppraisalFormSubmissions() {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/last-uploader_detail`, httpOptions);
  }

  getAppraisalAppraisersNotes(employeeNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/meeting-comments?empNo=${employeeNo}&year=2019`, httpOptions);
  }

  putPerformanceAppraisalForm(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/appraisal/data`, payload, httpOptions);
  }

  putSelfAppraisalForm(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/feedback/save`, payload, httpOptions);
  }

  postSetExpiryDateWhenExcelUpload(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/feedback/setup`, payload, httpOptions);
  }

  postPerformanceAppraisalAppraiserSignoff(payload: any, appraiserId: number) {
    return this.http.post(`${BASE_URL}/${WAR}/appraisal/sign-off?id=${appraiserId}`, payload, httpOptions);
  }

  putAppraisalAppraisersNotes(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/appraisal/meeting-comments`, payload, httpOptions);
  }

  postPerformanceAppraisalAppraiseeAcknowledgement(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/appraisal/acknowledge`, payload, httpOptions);
  }

  getLatestAppraisalAppraisersNotes(employeeNo: string,year:string) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/meeting-comments/2020-onwards?empNo=${employeeNo}&year=${year}`, httpOptions);
  }

  postLatestAppraisalAppraisersNotes(payload: any,employeeNo: string,year:string) {
    return this.http.post(`${BASE_URL}/${WAR}/appraisal/meeting-comments/2020-onwards?empNo=${employeeNo}&year=${year}`, payload, httpOptions);
  }

  getEmployeeCategoryForyear(employeeId: any, year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/employee-designation-category/${employeeId}/${year}`, httpOptions);
  }

  putSupervisorData(empNo: string, supervisorEmpNo: string, year: string, version : string, cellId: number) {
    // return this.http.post(`http://localhost:8080/supervisor/combination?empNo=${empNo}&supervisorEmpNo=${supervisorEmpNo}&year=${year}&version=${version}&cellId=${cellId}` ,  {}, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/supervisor/combination?empNo=${empNo}&supervisorEmpNo=${supervisorEmpNo}&year=${year}&version=${version}&cellId=${cellId}` ,  {}, httpOptions);
  }

  deleteSupervisorData(empNo: string, supervisorEmpNo: string, year: string, version : string) {
    return this.http.delete(`${BASE_URL}/${WAR}/supervisor/combinationDelete?empNo=${empNo}&supervisorEmpNo=${supervisorEmpNo}&year=${year}&version=${version}` , httpOptions);
  }

  getAccomplishmentCategories() {
    return this.http.get(`${BASE_URL}/${CODEGEN_WAR}/accomplishment/categories`, httpOptions);
  }

  getEmployeeAccomplishments(empNo: string, fromDate: string, toDate: string, categoryID: number){
    return this.http.get(`${BASE_URL}/${CODEGEN_WAR}/accomplishment/load/${empNo}?fromDate=${fromDate}&toDate=${toDate}&categoryID=${categoryID}`, httpOptions);
  }

  getEmployeeBaseCriteriaEvaluation(empNo: string, year: string, startDate: string, endDate: string) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/base-criteria-evaluations?empNo=${empNo}&year=${year}&startDate=${startDate}&endDate=${endDate}`, httpOptions);
  }

  getEmployeeMonthlyCriteriaEvaluation(empNo: string, year: string, startDate: string, endDate: string) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/monthly-criteria-evaluations?empNo=${empNo}&year=${year}&startDate=${startDate}&endDate=${endDate}`, httpOptions);
  }

  checkPermissionForBaseCriteriaSection(empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/employee/base-criteria-evaluation-permissions/${empNo}`, httpOptions);
  }

  getAppraisalPeriodForLatestYear(year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/appraisal/company-appraisal-period/${year}`, httpOptions);
  }
}
