import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-time-range-selector',
  templateUrl: './time-range-selector.component.html',
  styleUrls: ['./time-range-selector.component.css'],
})
export class TimeRangeSelectorComponent implements OnInit {

  @Output() timeRange = new EventEmitter();

  today = '';
  showDatePickers = false;

  payload: any;
  year: number;
  month_no: number;
  day: number;

  customDateRange = {
    dateRangeToDate : '',
    dateRangeFromDate: ''
  };

  constructor() { }

  ngOnInit() {
    this.getTodayDate();
    // called default range
    this.onRadioChange('lastmonth');

    this.timeRange.emit(this.payload);
  }

  updateAttendanceRequest() {

  }

  onRadioChange(value) {


    // control showing datepickers
    // if (value === 'custom') {
    //   this.showDatePickers = true;
    // }
    // else {
    //   this.showDatePickers = false;
    // }

    this.payload = {
      'range': value,
      'year': this.year,
      'month_no': this.month_no,
      'day': this.day
    };

    // send data for parent (profile-overview component)

    this.timeRange.emit(this.payload);
  }


  getTodayDate() {
    const d = new Date();
    this.year = d.getFullYear();
    this.month_no = d.getMonth() + 1;
    this.day = d.getDate();
  }
}

