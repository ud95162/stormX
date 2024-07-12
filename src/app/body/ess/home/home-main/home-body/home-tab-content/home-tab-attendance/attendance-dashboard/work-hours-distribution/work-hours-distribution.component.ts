import { Component, OnInit } from '@angular/core';
import {AmChartService} from '../../../../../../../../../service/am-chart-service/am-chart.service';
import {DashboardOverallDataServiceService} from '../../../../../../../../../service/dashboard-overall-data-service.service';
import {Router} from '@angular/router';
import {AttendanceServiceService} from '../../../../../../../../../service/attendance-service.service';
import {Event} from '../../../../../../../../../_global/event';
import {DateCompanyFiltersComponent} from '../../date-company-filters/date-company-filters.component';


@Component({
  selector: 'app-work-hours-distribution',
  templateUrl: './work-hours-distribution.component.html',
  styleUrls: ['./work-hours-distribution.component.css']
})
export class WorkHoursDistributionComponent implements OnInit {

  date = Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
  startDate = this.date.substr(0,10);
  endDate = this.date.substr(0,10);
  selectedCompanyID = 0;
  selectedBUID = 0;
  selectedDepID = 0;
  selectedCadreID = 0;
  distribution = [];
  receivedData = false;
  responseList = [];
  absent = 0;
  hours0to2 = 0;
  hours2to4 = 0;
  hours4to6 = 0;
  hours6to8 = 0;
  hours8plus = 0;
  total = 0;
  dateFilter: boolean = false;

  responseArray = [];
  typeArray = [];
  countArray = [];

  constructor(
    private attendanceService: AttendanceServiceService,
    private amChartService: AmChartService
    ) {
  }

  ngOnInit() {
    this.loadWorkHoursDistributionPieChart();
  }
  dateFilterExpand(){
    this.dateFilter = !this.dateFilter;
  }
  setDateRange(startDate,endDate){
    this.startDate = startDate;
    this.endDate = endDate;
    this.loadWorkHoursDistributionPieChart();
    this.dateFilter = false;
  }
  allFilters(startDate,endDate,cmpID,buID,depID,cadreID){
    this.startDate = startDate;
    this.endDate = endDate;
    this.selectedCompanyID = cmpID;
    this.selectedBUID = buID;
    this.selectedDepID = depID;
    this.selectedCadreID = cadreID;
    console.log(this.startDate,this.endDate,this.selectedCompanyID,this.selectedBUID,this.selectedDepID,this.selectedCadreID);
    this.loadWorkHoursDistributionPieChart();
    this.dateFilter = false;
  }
  loadWorkHoursDistributionPieChart() {
    this.attendanceService.getWorkHoursDistribution( this.date, this.startDate, this.endDate, this.selectedCompanyID, this.selectedBUID,
      this.selectedDepID, this.selectedCadreID ).subscribe((data: any) => {
      this.distribution = [];
      this.distribution.push({'category': 'Absent', 'value': data.absent});
      this.distribution.push({'category': '0-2 Hours', 'value': data.hours0to2});
      this.distribution.push({'category': '2-4 Hours', 'value': data.hours2to4});
      this.distribution.push({'category': '4-6 Hours', 'value': data.hours4to6});
      this.distribution.push({'category': '6-8 Hours', 'value': data.hours6to8});
      this.distribution.push({'category': 'More than 8 Hours', 'value': data.hours8plus});
      this.absent = data.absent;
      this.hours0to2 = data.hours0to2;
      this.hours2to4 = data.hours2to4;
      this.hours4to6 = data.hours4to6;
      this.hours6to8 = data.hours6to8;
      this.hours8plus = data.hours8plus;
      this.total = data.total;

      this.responseArray = [];
      this.typeArray = [];
      this.countArray = [];

      for (const key in this.distribution) {
        this.typeArray.push(this.distribution[key].category);
        this.countArray.push(this.distribution[key].value);
      }

      const chart = this.amChartService.createDnutWithRadialGradientWithCustomizedFields('workHoursChart', 'hoursCategory','count',
        ['#051625FF', '#5e6d7a', '#1fa2c0', '#0F66A8FF', '#7a65b4', '#70e05e'], this.distribution, this.total );

      for (const key in this.distribution) {
        this.responseList = this.responseArray;
        this.receivedData = true;
        chart.data.push({'type': this.distribution[key].category, 'count': this.distribution[key].value});
      }
      console.log(this.distribution)
    });
  }

}
