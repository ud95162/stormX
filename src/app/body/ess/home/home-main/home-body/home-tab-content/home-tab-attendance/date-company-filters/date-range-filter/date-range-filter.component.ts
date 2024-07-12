import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {DateCompanyFiltersComponent} from '../date-company-filters.component';
import {DatePipe} from '@angular/common';
import {WorkHoursDistributionComponent} from '../../attendance-dashboard/work-hours-distribution/work-hours-distribution.component';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.css']
})
export class DateRangeFilterComponent implements OnInit {
  startDate: any;
  endDate: any;
  rangeType = 'drToday';
  rangeTypeTrue = 'today';
  rangeCustomWidget = false;
  rangeSingleMonthWidget = false;
  selectedFromDate = moment().format('YYYY-MM-DD');
  selectedToDate = moment().format('YYYY-MM-DD');
  currentDate = moment().format('YYYY-MM-DDTHH:mm:ss');
  errorMessage: string;
  today: any;
  yesterday: any;
  selectedDateRange: any = {
    startDate : this.selectedFromDate,
    endDate : this.selectedToDate
  };
  @Output() dataEvent = new EventEmitter<any>();
  constructor(private datePipe: DatePipe,
              private dateCompanyFiltersComponent: DateCompanyFiltersComponent,
              private workHoursDistributionComponent: WorkHoursDistributionComponent) {
    const todayDate = new Date();
    this.today = todayDate.toISOString().substr(0, 10);
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);
    this.yesterday = yesterdayDate.toISOString().substr(0, 10);
  }

  ngOnInit() {
  }
  setDateRange(rangeType: any) {
    if (rangeType === 'drCustom') {
      this.rangeCustomWidget = true;
      if (this.selectedFromDate > this.selectedToDate) {
        this.selectedToDate = this.selectedFromDate;
      }
      this.rangeSingleMonthWidget = false;
    } else if (rangeType === 'R6') {
      this.rangeSingleMonthWidget = true;
      this.rangeCustomWidget = false;
    }else {
      this.rangeCustomWidget = false;
      this.rangeSingleMonthWidget = false;
    }
    if (rangeType === 'drYesterday') {
      this.rangeTypeTrue = 'yesterday';
      this.startDate = this.yesterday;
      this.endDate = this.startDate;
    }else if (rangeType === 'drToday') {
      this.rangeTypeTrue = 'today';
      this.startDate = this.today;
      this.endDate = this.startDate;
    }else if (rangeType === 'drCustom') {
      this.rangeTypeTrue = 'custom';
      this.startDate = this.selectedFromDate;
      this.endDate = this.selectedToDate;
    }else {
      this.errorMessage = 'An Error Occurred while setting the Time Range!';
      return null;
    }
    this.selectedDateRange.startDate = this.startDate;
    this.selectedDateRange.endDate = this.endDate;
    this.dataEvent.emit(this.selectedDateRange);
    this.workHoursDistributionComponent.setDateRange(this.startDate, this.endDate);
  }
}
