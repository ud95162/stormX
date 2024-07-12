import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AttendanceServiceService } from 'app/service/attendance-service.service';
import {System} from '../../../../_global/system';
import {Event} from '../../../../_global/event';

@Component({
  selector: 'app-daily-dashboard',
  templateUrl: './daily-dashboard.component.html',
  styleUrls: ['./daily-dashboard.component.css']
})
export class DailyDashboardComponent implements OnInit {

   emp_no;

   csrCount = 0;
   trainingHours = 0;

   avgInTime = '00:00 AM';
   avgOutTime = '00:00 PM';
   avgWorkHrs = '0.00';
   avgOfficeHrs = '0.00';

  // for wwt
  wwtTotalTime = 0;
  wwtLevel = 0;

   today = Event.setCurrentDateTime().processedFullDate;

   selectionObj = {
    'orderBy': '',
    'empNoList': [localStorage.getItem('lsei_')],
    'selectedProject': 'Personal',
    'rangeType': 'Custom',
    'fromDate': this.today,
    'toDate': this.today,
    'key': System.generateRandomKey(32),
    'sortingObj': {
      'sortBy': 'outTime',
      'reversed': 'false'
    }
  };

  constructor(
     private attendanceService: AttendanceServiceService,
  ) { }

  ngOnInit() {
    this.emp_no = localStorage.getItem('lsei_');
    this.selectionObj['empNoList'] = [this.emp_no];
    // call default attendance value getting
    // this.getAtttendanceValues('lastmonth');
  }

  // get attendace details
   callAttendanceApi() {
    this.attendanceService.postToLoadOfficeActualHourStatsData(this.selectionObj)
      .subscribe((data: any) => {
        this.avgInTime = data['summaryHeadData'][0]['value'];
        this.avgOutTime = data['summaryHeadData'][1]['value'];
        this.avgWorkHrs = data['summaryHeadData'][2]['value'];
        this.avgOfficeHrs = data['summaryHeadData'][3]['value'];
      });
  }

  // for getting attendance values
  getAtttendanceValues(value: String) {
    const d = new Date();
    let start = '';
    let end = '';
    switch (value) {
      case 'lastweek':
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 7);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;

      case 'lastmonth':
        d.setDate(d.getDate() - 30);
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 30);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;

      case 'lastquarter':
        d.setDate(d.getDate() - 30);
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 90);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;

      case 'lastyear':
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 365);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;
    }
    this.selectionObj = {
      'orderBy': '',
      'empNoList': [localStorage.getItem('lsei_')],
      'selectedProject': 'Personal',
      'rangeType': 'Custom',
      'fromDate': start,
      'toDate': end,
      'key': System.generateRandomKey(32),
      'sortingObj': {
        'sortBy': 'outTime',
        'reversed': 'false'
      }
    };

    this.callAttendanceApi();
  }

  setCsrAndTraingData(data) {
    this.csrCount = data['csr'];
    this.trainingHours = data['training'];
  }

  setWWTData(total, level) {
    this.wwtTotalTime = total.toFixed(2);
    this.wwtLevel = level;
  }
}
