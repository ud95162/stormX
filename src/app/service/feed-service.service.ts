import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Profile} from '../_global/profile';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class FeedServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getWallPost(searchEmpID: string, offsetCount: number) {
    return this.http.get(`${BASE_URL}/${WAR}/post/load/${searchEmpID}/${offsetCount}`);

  }

  getFeed(offsetCount: number) {
    return this.http.get(`${BASE_URL}/${WAR}/feed/load/${offsetCount}`);

  }

  getFeedLikers(postId: string, callingFrom: string = 'ANY') {
    return this.http.get(`${BASE_URL}/${WAR}/post/likers/${postId}/${callingFrom}`);

  }

  getFeedTagged(postId: string, callingFrom: string = 'ANY') {
    return this.http.get(`${BASE_URL}/${WAR}/post/taggedIn/${postId}/${callingFrom}`);
  }

  getFeedComments(postId: string, callingFrom: string = 'ANY') {
    return this.http.get(`${BASE_URL}/${WAR}/post/comments/${postId}/${callingFrom}`);
  }

  getLoadMorePost(postId: string, empId: string, callingFrom: string = 'ANY') {
    return this.http.get(`${BASE_URL}/${WAR}/post/load-more/${postId}/${empId}/${callingFrom}`);
  }

  getSinglePost(postID: string, empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/post/load/by-id/${postID}/${empID}`);
  }

  getNameList() {
    return this.http.get(`${BASE_URL}/${WAR}/employee/names`);
  }

  getCourseList(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/course/load/${empID}`);
  }

  getTaggedImages(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/post/load/images/${empID}`);
  }

  postCourseRead(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/course/read`, payload, this.httpOptions);
  }

  getUploadImageList(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/file/cache/${empID}`);
  }

  deleteImageUploadCache(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/file/cache/clear/${empID}`);
  }

  deleteUploadImageArray(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/file/delete/cache`, payload, this.httpOptions);

  }

  saveWallPost(payload: any, callingFrom: string = 'ANY') {
    return this.http.post(`${BASE_URL}/${WAR}/post/save/${callingFrom}`, payload, this.httpOptions);

  }

  editWallPost(payload: any, callingFrom: string = 'ANY') {
    return this.http.put(`${BASE_URL}/${WAR}/post/edit/${callingFrom}`, payload, this.httpOptions);

  }

  postEditCurrentURLList(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/file/feed/upload/edit/urls/${Profile.EMPLOYEE_ID}`, payload, this.httpOptions);

  }

  deleteWallPost(postID: string, empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/post/delete/${postID}/${empID}`, this.httpOptions);

  }

  likeWallPost(payload: any, callingFrom: string = 'ANY') {
    return this.http.post(`${BASE_URL}/${WAR}/post/like/${callingFrom}`, payload, this.httpOptions);

  }

  saveCommentWallPost(payload: any, callingFrom: string = 'ANY') {
    return this.http.post(`${BASE_URL}/${WAR}/post/comment/save/${callingFrom}`, payload, this.httpOptions);

  }

  deleteCommentWallPost(commentID: string, postId: string, callingFrom: string = 'ANY') {
    return this.http.get(`${BASE_URL}/${WAR}/post/comment/delete/${commentID}/${postId}/${callingFrom}`);

  }

  hideFromFeedPost(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/post/hide`, payload, this.httpOptions);

  }

  getMaxOffset() {
    return this.http.get(`${BASE_URL}/${WAR}/post/count`);

  }

  postGreeting(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/greeting/save`, payload, this.httpOptions);

  }

  getSubscribedCategories(empId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/post/load/subscription/${empId}`);

  }

  postSubscribe(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/post/subscription`, payload, this.httpOptions);

  }

  getProfileProgress(empID: string) {
    return this.http.get(`${BASE_URL}/${WAR}/employee/section/load/${empID}?empNo=${empID}`);

  }

  getEmailSubscribedCategories() {
    return this.http.get(`${BASE_URL}/${WAR}/mail/unsubscription/load`);
  }

  postEmailSubscribe(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/mail/unsubscription/save`, payload, this.httpOptions);

  }

  getFeedNews() {
    return this.http.get(`${BASE_URL}/${WAR}/urgent-news/all`);
  }

  getEmployeeListWithStatus(status) {
    if (status === 'Active') {
      return this.http.get(`${BASE_URL}/${WAR}/employee/names`);
    } else {
      return this.http.get(`${BASE_URL}/${WAR}/employee/names?flag=${status}`);
    }
  }
}
