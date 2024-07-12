import { Component, OnInit } from '@angular/core';
import {AttendanceServiceService} from '../../../../../../../../../service/attendance-service.service';
import {AmChartService} from '../../../../../../../../../service/am-chart-service/am-chart.service';
import {Event} from '../../../../../../../../../_global/event';

@Component({
  selector: 'app-overall-attendance-summery',
  templateUrl: './overall-attendance-summery.component.html',
  styleUrls: ['./overall-attendance-summery.component.css']
})
export class OverallAttendanceSummeryComponent implements OnInit {
  date = Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().roundupHour + ':' + Event.setCurrentDateTime().roundupMinute + ':00';
  selected: any = {
    inOutType : 'out',
    startDate : this.date.substr(0, 10),
    endDate : this.date.substr(0, 10),
    selectedCompanyID : 0,
    selectedBUID : 0,
    selectedDepID : 0,
    selectedCadreID : 0
  };
  total = 0;
  overallSummary = [];
  typeArray = [];
  countArray = [];
  constructor(
    private attendanceService: AttendanceServiceService,
    private amChartService: AmChartService) { }

  ngOnInit() {
    this.loadAOverallAttendanceSummaryPieChart();
  }
  loadAOverallAttendanceSummaryPieChart() {
    this.attendanceService.getOverallAttendanceSummary( this.date, this.selected.inOutType, this.selected.selectedCompanyID,
      this.selected.selectedBUID, this.selected.selectedDepID, this.selected.selectedCadreID, this.selected.startDate, this.selected.endDate,
      )
      .subscribe ( ( data: any ) => {
      this.overallSummary = [];
      this.typeArray = [];
      this.countArray = [];
      this.overallSummary.push({'category': 'Early Leave', 'value': data.earlyLeave});
      this.overallSummary.push({'category': 'Early Leave (Accepted)', 'value': data.acceptedEarlyLeave});
      this.overallSummary.push({'category': 'Late Leave', 'value': data.lateLeave});
      this.overallSummary.push({'category': 'Next Day Out', 'value': data.nextDayOut});
      this.overallSummary.push({'category': 'No Out Log', 'value': data.noOutLog});
      this.total = data.totalOut;

      const chart = this.amChartService.createDnutWithRadialGradientWithCustomizedFields('overallAttendanceSummaryChart', 'inOutType', 'count',
        ['#5e6d7a', '#1fa2c0', '#0F66A8FF', '#7a65b4', '#051625FF'], this.overallSummary, this.total );

      for (const key in this.overallSummary ) {
        this.typeArray.push(this.overallSummary[key].category);
        this.countArray.push(this.overallSummary[key].value);
        chart.data.push({'type': this.overallSummary[key].category, 'count': this.overallSummary[key].value});
      }
      console.log(this.overallSummary);
    });
  }
}
