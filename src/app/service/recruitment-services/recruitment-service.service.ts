import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from '../../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = 'recruitment';
const MAIN_URL =  'http://192.168.6.93:8080';
let httpOptions;

@Injectable({
  providedIn: 'root'
})
export class RecruitmentServiceService {

  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      })
    };
  }

  // Selection Criteria
  getSelectionCriterias() {
    return this.http.get(`${MAIN_URL}/job-posting/view-all`, httpOptions);
  }

  getSelectionCriteriaPreInsertingData() {
    return this.http.get(`${MAIN_URL}/job-posting/pre-insert-data`, httpOptions);
  }

  getCriteriaPriorityOptions() {
    return this.http.get(`${MAIN_URL}/job-posting-type/priority-types`, httpOptions);
  }

  getCriteriaPriorityList() {
    return this.http.get(`${MAIN_URL}/job-posting-type/all`, httpOptions);
  }

  deleteSelectionCriteriaItem(itemId) {
    return this.http.delete(`${MAIN_URL}/job-posting/delete?jobPostingId=${itemId}`, httpOptions);
  }

  deletePriorityListItem(itemId) {
    return this.http.delete(`${MAIN_URL}/job-posting-type/delete?jobPostingTypeId=${itemId}`, httpOptions);
  }

  postSelectionCriteria(payload: any) {
    return this.http.post(`${MAIN_URL}/job-posting/save`, payload, httpOptions);
  }

  saveCriteriaPriorityItem(payload: any) {
    return this.http.post(`${MAIN_URL}/job-posting-type/new`, payload, httpOptions);
  }

  putChangePriority(payload: any) {
    return this.http.put(`${MAIN_URL}/job-posting-type/priority`, payload, httpOptions);
  }


  // Recruitment
  getRecruitmentData() {
    return this.http.get(`${MAIN_URL}/interview/pre/load`, httpOptions);
  }

  getCandidateCategories() {
    return this.http.get(`${MAIN_URL}/candidate/pre-load`, httpOptions);
  }

  getCandidatesForCategory(categoryId: number) {
    return this.http.get(`${MAIN_URL}/candidate/load/${categoryId}`, httpOptions);
  }

  getCandidatesById(candidateId: number) {
    return this.http.get(`${MAIN_URL}/candidate/get/${candidateId}`, httpOptions);
  }

  getCandidatesAttributesById(candidateId: number) {
    return this.http.get(`${MAIN_URL}/candidate/load/attributes/${candidateId}`, httpOptions);
  }

  putCandidateCategories(payload: any) {
    return this.http.put(`${MAIN_URL}/candidate/change/type`, payload, httpOptions);
  }

  getCandidatesResults() {
    return this.http.get(`${MAIN_URL}/interview/result/type`, httpOptions);
  }

  postScheduleInterviewExam(payload: any) {
    return this.http.post(`${MAIN_URL}/interview/save`, payload, httpOptions);
  }

  putCandidateInterviewResults(payload: any) {
    return this.http.put(`${MAIN_URL}/interview/status/to-finish`, payload, httpOptions);
  }

  getRecruitmentScoringData(interviewId) {
    return this.http.get(`${MAIN_URL}/interview/scoreCriteria/${interviewId}`, httpOptions);
  }

  getInterviewPreData() {
    return this.http.get(`${MAIN_URL}/interview/finishedPreData`, httpOptions);
  }

  postSendEmailToCandidate(payload: any) {
    return this.http.post(`${MAIN_URL}/interview/interview-candidate-email`, payload, httpOptions);
  }

  getInterviewAttendanceDataSet() {
    return this.http.get(`${MAIN_URL}/interview/attendance`, httpOptions);
  }

  updateCandidateAttendance(payload: any, interviewId, attendanceType) {
    return this.http.put(`${MAIN_URL}/interview/${interviewId}/${attendanceType}`, payload, httpOptions);
  }

  getSendPendingEmails(candidateId) {
    return this.http.get(`${MAIN_URL}/candidate/pending-emails/${candidateId}`, httpOptions);
  }

  getCandidateAppliedPositions() {
    return this.http.get(`${MAIN_URL}/candidates/applied-positions`, httpOptions);
  }

  getRecruitmentMaxOffsetPerCategory(categoryId: number) {
    return this.http.get(`${MAIN_URL}/candidates/offSetCount?selectionType=${categoryId}`, httpOptions);
  }

  getCandidatesForCategoryFilteredOffset(categoryId: number, offset: number, filter: string) {
    return this.http.get(`${MAIN_URL}/candidates/filter/byPositions?selectionType=${categoryId}&offset=${offset}&searchKey=${filter}`, httpOptions);
  }

  getSyncCandidateFromWeb() {
    return this.http.get(`${MAIN_URL}/candidates/syncFromWeb`, httpOptions);
  }
}
