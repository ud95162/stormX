import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Profile} from "../_global/profile";

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const WEB_TRACKER_WAR = environment.WEB_TRACKER_API_WAR;
const LEAVE_WAR = 'attendance-leave';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN
    })
  };

  constructor(private http: HttpClient) {
  }

  // getPreDataToGetAttendance() {
  //   return this.http.get(`${BASE_URL}/${WAR}/attendance/pre-load-data`);
  // }

  getPreDataToGetAttendance(companyId) {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/pre-load-data?companyId=${companyId}`, this.httpOptions);
  }

  postToLoadAttendanceSummary(payload: any) {
      return this.http.post(`${BASE_URL}/${WAR}/attendance/summary`, payload, this.httpOptions);
  }

  postToLoadOverallAttendanceStatsGraph(type: string, payload: any, option: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/overall-${type}-attendance-graph${option}`, payload, this.httpOptions);
  }

  postToLoadAttendanceTimeStatsGraph(type: string, payload: any, option: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/time-ranges-${type}-attendance-graph${option}`, payload, this.httpOptions);
  }

  postToLoadAttendanceSummaryGraphGraph(payload: any, option: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/summary-graph${option}`, payload, this.httpOptions);
  }

  postToLoadAttendanceLog(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/log-date-range-order-by-param`, payload, this.httpOptions);
  }

  postToLoadAttendanceMissingDates(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/missing-date`, payload, this.httpOptions);
  }

  postToRequestAttendanceMissingDates(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/request/missing-date`, payload, this.httpOptions);
  }

  postToSortLoadAttendanceLog(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/sort`, payload, this.httpOptions);
  }

  postToRequestMissingAttendanceLog(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/log-missing-attendance`, payload, this.httpOptions);
  }

  postToLoadAttendancePresentAbsentAvg(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/present-vs-absent-data-graph`, payload, this.httpOptions);
  }

  postToLoadAttendanceOfficeStatAvg(payload: any, range: any, field: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/office-actual-hour-graphs?requestedInterval=${range}&fieldName=${field}`,
      payload,
      this.httpOptions
    );
  }

  postToLoadArrivalDepartureTimeAvg(payload: any, field: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/in-out-hour-average-graphs?fieldName=${field}`,
      payload,
      this.httpOptions
    );
  }

  postToLoadArrivalDepartureStatus(payload: any, field: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/overall-${field}-attendance-graph-averages`,
      payload,
      this.httpOptions
    );
  }

  postToLoadOfficeActualHourStatsData(payload: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/office-actual-hour-stats`,
      payload,
      this.httpOptions
    );
  }

  postToLoadPresentLateArrivalAndEarlyDeparture(payload: any, field: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/present-vs-late-arrivals-early-departures-graph?fieldName=${field}`,
      payload,
      this.httpOptions
    );
  }

  postToLoadAttendanceOfficeLeaveHours(payload: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/office-hours-vs-leave-hours-avg-graph`,
      payload,
      this.httpOptions
    );
  }

  postToLoadAttendanceActualExtraOrMissingHours(payload: any) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/actual-vs-actual-min-expected-hours-graph`,
      payload,
      this.httpOptions
    );
  }

  postToLoadCommonCardDetail(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/common-header`, payload, this.httpOptions);
  }

  postToLoadHeatMapData(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/heat-map`, payload, this.httpOptions);
  }

  postToLoadOfficeActualPieChartData(payload: any, field: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/office-working-hours-counts?graphName=${field}`, payload, this.httpOptions);
  }

  loadMissingDateApprovalRequest() {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/missing-date-approval-request`, this.httpOptions);
  }

  loadMissingTimeApprovalRequest() {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/missing-time-approval-request`, this.httpOptions);
  }

  postToApproveMissingDateRequest(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/approved-missing-date-request`, payload, this.httpOptions);
  }

  postToApproveMissingTimeRequest(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/approved-missing-time-request`, payload, this.httpOptions);
  }

  getMonthFilterAttendanceMainDashboard() {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/monthsForFilters`, this.httpOptions);
  }

  getOutOfficeType() {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/out-of-office/work-types`, this.httpOptions);
  }

  postOutOfficeLogRequest(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/out-of-office/logs`, payload, this.httpOptions);
  }

  getOutOfOfficeRequest() {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/out-of-office/logs/admin`, this.httpOptions);
  }

  postToApproveOutOfOfficeRequest(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/attendance/out-of-office/logs/approve-status`, payload, this.httpOptions);
  }

  getCompanyList() {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/user/work-companies`, this.httpOptions);
  }

  getAttendanceSummaryReportData(payLoad: any) {
    return this.http.post(`${BASE_URL}/${WAR}/attendance/summary/reports`, payLoad, this.httpOptions);
  }

  postToLoadCustomeRangeData(payLoad: any, offSet: number) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/log-comparison/main?offset=${offSet}`, payLoad,
      this.httpOptions
    );
  }

  postToLoadLastWeekData(payLoad: any, offSet: number) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/log-comparison?dateRange=last-week&offset=${offSet}`, payLoad,
      this.httpOptions
    );
  }

  postToLoadLastMonthData(payLoad: any, offSet: number) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/log-comparison?dateRange=last-month&offset=${offSet}`, payLoad,
      this.httpOptions
    );
  }

  postToLoadLastThreeMonthData(payLoad: any, offSet: number) {
    return this.http.post(
      `${BASE_URL}/${WAR}/attendance/log-comparison?dateRange=last-three-months&offset=${offSet}`, payLoad,
      this.httpOptions
    );
  }

  loadProjectLeadList() {
    return this.http.get(`${BASE_URL}/${WAR}/project/mngr`, this.httpOptions);
  }

  // -----attendance dashboard endpoints------------------------------

  getProjectWiseAttendance(date: any, buID: any, cadreID: any, companyID: any, depID: any) {
    return this.http.get(`${BASE_URL}/${LEAVE_WAR}/attendance/current/project-wise?bu-id=${buID}&cadre-id=${cadreID}&company-id=${companyID}&department-id=${depID}&current-date-time=${date}`, this.httpOptions);
  }

  getAttendanceSummary(date: any, startDate: any, endDate: any, buID: any, cadreID: any, companyID: any, depID: any) {
    return this.http.get(`${BASE_URL}/${LEAVE_WAR}/attendance/summary?company-id=${companyID}&bu-id=${buID}&department-id=${depID}&cadre-id=${cadreID}&start-date=${startDate}&end-date=${endDate}&current-date-time=${date}`, this.httpOptions);
  }
  getWorkHoursDistribution(date: any, startDate: any, endDate: any, buID: any, cadreID: any, companyID: any, depID: any) {
    return this.http.get(`${BASE_URL}/${LEAVE_WAR}/attendance/work-hours?company-id=${companyID}&bu-id=${buID}&department-id=${depID}&cadre-id=${cadreID}&start-date=${startDate}&end-date=${endDate}&current-date-time=${date}`, this.httpOptions);
  }
  getOverallAttendanceSummary(date: any, inOutType: any, companyID: any, buID: any, depID: any, cadreID: any, startDate: any, endDate: any) {
    return this.http.get(`${BASE_URL}/${LEAVE_WAR}/attendance/overall-attendance?current-date-time=${date}&in-out=${inOutType}&company-id=${companyID}&bu-id=${buID}&department-id=${depID}&cadre-id=${cadreID}&start-date=${startDate}&end-date=${endDate}`, this.httpOptions);
  }

  // -------------------employee attendance summary endpoints------------------

  getEmployeeAttendanceLogs(newEmpNo: string, oldEmpNo: string, startDate: any, endDate: any) {
    return this.http.get(`${BASE_URL}/${LEAVE_WAR}/attendance/daily-attendance-logs/employee/${newEmpNo}?start-date=${startDate}&end-date=${endDate}&oldEmpNo=${oldEmpNo}`, this.httpOptions);
    // return this.http.get(`http://localhost:8081/attendance/daily-attendance-logs/employee/${newEmpNo}?start-date=${startDate}&end-date=${endDate}&oldEmpNo=${oldEmpNo}`, this.httpOptions);
  }

  // attendance exceptions
  getAttendanceAbsentExclude() {
    return  this.http.get(`${BASE_URL}/attendance-leave/attendance/absent/exclude-email`, this.httpOptions);
  }

  addNewAttendanceExclude(payLoad: any) {
    return this.http.post(`${BASE_URL}/attendance-leave/attendance/absent/exclude-email`, payLoad, this.httpOptions);
  }

  deleteAttendanceExclude(id: string) {
    return this.http.delete(`${BASE_URL}/attendance-leave/attendance/absent/exclude-email/${id}`, this.httpOptions);
  }

}
