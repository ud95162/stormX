import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MonthWiseRecruitmentsAndResignations} from "../../../models/AttritionResponse";
import {AmChartService} from "../../../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-recruiment-vs-resignation',
  templateUrl: './recruiment-vs-resignation.component.html',
  styleUrls: ['./recruiment-vs-resignation.component.css']
})
export class RecruimentVsResignationComponent implements OnChanges {

  @Input() summaryData: MonthWiseRecruitmentsAndResignations[];
  constructor(private amChartService: AmChartService) { }

  ngOnChanges() {
    this.loadChartData();
  }

  loadChartData() {
    const chart = this.amChartService.createMultipleBarChartGradient('recruitmentVsResignationChart', 'type', ['Recruitment', 'Resignation'], [['#5CAED7', '#5CAED7'], ['#755CD7', '#755CD7']]);
    for (const data of this.summaryData) {
      chart.data.push({'type': data.yearMonth, 'Recruitment': data.recruitmentCount, 'Resignation': data.resignationCount});
    }
  }

}
