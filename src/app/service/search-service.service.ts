import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class SearchServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  /*---------------------------------------------------
   SEARCH
   ---------------------------------------------------*/
  getSearchResultNLP(search_key: string) {
    return this.http.get(`${BASE_URL}/${WAR}/search/result/nlp/${search_key}`);
  }

  getSearchResultGraph(search_key: string) {
    return this.http.get(`${BASE_URL}/${WAR}/search/result/${search_key}`);
  }

  getSearchKeys(searchKey: any) {
    // return this.http.get(`${BASE_URL}/${WAR}/search/keys`);
    return this.http.get('http://localhost:4000/searchKeys');
  }

  getSearchResults(searchKey: any) {
    return this.http.get(`${BASE_URL}/${WAR}/search/emp-search/${searchKey}`);
  }

  getSearchSuggestions(search_key: string) {
    return this.http.get(`${BASE_URL}/${WAR}/search/suggestions/${search_key}`);
  }

  getSearchInterestedResults(search_key: string) {
    return this.http.get(`${BASE_URL}/${WAR}/search/people-interested/${search_key}`);
  }

  postToGenerateReport(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/report/filter`, payload, this.httpOptions);
  }
}
