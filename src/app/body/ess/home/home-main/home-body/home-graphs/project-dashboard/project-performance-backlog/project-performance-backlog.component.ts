import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";
import {Project} from "../../../../../../../../_global/project";
import {AttendanceServiceService} from "../../../../../../../../service/attendance-service.service";

@Component({
  selector: 'app-project-performance-backlog',
  templateUrl: './project-performance-backlog.component.html',
  styleUrls: ['./project-performance-backlog.component.css']
})
export class ProjectPerformanceBacklogComponent implements OnInit {

  selectedValue = 'month';
  completeAsPercentage;
  notCompleteAsPercentage;


  loadedMonthFilters: string[] = [];
  selectedMonthFilter: string;
  overallPerformanceMonthFilter: string;
  isMonthFilter = false;

  constructor(private httpService: ProjectServiceService,
              private amChartService: AmChartService,
              private attendanceService: AttendanceServiceService) { }

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    this.loadAttendanceMonthFilter();
    const chartLabels = ['Complete', 'Not Complete'];
    const chartData = [80, 20];
    const chart = this.amChartService.createDnutWithRadialGradient('project-backlog-perform', 'status', 'value', ['#00A5FB', '#FF8F6B']);

    for (let key in chartLabels) {
      chart.data.push({'value': chartData[key], 'status': chartLabels[key]});
    }
    this.httpService.getProjectPerformance(Project.PROJECT_CODE, this.selectedValue).subscribe( (response) => {
      console.log(response);
      // if ( response[0] != null && response[1] != null) {
      //   if ( response[0] !== 0 && response[1] !== 0) {
      //     const chart = this.amChartService.createDnutWithRadialGradient('project-backlog-perform', 'status', 'value', ['#00A5FB', '#FF8F6B']);
      //     for (let key in chartLabels) {
      //       chart.data.push({'status': response[0], 'value': chartLabels[key]});
      //     }
      //   }
      // }
      for (let key in chartLabels) {
        chart.data.push({'value': chartData[key], 'status': chartLabels[key]});
      }
    });
  }


  loadAttendanceMonthFilter() {
    this.attendanceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
      this.loadedMonthFilters = data;
      this.selectedMonthFilter = this.loadedMonthFilters[0];
      this.overallPerformanceMonthFilter = this.loadedMonthFilters[0];
      this.isMonthFilter = true;
    });
  }


}
