import {Component, NgZone, OnInit} from '@angular/core';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themesAnimated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-am-charts',
  templateUrl: './am-charts.component.html',
  styleUrls: ['./am-charts.component.css']
})
export class AmChartsComponent implements OnInit {

  amCore;
  amCharts;
  amSeries;
  lineChart;
  constructor(private ngZone: NgZone) {

    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
  }

  ngOnInit() {

    this.lineChart = this.createLineChart( 'lineChart' );

    this.lineChart.data = [{
      'year': 'lessthan1',
      'value': 125
    }, {
      'year': '1to3years',
      'value': 55,
    }];
  }

  createLineChart( htmlId: string ) {
    const lineChart = this.amCore.create(htmlId, this.amCharts.XYChart);
    lineChart.padding(40, 40, 40, 40);


    const xAxis = lineChart.xAxes.push(new this.amCharts.CategoryAxis());
    xAxis.renderer.grid.template.location = 0;
    xAxis.dataFields.category = 'year';
    xAxis.renderer.minGridDistance = 1;
    xAxis.renderer.inversed = true;
    xAxis.renderer.grid.template.disabled = true;

    const yAxis = lineChart.yAxes.push(new this.amCharts.ValueAxis());
    // yAxis.min = 0;
    yAxis.renderer.grid.template.disabled = true;

    // const amSeries = lineChart.series.push(new this.amCharts.LineSeries());
    const amSeries = lineChart.series.push(new this.amCharts.ColumnSeries());
    amSeries.dataFields.valueY = 'value';
    amSeries.dataFields.categoryX = 'year';

    amSeries.strokeWidth = 3;
    amSeries.tensionX = 0.8;
    amSeries.fillOpacity = 0.4;
    amSeries.bullets.push(new this.amCharts.CircleBullet());
    amSeries.connect = false;

    return lineChart;
  }

//   createLineChart(htmlId: string) {
//
// // Create chart instance
//     const chart = this.amCore.create('amChart', this.amCharts.XYChart);
//
// // Add percent sign to all numbers
// //     chart.numberFormatter.numberFormat = '#.#\'%\'';
// // Create axes
//     const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
//     categoryAxis.dataFields.category = 'country';
//     categoryAxis.renderer.grid.template.location = 0;
//     categoryAxis.renderer.minGridDistance = 30;
//     categoryAxis.renderer.grid.template.disabled = true;
//
//     const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
//     valueAxis.title.text = 'GDP growth rate';
//     valueAxis.title.fontWeight = 800;
//     valueAxis.renderer.grid.template.disabled = true;
//     valueAxis.min = 0;
//
// // Create series
//     const series = chart.series.push(new this.amCharts.ColumnSeries());
//     series.dataFields.valueY = 'year2004';
//     series.dataFields.categoryX = 'country';
//     series.clustered = false;
//     series.tooltipText = 'GDP grow in {categoryX} (2004): [bold]{valueY}[/]';
//
//     const series2 = chart.series.push(new this.amCharts.ColumnSeries());
//     series2.dataFields.valueY = 'year2005';
//     series2.dataFields.categoryX = 'country';
//     series2.clustered = false;
//     series2.columns.template.width = this.amCore.percent(50);
//     series2.tooltipText = 'GDP grow in {categoryX} (2005): [bold]{valueY}[/]';
//
//     chart.cursor = new this.amCharts.XYCursor();
//     chart.cursor.lineX.disabled = true;
//     chart.cursor.lineY.disabled = true;
//
//     return chart;
//   }



