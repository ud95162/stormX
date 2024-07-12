import { Component, OnInit } from '@angular/core';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';

@Component({
  selector: 'app-avg-leave-utilization',
  templateUrl: './avg-leave-utilization.component.html',
  styleUrls: ['./avg-leave-utilization.component.css']
})
export class AvgLeaveUtilizationComponent implements OnInit {

  dailyAvgUtilizeResponse;
  weeklyAvgUtilizeResponse;
  monthlyAvgUtilizeResponse;
  dailyStandardUtilize;
  dailySpecialUtilize;
  dailyShortLeaveUtilize;
  weeklyStandardUtilize;
  weeklySpecialUtilize;
  weeklyShortLeaveUtilize;
  monthlyStandardUtilize;
  monthlySpecialUtilize;
  monthlyShortLeaveUtilize;

  dailyTotalUtilize;
  weeklyTotalUtilize;
  monthlyTotalUtilize;
  dailyTotalAverage;
  weeklyTotalAverage;
  monthlyTotalAverage;

  dailyUtilizeDataLoaded = false;
  weeklyUtilizeDataLoaded = false;
  monthlyUtilizeDataLoaded = false;

  showCustomGraph = false;

  dailyUtilizationClicked = false;
  weeklyUtilizationClicked = false;
  monthlyUtilizationClicked = false;

  constructor(private leaveServiceService: LeaveServiceService) { }

  ngOnInit() {
    this.showCustomGraph = true;
    this.dailyUtilizationClicked = true;
    this.dailyAvgLeaveUtilization();
    this.weeklyAvgLeaveUtilization();
    this.monthlyAvgLeaveUtilization();
  }
  dailyAvgLeaveUtilization() {
    this.leaveServiceService.getAvgLeaveUtilizationForDaily()
      .subscribe(response => {
        console.log("daily response",response)
        this.dailyAvgUtilizeResponse = response;
        this.dailyStandardUtilize = this.dailyAvgUtilizeResponse.standardLeaveAvgUtilization;
        this.dailySpecialUtilize = this.dailyAvgUtilizeResponse.specialLeaveAvgUtilization;
        this.dailyShortLeaveUtilize = this.dailyAvgUtilizeResponse.shortLeaveAvgUtilization;
        this.dailyTotalUtilize = this.dailySpecialUtilize.noPayLeaveUtilization
          +this.dailyStandardUtilize.annualLeaveUtilizeCount
          +this.dailyStandardUtilize.casualLeaveUtilizeCount
          +this.dailySpecialUtilize.lieuLeaveUtilization
          +this.dailySpecialUtilize.maternityLeaveUtilization
          +this.dailyStandardUtilize.medicalLeaveUtilizeCount
          +this.dailySpecialUtilize.officialLeaveUtilization
          +this.dailySpecialUtilize.onSiteLeaveUtilization
          +this.dailyShortLeaveUtilize.shortLeaveUtilization;
        this.dailyTotalAverage = Math.round(this.dailyTotalUtilize / this.dailyAvgUtilizeResponse.workDays * 10) / 10.0;
        this.dailyUtilizeDataLoaded = true;
      });
  }

  weeklyAvgLeaveUtilization() {
    this.leaveServiceService.getAvgLeaveUtilizationForWeekly()
      .subscribe(response => {
        this.weeklyAvgUtilizeResponse = response;
        this.weeklyStandardUtilize = this.weeklyAvgUtilizeResponse.standardLeaveAvgUtilization;
        this.weeklySpecialUtilize = this.weeklyAvgUtilizeResponse.specialLeaveAvgUtilization;
        this.weeklyShortLeaveUtilize = this.weeklyAvgUtilizeResponse.shortLeaveAvgUtilization;
        this.weeklyTotalUtilize = this.weeklySpecialUtilize.noPayLeaveUtilization
          +this.weeklyStandardUtilize.annualLeaveUtilizeCount
          +this.weeklyStandardUtilize.casualLeaveUtilizeCount
          +this.weeklySpecialUtilize.lieuLeaveUtilization
          +this.weeklySpecialUtilize.maternityLeaveUtilization
          +this.weeklyStandardUtilize.medicalLeaveUtilizeCount
          +this.weeklySpecialUtilize.officialLeaveUtilization
          +this.weeklySpecialUtilize.onSiteLeaveUtilization
          +this.weeklyShortLeaveUtilize.shortLeaveUtilization;
        this.weeklyTotalAverage = Math.round(this.weeklyTotalUtilize / this.weeklyAvgUtilizeResponse.workDays * 10) / 10.0;
        this.weeklyUtilizeDataLoaded = true;
      });
  }
  monthlyAvgLeaveUtilization() {
    this.leaveServiceService.getAvgLeaveUtilizationForMonthly()
      .subscribe(response => {
        this.monthlyAvgUtilizeResponse = response;
        this.monthlyStandardUtilize = this.monthlyAvgUtilizeResponse.standardLeaveAvgUtilization;
        this.monthlySpecialUtilize = this.monthlyAvgUtilizeResponse.specialLeaveAvgUtilization;
        this.monthlyShortLeaveUtilize = this.monthlyAvgUtilizeResponse.shortLeaveAvgUtilization;
        this.monthlyTotalUtilize = this.monthlySpecialUtilize.noPayLeaveUtilization
          +this.monthlyStandardUtilize.annualLeaveUtilizeCount
          +this.monthlyStandardUtilize.casualLeaveUtilizeCount
          +this.monthlySpecialUtilize.lieuLeaveUtilization
          +this.monthlySpecialUtilize.maternityLeaveUtilization
          +this.monthlyStandardUtilize.medicalLeaveUtilizeCount
          +this.monthlySpecialUtilize.officialLeaveUtilization
          +this.monthlySpecialUtilize.onSiteLeaveUtilization
          +this.monthlyShortLeaveUtilize.shortLeaveUtilization;
        this.monthlyTotalAverage = Math.round(this.monthlyTotalUtilize / this.monthlyAvgUtilizeResponse.workDays * 10) / 10.0;
        this.monthlyUtilizeDataLoaded = true;
      });
  }

  changeActiveOption(event) {
    if (event.target.value === 'day') {
      this.dailyUtilizationClicked = true;
      this.weeklyUtilizationClicked = false;
      this.monthlyUtilizationClicked = false;
    }
    if (event.target.value === 'week') {
      this.dailyUtilizationClicked = false;
      this.weeklyUtilizationClicked = true;
      this.monthlyUtilizationClicked = false;
    }
    if (event.target.value === 'month') {
      this.dailyUtilizationClicked = false;
      this.weeklyUtilizationClicked = false;
      this.monthlyUtilizationClicked = true;
    }
  }
}
