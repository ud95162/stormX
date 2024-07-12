import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {InterCommunicationServiceService} from "../../../../service/support-services/inter-communication-service.service";
import {CONSTANT} from "../../../../utility/Constants";

@Component({
  selector: 'app-settings-system-config-events',
  templateUrl: './settings-system-config-events.component.html',
  styleUrls: ['./settings-system-config-events.component.css']
})
export class SettingsSystemConfigEventsComponent implements OnInit {

  preData: Observable<any>;
  eventResponse: any;
  timeResponse: any;

  eventSaveObj = {
    'startTime': '06:00:00',
    'endTime': '23:00:00'
  };

  venueSaveObj = {
    'venueName': '',
    'capacity': 0,
    'featureList': []
  };

  validationErrorMessage = '';

  errorCode;
  errorType;
  errorMessage;

  constructor(private settingshttpservice: SettingsServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.preData = this.settingshttpservice.getEventVenueConfigPreLoadData();
  }

  addFacility(facilityId) {

    if (this.venueSaveObj.featureList.includes(facilityId)) {
      const index = this.venueSaveObj.featureList.indexOf(facilityId);
      if (index > -1) {
        this.venueSaveObj.featureList.splice(index, 1);
      }
    } else {
      this.venueSaveObj.featureList.push(facilityId);
    }

  }

  venueFacilityChip(facilityId) {
    if (this.venueSaveObj.featureList.includes(facilityId)) {
      return 'chip-selected-facility';
    } else {
      return 'chip-not-selected-facility';
    }
  }

  saveCalendarEventTime() {

    this.settingshttpservice.saveCalendarEventStarEndTime(this.eventSaveObj).subscribe((data: any) => {
      this.eventResponse = data;
      if (data.httpStatusCode === 200) {
        this.openErrorModal(1111, 'SUCCESS', 'Calendar event time added successfully');
      } else {
        this.openErrorModal(2001, 'ERROR', '');
      }

      // (<HTMLInputElement>document.getElementById('openNotificationPopup')).click();
      //
      // setTimeout(() => {
      //   (<HTMLInputElement>document.getElementById('closeNotificationPopup')).click();
      // }, 2000);

    }, error => {
      console.log(error);
    });

  }

  setErrorMessage(message: string) {
    this.validationErrorMessage = message;
    setTimeout(() => this.validationErrorMessage = '', 3000);
  }

  checkVenueCapacity() {
    if (this.venueSaveObj.capacity === null) {
      this.setErrorMessage(CONSTANT.ERROR_MSG.EVENT_CONFIG.EMPTY_VENUE_CAPACITY);
      return false;
    } else {
      return true;
    }
  }

  checkVenueName() {
    if (this.venueSaveObj.venueName === null || this.venueSaveObj.venueName === '') {
      this.setErrorMessage(CONSTANT.ERROR_MSG.EVENT_CONFIG.EMPTY_VENUE_NAME);
      return false;
    } else {
      return true;
    }
  }

  checkValidations() {
    return this.checkVenueCapacity() && this.checkVenueName();
  }


  saveEventVenue() {
    if (this.checkValidations()) {
      this.settingshttpservice.saveEventVenueConfiguration(this.venueSaveObj).subscribe((data: any) => {
        this.eventResponse = data;

        if (data.httpStatusCode === 200 && data.message === 'Successful') {
          this.openErrorModal(1111, 'SUCCESS', 'venue added successfully');
        } else if (data.httpStatusCode === 200 && data.message !== 'Successful') {
          this.openErrorModal(1111, 'ERROR', data.message);
        } else {
          this.openErrorModal(2001, 'ERROR', '');
        }
      }, error => {
        console.log(error);
      });
    }
  }

  //added
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

}
