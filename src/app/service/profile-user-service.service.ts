import {Injectable, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
// tslint:disable-next-line:max-line-length
import {SaveUpdatePreviousWorkDetail} from '../components/profile/profile-resume/profile-resume-add-section/model/save-update-previous-work-detail.model';
import {Profile} from '../_global/profile';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const OVERVIEW_WAR = environment.OVERVIEW_WAR;

@Injectable()
export class ProfileUserServiceService{
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  httpDefaultOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN,
      'permCode' : ''
    })
  };

  invokeMyMethod = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  // metric audit
  uploadCsvFile(year, month, file: File) {
    // tslint:disable-next-line:indent
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('year', year);
    formdata.append('month', month);

    return this.http.post('http://127.0.0.1:8080/metricAudit/getjiranomaly', formdata);
  }

  getSelectingData () {
    return this.http.get('http://127.0.0.1:8080/metricAudit/get_init_year_month');
  }

  // get user wwt data
  getProfileWWTData(payload: any) {

    const httpDefaultOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': Profile.USER_TOKEN,
            'permCode' : 'Profile'
          })
        };

    return this.http.post(`${BASE_URL}/kriyo-work-from-home/workFromHome/wwtApi/WWTUserData`, payload, httpDefaultOptions);
    // return this.http.post(`http://119.235.9.12:7070/kriyo-work-from-home/workFromHome/wwtApi/WWTUserData`, payload, this.httpOptions);
  }

  // User Profile  git Api
  getProfileGitData(empID: String, year: Number, month_no: Number, week_no: Number, range: String) {
    // return this.http.get(`http://127.0.0.1:8080/overview/api/git/${empID}/${year}/${month_no}/${week_no}/${range}`);
     return this.http.get(`${BASE_URL}/${OVERVIEW_WAR}/overview/api/git/${empID}/${year}/${month_no}/${week_no}/${range}`);
  }

  // User Profile  jira Api
  getProfileJiraData(empID: String, year: Number, month_no: Number, week_no: Number, range: String) {
    // return this.http.get(`http://127.0.0.1:8080/overview/api/jira/${empID}/${year}/${month_no}/${week_no}/${range}`);
    return this.http.get(`${BASE_URL}/${OVERVIEW_WAR}/overview/api/jira/${empID}/${year}/${month_no}/${week_no}/${range}`);
  }

  // User Profile  other data Api
  getProfileOtherData(empID: String) {
    // return this.http.get(`http://127.0.0.1:8080/overview/api/other/${empID}`);
    return this.http.get(`${BASE_URL}/${OVERVIEW_WAR}/overview/api/other/${empID}`);
  }

  // overview holiday Api
  getHoliDays(year: Number, month: Number, start_day: Number) {
    // return this.http.get(`http://127.0.0.1:8080/holiday/getholidays/${year}/${month}/${start_day}`);
    return this.http.get(`${BASE_URL}/${OVERVIEW_WAR}/holiday/getholidays/${year}/${month}/${start_day}`);
  }

  // Home Header
  getEmployeeHeaderInfo(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/header-data/${empID}`);
  }

  getEmployeeList() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/active-list`);
  }

  // Resume
  // Profile Details
  loadEmpData(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/load/${empID}`);
  }

  getEmployeeSkillAccomplishmentData(employeeId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/skills-accomplishments?empNo=${employeeId}`);
  }

  getEmployeeSkillEndorsementsReactions() {
    return this.http.get(`${BASE_URL}/${WAR}/skill/endorsements-rates`);
  }

  saveEmployeeSkillEndorsements(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/skill/endorsements`, payload, this.httpOptions);
  }

  // Personal Information
  // Personal Details edit
  editPersonalDetails(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/employee/personal/edit`, payload, this.httpOptions);
  }

  // Contact Details edit
  editContactDetails(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/employee/contact/edit`, payload, this.httpOptions);
  }

  // Family Details
  // Family details add
  saveFamilyMember(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/employee/family/save`, payload, this.httpOptions);
  }

  // Family details edit
  editFamilyMember(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/employee/family/edit`, payload, this.httpOptions);
  }

  // Family member delete
  deleteFamilyMember(familyID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/family/delete/${familyID}`);
  }

  // Education
  // Education post
  saveEducation(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/education/save`, payload, this.httpOptions);
  }

  // Education edit
  editEducation(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/education/edit`, payload, this.httpOptions);
  }

  // Education delete
  deleteEducation(educationType: string, educationID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/education/delete/${educationType}/${educationID}`);
  }

  loadAllUniversities() {
    return this.http.get(`${BASE_URL}/${WAR}/education/universities/load`);
  }

  loadAllSchools() {
    return this.http.get(`${BASE_URL}/${WAR}/education/school/load`);
  }

  loadAllSupervisors(empId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/supervisor/load/${empId}`);
  }

  // Qualification
  // Qualifications post
  saveQualification(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/qualification/save`, payload, this.httpOptions);
  }

  // Qualifications edit
  editQualification(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/qualification/edit`, payload, this.httpOptions);
  }

  // Qualifications delete
  deleteQualification(qualificationID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/qualification/delete/${qualificationID}`);
  }

  loadAllQualifications() {
    return this.http.get(`${BASE_URL}/${WAR}/qualification/load`);
  }

  // Skills
  // Skills post
  saveSkill(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/skill/emp/save`, payload, this.httpOptions);
  }

  // Skills delete
  deleteSkill(skillID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/skill/emp/delete/${skillID}`);
  }

  loadAllSkills() {
    return this.http.get(`${BASE_URL}/${WAR}/skill/load/all`);
  }

  // Accomplishments
  // Accomplishments post
  // original
  saveAccomplishment(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/accomplishment/save`, payload, this.httpOptions);
  }

  // saveAccomplishment(payload: any) {
  //   return this.http.post(`http://localhost:8083/accomplishment/save`, payload, this.httpOptions);
  // }

  // Accomplishments edit
  editAccomplishment(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/accomplishment/edit`, payload, this.httpOptions);
  }

  // Accomplishments delete
  deleteAccomplishment(accomplishmentID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/accomplishment/delete/${accomplishmentID}`);
  }

  loadAllAccomplishments() {
    return this.http.get(`${BASE_URL}/${WAR}/accomplishment/load`);
  }

  getAccomplishmentCategories() {
    return this.http.get(`${BASE_URL}/${WAR}/accomplishment/categories`);
  }

  // Work Info
  // Personal Info edit
  editPersonalDetailsMedi(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/personal-info/save`, payload, this.httpOptions);
  }

  // Overview
  // Profile Timeline
  loadEmpTimeline(searchId: string, myEmpid: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/timeline/${searchId}/${myEmpid}`);
  }

  // Profile Views
  addEmpProfileViews(searchId: string, myEmpid: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/employee-profile-view-count/${searchId}/${myEmpid}`);
  }


  // Timeline post
  saveTimelineRecord(payload: any) {

    return this.http.post(`${BASE_URL}/${WAR}/employee/timeline/save`, payload, this.httpOptions);
    // return this.http.post('http://localhost:8083/employee/timeline/save', payload, this.httpOptions);
  }

  // Timeline edit
  editTimelineRecord(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/employee/timeline/edit`, payload, this.httpOptions);
  }

  // Timeline post
  likeTimelineRecord(payload: any) {
   return this.http.post(`${BASE_URL}/${WAR}/employee/timeline/like`, payload, this.httpOptions);
  }

  // Timeline delete
  deleteTimelineRecord(timelineID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/timeline/delete/${timelineID}`);
  }

  getTimelineUploadedImage(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/file/timeline/cache/${empID}`);
  }

  deleteUploadedTimelineImage(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/file/timeline/delete/cache`, payload, this.httpOptions);
  }

  // Reviews
  // Reviews get given reviews
  getGivenReviews(otherID: string, myEmpID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/review/rs/search/my-reviews/${otherID}/${myEmpID}`);
  }

  // Reviews get
  getReviews(otherID: string, myEmpID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/review/rs/search/${otherID}/${myEmpID}`);
  }

  // Reviews post
  postReviews(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/review/save`, payload, this.httpOptions);
  }

  // Reviews edit
  postEditReviews(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/review/edit`, payload, this.httpOptions);
  }

  // Reviews delete
  deleteReviews(revierID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/review/delete/${revierID}`);
  }

  // Reviews like
  likeReview(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/review/like`, payload, this.httpOptions);
  }

  // Profile Picture Upload
  getUploadedProfPic(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/file/profile/cache/${empID}`);
  }

  // Save Profile Picture
  saveUploadedPicture(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/file/profile/update`, payload, this.httpOptions);
  }

  // Logs
  // Get Activity log
  getActivityLog(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/activity-log?empNo=${empID}`);
  }

  // Requests
  // Get Letter types
  getLetterTypes() {
    return this.http.get(`${BASE_URL}/${WAR}/admin-req/req-letter-type`);
  }

  getEmployeeGroup(employeeGroup: string) {
    return this.http.get(`${BASE_URL}/${WAR}/user/group/employees?group=${employeeGroup}`);
  }

  getSpecialEmployeeGroup(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/user/group/employees/special`, payload, this.httpOptions);
  }

  requestLetter(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-req/letter-req`, payload, this.httpOptions);
  }
  requestFacility(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-req/facility-req`, payload, this.httpOptions);
  }

  requestOPD(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/admin-req/OPD-req`, payload, this.httpOptions);
  }

  loadReligions() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/religions`);
  }

  loadMaritalStatuses() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/marital-statuses`);
  }

  loadTitles() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/titles`);
  }

  loadAddPreviousWorkDetailPreloadData() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/add-previous-work-detail-pre-load-data`);
  }

  savePreviousWorkingDetail(payload: SaveUpdatePreviousWorkDetail) {
    return this.http.post(`${BASE_URL}/${WAR}/employee/previous-work-detail`, payload, this.httpOptions);
  }

  editPreviousWorkingDetail(payload: SaveUpdatePreviousWorkDetail) {
    return this.http.put(`${BASE_URL}/${WAR}/employee/previous-work-detail`, payload, this.httpOptions);
  }

  deletePreviousWorkingDetail(id: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/employee/previous-work-detail/` + id,  this.httpOptions);
  }

  // get employee working project and contributed projects
  getEmployeeWorkingProject(empNo: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/employee-contributed-projects/` + empNo,  this.httpOptions);
  }

  //added
  callMyMethod(params: any = 'Niroshan') {
    this.invokeMyMethod.emit(params);
  }

  // change employee password
  changeEmployeePassword(postJson) {
    return this.http.post( `${BASE_URL}/${WAR}/user/change/current-pwd` , postJson , this.httpOptions);
  }

  // save employee emergency contact
  saveEmployeeEmergencyContactDetails(requestBody) {
    return this.http.post( `${BASE_URL}/${WAR}/personal-info/emergency-contact/save` , requestBody , this.httpOptions);
  }

  //get selected skill history
  getSelectedSkillHistoryOfEmployee( empSkillId: any) {
    return this.http.get( `${BASE_URL}/${WAR}/skill/employee/${empSkillId}/history` , this.httpOptions );
  }
}
