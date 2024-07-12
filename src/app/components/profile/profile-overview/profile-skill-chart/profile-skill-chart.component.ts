import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-skill-chart',
  templateUrl: './profile-skill-chart.component.html',
  styleUrls: ['./profile-skill-chart.component.css']
})
export class ProfileSkillChartComponent implements OnInit {

  amCore;
  amCharts;
  chart;
  skillData: string;

  constructor() {
    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
  }

  ngOnInit() {
    // try {
    // this.chart = this.createClusteredBarChart( 'skillChart' );
    //
    // this.chart.colors.list = [
    //   this.amCore.color('#147AD6'),
    //   this.amCore.color('#E20000'),
    // ];
    //
    // this.createSeries('surpervisorRate', 'Surpervisor Rate');
    // this.createSeries('personalRate', 'Personal Rate');
    //
    // } catch (e) {
    //   console.log(e);
    // }
  }

  /**
   * add data to chart
   * updateChart method called in parent component( profile-overview )
   * @param data
   */
  updateChart(data) {
    // this.chart.data = data;
    this.chart = this.createLineChart('skillChart');
    this.chart.colors.list = [
      this.amCore.color('#147AD6'),
      this.amCore.color('#e84754'),
    ];
    for (let key in data) {
       this.skillData  = data[key].skill;
      this.chart.data.push({'skill': this.skillData.split(' ')[0], 'personal': data[key].personalRate,
        'supervisor': data[key].surpervisorRate});
    }
  }

  createLineChart(htmlId: string) {

// Create chart instance
    const chart = this.amCore.create('skillChart', this.amCharts.XYChart);

// Add percent sign to all numbers
//     chart.numberFormatter.numberFormat = '#.#\'%\'';
// Create axes
    const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = 'skill';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fontSize = 8;

    const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
    // valueAxis.title.text = 'Rate';
    // valueAxis.title.fontWeight = 200;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.fontSize = 8;
    valueAxis.min = 0;
    valueAxis.max = 10;

// Create series
    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.valueY = 'personal';
    series.dataFields.categoryX = 'skill';
    series.clustered = false;
    series.tooltipText = '[font-size: 12px] personal rate: [bold]{valueY}[/][/]';
    // series.colorField = '#0296ED';
    series.columns.template.stroke = this.amCore.color('#0296ED');
    series.columns.template.fill = this.amCore.color('#0296ED');

    const series2 = chart.series.push(new this.amCharts.ColumnSeries());
    series2.dataFields.valueY = 'supervisor';
    series2.dataFields.categoryX = 'skill';
    series2.clustered = false;
    series2.columns.template.width = this.amCore.percent(50);
    series2.tooltipText = '[font-size: 12px] supervisor rate: [bold]{valueY}[/][/]';
    // series.colorField = '#01B075';
    series2.columns.template.stroke = this.amCore.color('#e84754');
    series2.columns.template.fill = this.amCore.color('#e84754');

    chart.cursor = new this.amCharts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    return chart;
  }

  createClusteredBarChart( htmlId: string ) {
    const chart = this.amCore.create(htmlId, this.amCharts.XYChart);
    chart.responsive.enabled = true;
    chart.colors.step = 2;

    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'top';
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    const xAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    xAxis.dataFields.category = 'skill';
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    xAxis.renderer.minGridDistance = 60;
    const label = xAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 120;
    label.tooltipText = '{skill}';

    const yAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
    yAxis.min = 0;

    return chart;
  }


  createSeries(value, name) {
    const series = this.chart.series.push(new this.amCharts.ColumnSeries())
    series.dataFields.valueY = value
    series.dataFields.categoryX = 'skill'
    series.name = name

    // series.events.on('hidden', this.arrangeColumns);
    // series.events.on('shown', this.arrangeColumns);

    const bullet = series.bullets.push(new this.amCharts.LabelBullet())
    bullet.interactionsEnabled = false
    bullet.dy = 30;
    bullet.label.text = '{valueY}'
    bullet.label.fill = this.amCore.color('#ffffff')

    return series;
  }
}
