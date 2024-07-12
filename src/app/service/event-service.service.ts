import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class EventServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllEvents(loadType: string) {
    return this.http.get(`${BASE_URL}/${WAR}/event/all/${loadType}`);
  }

  getEventById(eventId: string) {
    return this.http.get(`${BASE_URL}/${WAR}/event/load/${eventId}`);
  }

  deleteEventById(eventId: string, deleteType: number) {
    return this.http.get(`${BASE_URL}/${WAR}/event/delete/${eventId}/${deleteType}`);
  }

  getEventPreData() {
    return this.http.get(`${BASE_URL}/${WAR}/event/pre/load`);
  }

  getOngoingEvents() {
    return this.http.get(`${BASE_URL}/${WAR}/event/current/moment`);
  }

  editEventAttendingStatus(eventId: string, eventState: string) {
    return this.http.get(`${BASE_URL}/${WAR}/event/type/accept/${eventId}/${eventState}`, this.httpOptions);
  }

  checkAvailability(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/event/booking`, payload, this.httpOptions);
  }

  saveEvent(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/event/save`, payload, this.httpOptions);
  }

  editEvent(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/event/edit`, payload, this.httpOptions);
  }

  // Calendar
  getALLCalendarEvents(year: string, month: string) {
    return this.http.get(`${BASE_URL}/${WAR}/calendar/events/all?year=${year}&month=${month}`);
  }

  getVenueCalendarEvents(year: string, month: string, venueid: string, allormyevent: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${BASE_URL}/${WAR}/calendar/events/venue?year=${year}&month=${month}&venueId=${venueid}&allOrMyEvents=${allormyevent}`);
  }

  getVenueAll() {
    return this.http.get(`${BASE_URL}/${WAR}/calendar/venue/all`, this.httpOptions);
  }

  getPreCalendar() {
    return this.http.get(`${BASE_URL}/${WAR}/calendar/pre-inserting`);
  }

  // Selan - start
  getVenueCalendarWeekEvents(year: string, month: string, venueid: string, allormyevent: string, day: string, type: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${BASE_URL}/${WAR}/calendar/events/venue/week?year=${year}&month=${month}&venueId=${venueid}&allOrMyEvents=${allormyevent}&day=${day}&type=${type}`);
  }

  getCalenderType() {
    return this.http.get(`${BASE_URL}/${WAR}/calendar/type`);
  }

  getAllProjectsForAppreciation() {
    return this.http.get(`${BASE_URL}/${WAR}/project/load/Images`);
  }

  getSelectedProjectQuotes(project_id: string, year: string) {
    return this.http.get(`${BASE_URL}/${WAR}/empAppreciation/load/quotes/` + project_id + '/' + year);
  }

  getManagementQuotes(emp_id: string, year: string) {
    return this.http.get(`${BASE_URL}/${WAR}/empAppreciation/load/mgmtQuotes/` + emp_id + '/' + year);
  }

  // -----------------------------------meeting pods endpoints--------------------------

  getSelectedPodDetailsByName( podName: string ) {
    return this.http.get( `${BASE_URL}/${WAR}/event/venue/${podName}`);
  }

  getSelectedVenueCurrentAndNextEvents( podName: string ) {
    return this.http.get( `${BASE_URL}/${WAR}/event/${podName}/current-next`);
  }

  getNextAvailableSlotInSelectedVenue(podName: any) {
    return this.http.get(`${BASE_URL}/${WAR}/event/${podName}/available-slot`);
  }

  getAllEventsForDayInSelectedVenue( podName: any ) {
    return this.http.get(`${BASE_URL}/${WAR}/event/${podName}/all-events`);
  }
}
