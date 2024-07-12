import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MonthWiseCount} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-head-growth-turn-over-cumulative',
  templateUrl: './head-growth-turn-over-cumulative.component.html',
  styleUrls: ['./head-growth-turn-over-cumulative.component.css']
})
export class HeadGrowthTurnOverCumulativeComponent implements OnChanges {

  @Input() headGrowthVsTurnOverData: MonthWiseCount[];
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.loadChart();
  }

  loadChart() {
    let headGrowthCount = 0;
    let turnOverCount = 0;
    const chart = this.amChartService.createMultipleLineChart('headGrowthVsTurnOverCumulative', 'month', ['Head Growth', 'Turn Over'], ['#5CAED7', '#755CD7']);
    for (const data of this.headGrowthVsTurnOverData) {
      headGrowthCount += data.headGrowthCount;
      turnOverCount += data.turnOverCount;
      chart.data.push(
        {'month': data.month,
        'Head Growth': headGrowthCount,
        'Turn Over': turnOverCount}
      );
    }
  }

}
