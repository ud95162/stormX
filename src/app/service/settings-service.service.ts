import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class SettingsServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDesignationCategories() {
    return this.http.get(`${BASE_URL}/${WAR}/designation/load/all`);
  }

  getDesignationPreInsert() {
    return this.http.get(`${BASE_URL}/${WAR}/designation/pre-inserting-data`);
  }

  designationSave(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/designation`, payload, this.httpOptions);
  }

  designationCategorySave(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/designation/designation-group`, payload, this.httpOptions);
  }

  designationCategoryMainSave(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/designation/category/save`, payload, this.httpOptions);
  }

  // Page settings
  getExistingPages() {
    return this.http.get(`${BASE_URL}/${WAR}/settings/existing-pages`);
  }

  deleteExistingPage(id) {
    return this.http.delete(`${BASE_URL}/${WAR}/settings/deletePage/` + id);
  }

  getPendingPages() {
    return this.http.get(`${BASE_URL}/${WAR}/settings/pending-pages`);
  }

  acceptDeclinePage(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/settings/page-creation-req/accept-decline`, payload, this.httpOptions);
  }

  // Permission settings
  getUserGroups() {
    return this.http.get(`${BASE_URL}/${WAR}/user-group/load`);
  }

  getPermissionGroupWise() {
    return this.http.get(`${BASE_URL}/${WAR}/permission/usergroup-wise`);
  }

  updatePermissionToGroup(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/permission/grant-ungrant`, payload, this.httpOptions);
  }

  // Project settings
  getExistingProjects() {
    return this.http.get(`${BASE_URL}/${WAR}/project/load/all/details`);
  }

  saveProject(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/project/save`, payload, this.httpOptions);
  }

  editProject(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/project/edit`, payload, this.httpOptions);
  }

  // Project settings
  getAllQuickLinks() {
    return this.http.get(`${BASE_URL}/${WAR}/references/load/all`);
  }

  getQuickLinks() {
    return this.http.get(`${BASE_URL}/${WAR}/references/load`);
  }

  getQuickLinksCategory() {
    return this.http.get(`${BASE_URL}/${WAR}/references/category`);
  }

  saveQuickLinks(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/references/save`, payload, this.httpOptions);
  }

  editQuickLinks(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/references/edit`, payload, this.httpOptions);
  }

  deleteQuickLinks(quickLinkId: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/references/delete/${quickLinkId}`);
  }

  // System Config Settings
  getSystemDateConfigDataPreInsert() {
    return this.http.get(`${BASE_URL}/${WAR}/system-setup/pre-data`);
  }

  putSystemDateConfigData(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/sys-working-days`, payload, this.httpOptions);
  }

  getSystemDateConfigData() {
    return this.http.get(`${BASE_URL}/${WAR}/sys-working-days`);
  }

  getSystemCompanyLeaveConfigData() {
    return this.http.get(`${BASE_URL}/${WAR}/company-leave-setup`);
  }

  postSystemCompanyLeaveConfigData(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/company-leave-setup`, payload, this.httpOptions);
  }

  getEventVenueConfigPreLoadData() {
    return this.http.get(`${BASE_URL}/${WAR}/event-config/pre-data`);
  }

  saveEventVenueConfiguration(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/event-config-venue`, payload, this.httpOptions);
  }

  saveCalendarEventStarEndTime(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/event-calendar-config-time`, payload, this.httpOptions);
  }

  saveFeedBackCycleSetting(payLoad: any) {
    return this.http.post(`${BASE_URL}/${WAR}/feedback/cycles`, payLoad, this.httpOptions);
  }

  getDesignationMainCategories() {
    return this.http.get(`${BASE_URL}/${WAR}/designation/category/load`);
  }

  editDesignationGroup(payLoad) {
    return this.http.put(`${BASE_URL}/${WAR}/designation/designation-group/edit`, payLoad, this.httpOptions);
  }

  editDesignation(payLoad) {
    return this.http.put(`${BASE_URL}/${WAR}/designation/edit`, payLoad, this.httpOptions);
  }

  deleteDesignationGroup(payLoad) {
    // let desGroupName = encodeURIComponent(designationGroupName);
    return this.http.post(`${BASE_URL}/${WAR}/designation/designation-group/delete`, payLoad);
  }

  deleteDesignation(designationId: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/designation/delete/${designationId}`);
  }



}
