import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class AccommmodataionSettingsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getFacilities() {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/facility/details?facility-id=0`, this.httpOptions);
  }
  getAllAdmins() {
    return this.http.get(`${BASE_URL}/${WAR}/booking/admins`, this.httpOptions);
  }
  getFacility(id) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/facility/`+id, this.httpOptions);
  }
  editFacilityDetails(id, json) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/accommodations/facility/details/` + id, json, this.httpOptions);
  }

  saveFacility(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/accommodations/facility/`, payload, this.httpOptions);
  }

  saveFacilityDetails(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/accommodations/facility/details`, payload, this.httpOptions);
  }

  editFacility(id, json2) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/accommodations/facility/` + id, json2, this.httpOptions);
  }

  deleteFacilityDetails(routeID) {
    return this.http.delete(`${BASE_URL}/${WAR}/booking/accommodations/facility/details/` + routeID, this.httpOptions);
  }

  deleteFacility(facilityID) {
    return this.http.delete(`${BASE_URL}/${WAR}/booking/accommodations/facility/` + facilityID , this.httpOptions);
  }

  deleteAdmin(facilityID) {
    return this.http.delete(`${BASE_URL}/${WAR}/booking/admins/` + facilityID , this.httpOptions);
  }
  editAdmin(id, json2) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/admins/` + id, json2, this.httpOptions);
  }
  saveAdmin(payload) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/admins`, payload, this.httpOptions);
  }
}
