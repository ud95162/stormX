import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsageFilter} from '../body/app-usage-dashboard-components/usage-filter.model';
import {Subject} from 'rxjs';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class AppUsageServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  usageFilterSubject = new Subject<UsageFilter>();

  constructor(private http: HttpClient) { }



  loadDailyLoginStats(payload: UsageFilter, type: string, timeDistribution: string) {
    return this.http.post(`${BASE_URL}/${WAR}/app-usage/stats/${type}/${timeDistribution}`, payload, this.httpOptions);
  }

  loadSummaries(payload: UsageFilter, type: string) {
    return this.http.post(`${BASE_URL}/${WAR}/app-usage/summary/${type}`, payload, this.httpOptions);
  }

  loadInconsistentRecords( type: string, status: string ) {
    if (type === null ) {
      if (status === null ) {
        return this.http.get(`${BASE_URL}/${WAR}/inconsistent-records/all`, this.httpOptions);
      } else {
        return this.http.get(`${BASE_URL}/${WAR}/inconsistent-records/all?status=${status}`, this.httpOptions);
      }
    }
  }

  updateCheckedStatusOfRecord( payload: any ) {
    return this.http.put( `${BASE_URL}/${WAR}/inconsistent-records/update`, payload, this.httpOptions );
  }
}
