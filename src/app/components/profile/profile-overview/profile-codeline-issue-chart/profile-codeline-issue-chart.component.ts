import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-codeline-issue-chart',
  templateUrl: './profile-codeline-issue-chart.component.html',
  styleUrls: ['./profile-codeline-issue-chart.component.css']
})
export class ProfileCodelineIssueChartComponent implements OnInit {

  codeLineChart;
  lineChart;
  graphTitle;
  graphYLabel;
  labels: any = [];
  data: any = [];

  amCore;
  amCharts;
  amSeries;
  chartTitle: any; // codeline or issue count

  constructor() {
    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
  }

  ngOnInit() {

    this.lineChart = this.createLineChart('lineChart', 'month no / week no');

  }

  /**
   * add data to chart
   * updateChart method called in parent component( profile-overview )*
   * @param payload
   */
  updateChart(data, chartTitle) {
    if (chartTitle === 'other') {
      return;
    }

    this.chartTitle = chartTitle;
    this.lineChart.data = data.reverse();


  }

  createLineChart(htmlId: string, xAxisName: string = '', yAxisName: string = '') {
    const lineChart = this.amCore.create(htmlId, this.amCharts.XYChart);

    const categoryAxis = lineChart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = "data";
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.fontSize = 8;

    categoryAxis.title.text = xAxisName;

    const valueAxis = lineChart.yAxes.push(new this.amCharts.ValueAxis());
    valueAxis.title.text = yAxisName;

// Create series
    const series = lineChart.series.push(new this.amCharts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "data";
    series.strokeWidth = 3;
    series.tooltipText = "{value}";
    series.stroke = this.amCore.color('#147ad6');


    return lineChart;
  }


}
