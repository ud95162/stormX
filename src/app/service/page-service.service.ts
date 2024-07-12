import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class PageServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getPageHeader(pageId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/page/header-data?page=${pageId}`);
  }

  getPageAbout(pageId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/page/about?page=${pageId}`);
  }

  getPageAlbums(pageId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/page/post/albums?page=${pageId}`);
  }

  getPageReviewsReceived(pageId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/page/reviews?page=${pageId}`);
  }

  getPageReviewsGiven(pageId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/page/reviews/given?page=${pageId}`);
  }

  getAllPages() {
    return this.http.get(`${BASE_URL}/${WAR}/page/all`);
  }

  getPagesForUser() {
    return this.http.get(`${BASE_URL}/${WAR}/page/emp-pages`);
  }

  editDescription(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/page/edit/overview/story`, payload, this.httpOptions);
  }

  saveMilestone(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/page/milestone`, payload, this.httpOptions);
  }

  savePage(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/page/new`, payload, this.httpOptions);
  }

  changePageImage(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/page/profile-image`, payload, this.httpOptions);
  }

  deleteMilestone(milestoneId: string, pageId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/page/milestone/${milestoneId}/${pageId}`);
  }

  updateAdmins(pageId: string, payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/page/admins?page=${pageId}`, payload, this.httpOptions);
  }

}
