import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProjectTypeWithAttritionCount} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-project-type-wise-resignation',
  templateUrl: './project-type-wise-resignation.component.html',
  styleUrls: ['./project-type-wise-resignation.component.css']
})
export class ProjectTypeWiseResignationComponent implements OnChanges {

  @Input() resignationData: ProjectTypeWithAttritionCount[];
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.loadChartData();
  }

  loadChartData() {
    const chart = this.amChartService.createDnutWithRadialGradient('projectWiseResignationGraph', 'type', 'value', ['#5CAED7', '#755CD7', '#995CD7', '#5C89D7']);
    for (const data of this.resignationData) {
      if (data.count > 0) {
        chart.data.push({'type': data.projectType, 'value': data.count});
      }
    }
  }

}
