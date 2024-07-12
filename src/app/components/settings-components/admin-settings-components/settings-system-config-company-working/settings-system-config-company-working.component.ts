import {Component, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-settings-system-config-company-working',
  templateUrl: './settings-system-config-company-working.component.html',
  styleUrls: ['./settings-system-config-company-working.component.css']
})
export class SettingsSystemConfigCompanyWorkingComponent implements OnInit {
  errorCode;
  errorType;
  errorMessage;

  showWorkingDateTimeConfigPreInsert = false;
  workingDateTimeConfigPreInsert: any;

  showWorkingDateSaveObj = false;
  workingDateSaveObj = {
    'removableDays': ['SU', 'SA'],
    'workingDays': [],
    'workStartingDate': ''
  };

  workingHourSaveObj = {
    'startingTime': '08:30:00',
    'endingTime': '17:30:00',
    'officeHours': 9,
    'workingHours': 8,
    'timeMargins': [
      {
        'type': 'In',
        'margins': [
          {
            'range': 'Early',
            'upper': '00:00:00',
            'lower': '08:00:00',
            'colorCode': '#ef3648'
          },
          {
            'range': 'On-Time',
            'upper': '08:00:00',
            'lower': '10:00:00',
            'colorCode': '#ef3648'
          },
          {
            'range': 'Late',
            'upper': '10:00:00',
            'lower': '12:00:00',
            'colorCode': '#ef3648'
          }
        ]
      },
      {
        'type': 'Out',
        'margins': [
          {
            'range': 'Early',
            'upper': '14:00:00',
            'lower': '17:00:00',
            'colorCode': '#ef3648'
          },
          {
            'range': 'On-Time',
            'upper': '17:00:00',
            'lower': '18:00:00',
            'colorCode': '#ef3648'
          },
          {
            'range': 'Late',
            'upper': '18:00:00',
            'lower': '23:59:00',
            'colorCode': '#ef3648'
          }
        ]
      }
    ]
  };

  specialLeavesToProcess = [];
  yearToView: any;
  systemCompanyLeaveConfigData: any;
  showSystemCompanyLeaveConfigData: any;


  constructor(private settingsServiceService: SettingsServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadSystemDateConfigDataPreInsert();
    this.loadSystemDateConfigData();
    // this.loadSystemCompanyLeaveConfigData();
  }

  loadSystemDateConfigDataPreInsert() {
    this.settingsServiceService.getSystemDateConfigDataPreInsert()
      .subscribe(
        (data: any) => {
          this.workingDateTimeConfigPreInsert = data;
          this.workingDateSaveObj.workStartingDate = this.workingDateTimeConfigPreInsert.allDaysInWeek[0];
          this.showWorkingDateTimeConfigPreInsert = true;
        }, error => {
          this.showWorkingDateTimeConfigPreInsert = false;
          console.log(error);
        }
      );
  }

  loadSystemCompanyLeaveConfigData() {
    this.settingsServiceService.getSystemCompanyLeaveConfigData()
      .subscribe(
        (data: any) => {
          this.specialLeavesToProcess = data[0].leaves;
          this.yearToView = data[0].year;
          this.systemCompanyLeaveConfigData = data;
          this.showSystemCompanyLeaveConfigData = true;
        }, error => {
          this.showSystemCompanyLeaveConfigData = false;
          console.log(error);
        }
      );
  }

  loadSystemDateConfigData() {
    this.settingsServiceService.getSystemDateConfigData()
      .subscribe(
        (data: any) => {
          this.workingDateSaveObj = data;
          this.showWorkingDateSaveObj = true;
        }
      );
  }

  setRepeatingDate(notRepeatDay) {
    if (this.workingDateSaveObj.removableDays.includes(notRepeatDay)) {
      const index = this.workingDateSaveObj.removableDays.indexOf(notRepeatDay);
      if (index > -1) {
        this.workingDateSaveObj.removableDays.splice(index, 1);
      }
    } else {
      this.workingDateSaveObj.removableDays.push(notRepeatDay);
    }
  }

