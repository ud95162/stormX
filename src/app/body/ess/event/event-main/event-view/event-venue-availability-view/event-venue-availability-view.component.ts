import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventServiceService} from '../../../../../../service/event-service.service';
import {ResponsiveService} from '../../../../../../utility/responsive-service';
import {Event} from '../../../../../../_global/event';

@Component({
  selector: 'app-event-venue-availability-view',
  templateUrl: './event-venue-availability-view.component.html',
  styleUrls: ['./event-venue-availability-view.component.css']
})
export class EventVenueAvailabilityViewComponent implements OnInit {
  employeeId = localStorage.getItem('leid_');

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  currentDateTime = Event.setCurrentDateTime().processedFullDate;
  currentDateAndTime = Event.setCurrentDateTime().processedFullDate + 'T' + Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute;

  startDateTime;
  endDateTime;

  todayDateTimeToCreate = Event.setCurrentDateTime().processedFullDate + 'T' + Event.setCurrentDateTime().processedFullTime;
  startDateTimeToCreate = Event.setCurrentDateTime().processedFullDate + 'T' + Event.setCurrentDateTime().processedFullTime;
  endDateTimeToCreate = Event.setCurrentDateTime().processedFullDate + 'T' + Event.setCurrentDateTime().processedFullNextTime;
  locationToCreate;
  maxDateTimeToCreate = '9999-12-31T12:00';
  showCheckAvailabilityBtn = false;

  eventPreData;
  showForm = false;
  locationToCheck = 'Location';

  showLocations = false;
  showNoResults = false;
  dataLoading = false;
  searchedLocationData;

  locationSuggestionTypes = [{
    'name': 'Requested Location',
    'key': 'available'
  }, {
    'name': 'Suggestions based on Location',
    'key': 'time'
  }, {
    'name': 'Suggestions based on Time',
    'key': 'location'
  }];
  validationError = '';

  constructor(private responsiveService: ResponsiveService, private zone: NgZone, private httpservice: EventServiceService, public router: Router) {
    // GET INITIAL VALUE BASED ON DEVICE WIDTHS AT TIME THE APP RENDERS
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    let that = this;

    /*---------------------------------------------------
     TAP INTO LISTENERS FOR WHEN DEVICE WIDTH CHANGES
     ---------------------------------------------------*/

    this.responsiveService.OnPhone(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnTablet(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnDesktop(
      function (mediaQueryList: MediaQueryList) {
        that.ShowDesktop();
      }
    );
  }

  ngOnInit() {
    this.loadEventPreData();
  }

  setCustomPaddingOnMobile(viewFrom) {
    if (viewFrom) {
      return '';
    } else {
      return 'custom-w3-padding';
    }
  }

  loadEventPreData() {
    this.httpservice.getEventPreData()
      .subscribe(
        (data: any) => {
          this.eventPreData = data;
          this.showCheckAvailabilityBtn = true;
          this.showForm = true;
        }
      );
  }


  onChangeTimeRecords(changeType) {
    switch (changeType) {
      case 'start':
        this.changeStartDate();
        break;
      case 'end':
        this.changeEndDate();
        break;
    }
  }

  changeStartDate() {
    this.currentDateAndTime = Event.setCurrentDateTime().processedFullDate + 'T' +
      Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute;

    if (this.startDateTimeToCreate !== '' && this.startDateTimeToCreate >= this.currentDateAndTime) {

      this.showCheckAvailabilityBtn = true;
      this.validationError = '';
      document.getElementById('eventStartRecords').classList.remove('error');
      document.getElementById('eventEndRecords').classList.remove('error');
      let date = this.startDateTimeToCreate.split('T')[0];
      let time = this.startDateTimeToCreate.split('T')[1];
      let hour = time.split(':')[0];
      let minute = time.split(':')[1];
      let nexthour = (parseInt(hour) + 1).toString();
      if (nexthour.length === 1) {
        nexthour = '0' + nexthour;
      }
      this.endDateTimeToCreate = date + 'T' + nexthour + ':' + minute;
    } else {
      this.showCheckAvailabilityBtn = false;
      this.validationError = 'Events cannot be created for past days';
      document.getElementById('eventStartRecords').classList.add('error');
    }
  }

  changeEndDate() {
    this.currentDateAndTime = Event.setCurrentDateTime().processedFullDate + 'T' +
      Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute;
    if (this.endDateTimeToCreate <= this.startDateTimeToCreate) {
      this.showCheckAvailabilityBtn = false;
      this.validationError = 'End time should be greater that start time';
      document.getElementById('eventEndRecords').classList.add('error');
    } if (this.endDateTimeToCreate <= this.currentDateAndTime || this.startDateTimeToCreate <= this.currentDateAndTime) {
      this.showCheckAvailabilityBtn = false;
      this.validationError = 'Events cannot be created for past days';
      document.getElementById('eventEndRecords').classList.add('error');
    } else {
      this.showCheckAvailabilityBtn = true;
      this.validationError = '';
      document.getElementById('eventEndRecords').classList.remove('error');
    }
  }

  checkAvailability() {
    this.showLocations = false;
    this.showNoResults = false;
    this.dataLoading = true;

    const eventStartRecords = (<HTMLInputElement>document.getElementById('eventStartRecords')).value;
    const eventEndRecords = (<HTMLInputElement>document.getElementById('eventEndRecords')).value;
    const eventVenueToCheck = (<HTMLInputElement>document.getElementById('eventVenueToCheck')).value;
    this.locationToCheck = eventVenueToCheck;

    this.locationToCreate = eventVenueToCheck;
    this.startDateTimeToCreate = eventStartRecords;
    this.endDateTimeToCreate = eventEndRecords;

    this.startDateTime = {
      'date': eventStartRecords.split('T')[0],
      'time': eventStartRecords.split('T')[1]
    };

    this.endDateTime = {
      'date': eventEndRecords.split('T')[0],
      'time': eventEndRecords.split('T')[1]
    };

    const event = {
      'venue': eventVenueToCheck,
      'start': this.startDateTime,
      'end': this.endDateTime
    };

    this.httpservice.checkAvailability(event)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.searchedLocationData = data.extraObject;
            if (data.extraObject.suggestions.length > 0) {
              this.showLocations = true;
            } else {
              this.showNoResults = true;
            }
          } else {
            this.showLocations = false;
          }
          this.dataLoading = false;
        }
      );
  }

  ShowMobile() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = true;
      this.isTablet = false;
      this.isDesktop = false;
    });
  }

  ShowDesktop() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = false;
      this.isDesktop = true;
    });
  }

  ShowTablet() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    });
  }

}
