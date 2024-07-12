import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ResignEmployeesExperienceSummary} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-resign-emp-experience',
  templateUrl: './resign-emp-experience.component.html',
  styleUrls: ['./resign-emp-experience.component.css']
})
export class ResignEmpExperienceComponent implements OnChanges {

  @Input() expSummaryCount: ResignEmployeesExperienceSummary;
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.drawChart();
  }

  drawChart() {
    const summary = [];
    summary.push({category: '0-2', value: this.expSummaryCount.belowTwoYears});
    summary.push({category: '2-3', value: this.expSummaryCount.twoToThreeYears});
    summary.push({category: '3-5', value: this.expSummaryCount.threeToFiveYears});
    summary.push({category: '5 Above', value: this.expSummaryCount.aboveFiveYears});

    const chart = this.amChartService.createDnutWithRadialGradient('resignEmpExpCountGraph', 'type', 'value', ['#5CAED7', '#755CD7', '#995CD7', '#5C89D7']);
    for (const data of summary) {
        chart.data.push({'type': data.category, 'value': data.value});
    }
  }

}
