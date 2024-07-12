import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SeatPlanServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient) {
  }

  fetchSeatPlan(){
    return this.http.get(`/seat-plan/admin-seat/load`);
  }

  fetchProjects(){
    return this.http.get(`/seat-plan/admin-seat/load-project`);
  }

  updateSeat(payload) {
    return this.http.post(`/seat-plan/admin-seat/update`, payload);
  }
}
