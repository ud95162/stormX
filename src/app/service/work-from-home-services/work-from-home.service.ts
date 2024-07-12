import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from "../../_global/profile";
import {NewWFHRequestPostBody} from "../../body/wfh-request-module/wfh-request/models/WFHRequestDetails";

const BASE_URL = environment.API_PATH;
// const BASE_URL = 'http://119.235.9.12:7070';
// const BASE_URL = 'http://localhost:8080';
const WAR = environment.WEB_TRACKER_API_WAR;
const MAIN_URL = BASE_URL + '/' + WAR;

// const MAIN_URL =  BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class WorkFromHomeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN,
      'permCode': 'WwtTab'
    })
  };

  httpDefaultOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN,
      'permCode': ''
    })
  }

  constructor(private http: HttpClient) {
  }

  getWfhReportData(startDate: string, endDate: string) {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/getDailyReportData/${startDate}/${endDate}`, this.httpOptions);
  }

  getWfhUsers() {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/getAllUsers`, this.httpOptions);
  }

  getWfhMainDashboardData(requestPayload: any) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/getMainDashboardData`, requestPayload, this.httpOptions);
  }

  getWfhProjects() {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/getAllProjects`, this.httpOptions);
  }

  getSelectedProjectMembers(selectDate: string, project: string) {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/getSelectedProjectMembers/${selectDate}/${project}`, this.httpOptions);
  }

  getWfhAllUserActivity(startDate: string, endDate: string) {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/getUserActivity/${startDate}/${endDate}`, this.httpOptions);
  }

  getWfhFilteredResponses(selectionObj: any) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/getFilteredDailyReportData`, selectionObj, this.httpOptions);
  }

  getSummaryReportData(selectionObj: any) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/getSummeryReportData`, selectionObj, this.httpOptions);
  }

  getSummaryReportDataWithFilteredUsers(selectionObj: any, usersToBeExcluded: any) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/getSummeryReportDataWithUsersFiltered/` + usersToBeExcluded, selectionObj, this.httpOptions);
  }

  createExcludeFilterGroup(userGroup: any, groupName: any, employeeId: any) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/summaryReport/createExcludeUserGroup/` + groupName + '/'
      + employeeId, userGroup, this.httpOptions);
  }

  getUserFilterGroups(employeeId: any) {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/summaryReport/getUserFilterGroups/` + employeeId, this.httpOptions);
  }

  getWWTDailyTime(selectionObj: any) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/wwtApi/WWTWorkTime`, selectionObj, this.httpDefaultOption);
  }

  deleteFilterGroup(groupId: any, employeeId: any) {
    return this.http.delete(`${MAIN_URL}/workFromHome/summaryReport/deleteUserFilterGroups/` + employeeId + '/' + groupId, this.httpOptions);
  }

  getUserFilterTimeGaps(employeeid: any) {
    return this.http.get<any>(`${MAIN_URL}/workFromHome/summaryReport/getUserFilterTimeGaps/` + employeeid, this.httpOptions);

  }

  saveFilterTimeGaps(EMPLOYEE_ID: any, timeGaps: any[]) {
    return this.http.post<any>(`${MAIN_URL}/workFromHome/summaryReport/addUserFilterTimeGaps/` + EMPLOYEE_ID, timeGaps, this.httpOptions);
  }

  updateUserFilterTimeGapInstance(timeGapInstanceId: any, timeGap: string) {
    return this.http.put<any>(`${MAIN_URL}/workFromHome/summaryReport/updateFilterTimeGapInstance/` + timeGapInstanceId, timeGap, this.httpOptions);
  }

  deleteFilterTImeGapInstance(timeGapInstanceId: any) {
    return this.http.delete(`${MAIN_URL}/workFromHome/summaryReport/deleteFilterTimeGapInstance/` + timeGapInstanceId, this.httpOptions);
  }

  deleteAllFilterTimeGaps(EMPLOYEE_ID: any) {
    return this.http.delete(`${MAIN_URL}/workFromHome/summaryReport/deleteAllFilterTimeGapInstance/` + EMPLOYEE_ID, this.httpOptions);
  }

  generateSummaryReportWithFilterConfigurations(object: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/summaryReport/userConfigurationReportGeneration`, object, this.httpOptions);
  }

  generateSummaryReportWithSystemSavedFilterConfigurations(selectionObj: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/summaryReport/systemSavedConfigurationReportGeneration`, selectionObj, this.httpOptions);
  }

  saveUserFilterConfigurations(object: { timeGapFilterType: any; excludeUserGroups: {} }) {
    return this.http.post(`${MAIN_URL}/workFromHome/summaryReport/saveUserFilterConfigurations`, object, this.httpOptions);
  }

  getUserFilterConfigurations(empId: any) {
    return this.http.get(`${MAIN_URL}/workFromHome/summaryReport/getUserFilterConfigurations/` + empId, this.httpOptions);
  }

  getDetailedSummaryReportAttendanceOverviewData(selectionObj: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportAttendanceOverviewPresentData(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview/presentDetails`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportAttendanceOverviewAbsentData(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview/absentDetails`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportAttendanceOverviewActiveHrsData(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview/activeHrsDetails`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportAttendanceOverviewActiveHrsPercentages(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview/percentagesOfHrs`, selectionObj, this.httpOptions);
  }


  getDetailedSummaryReportLeaveCalculations(selectionObj: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/leaveCalculation`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportWorkedHoursAnalysisWWTData(selectionObj: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/workedHourAnalysis`, selectionObj, this.httpOptions);
    // return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/workedHourAnalysis`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportTimeAnalysisWWTData(selectionObj: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/timePeriodAnalysis`, selectionObj, this.httpOptions);
    // return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/workedHourAnalysis`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportWorkedHoursAnalysisWWTDataForWeek(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/workedHourAnalysisForWeek`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportWorkedHoursAnalysisWWTDataForMonth(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/workedHourAnalysisForMonth`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportWorkedHoursAnalysisWWTDataForYear(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/workedHourAnalysisForYear`, selectionObj, this.httpOptions);
  }


  getDetailedSummaryReportprojectWiseWorkHoursDistributionData(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/projectWiseWorkedHoursDistribution`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportProjectWiseWorkHoursDistributionForWeek(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/projectWiseWorkedHoursDistributionForWeek`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportProjectWiseWorkHoursDistributionForMonth(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/projectWiseWorkedHoursDistributionForMonth`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportLeaveAnalysisData(selectionObj: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/detailedSummaryReport/leaveAnalysisData`, selectionObj, this.httpOptions);
  }

  getDetailedSummaryReportEmployeeWiseWorkedHourAnalysisDataForYesterday(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/employeeWiseWorkedAnalysisData/forDay`, selectionObj, this.httpOptions);
    // ('http://127.0.0.1:8080/workFromHome/detailedSummaryReport/employeeWiseWorkedAnalysisData/forDay' , selectionObj , this.httpOptions);
  }

  getDetailedSummaryReportEmployeeWiseWorkedHourAnalysisDataForWeek(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/employeeWiseWorkedAnalysisData/forWeek`, selectionObj, this.httpOptions);
    // (`http://127.0.0.1:8080/workFromHome/detailedSummaryReport/employeeWiseWorkedAnalysisData/forWeek` , selectionObj , this.httpOptions);
  }

  getDetailedSummaryReportEmployeeWiseWorkedHourAnalysisDataForMonth(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/employeeWiseWorkedAnalysisData/forMonth`, selectionObj, this.httpOptions);
  }


  getDetailedSummaryReportTaskTimeAnalysisData(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/projectWiseTaskTimeAnalysis`, selectionObj, this.httpOptions);
  }

  getAttendanceOverviewHolidayOrAbsentMessage(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview/displayAbsentOrHoliday`, selectionObj, this.httpOptions);
  }

  getWWTOfflineEmployeeDetails(selectionObj: any) {
    return this.http.post
    (`${MAIN_URL}/workFromHome/detailedSummaryReport/attendanceOverview/offlineEmployeeDetails`, selectionObj, this.httpOptions);
  }

  generateAttendanceLeaveReport(payload: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/absenteeismReport`, payload, this.httpOptions);
  }

  getEmployeeWorkSummary(empID: any, payload: any) {
    return this.http.post(`${MAIN_URL}/workFromHome/workSummary/employees/` + empID, payload, this.httpDefaultOption);
  }


  // wfh request section endpoints

  getEmployeeAppliedWfhRequests(startDate: string, endDate: string, approvedStatus: number) {
    return this.http.get(`${MAIN_URL}/wfh/requests/employee?approvedStatus=${approvedStatus}&startDate=${startDate}&endDate=${endDate}`,
      this.httpDefaultOption);
  }

  createNewWfhRequestForOthers(payload: NewWFHRequestPostBody) {
    return this.http.post(`${MAIN_URL}/wfh/request-for-others`, payload, this.httpDefaultOption);
  }

  createNewWfhRequest(payload: any) {
    return this.http.post(`${MAIN_URL}/wfh/request`, payload, this.httpDefaultOption);
  }

  cancelWfhRequestByEmployee(requestId: number) {
    return this.http.put(`${MAIN_URL}/wfh/requests/${requestId}/cancel`, '', this.httpDefaultOption);
  }

  getAssignedWfhRequestsAsSupervisor(approvedStatus: number) {
    return this.http.get(`${MAIN_URL}/wfh/assigned-requests?approvedStatus=${approvedStatus}`, this.httpDefaultOption);
  }

  updateApprovedStatusOfWfhRequest(requestId: number, approvedStatus: number) {
    return this.http.put(`${MAIN_URL}/wfh/requests/${requestId}/update-status/${approvedStatus}`, '', this.httpDefaultOption);
  }

  getAllWfhRequestsDetails(empId: number, startDate: string, endDate: string, approvedStatus: number) {
    return this.http.get(`${MAIN_URL}/wfh/requests/all?empId=${empId}&startDate=${startDate}&endDate=${endDate}&approvedStatus=${approvedStatus}`, this.httpDefaultOption);
  }
}
