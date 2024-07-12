import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class AdminServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  // Admin
  // Get Header data
  getHeaderData() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/head_count`);
  }

  // Save Employees
  // Get Designations
  getDesignationsForAdd() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/pre-inserting-data`);
  }

  saveEmployee(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/employee/save`, payload, this.httpOptions);
  }

  // Edit Employees
  // Get employee to edit
  loadEmployeeToEdit(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/pre-edit-data/${empID}`);
  }

  editEmployee(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/employee/edit`, payload, this.httpOptions);
  }

  // Employee Reports
  // Get Report Keys
  getReportKeys() {
    return this.http.get(`${BASE_URL}/${WAR}/report/keys`);
  }

  postReportContent(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/report/advance`, payload, this.httpOptions);
  }

  // Employee Permission
  // Get Permission categories
  getPermissionCategoriesFromUserGroup() {
    return this.http.get(`${BASE_URL}/${WAR}/permission/usergroup/categories`);
  }

  // Update Permission categories
  updatePermissionCategories(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/permission/usergroup/categories`, payload, this.httpOptions);
  }

  // Update Permission categories
  updatePermission(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/permission/usergroup/permissions`, payload, this.httpOptions);
  }

  // Get Permission categories
  getPermissionsForUsers(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/user-group-setting-data?empNo=${empID}`);
  }

  savePermissionGroup(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/user/group`, payload, this.httpOptions);
  }

  resetUserPassword(payload: any) {
    console.log("change pwd")
    return this.http.put(`${BASE_URL}/${WAR}/user/reset-pwd`, payload, this.httpOptions);
  }

  // Get Admin Unread count
  getAdminRequestsNotificationUnreadCount() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-req/letter-req/pending-count`);
  }

  // Get Admin Requests
  getAdminRequests() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-req/letter-req`);
  }

  adminRequestsResponse(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/admin-req/letter-req/accept-decline`, payload, this.httpOptions);
  }

  adminRequestsComplete(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-req/letter-req/complete`, payload, this.httpOptions);
  }

  adminRequestsReAssign(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-req/letter-req/assign`, payload, this.httpOptions);
  }

  // Get Admin Notifications
  getAdminNotifications(empID: string, offset: number) {
    return this.http.get(`${BASE_URL}/${WAR}/notification/load/admin_notifications/${empID}/${offset}`);
  }

  getAdminUploadedFileDirectories() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-files/directories`);
  }

  getAdminUploadedFiles() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-files`);
  }

  getAdminUploadedFileTypes() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-files/types`);
  }

  postAdminFile(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-files`, payload, this.httpOptions);
  }

  deleteAdminUploadedFile(fileId: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/admin-files?fileId=${fileId}`);
  }

  checkIfUserAlreadyIn(username: any) {
    return this.http.get(`${BASE_URL}/${WAR}/user/checkIfUserAlreadyIn/` + username);
  }

  loadAllCadres() {
    return this.http.get(`${BASE_URL}/${WAR}/cadre/all`, this.httpOptions);
  }

  getEmployeeDefaultOpdBalanceUsingFilter(year: any, designation: any, cadre: any, maritalStatus: any) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/opdDetails?year=${year}&designation=${designation}&cadre=${cadre}&maritalStatus=${maritalStatus}`, this.httpOptions);
  }

  loadTemplates() {
    return this.http.get(`${BASE_URL}/${WAR}/report/templates/`, this.httpOptions);
  }

  saveTemplate(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/report/templates/`, payload, this.httpOptions);
  }

  saveEditTemplate(payload, id) {
    return this.http.put(`${BASE_URL}/${WAR}/report/templates/` + id, payload, this.httpOptions);
  }

  generateReport(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/report/generate`, payload, this.httpOptions);
  }

  deleteTemplate(templateId) {
    return this.http.delete(`${BASE_URL}/${WAR}/report/templates/` + templateId, this.httpOptions);
  }

  loadAttributes() {
    return this.http.get(`${BASE_URL}/${WAR}/report/key-names/report-types/1`, this.httpOptions);
  }

  getCountriesList() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/countries`, this.httpOptions);
  }
}
