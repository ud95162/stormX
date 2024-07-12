import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AttendanceServiceService} from '../../../../../../../../../service/attendance-service.service';
import {AmChartService} from '../../../../../../../../../service/am-chart-service/am-chart.service';
import {Event} from '../../../../../../../../../_global/event';

@Component({
  selector: 'app-attendance-summery',
  templateUrl: './attendance-summery.component.html',
  styleUrls: ['./attendance-summery.component.css']
})
export class AttendanceSummeryComponent implements OnChanges {

  @Input() officeCount;
  @Input() homeCount;
  @Input() absentCount;
  @Input() leaveCount;
  summery = [];
  total = 0;
  typeArray = [];
  countArray = [];
  constructor(
    private attendanceService: AttendanceServiceService,
    private amChartService: AmChartService) { }

  // ngOnInit() {
  //   // this.loadAttendanceSummeryPieChart();
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.officeCount || changes.homeCount || changes.absentCount || changes.leaveCount) {
      this.loadAttendanceSummeryPieChart();
    }
  }
  loadAttendanceSummeryPieChart() {
        this.summery = [];
        this.typeArray = [];
        this.countArray = [];
        this.summery.push({'category': 'WFO Count', 'value': this.officeCount});
        this.summery.push({'category': 'WFH Count', 'value': this.homeCount});
        this.summery.push({'category': 'Absent Count', 'value': this.absentCount});
        this.summery.push({'category': 'Leave Count', 'value': this.leaveCount});
        this.total = this.officeCount + this.homeCount + this.absentCount + this.leaveCount;

      const chart = this.amChartService.createDnutWithRadialGradientWithCustomizedFields('attendanceSummeryChart', 'attendanceType', 'count',
        ['#67B7DC', '#8067DC', '#6771DC', '#6794DC'], this.summery, this.total );

      for (const key in this.summery ) {
        this.typeArray.push(this.summery[key].category);
        this.countArray.push(this.summery[key].value);
        chart.data.push({'type': this.summery[key].category, 'count': this.summery[key].value});
      }
  }
}
