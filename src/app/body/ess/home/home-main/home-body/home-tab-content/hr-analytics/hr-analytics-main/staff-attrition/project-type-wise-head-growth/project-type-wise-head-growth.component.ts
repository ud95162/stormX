import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProjectTypeWithAttritionCount} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-project-type-wise-head-growth',
  templateUrl: './project-type-wise-head-growth.component.html',
  styleUrls: ['./project-type-wise-head-growth.component.css']
})
export class ProjectTypeWiseHeadGrowthComponent implements OnChanges {

  @Input() headGrowth: ProjectTypeWithAttritionCount[];
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.loadChart();
  }

  loadChart() {
    const chart = this.amChartService.createMultiColorVerticalBarChart('projectTypeWiseHeadGrowthBar', 'label', 'data', ['#5CAED7', '#755CD7', '#995CD7', '#5C89D7']);

    for (const key of this.headGrowth) {
      if (key.count > 0) {
        chart.data.push({'data': key.count, 'label': key.projectType});
      }
    }
  }

}
