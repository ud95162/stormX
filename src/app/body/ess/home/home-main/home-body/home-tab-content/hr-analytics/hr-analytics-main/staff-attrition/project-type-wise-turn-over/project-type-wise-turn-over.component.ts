import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProjectTypeWithAttritionCount} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-project-type-wise-turn-over',
  templateUrl: './project-type-wise-turn-over.component.html',
  styleUrls: ['./project-type-wise-turn-over.component.css']
})
export class ProjectTypeWiseTurnOverComponent implements OnChanges {

  @Input() turnOver: ProjectTypeWithAttritionCount[];
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.loadChartData();
  }

  loadChartData() {
    const chart = this.amChartService.createMultiColorVerticalBarChart('projectTypeWiseTurnOverBar', 'label', 'data', ['#5CAED7', '#755CD7', '#995CD7', '#5C89D7']);

    for (const key of this.turnOver) {
      if (key.count > 0) {
        chart.data.push({'data': key.count, 'label': key.projectType});
      }
    }
  }

}
