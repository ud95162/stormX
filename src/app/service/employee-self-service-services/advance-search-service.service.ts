import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class AdvanceSearchServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAdvanceSearchMembers(searchKey: string, filter: string) {
    return this.http.get(`${BASE_URL}/${WAR}/advanceSearch/nlp?searchKey=${searchKey}&filter=${filter}`);
  }

  getAdvanceSearchPostsOffset(searchQuery: string, filters: string, filterValue: string) {
    return this.http.get(`${BASE_URL}/${WAR}/searchPost/count?query=${searchQuery}&addedFilter=${filters}&addedFilterVal=${filterValue}`);
  }

  getAdvanceSearchPosts(searchQuery: string, offset: number, filters: string, filterValue: string) {
    return this.http.get(`${BASE_URL}/${WAR}/post/searchPosts?query=${searchQuery}&offset=${offset}&addedFilter=${filters}&addedFilterVal=${filterValue}`);
  }

  getAdvanceSearchFilters(searchQuery: string, searchBy: string, filters: string) {
    return this.http.get(`${BASE_URL}/${WAR}/searchFilters/nlp?searchKey=${searchQuery}&searchBy=${searchBy}&filter=${filters}`);
  }

  getAdvanceSearchPages(searchKey: string) {
    return this.http.get(`${BASE_URL}/${WAR}/search/pages/${searchKey}`);
  }
}
