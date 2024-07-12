import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LeaveTypeDAO} from '../../classes/leave/leave-type-d-a-o';
import {Profile} from 'app/_global/profile';
import {forkJoin} from 'rxjs';

const BASE_URL = environment.API_PATH;
const WAR = 'attendance-leave';
const CODEGEN_WAR = environment.API_WAR;
const TRACKER_WAR = 'kriyo-work-from-home';
let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {


  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  getLeaveTypePreInsert() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/type-pre-insert`, httpOptions);
  }


  getLeaveTypes(activeStatue: boolean) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/types?activeStatus=${activeStatue}`, httpOptions);
  }

  postLeaveType(leaveType: LeaveTypeDAO) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/type`, leaveType, httpOptions);
  }

  deleteLeaveType(leaveTypeId: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/leave/type?leaveTypeId=${leaveTypeId}`);
  }

  deactivateLeaveType(leaveTypeId: number) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/type-deactive?leaveTypeId=${leaveTypeId}`, {}, httpOptions);
  }

  putLeaveType(leaveDefinedType: LeaveTypeDAO) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/type`, leaveDefinedType, httpOptions);
  }

  getSpecialLeaveTypes() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/special-types`, httpOptions);
  }

  postSpecialLeaveType(specialLeave) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/special-type`, specialLeave, httpOptions);
  }

  putSpecialLeaveType(leaveTypeNo, specialLeave: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/special-type?leaveTypeNo=${leaveTypeNo}`, specialLeave, httpOptions);
  }

  deleteSpecialLeaveType(leaveTypeNo) {
    return this.http.delete(`${BASE_URL}/${WAR}/leave/special-type?leaveTypeNo=${leaveTypeNo}`, httpOptions);
  }

  getLeaveSummary() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/summary`, httpOptions);
  }

  getLeaveHistory() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/history`, httpOptions);
  }

  getAllLeaveData() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/all`, httpOptions);
  }

  getLeaveMonthSummary(year: number, month: number) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/month-summary?year=${year}&month=${month}`, httpOptions);
  }

  getLeaveTypeSummary(year: number, leaveTypeId: number, isSpecial: boolean) {
    if (isSpecial === undefined || isSpecial === null) {
      isSpecial = false;
    }
    return this.http.get(`${BASE_URL}/${WAR}/leave/type-summary?year=${year}&leaveType=${leaveTypeId}&special=${isSpecial}`, httpOptions);
  }

  getLeaveRequestPreInsert(year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/request-pre-insert?year=${year}`, httpOptions);
  }

  getCompanyLeaveManagers() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/managers`, httpOptions);
  }

  getProjectsLeaveNotifyMembers() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/notify-managers`, httpOptions);
  }

  postEmployeeLeave(leaveRequest: any, requestingFrom: any) {
    if (requestingFrom === 'personal') {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode': 'LeaveRequestSelf'
        })
      };
    } else if (requestingFrom === 'admin') {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode': 'LeaveRequestOther'
        })
      };
    }
    return this.http.post(`${BASE_URL}/${WAR}/leave/request`, leaveRequest, httpOptions);
  }

  putLeaveRequest(leaveRequestIdentifier: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/request-cancellation`, leaveRequestIdentifier, httpOptions);
  }

  getRemindLeaveRequest(leaveRequestNo: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/request-reminder?leaveRequestNo=${leaveRequestNo}`, httpOptions);
  }

  getSupervisorsOfEmployee() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/supervisor`, httpOptions);
  }

  getLeaveRequests() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/requests`, httpOptions);
  }

  getWorkingDays(startDate: string, endDate: string) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/date-summary?startDate=${startDate}&endDate=${endDate}`, httpOptions);
  }

  getLeaveAllEmployees() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/names-and-emp-nos`, httpOptions);
  }

  getLeaveAllLeaveTypes() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/all-leave-types`, httpOptions);
  }

  postAssignLeave(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/admin-assign-leave`, payload, httpOptions);
  }

  postApproveDeclineLeave(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/request-status`, payload, httpOptions);
  }

  postBulkApproveDeclineLeave(payload: any) {
    const reqList = [];
    payload.forEach(item => {
      reqList.push(this.http.put(`${BASE_URL}/${WAR}/leave/request-status`, item, httpOptions));
    });
    return forkJoin(reqList);
  }

  postLoadProjectLeaveSummary(payload: any, year: number) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/project-leave-summary?year=${year}`, payload, httpOptions);
  }

  getLeaveAdminPreInsert() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/pre-data/filters`, httpOptions);
  }

  postToLoadEmployeesOnLeaveCategory(option: any, payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/approve-request${option}`, payload, httpOptions);
  }

  postEmployeeLieuLeaveRequest(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/lieu-leaves`, payload, httpOptions);
  }

  requestPermissionToUseLieuLeaves(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/get-approval-for-lieu-leaves`, payload, httpOptions);
  }

  displayLieuLeaveRequestsForAdmin() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/lieu-leaves/admin-for-accept`, httpOptions);
  }

  updateLieuLeaveApproveOrDecline(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/lieu-leaves/update-approve-status`, payload, httpOptions);
  }

  getLieuLeavePreInsertData() {
    return this.http.get(`${BASE_URL}/${CODEGEN_WAR}/attendance/employee-worked-holidays`, httpOptions);
  }

  getLieuLeaveRequests() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/lieu-leaves/admin`, httpOptions);
  }

  postApproveDeclineLieuLeave(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/lieu-leaves/approve-status`, payload, httpOptions);
  }

  getShortLeavePreInsertData(applyFrom: string) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/pre-data/short-leaves?applyDate=${applyFrom}`, httpOptions);
  }

  requestShortLeave(shortLeaveObj: any, requestingFrom: any) {
    if (requestingFrom === 'personal') {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode': 'LeaveRequestSelf'
        })
      };
    } else if (requestingFrom === 'admin') {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode': 'LeaveRequestOther'
        })
      };
    }
    return this.http.post(`${BASE_URL}/${WAR}/leave/short-leaves/save`, shortLeaveObj, httpOptions);
  }

  getAllShortLeaveRequests() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/short-leaves/load`, httpOptions);
  }


  postApproveDeclineShortLeave(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/short-leaves/approve`, payload, httpOptions);
  }

  postBulkApproveDeclineShortLeave(payload: any) {
    const reqList = [];
    payload.forEach(item => {
      reqList.push(this.http.put(`${BASE_URL}/${WAR}/leave/short-leaves/approve`, item, httpOptions));
    });
    return forkJoin(reqList);
  }

  postAdditionalLeaveRequest(payload) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN,
        'permCode': 'LeaveRequestSelf'
      })
    };
    return this.http.post(`${BASE_URL}/${WAR}/leave/get-approval-for-special-leaves`, payload, httpOptions);
  }

  getAdditionalLeaveData() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/special-leaves/admin-for-accept`, httpOptions);
  }

  updateAdditionalLeaveRequest(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/leave/special-leaves/update-approve-status`, payload, httpOptions);
  }

  postBulkApproveDeclineAdditionalLeave(payload: any) {
    const reqList = [];
    payload.forEach(item => {
      reqList.push(this.http.put(`${BASE_URL}/${WAR}/leave/special-leaves/update-approve-status`, item, httpOptions));
    });
    return forkJoin(reqList);
  }

  generateLeaveReports(selectionObj: any) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/report-generate`, selectionObj, httpOptions);
  }

  getOtherEmployeesLeaveBalances(empNo: string, year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/search-other-employees-leave-balance/` + empNo + `?year=${year}`, httpOptions);
  }

  getOtherEmployeesTakenLeaves(empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/search-other-employees-leave-taken-details/` + empNo, httpOptions);
  }

  getLeaveCountsForAdminToAcceptOrDeclineOrPending() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-number-of-requests-for-admin`, httpOptions);
  }

  getEmployeeWorkingHours(payload: any) {
    return this.http.post(`http://119.235.9.12:7070/kriyo-work-from-home/workFromHome/wwtApi/WWTWorkTime`, payload, httpOptions);
  }

  getEmployeeData(empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-employee-name-and-image/` + empNo, httpOptions);
  }

  getDetailsForAcceptRejectOrPendingLeavesForAdmin(value: string) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-leave-details-for-supervisor-as-accept-reject-or-pending/` + value, httpOptions);
  }

  getLeaveDetailsForAdminGraphs(year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-standard-and-special-leave-counts-for-admin-graphs/` + year, httpOptions);
  }

  getStandardLeaveTypesSummaryForAdminGraphs(year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-standard-leave-types-counts-for-admin-graphs/` + year, httpOptions);
  }

  getSpecialLeaveTypesSummaryForAdminGraphs(year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-special-leave-types-counts-for-admin-graphs/` + year, httpOptions);
  }

  getEmployeeDetailsForCompany(office: string) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-members-related-to-company/` + office, httpOptions);
  }

  getActiveEmployeeDetails() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/get-active-members`, httpOptions);
  }

  getAvgLeaveUtilizationForDaily() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/daily-avg-leave-utilization`, httpOptions);
  }

  getAvgLeaveUtilizationForWeekly() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/weekly-avg-leave-utilization`, httpOptions);
  }

  getAvgLeaveUtilizationForMonthly() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/monthly-avg-leave-utilization`, httpOptions);
  }

  getNoPayLeaveUtilizationMonthWise() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/no-pay-utilization`, httpOptions);
  }

  getOfficialAndOnsiteLeaveUtilizationMonthWise() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/on-site-and-official-leave`, httpOptions);
  }

  getAllPendingLeavesMonthWise() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/monthly-pending-leaves`, httpOptions);
  }

  getUtilizedLeavesVsRoleAndNoOfEmployees() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/role-wise-leave-utilization`, httpOptions);
  }

  getUtilizedLeavesByProject() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/project-wise-leave-utilization`, httpOptions);
  }

  getShortLeaveUtilization(year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/short-leave-utilization/` + year, httpOptions);
  }

  getDesignationWiseLeaveUtilization() {
    return this.http.get(`${BASE_URL}/${WAR}/leave/leave-dashboard/designation-wise-leave-utilization`, httpOptions);
  }

  getProjectWiseEmployeesLeaveAllocations(companyID: any, cadreID: any, desCategoryID: any, designationID: any, leaveCategory: any, empNo: any) {
    // return this.http.get(`${BASE_URL}/${WAR}/leave/project-wise-employee-leaves/${projectCode}/${empNo}` , httpOptions);
    return this.http.get(`${BASE_URL}/${WAR}/leave/employee-leave-details?companyID=${companyID}&cadreID=${cadreID}&designationCategoryID=${desCategoryID}&designationID=${designationID}&leaveCategory=${leaveCategory}&empNo=${empNo}`, httpOptions);

  }

  getFilteredEmployeesForSearchCriteria(companyID: any, cadreID: any, projectCode: any, desCategoryID: any, designationID: any, empNo: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/filter/employee-details?companyID=${companyID}&cadreID=${cadreID}&projectCode=${projectCode}&designationCategoryID=${desCategoryID}&designationID=${designationID}&empNo=${empNo}`, httpOptions);
  }

  saveEmployeeLeaveAllocationManually(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/leave/manual-leave-allocation`, payload, httpOptions);
  }

  getPendingLeaveRequestsForHrPeople() {
    return this.http.get('http://localhost:4000/pendingStandardLeaveRequests', httpOptions);
  }

  getEmployeeAllocationHistory(empID: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/hr-view-logs/` + empID, httpOptions);
  }

  getCarryFWLeaveDeadlineForYear(empID: any, year: any) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/carry-forward-leave/${empID}/${year}`, httpOptions);
  }

  getEmployeesAvgHrsAttendanceData(startDate: any, endDate: any, project: number, empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/report/avg-hrs?project_id=${project}&emp_no=${empNo}&start_date=${startDate}&end_date=${endDate}`, httpOptions);
  }

  getEmployeeAbsentDays(newEmpNO: any, startDate: any, endDate: any) {
    return this.http.get(`${BASE_URL}/${WAR}/attendance/absent/days/employee/${newEmpNO}?start-date=${startDate}&end-date=${endDate}`, httpOptions);
  }


  /**
   * get employee requested additional leaves for selected year
   * employee id will map on backend with login employee
   * @param year
   */
  getEmployeeAdditionalLeaveRequests(year: number) {
    return this.http.get(`${BASE_URL}/${WAR}/leave/employee-special-leaves/year/${year}`, httpOptions);
  }

}
