import {Component, OnInit} from '@angular/core';
import {AttendanceServiceService} from '../../../../service/attendance-service.service';
import {JobsrunnerServiceService} from '../../../../service/jobsrunner-service.service';

@Component({
  selector: 'app-settings-attendance-devices-status',
  templateUrl: './settings-attendance-devices-status.component.html',
  styleUrls: ['./settings-attendance-devices-status.component.css']
})
export class SettingsAttendanceDevicesStatusComponent implements OnInit {

  deviceDetails: any = [];
  allDeviceData = [];
  deviceLocations = [];
  timeArray = [];
  deviceData: any;
  attendanceDevicesDataLoaded: any;
  selectedDate = new Date().toISOString().slice(0, 10);
  maxDate = new Date().toISOString().slice(0, 10);
  searchTerm: any;
  deviceType: any;
  deviceLocation: any;

  constructor(private attendanceService: AttendanceServiceService,
              private jobsRunnerService: JobsrunnerServiceService) {
  }

  ngOnInit() {
    this.getAttendanceDevicesData();
    this.getFormattedTime();
  }

  /**
   * Generates an array of formatted time strings in a 12-hour format with 'AM' and 'PM' indicators,
   * representing the hours of the day from 12:00 AM to 11:59 PM
   */
  getFormattedTime() {
    for (let hour = 0; hour <= 23; hour++) {
      const suffix = hour < 12 ? 'AM' : 'PM';
      const hour12 = (hour % 12) === 0 ? 12 : hour % 12;
      const paddedHour = hour12 < 10 ? '0' + hour12 : hour12.toString();
      const time = `${paddedHour}:00 ${suffix}`;
      this.timeArray.push(time);
    }
  }

  getHours() {
    return Object.keys(this.deviceData.dataAvailabilityMap);
  }

  getTimeLabel(hour: string) {
    // tslint:disable-next-line:radix
    const hour12 = parseInt(hour.substr(0, 2));
    const suffix = hour12 < 12 ? 'AM' : 'PM';
    const formattedHour = (hour12 % 12 || 12).toString();
    const nextHour = (hour12 + 1) % 24;
    const nextSuffix = nextHour < 12 ? 'AM' : 'PM';
    const formattedNextHour = (nextHour % 12 || 12).toString();
    return `${formattedHour}:00${suffix} - ${formattedNextHour}:00${nextSuffix}`;
  }

  /**
   * Get time periods and put them into rows
   */
  getTimeRows() {
    const hours = Object.keys(this.deviceData.dataAvailabilityMap);
    const rows = [];
    for (let i = 0; i < hours.length; i += 4) {
      rows.push(hours.slice(i, i + 4));
    }
    return rows;
  }

  /**
   * Show data relevant to the selected date
   */
  changeDate() {
    this.getAttendanceDevicesData();
  }

  /**
   * Get attendance devices failures
   */
  getAttendanceDevicesData() {
    this.jobsRunnerService.getAttendanceDeviceStatus(this.selectedDate)
      .subscribe((data) => {
        if (data) {
          this.deviceDetails = data;
          this.attendanceDevicesDataLoaded = true;
          this.allDeviceData = this.deviceDetails[0].devices;
          this.deviceType = this.deviceDetails[0].syncSystem;
          this.deviceLocation = this.allDeviceData[0].device;
          // this.deviceLocations = this.allDeviceData[0];
          this.deviceData = this.allDeviceData[0];

          for (const location of this.allDeviceData) {
            this.deviceLocations.push(location.device);
          }
        }
      });
  }

  /**
   * Change data shown in the table when changing the device type
   * Change the data array each time and set total page count
   * Reset current page into page 1
   */
  changeDeviceType(deviceType) {
    this.deviceLocations = [];
    this.allDeviceData = [];
    for (const location of this.deviceDetails) {
      if (deviceType === location.syncSystem) {
        this.allDeviceData = location.devices;
      }
    }
    for (const location of this.allDeviceData) {
      this.deviceLocations.push(location.device);
    }
  }


  /**
   * Change data shown according to selected device
   */
  changeDeviceLocation() {
    for (const location of this.allDeviceData) {
      if (this.deviceLocation === location.device) {
        this.deviceData = location;
      }
    }
  }


  syncAllDevices() {

  }

  syncSelectedHour(index) {
    console.log(index);
  }
}
