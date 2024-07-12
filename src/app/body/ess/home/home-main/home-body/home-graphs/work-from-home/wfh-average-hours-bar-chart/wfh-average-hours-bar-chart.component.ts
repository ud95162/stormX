import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-wfh-average-hours-bar-chart',
  templateUrl: './wfh-average-hours-bar-chart.component.html',
  styleUrls: ['./wfh-average-hours-bar-chart.component.css']
})
export class WfhAverageHoursBarChartComponent implements OnChanges {

  @Input() barChartDataFromResponse;
  @Input() barChartColorsFromResponse;
  @Input() barChartMaximumFromResponse;
  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef;

  dataLoaded = false;


  private maximumValue: any;

  constructor(
    private amChartService: AmChartService
  ) { }

  ngOnChanges() {
    this.loadWfhAverageHoursBarChart();
    this.dataLoaded = true;
  }
// events
  chartClicked(e) {
  }

  chartHovered(e) {
  }

    loadWfhAverageHoursBarChart() {
        const chart = this.amChartService.createMultipleBarChartGradient(
            'eWfsAverageHoursBarChart',
            'label',
            ['Day', 'Week', 'Month', 'Year'],
            [['#3CAEA3', '#6278E9', '#0099EA', '#BAC5FA']]
        );

        chart.data.push({
            'label': 'Day',
            'Day': this.barChartDataFromResponse[0]
        }, {
            'label': 'Week',
            'Week': this.barChartDataFromResponse[1]
        }, {
            'label': 'Month',
            'Month': this.barChartDataFromResponse[2]
        }, {
            'label': 'Year',
            'Year': this.barChartDataFromResponse[3]
        });
    }


}
