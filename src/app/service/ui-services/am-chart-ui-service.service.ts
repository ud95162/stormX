import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmChartUiServiceService {

  amCore;
  amCharts;
  lineChart;
  barChart;

  constructor() {
    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
  }


  createLineChart( htmlId: string, chartData: object[]) {

    let response = [];
    response = chartData;
    for (let key in chartData) {
      console.log(chartData)
      this.lineChart.data.push({'label' : response[key].label, 'data' : response[key].data});
    }
    const chart = this.amCore.create(htmlId, this.amCharts.XYChart);
    chart.padding(40, 40, 40, 40);

    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'label';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    // valueAxis.min = 0;

    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.categoryY = 'label';
    series.dataFields.valueX = 'data';
    series.columns.template.tooltipText = '{categoryY} : {valueX}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipX = this.amCore.percent(100);


    const gradient = new this.amCore.LinearGradient();
    gradient.addColor(this.amCore.color('#1D91ED'));
    gradient.addColor(this.amCore.color('#9915D7'));
    gradient.rotation = 360;
    series.columns.template.fill = gradient;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', function(fill, target){
      return gradient;
    });
    categoryAxis.sortBySeries = series;
    return chart;
  }

}
