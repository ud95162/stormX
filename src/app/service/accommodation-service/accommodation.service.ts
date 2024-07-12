import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }

  getRoutes() {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/routes`, this.httpOptions);
  }

  getPickUpLocations(routeID: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/pickup-points?route-id=${routeID}`, this.httpOptions);
  }

  getEmployeeTransportDetailsForWeek(empNo: string, date: string) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/week-details/emp-no/${empNo}/date/${date}`, this.httpOptions);
  }

  saveTransportRequest(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/transports`, payload, this.httpOptions);
  }

  updateTransportRequest(requestID: any, payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/transports/${requestID}`, payload,  this.httpOptions);
  }

  getSeatAvailableSlotsForWeek(seatNo, date) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/seats/week-details/seat-no/${seatNo}/date/${date}`, this.httpOptions);
  }

  getSeatAvailableSlotsForRange(seatNo, startDate, endDate) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/seats?end-date=${endDate}&seat-no=${seatNo}&start-date=${startDate}`, this.httpOptions);
  }

  saveSeatsForDays(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/seats`, payload, this.httpOptions);
  }

  saveAccommodation(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/accommodations`, payload, this.httpOptions);
  }

  getAccommodationBookingDetails(empNo, date) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/week-details/emp-no/${empNo}/date/${date}`, this.httpOptions);
  }

  deleteBookingSeat(seatID: any) {
    return this.http.delete(`${BASE_URL}/${WAR}/booking/seats/${seatID}`, this.httpOptions);
  }

  updateAccommodationBookingRequestStatus(accommodationID: any, payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/accommodations/change-status/${accommodationID}`, payload, this.httpOptions);
  }

  editAccommodationBookingRequest(accommodationID: any, payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/accommodations/${accommodationID}`, payload, this.httpOptions);
  }

  getEmployeeBookedSeats(date: any, empID: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/seats/week-details/emp-no/${empID}/date/${date}`, this.httpOptions);
  }

  getEmployeeTransportForRange(empID: any, startDate: any, endDate: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports?emp-no=${empID}&end-date=${endDate}&start-date=${startDate}`, this.httpOptions);
  }

  getEmployeeAccommodationForRange(empID, startDate, endDate) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations?emp-no=${empID}&end-date=${endDate}&start-date=${startDate}`, this.httpOptions);
  }

  getEmployeeBookedSeatsForRange(empID, startDate, endDate) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/seats/user-summary?emp-no=${empID}&end-date=${endDate}&start-date=${startDate}`, this.httpOptions);
  }

  getRemainingDatesToApplyAccommodationForSeat(empNo: any, seatNo: any, startDate: any, endDate: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/valid-dates?emp-no=${empNo}&end-date=${endDate}&seat-no=${seatNo}&start-date=${startDate}`, this.httpOptions);
  }

  // -------------------hr view of transport------------------------

  getTransportDetails(date: any, empNo: any, routeID: any, status: any, timeSlot: any) {
    if (status === '') {
      return this.http.get(`${BASE_URL}/${WAR}/booking/transports/reports/details?date=${date}&route-id=${routeID}&transport-time-slot-name=${timeSlot}`, this.httpOptions);
    } else {
      if (timeSlot === '')  {
        return this.http.get(`${BASE_URL}/${WAR}/booking/transports/reports/details?date=${date}&route-id=${routeID}&transport-status=${status}`, this.httpOptions);
      } else {
        return this.http.get(`${BASE_URL}/${WAR}/booking/transports/reports/details?date=${date}&route-id=${routeID}&transport-status=${status}&transport-time-slot-name=${timeSlot}`, this.httpOptions);
      }
    }
  }

  getTransportSummary(date: any, route: any, timeSlot: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/summary?date=${date}&route-id=${route}&transport-time-slot-name=${timeSlot}`, this.httpOptions);
  }

  updateTransportRequestStatus(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/transports/change-status`, payload, this.httpOptions);
  }

  getDriversTransportDetails(date: any, routeID: any, status: any, slot: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/reports/drivers-need-details?date=${date}&route-id=${routeID}&transport-status=${status}&transport-time-slot-name=${slot}`, this.httpOptions);
  }

  getTransportLocations() {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/routes/locations`, this.httpOptions);
  }

  saveTransportLocation(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/transports/routes/locations`, payload, this.httpOptions);
  }

  saveRoute(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/transports/routes`, payload, this.httpOptions);
  }

  editRoute(routeID, payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/transports/routes/${routeID}`, payload, this.httpOptions);
  }

  deleteRoute(routeID: any) {
    return this.http.delete(`${BASE_URL}/${WAR}/booking/transports/routes/${routeID}`, this.httpOptions);
  }

  getPickUpLocationsDetails(routeID: any, locationID: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/pickup-points/details?pickup-point-id=${locationID}&route-id=${routeID}`, this.httpOptions);
  }

  savePickUpLocations(payload: any) {
    return this.http.post(`${BASE_URL}/${WAR}/booking/transports/pickup-points`, payload, this.httpOptions);
  }

  getAccommodationReportsDetails(date: any, status: any, slot: any, gender: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/reports?end-date=${date}&project-id=0&start-date=${date}&accommodation-status=${status}&gender=${gender}`, this.httpOptions);
  }

  getAccommodationSummary(date: any, status: any, slot: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/summary?accommodation-status=${status}&end-date=${date}&start-date=${date}`, this.httpOptions);
  }

  getAccommodationFacilitySummary(date: any, slot: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/accommodations/facility/summary/${date}`, this.httpOptions);
  }

  updateAccommodationRequest(payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/accommodations/change-status`, payload, this.httpOptions);
  }

  deletePickUpLocation(pointID: any) {
    return this.http.delete(`${BASE_URL}/${WAR}/booking/transports/pickup-points/${pointID}`, this.httpOptions);
  }

  getSeatBookingSummary(date: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/seats/user-summary?end-date=${date}&start-date=${date}`, this.httpOptions);
  }

  getSeatBooking(date: any) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/seats?end-date=${date}&start-date=${date}`, this.httpOptions);
  }

  // get route wise seat availability
  getSeatAvailabilityData(date: string, routeId: any, timeSlot: string) {
    if (routeId === 0) {
      if (timeSlot === '') {
        return this.http.get(`${BASE_URL}/${WAR}/booking/transports/seat-count-status?date=${date}`, this.httpOptions);
      } else {
        return this.http.get(`${BASE_URL}/${WAR}/booking/transports/seat-count-status?date=${date}&transport-time-slot-name=${timeSlot}`, this.httpOptions);
      }
    } else {
      if (timeSlot === '') {
        return this.http.get(`${BASE_URL}/${WAR}/booking/transports/seat-count-status?date=${date}&route-id=${routeId}`, this.httpOptions);
      } else {
        return this.http.get(`${BASE_URL}/${WAR}/booking/transports/seat-count-status?date=${date}&transport-time-slot-name=${timeSlot}&route-id=${routeId}`, this.httpOptions);
      }
    }
  }

  // get employee self transport details
  getLoggedEmployeeTransportSummaryDetails(startDate: string, endDate: string) {
    return this.http.get(`${BASE_URL}/${WAR}/booking/transports/self?start-date=${startDate}&end-date=${endDate}`, this.httpOptions);
  }

  // get transport and accommodation cut off times
  getCutOffTimeData() {
    return this.http.get(`${BASE_URL}/${WAR}/booking/config`, this.httpOptions);
  }

  updateCutOffTime(stream: string, payload: any) {
    return this.http.put(`${BASE_URL}/${WAR}/booking/config/allocation-setting-type/${stream}`, payload, this.httpOptions);
  }
}
