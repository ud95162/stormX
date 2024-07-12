import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Profile} from '../../_global/profile';
import {Observable} from 'rxjs/Observable';

// const BASE_URL = environment.API_PATH;
const BASE_URL = 'http://localhost:8080';
const WAR = environment.RECRUITMENT_NEW_WAR;

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': Profile.USER_TOKEN
  })
};

@Injectable({
  providedIn: 'root'
})
export class RecruitmentNewService {

  constructor(private http: HttpClient) {
    /*
       Profile.USER_TOKEN not apply in above
       therefore have to apply below part
     */
    httpOptions.headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': Profile.USER_TOKEN
    });
  }

  getHeadCount(): Observable<any> {
    return this.http.get(`${BASE_URL}/${WAR}/tokenauth/recruitment-new/head-count`, httpOptions);

  }

  /*
  from: '2020-05-10',
  to: '2020-10-10'
   */
  getHeadCountByDateRange(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/recruitment_new/get_head_count`, payload, httpOptions);
  }

  getCandidatesBystate(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/candidates-by-state`, payload, httpOptions);
  }


  getCandidatesBystateRange(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/interview/get_candidates_by_state_range', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/get_candidates_by_state_range`, payload, httpOptions);
  }

  getAllCandidatesStates(): Observable<any> {
    // return this.http.get('http://localhost:8080/tokenauth/recruitment-new/current-state', httpOptions);
    return this.http.get(`${BASE_URL}/${WAR}/tokenauth/recruitment-new/current-state`, httpOptions);
  }

  changeCandidateState(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/interview/change_status', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/change_status`, payload, httpOptions);
  }

  updateCandidateForm(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/interview/', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/`, payload, httpOptions);
  }

  addExamMarks(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/interview/add_exam_marks', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/add_exam_marks`, payload, httpOptions);
  }

  addInterviewScore(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/interview/add_interview_marks', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/add_interview_marks`, payload, httpOptions);
  }

  getCandidateInterviewScore(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/interview/get_candidate_interview_data', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/interview/get_candidate_interview_data`, payload, httpOptions);
  }

  getCandidateInfo(payload: any): Observable<any> {
    // return this.http.post('http://localhost:8080/recruitment_new/get_cv_info', payload, httpOptions);
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/recruitment_new/get_cv_info`, payload, httpOptions);
  }

  // --------------- selection criteria ------------------------------------------------

  getAllSelectionCriterias(): Observable<any> {
    return this.http.get(`${BASE_URL}/${WAR}/tokenauth/selection-criteria/all`, httpOptions);
    // return this.http.get('http://127.0.0.1:8080/selection-criteria/get-all', httpOptions);
  }

  addNewSelectionCriteria(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/selection-criteria/add`, payload, httpOptions);
    // return this.http.post('http://127.0.0.1:8080/selection-criteria/add', payload, httpOptions);
  };

  addNewSelectionCriteriaCondition(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/selection-criteria/add-new-condition`, payload, httpOptions);
    // return this.http.post('http://127.0.0.1:8080/selection-criteria/add-new-condition', payload, httpOptions);
  }

  removeSelectionCriteriaDesignation(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/selection-criteria/delete`, payload, httpOptions);
    // return this.http.post('http://127.0.0.1:8080/selection-criteria/delete', payload, httpOptions);
  };

  removeSelectionCriteriaCondition(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${WAR}/tokenauth/selection-criteria/delete-condition`, payload, httpOptions);
    // return this.http.post('http://127.0.0.1:8080/selection-criteria/delete-condition', payload, httpOptions);
  }

  // internal cv
  saveInternalCv(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    // formData.append('designation', 'designation');
    // formData.append('uploadBy', 'upload by');
    // formData.append('comment', 'comment');
    return this.http.post('http://127.0.0.1:8080/kiyo_recruitment_internalcv/save', formData, httpOptions);
  }

  getPdf(): Observable<any> {
    return this.http.get('http://localhost:8080/kiyo_recruitment_internalcv/g', httpOptions);
  }

  getAllDesignations(): Observable<any> {
    return this.http.get('http://localhost:8080/kiyo_recruitment_internalcv/get_all_designations', httpOptions);
  }

  getDesignationBySearching(keyword: string): Observable<any> {
    return this.http.get(`http://localhost:8080/kiyo_recruitment_internalcv/get_designations/${keyword}`, httpOptions);
  }

}

