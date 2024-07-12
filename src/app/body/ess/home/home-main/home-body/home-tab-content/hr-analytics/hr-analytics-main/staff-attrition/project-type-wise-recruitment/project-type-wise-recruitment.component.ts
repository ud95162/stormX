import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AmChartService} from '../../../../../../../../../../service/am-chart-service/am-chart.service';
import {ProjectTypeWithAttritionCount} from '../../../models/AttritionResponse';

@Component({
  selector: 'app-project-type-wise-recruitment',
  templateUrl: './project-type-wise-recruitment.component.html',
  styleUrls: ['./project-type-wise-recruitment.component.css']
})
export class ProjectTypeWiseRecruitmentComponent implements OnChanges {

  @Input() recruitmentData: ProjectTypeWithAttritionCount[];
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.loadChartData();
  }

  loadChartData() {
    const chart = this.amChartService.createDnutWithRadialGradient('projectWiseRecruitmentGraph', 'type', 'value', ['#5CAED7', '#755CD7', '#995CD7', '#5C89D7']);
    for (const data of this.recruitmentData) {
      if (data.count > 0) {
        chart.data.push({'type': data.projectType, 'value': data.count});
      }
    }
  }
}
