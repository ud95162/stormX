import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../../_global/profile';
import {DesignationWiseDeadline} from '../../classes/appraisal/appraisal-criteria';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const  APPRAISAL_WAR = 'appraisal';
let httpOptions;
let httpOptions2;

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

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

  getAppraisalTableData(payLoad: any){
    return this.http.post(`${APPRAISAL_WAR}/appraisal/ratings-all`, payLoad, httpOptions);
    // return this.http.post(`http://localhost:8080/appraisal/ratings-all`, payLoad, httpOptions);
  }

  getAppraiserProject(year: string){
    // return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/project/filters?year=2020&version=1&view=project-view`, httpOptions);
    return this.http.get(`${APPRAISAL_WAR}/appraisal/project/filters?year=${year}&version=1&view=project-view`, httpOptions);
  }


  getAppraisalDesignationCategoryList(year: string, type: string){
    // filter by selected year added
    // return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/designation-category/filters?year=2020&version=1&view=${type}`, httpOptions);
    return this.http.get(`${APPRAISAL_WAR}/appraisal/designation-category/filters?year=${year}&version=1&view=${type}`, httpOptions);
    // return this.http.get(`http://localhost:8080/appraisal/designation-category/filters?year=${year}&version=1&view=${type}`, httpOptions);
  }


  getEmployeePersonalApprisalForm(empNo, year: string){
    // filter by year added
    // return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-appraisal-form?empNo=${empNo}&year=2020`, httpOptions);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-appraisal-form?empNo=${empNo}&year=${year}`, httpOptions);
    // return this.http.get(`http://localhost:8080/appraisal/personal-appraisal-form?empNo=${empNo}&year=${year}`, httpOptions);
  }

  savingAppraisalComment(savingObj: any){
    return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/rnr-comment`, savingObj, httpOptions);
  }

  // editAppraisalTableData(payLoad:any){
  //   return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/rating`, payLoad, httpOptions);
  // }

  saveAppraisalTableData(payLoad: any){
    return this.http.post(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/rating`, payLoad, httpOptions);
    // return this.http.post(`http://localhost:8080/appraisal/rating`, payLoad, httpOptions);
  }

  editExpectationComment(payLoad: any){
    return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-appraisal-form-expectation-comment`, payLoad, httpOptions);
    // return this.http.put(`http://localhost:8080/appraisal/personal-appraisal-form-expectation-comment`, payLoad, httpOptions);
  }

  deleteExpectationComment(empNo: any, expectationId: any, year: any) {
    return this.http.delete(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-appraisal-form-expectation-comment/` + empNo + `/` + expectationId + `/` + year, httpOptions);
    // return this.http.delete(`http://localhost:8080/appraisal/personal-appraisal-form-expectation-comment/` + empNo + `/` + expectationId + `/` + year, httpOptions);
  }

  saveSelfAppraisalData(payLoad: any){
    return this.http.post(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/self-rating`, payLoad, httpOptions);
  }


  getPersonalCyclicQuestionAnswer(empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/my-follower-answers?empNo=${empNo}`, httpOptions);
  }

  getFollowersFeedbackCycles() {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/employees-with-cycles-of-my-followers`, httpOptions);
  }

  getFollowersFeedbackCyclesCompletingStatus() {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/cycle-question-answering-completion-status-of-my-followers`, httpOptions);
  }

    postPersonalCyclicQuestionAnswer(payLoad: any) {
    return this.http.post(`${BASE_URL}/${WAR}/feedback/answers`, payLoad, httpOptions);
  }

  getLatestCycleQuestionAnswerList(){
    return this.http.get(`${BASE_URL}/${WAR}/feedback/answers/feed`, httpOptions);
  }

  getFeedBackSubComponentPermission(empNo: string){
    return this.http.get(`${BASE_URL}/${WAR}/feedback/tab-permissions?empNo=${empNo}`, httpOptions);
  }

  changeFollowersFeedbackCycleViewStatus(payLoad: any) {
    return this.http.post(`${BASE_URL}/${WAR}/feedback/my-followers-with-cycles`, payLoad, httpOptions);
  }

  getExcecutiveViewFeedbackCyclesCompletingStatus(project: string) {
    return this.http.get(`${BASE_URL}/${WAR}/feedback/cycle-question-answering-completion-status-executive-view?projectName=${project}`, httpOptions);
  }

  getExecutiveProjectList(){
    return this.http.get(`${BASE_URL}/${WAR}/project/all-names?includeAllOption=true`, httpOptions);
  }

  getAppraisalFollowers(payLoad: any) {
    return this.http.post(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/followers`, payLoad, httpOptions);
    // return this.http.post(`http://localhost:8080/appraisal/followers`, payLoad, httpOptions);
  }

  downloadingAppraisalData(year: string, category: string, designation: string, project: string, showValue: string){
    let des = encodeURIComponent(designation);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/export/users-list?year=${year}&category=${category}&designation=${des}&project=${project}&ratingScore=${showValue}`, httpOptions);
    // return this.http.get(`http://localhost:8080/appraisal/export/users-list?year=${year}&category=${category}&designation=${des}&project=${project}&ratingScore=${showValue}`, httpOptions);
  }

  viewPersonalPerformanceAppraisalData(expId: any, empNo: any, year: string){

    // year added
    // return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/expectation-rating/history?empExpectationId=${expId}&empNo=${empNo}`, httpOptions);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/expectation-rating/history?empExpectationId=${expId}&empNo=${empNo}&year=${year}`, httpOptions);
  }

  savePillarExpectationComment(payLoad: any, year: string){
    // return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/employee-pillar-comment?year=2020`, payLoad,httpOptions);
    return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/employee-pillar-comment?year=${year}`, payLoad, httpOptions);

  }

  saveAppraisalEncryptionKey(encryptKey: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/enc-key/enc-key?key=${encryptKey}`, httpOptions);
  }

  // save all data
  saveAppraisalAllData(appraisalSavingObj: any, empNo: any, year: string){
    // return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-appraisal-form?empNo=${empNo}&year=2020`, appraisalSavingObj,httpOptions);
    return this.http.put(`${APPRAISAL_WAR}/appraisal/personal-appraisal-form?empNo=${empNo}&year=${year}`, appraisalSavingObj, httpOptions);
    // return this.http.put(`http://localhost:8080/appraisal/personal-appraisal-form?empNo=${empNo}&year=${year}`, appraisalSavingObj, httpOptions);

  }

  saveOverALlAppraisalPersonalData(overAllMsg: any){
    return this.http.post(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/self-rating-comment`, overAllMsg, httpOptions);
  }


  // save all personal appraisal data
  saveAllPersonalAppraisalData(selfAppraisalSavingObj: any, empNo: any, year: string){
    // return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-self-appraisal-form?empNo=${empNo}&year=2020`, selfAppraisalSavingObj,httpOptions);
    return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/personal-self-appraisal-form?empNo=${empNo}&year=${year}`, selfAppraisalSavingObj, httpOptions);
  }

  // save appraisal period
  saveAppraisalPeriod(appraisalStartDate: any, appraisalEndDate: any) {
    return this.http.post(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-period?start=${appraisalStartDate}
    &end=${appraisalEndDate}`, httpOptions);
  }

  getAppraisalDesignationCategories(perm_code: any) {
    this.setHeaders(perm_code);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/designation-categories`, httpOptions2);
  }

  getLatestAppraisalDeadlines(appraisalYear: string, perm_code: any) {
    this.setHeaders(perm_code);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-deadlines/` + appraisalYear, httpOptions2);
  }

  saveLatestAppraisalDeadlines(designationDeadLineBasketList: DesignationWiseDeadline[]) {
    return this.http.post(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-deadlines` , designationDeadLineBasketList, httpOptions);
  }

  getLatestAppraisalYear(perm_code: any) {
    this.setHeaders(perm_code);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/latest-appraisal-year` , httpOptions2);
  }

  getAppraisalYears(perm_code: any) {
    this.setHeaders(perm_code);
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-years` , httpOptions2);
  }

  getSpecialAppraisalDesignations(year: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/special-appraisal-designations?appraisalYear=${year}` , httpOptions);
  }

  checkAppraisalInterviewStatus() {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-interview-status`, httpOptions);
  }

  downloadingAppraisalMeetingComments(selectedyear: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/export/meeting-comments?year=${selectedyear}` , httpOptions);
  }

  getStartEndDateForSelectedDesignations(year: string, designationID: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-period?year=${year}&designationID=${designationID}`, httpOptions);
  }

  getAppraisalDesignationDeadlines(category: any, desGrp: any, designation: any, year: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-designation-deadlines?categoryID=${category}&groupID=${desGrp}&designationID=${designation}&year=${year}`, httpOptions);
  }

  updateDeadlineForAppraisal(payload: any) {
    return this.http.put(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-designation-deadlines`, payload, httpOptions);
  }

  deleteDeadlineForAppraisal(payload: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': '60CBD62DD3254E76B2414BFEFBD1E9DD',
        'Authorization': Profile.USER_TOKEN,
        'PermCode': ''
      }),
      body: payload,
    };
    return this.http.request('delete', `${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-designation-deadlines`, options);
  }


  getDesignationDeadlines(year: any, permCode: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-row-designation-deadlines?year=${year}`, httpOptions);
  }

  getDeadlineForUser(year: any, employeeID: any) {
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/appraisal/appraisal-deadlines/${year}/employees/${employeeID}`, httpOptions);
  }

  getStreamWiseCompletionStatus(empType: any, stream: any, year: any, completionStatus: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN,
      'PermCode': ''
    });
    const options = {
        headers: headers,
        responseType: 'arraybuffer' as 'json',
        observe: 'response' as 'body'
      };
    return this.http.get(`${BASE_URL}/${APPRAISAL_WAR}/reports/stream-wise-completion-status/${empType}/${stream}/${year}/${completionStatus}`, options);
    // return this.http.get(`http://localhost:8084/reports/stream-wise-completion-status/${empType}/${stream}/${year}/${completionStatus}`, options);
  }
}
