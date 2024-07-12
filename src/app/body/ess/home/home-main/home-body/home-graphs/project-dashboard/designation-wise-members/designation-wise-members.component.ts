import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../../../../../_global/project";
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-designation-wise-members',
  templateUrl: './designation-wise-members.component.html',
  styleUrls: ['./designation-wise-members.component.css']
})
export class DesignationWiseMembersComponent implements OnInit {


  monthFirstDate;
  startDateOfMonth;
  monthMap = new Map();
  constructor(private httpService: ProjectServiceService,
              private amChartService: AmChartService) { }

  ngOnInit() {
    const curr  = new Date();
    curr.setDate(curr.getDate());
    this.setMonthMapValues();
    this.startDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 2).toISOString().slice(0, 10);
    this.loadDesignationInfo('01-' + this.monthMap.get(this.startDateOfMonth.slice(5, 7)) + '-' + this.startDateOfMonth.slice(0, 4));
  }

  loadDesignationInfo(monthFirstDate) {
    this.httpService.getDesignationCountsOfProject(Project.PROJECT_CODE, monthFirstDate)
      .subscribe(
        (data: any) => {
          console.log(data);
          const chart = this.amChartService.createVerticalBarChart('projectDesignationWiseCount', 'des', 'count', '#1D91ED');

          for (const key in data) {
            chart.data.push({'des': data[key][0], 'count': data[key][1]});
          }
        });
  }
  // set month value for month number
  setMonthMapValues() {
    this.monthMap.set( '01', 'Jan');
    this.monthMap.set( '02', 'Feb');
    this.monthMap.set( '03', 'Mar');
    this.monthMap.set( '04', 'Apr');
    this.monthMap.set( '05', 'May');
    this.monthMap.set( '06', 'Jun');
    this.monthMap.set( '07', 'Jul');
    this.monthMap.set( '08', 'Aug');
    this.monthMap.set( '09', 'Sep');
    this.monthMap.set( '10', 'Oct');
    this.monthMap.set( '11', 'Nov');
    this.monthMap.set( '12', 'Dec');
  }
}