  setEventRepeatChips(notRepeatDay) {
    if (this.workingDateSaveObj.removableDays.includes(notRepeatDay)) {
      return 'chip-repeat-day';
    } else {
      return 'chip-selected-repeat-day';
    }
  }

  getArrayDiff(arr1, arr2) {
    var a = [], diff = [];
    for (var i = 0; i < arr1.length; i++) {
      a[arr1[i]] = true;
    }
    for (var i = 0; i < arr2.length; i++) {
      if (a[arr2[i]]) {
        delete a[arr2[i]];
      } else {
        a[arr2[i]] = true;
      }
    }
    for (var k in a) {
      diff.push(k);
    }
    return diff;
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  clickOnSaveWorkingDays() {
    this.workingDateSaveObj.workingDays = this.getArrayDiff(this.workingDateSaveObj.removableDays, this.workingDateTimeConfigPreInsert.allDaysInWeek);
    console.log(this.workingDateSaveObj);

    this.settingsServiceService.putSystemDateConfigData(this.workingDateSaveObj)
      .subscribe(
        (data: any) => {
          this.openErrorModal(1111, 'SUCCESS', '');
          this.loadSystemDateConfigData();
        }
      );
  }

  clickOnSaveWorkingHours() {
    console.log(this.workingHourSaveObj);
  }

  clickOnSaveSpecialLeaves() {
  }

  changeOnYear() {
    let obj = this.systemCompanyLeaveConfigData.find(searchFor => searchFor.year === parseInt(this.yearToView));
    if (obj === undefined) {
      this.specialLeavesToProcess = [
        {
          'id': 0,
          'year': this.yearToView,
          'month': '1',
          'day': '1',
          'description': 'Holiday',
          'leaveName': 'Holiday',
          'holidayTypes': [
            {
              'id': 1,
              'code': 'BNK',
              'label': 'Bank Holiday'
            }
          ]
        }
      ];
    } else {
      this.specialLeavesToProcess = obj.leaves;
    }
  }

  addNewHourRow(arrayToAdd, type) {
    let blankObj = {
      range: 'Range',
      upper: '00:00:00',
      lower: '23:59:00'
    };

    let obj = this.workingHourSaveObj.timeMargins.find(searchFor => searchFor.type === type);

    arrayToAdd.push(blankObj);
  }

  removeNewHourRow(type, index) {
    let obj = this.workingHourSaveObj.timeMargins.find(searchFor => searchFor.type === type);

    console.log(type);
    if (index > -1) {
      obj.margins.splice(index, 1);
    }
  }

  addNewHolidayRow(arrayToAdd) {
    console.log(arrayToAdd);
    let blankObj = {
      'id': 0,
      'year': this.yearToView,
      'month': '1',
      'day': '1',
      'description': 'Holiday',
      'leaveName': 'Holiday',
      'holidayTypes': [
        {
          'id': 1,
          'code': 'BNK',
          'label': 'Bank Holiday'
        }
      ]
    };
    this.specialLeavesToProcess.push(blankObj);
  }

  removeHolidayRow(index) {
    if (index > -1) {
      this.specialLeavesToProcess.splice(index, 1);
    }
  }

  addNewTypeOnLeave(existingLeaveTypes) {
    if (existingLeaveTypes === undefined) {
      existingLeaveTypes = [];
    }
    console.log(existingLeaveTypes);
    let blankObj = {
      id: 0,
      code: '',
      label: '- delete -'
    };
    existingLeaveTypes.push(blankObj);
    console.log(existingLeaveTypes);

  }

  deleteNewTypeOnLeave(existingLeaveTypes) {
    console.log(existingLeaveTypes);

    for (let key in existingLeaveTypes) {
      if (existingLeaveTypes[key].label === '- delete -') {
        existingLeaveTypes.splice(key, 1);
      }
    }
  }
}