  // arrangeColumns() {
  //
  // let series = this.lineChart.series.getIndex(0);
  //
  // let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
  // if (series.dataItems.length > 1) {
  //   let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
  //   let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
  //   let delta = ((x1 - x0) / chart.series.length) * w;
  //   if (am4core.isNumber(delta)) {
  //     let middle = chart.series.length / 2;
  //
  //     let newIndex = 0;
  //     chart.series.each(function(series) {
  //       if (!series.isHidden && !series.isHiding) {
  //         series.dummyData = newIndex;
  //         newIndex++;
  //       }
  //       else {
  //         series.dummyData = chart.series.indexOf(series);
  //       }
  //     })
  //     let visibleCount = newIndex;
  //     let newMiddle = visibleCount / 2;
  //
  //     chart.series.each(function(series) {
  //       let trueIndex = chart.series.indexOf(series);
  //       let newIndex = series.dummyData;
  //
  //       let dx = (newIndex - trueIndex + middle - newMiddle) * delta
  //
  //       series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
  //       series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
  //     })
  //   }
  // }
//   drawChart() {
//     am4core.options.commercialLicense = true;
//     am4core.ready(function() {
//
// // Themes begin
//       am4core.useTheme(am4themesAnimated);
// // Themes end
//
//       const chart = am4core.create('chartdiv', am4charts.XYChart);
//       chart.colors.step = 2;
//
//       chart.legend = new am4charts.Legend();
//       chart.legend.position = 'top';
//       chart.legend.paddingBottom = 20;
//       chart.legend.labels.template.maxWidth = 95;
//
//       const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//       xAxis.dataFields.category = 'category';
//       xAxis.renderer.cellStartLocation = 0.1;
//       xAxis.renderer.cellEndLocation = 0.9;
//       xAxis.renderer.grid.template.location = 0;
//
//       const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
//       yAxis.min = 0;
//
//       function createSeries(value, name) {
//         const series = chart.series.push(new am4charts.ColumnSeries());
//         series.dataFields.valueY = value;
//         series.dataFields.categoryX = 'category';
//         series.name = name;
//
//         series.events.on('hidden', arrangeColumns);
//         series.events.on('shown', arrangeColumns);
//
//         const bullet = series.bullets.push(new am4charts.LabelBullet());
//         bullet.interactionsEnabled = false;
//         bullet.dy = 30;
//         bullet.label.text = '{valueY}';
//         bullet.label.fill = am4core.color('#ffffff');
//
//         return series;
//       }
//
//       chart.data = [
//         {
//           category: '07-CR-A',
//           marks: 40,
//           average: 55,
//         },
//         {
//           category: '07-CR-B',
//           marks: 30,
//           average: 78,
//         },
//         {
//           category: '07-CR-C',
//           marks: 27,
//           average: 40,
//         },
//         {
//           category: '07-CR-D',
//           marks: 50,
//           average: 33,
//         }
//       ];
//
//       createSeries('marks', 'Student Marks');
//       createSeries('average', 'Class Average');
//
//       function arrangeColumns() {
//
//         const series = chart.series.getIndex(0);
//
//         const w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
//         if (series.dataItems.length > 1) {
//           const x0 = xAxis.getX(series.dataItems.getIndex(0), 'categoryX');
//           const x1 = xAxis.getX(series.dataItems.getIndex(1), 'categoryX');
//           const delta = ((x1 - x0) / chart.series.length) * w;
//           if (am4core.isNumber(delta)) {
//             const middle = chart.series.length / 2;
//
//             let newIndex = 0;
//             chart.series.each(function(series) {
//               if (!series.isHidden && !series.isHiding) {
//                 series.dummyData = newIndex;
//                 newIndex++;
//               } else {
//                 series.dummyData = chart.series.indexOf(series);
//               }
//             });
//             const visibleCount = newIndex;
//             const newMiddle = visibleCount / 2;
//
//             chart.series.each(function(series) {
//               const trueIndex = chart.series.indexOf(series);
//               const newIndex = series.dummyData;
//
//               const dx = (newIndex - trueIndex + middle - newMiddle) * delta;
//
//               series.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
//               series.bulletsContainer.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
//             });
//           }
//         }
//       }
//
//     });
//   }
}
