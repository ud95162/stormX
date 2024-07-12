import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmChartService {

  private amCore;
  private amCharts;

  constructor() {
    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
    // @ts-ignore
    this.amCore.useTheme(window.am4themes_animated);
  }


  /**
   * ex:-
   * chart.data = [
   { category: 'Three',
   value: 3,
   },

   { category: 'Four',
   value: 4,
   }
   ]
   then categoryName is 'category' & valueName is 'value'

   * @param devId dev element id which is the place to create chart
   * @param categoryName chart data x component name
   * @param valueName chart data y component name
   * @param BarColor hex color code for bars ex:- '#845EC2'
   */
  createBarChart(devId: string, categoryName: string, valueName: string, barColor: string = '#147AD6') {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);

    chart.colors.list = [this.amCore.color(barColor)];

    const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.minGridDistance = 30;

    const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());

    const series = this.createColumnSeries(categoryName, valueName);

    chart.series.push(series);

    return chart;

  }

  createClausterChart(devId: string, categoryName: string) {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);

    // Create axes
    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.numberFormatter.numberFormat = '#';
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    const  valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.opposite = true;

    return chart;

  }

  // Create series
  createSeries(chart, field, categoryName) {
    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = 'projectName';

    series.name = categoryName;
    series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
    series.columns.template.height = this.amCore.percent(100);
    series.sequencedInterpolation = true;


    // let valueLabel = series.bullets.push(new this.amCharts.LabelBullet());
    // valueLabel.label.text = "{valueX}";
    // valueLabel.label.horizontalCenter = "left";
    // valueLabel.label.dx = 10;
    // valueLabel.label.hideOversized = false;
    // valueLabel.label.truncate = false;
    //
    // let categoryLabel = series.bullets.push(new this.amCharts.LabelBullet());
    // categoryLabel.label.text = "{name}";
    // categoryLabel.label.horizontalCenter = "right";
    // categoryLabel.label.dx = -10;
    // categoryLabel.label.fill = this.amCharts.color("#fff");
    // categoryLabel.label.hideOversized = false;
    // categoryLabel.label.truncate = false;
  }


  // createSeries(field, name, chart) {
  //   var series = chart.series.push(this.amCharts.ColumnSeries());
  //   series.dataFields.valueX = field;
  //   series.dataFields.categoryY = "year";
  //
  // }

  /**
   * ex:- chart.data = [
   {
   category: 'Three',
   value: 3,
   value1: 2,
   value2: 6,
   }
   ];
   then categoryName is 'category' & valueNames array is ['value', 'value1', 'value2']

   * @param devId
   * @param categoryName
   * @param valueNames
   * @param barColors is array of hex colors for bars ex:- ['#845EC2', '#FF6F91', '#FFC75F']
   */
  createMultipleBarChart(devId: string, categoryName: string, valueNames: Array<String>, barColors: Array<Array<String>>) {

    const chart = this.amCore.create(devId, this.amCharts.XYChart);

    const colors = [];
    for (const color of barColors) {
      colors.push(this.amCore.color(color));
    }
    chart.colors.list = colors;

    const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;


    const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.renderer.grid.template.disabled = true;

    // chart.series.push(series);
    for (const valueName of valueNames) {
      // @ts-ignore
      chart.series.push(this.createColumnSeries(categoryName, valueName, valueName));
    }

    return chart;
  }

  /**
   * ex:- chart.data = [
   {
   category: 'Three',
   value: 3,
   value1: 2,
   value2: 6,
   }
   ];
   then categoryName is 'category' & valueNames array is ['value', 'value1', 'value2']

   * @param devId
   * @param categoryName
   * @param valueNames
   * @param barColors is array of hex colors for bars ex:- [ ['#845EC2', '#FF6F91'], ['#845EC2', '#FF6F91'] ]
   */
  createMultipleBarChartGradient(devId: string, categoryName: string, valueNames: Array<String>, barColors: Array<Array<string>>) {

    const chart = this.amCore.create(devId, this.amCharts.XYChart);
    chart.colors.step = 2;

    const colors = [];
    for (const color of barColors) {
      colors.push(this.amCore.color(color[0]));
      const gradient = new this.amCore.LinearGradient();
      gradient.addColor(this.amCore.color(color[0]));
      gradient.addColor(this.amCore.color(color[1]));
      gradient.rotation = 360;

      // colors.push(gradient);
    }
    chart.colors.list = colors;

    const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;


    const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
    // valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.min = 0;
    // valueAxis.renderer.grid.template.disabled = true;

    // chart.series.push(series);
    for (const valueName of valueNames) {
      // @ts-ignore
      chart.series.push(this.createColumnSeries(categoryName, valueName, valueName));
    }

    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'bottom';
    chart.legend.valign = 'bottom';
    chart.legend.useDefaultMarker = true;
    chart.legend.fontSize = 10;
    const marker = chart.legend.markers.template.children.getIndex(0);
    const markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 0;
    marker.strokeOpacity = 0;

    return chart;
  }

  /**
   *
   * @param categoryName
   * @param valueName
   * @param seriesName is the bar name when cousor point on the bar (usually valueName is the seriesName)
   */
  private createColumnSeries(categoryName: string, valueName: string, seriesName: string = '') {
    const series = new this.amCharts.ColumnSeries();
    series.columns.template.tooltipText = '{name}: {valueY.value}';
    series.name = seriesName;
    series.dataFields.categoryX = categoryName;
    series.dataFields.valueY = valueName;

    return series;
  }

  createMultiColorVerticalBarChart(devId, categoryName, valueName, colors) {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);

    // Create axes
    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fontSize = 0; // Set font size to 0 to hide the labels

    const valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 1; // Set max label position to 1 to display all labels
    valueAxis.renderer.labels.template.adapter.add('text', function(text) {
      return text + '%'; // Append '%' to the value
    });

    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.categoryY = categoryName;
    series.dataFields.valueX = valueName;
    // series.columns.template.propertyFields.fill = colors;
    series.columns.template.tooltipText = '{categoryY} : {valueX}%';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipX = this.amCore.percent(100);

    series.columns.template.adapter.add('fill', function(fill, target){
      return colors[target.dataItem.index];
    });

    // Add labels inside the bars
    const labelBullet = series.bullets.push(new this.amCharts.LabelBullet());
    labelBullet.label.text = '{categoryY}';
    labelBullet.label.fontSize = 14;
    labelBullet.label.horizontalCenter = 'right'; // Set the horizontal alignment to the left
    labelBullet.locationX = 0; // Position the label at the start of the bar
    labelBullet.label.hideOversized = false; // Show labels even if the bar is too small
    // labelBullet.label.truncate = false; // Do not truncate labels if they exceed the bar width
    labelBullet.label.truncate = true;
    labelBullet.label.dx = -10;


// Set the text color of the label to white
    labelBullet.label.fill = this.amCore.color('#ffffff');
    categoryAxis.sortBySeries = series;

    return chart;
  }

  /**
   *
   * @param devId
   * @param categoryName
   * @param valueName
   * @param barGradientColorOne
   * @param barGradientColorTwo
   */

  createVerticalBarChartGradient(devId, categoryName, valueName, barGradientColorOne, barGradientColorTwo) {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);
    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = false;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.fontSize = 0; // Set font size to 0 to hide the labels

    const valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 1; // Set max label position to 1 to display all labels
    valueAxis.renderer.labels.template.adapter.add('text', function(text) {
      return text + '%'; // Append '%' to the value
    });


    // Add bottom and top lines to the Y-axis
    // valueAxis.renderer.grid.template.strokeDasharray = '2,2'; // Customize the line style
    // valueAxis.renderer.grid.template.strokeOpacity = 0.8;
    valueAxis.renderer.grid.template.line = valueAxis.renderer.line; // Set line object

    valueAxis.renderer.grid.template.strokeDasharray = '2,2'; // Customize the line style
    valueAxis.renderer.grid.template.line.strokeOpacity = 0.6; // Set line opacity
    valueAxis.renderer.grid.template.line.y = 0; // Set line position at the bottom of the chart
    valueAxis.renderer.grid.template.line.dashArray = '2,2'; // Make the line dotted

    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.categoryY = categoryName;
    series.dataFields.valueX = valueName;
    series.columns.template.tooltipText = '{categoryY} : {valueX}%';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipX = this.amCore.percent(100);

    // Set the gradient fill for the columns
    const gradient = new this.amCore.LinearGradient();
    gradient.addColor(this.amCore.color(barGradientColorOne));
    gradient.addColor(this.amCore.color(barGradientColorTwo));
    gradient.rotation = 90; // Rotate the gradient vertically
    series.columns.template.fill = gradient;

    // Add labels inside the bars
    const labelBullet = series.bullets.push(new this.amCharts.LabelBullet());
    labelBullet.label.text = '{categoryY}';
    labelBullet.label.fontSize = 14;
    labelBullet.label.horizontalCenter = 'right'; // Set the horizontal alignment to the left
    labelBullet.locationX = 0; // Position the label at the start of the bar
    labelBullet.label.hideOversized = false; // Show labels even if the bar is too small
    labelBullet.label.truncate = false; // Do not truncate labels if they exceed the bar width
    labelBullet.label.dx = -10;


// Set the text color of the label to white
    labelBullet.label.fill = this.amCore.color('#ffffff');
    return chart;
  }

  createVerticalBarChartGradientWithOutsideLabels(devId: string, categoryName: string, valueName: string,
                                 barGradientColorOne: string, barGradientColorTwo: string) {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);
    chart.padding(40, 40, 40, 40);


    // chart.colors.list = [this.amCore.color(barColor)];

    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = false;
    categoryAxis.renderer.grid.template.disabled = true;


    const valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.grid.template.strokeDasharray = '2,2'; // Customize the line style
    valueAxis.renderer.grid.template.strokeOpacity = 0.8;

    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.categoryY = categoryName;
    series.dataFields.valueX = valueName;
    series.columns.template.tooltipText = '{categoryY} : {valueX}%';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipX = this.amCore.percent(100);

    // Set the gradient fill for the columns
    const gradient = new this.amCore.LinearGradient();
    gradient.addColor(this.amCore.color(barGradientColorOne));
    gradient.addColor(this.amCore.color(barGradientColorTwo));
    gradient.rotation = 90; // Rotate the gradient vertically
    series.columns.template.fill = gradient;

//     // Add labels inside the bars
//     const labelBullet = series.bullets.push(new this.amCharts.LabelBullet());
//     labelBullet.label.text = '{categoryY}';
//     labelBullet.label.fontSize = 14;
//     labelBullet.label.horizontalCenter = 'right'; // Set the horizontal alignment to the left
//     labelBullet.locationX = 0; // Position the label at the start of the bar
//     labelBullet.label.hideOversized = false; // Show labels even if the bar is too small
//     labelBullet.label.truncate = false; // Do not truncate labels if they exceed the bar width
//     labelBullet.label.dx = -10;
//
//
// // Set the text color of the label to white
//     labelBullet.label.fill = this.amCore.color('#ffffff');
    return chart;
  }



  createVerticalBarChartwithLabels(devId, categoryName, valueName, barGradientColorOne) {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);
    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = false;
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 1; // Set max label position to 1 to display all labels
    valueAxis.renderer.labels.template.adapter.add('text', function(text) {
      return text; // Append '%' to the value
    });

    valueAxis.renderer.grid.template.line = valueAxis.renderer.line; // Set line object

    valueAxis.renderer.grid.template.strokeDasharray = '2,2'; // Customize the line style
    valueAxis.renderer.grid.template.line.strokeOpacity = 0.6; // Set line opacity
    valueAxis.renderer.grid.template.line.y = 0; // Set line position at the bottom of the chart
    valueAxis.renderer.grid.template.line.dashArray = '2,2'; // Make the line dotted

    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.categoryY = categoryName;
    series.dataFields.valueX = valueName;
    series.columns.template.tooltipText = '{categoryY} : {valueX}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipX = this.amCore.percent(100);

    // Set the gradient fill for the columns
    const gradient = new this.amCore.LinearGradient();
    gradient.addColor(this.amCore.color(barGradientColorOne));
    gradient.rotation = 90; // Rotate the gradient vertically
    series.columns.template.fill = gradient;

    // Add labels inside the bars
    const labelBullet = series.bullets.push(new this.amCharts.LabelBullet());
    labelBullet.label.text = '{categoryY}';
    labelBullet.label.fontSize = 14;
    labelBullet.label.horizontalCenter = 'right'; // Set the horizontal alignment to the left
    labelBullet.locationX = 0; // Position the label at the start of the bar
    labelBullet.label.hideOversized = false; // Show labels even if the bar is too small
    labelBullet.label.truncate = false; // Do not truncate labels if they exceed the bar width
    labelBullet.label.dx = -10;


// Set the text color of the label to white
    labelBullet.label.fill = this.amCore.color('#ffffff');
    return chart;
  }


  createVerticalBarChart(devId: string, categoryName: string, valueName: string, barColor: string) {
    const chart = this.amCore.create(devId, this.amCharts.XYChart);

    chart.colors.list = [this.amCore.color(barColor)];

    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = false;
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.xAxes.push(new this.amCharts.ValueAxis());
    valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.renderer.grid.template.disabled = true;

    const series = chart.series.push(new this.amCharts.ColumnSeries());
    series.dataFields.categoryY = categoryName;
    series.dataFields.valueX = valueName;
    series.columns.template.tooltipText = '{categoryY} : {valueX}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipX = this.amCore.percent(100);

    return chart;
  }


  /**
   *
   * @param devId
   */
  createLineChart(devId: string, categoryName: string, valueName: string,
                  strokeColor: string, fillColor: string) {
    const lineChart = this.amCore.create(devId, this.amCharts.XYChart);

    const xAxis = lineChart.xAxes.push(new this.amCharts.CategoryAxis());
    xAxis.renderer.grid.template.location = 0.5;
    xAxis.dataFields.category = categoryName;
    xAxis.renderer.minGridDistance = 50;
    xAxis.startLocation = 0.5;
    xAxis.endLocation = 0.5;
    xAxis.renderer.grid.template.disabled = true;

    const yAxis = lineChart.yAxes.push(new this.amCharts.ValueAxis());
    yAxis.renderer.grid.template.disabled = true;
    yAxis.min = 0;

    const amSeries = lineChart.series.push(new this.amCharts.LineSeries());
    amSeries.dataFields.valueY = valueName;
    amSeries.dataFields.categoryX = categoryName;

    amSeries.strokeWidth = 3;
    amSeries.tensionX = 0.7;
    amSeries.fillOpacity = 0.3;
    amSeries.stroke = strokeColor;
    amSeries.fill = fillColor;
    amSeries.bullets.push(new this.amCharts.CircleBullet());
    amSeries.connect = false;
    amSeries.tooltipText =  valueName + ': {valueY}';;
    amSeries.tooltip.getStrokeFromObject = true;
    amSeries.tooltip.background.strokeWidth = 3;
    amSeries.tooltip.getFillFromObject = false;
    amSeries.tooltip.label.fill = '#000000'; // Set the tooltip text color

    // Add cursor
    lineChart.cursor = new this.amCharts.XYCursor();
    lineChart.cursor.xAxis = xAxis;

    // Scrollbars
    // lineChart.scrollbarX = new this.amCore.Scrollbar();
    // lineChart.scrollbarY = new this.amCore.Scrollbar();

    return lineChart;
  }

  /**
   *
   * @param devId
   * @param categoryName
   * @param valueNames
   * @param colors
   * @param strokeWidth
   * @param options
   */
  createMultipleLineChart(devId: string, categoryName: string, valueNames: Array<string>,
                          colors: Array<string>, strokeWidth: number = 2,
                          options: any = {
                            isFill: false,
                            fillOpacity: 0.4
                          }
  ) {
    const lineChart = this.amCore.create(devId, this.amCharts.XYChart);

    lineChart.marginLeft = 50;
    lineChart.marginRight = 50;
    lineChart.paddingLeft = 50;
    lineChart.paddingRight = 50;
    const xAxis = lineChart.xAxes.push(new this.amCharts.CategoryAxis());
    xAxis.renderer.grid.template.location = 0.5;
    xAxis.dataFields.category = categoryName;
    xAxis.renderer.minGridDistance = 40;
    xAxis.startLocation = 0.5;
    xAxis.endLocation = 0.5;
    xAxis.renderer.grid.template.disabled = true;
    // xAxis.renderer.labels.overflow = 'none';
    xAxis.renderer.maxLabelPosition = 1;
    xAxis.renderer.labels.fontSize = 10; // Adjust the font size as needed


    const yAxis = lineChart.yAxes.push(new this.amCharts.ValueAxis());
    // yAxis.renderer.grid.template.disabled = true;
    yAxis.min = 0;

    for (let i = 0; i < valueNames.length; i++) {
      lineChart.series.push(this.createLineSeries(categoryName, valueNames[i], colors[i], strokeWidth, options));
    }

    lineChart.legend = new this.amCharts.Legend();
    lineChart.legend.position = 'bottom';
    lineChart.legend.valign = 'bottom';
    lineChart.legend.fontSize = 10;
    lineChart.legend.useDefaultMarker = true;
    const marker = lineChart.legend.markers.template.children.getIndex(0);
    const markerTemplate = lineChart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 0;
    marker.strokeOpacity = 0;

    // Add cursor
    lineChart.cursor = new this.amCharts.XYCursor();
    lineChart.cursor.xAxis = xAxis;


    return lineChart;
  }


  private createLineSeries(categoryName: string, valueName: string, strokeColor, strokeWidth, options: any = {}) {
    const series = new this.amCharts.LineSeries();
    series.name = valueName;
    series.dataFields.categoryX = categoryName;
    series.dataFields.valueY = valueName;
    series.tooltipText =  valueName + ': {valueY}'; // Display y-axis value in the tooltip
    // series.valueYShow = 'both'; // Display the y-axis value on both the tooltip and the data point
    series.tooltip.label.fill = '#000000'; // Set the tooltip text color


    series.stroke = strokeColor;
    series.strokeWidth = strokeWidth;
    series.connect = false;
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.tooltip.getFillFromObject = false;
    return series;
  }

  /**
   *  ex:-
   * chart.data = [
   {      categoryName: 'Three',
   valueName: 3,
   },

   {      categoryName: 'Four',
   valueName: 4,
   }
   ]
   * @param divId
   * @param categoryName
   * @param valueName
   */
  createDnutChartV1(divId: string, categoryName: string, valueName: string, innerRadius: number = 40,
                    options: any = {labelPrefix: '', isShowingSum: false}) {

    const chart = this.amCore.create(divId, this.amCharts.PieChart);

    // Set inner radius
    chart.innerRadius = this.amCore.percent(innerRadius);

// Add and configure Series
    const pieSeries = chart.series.push(new this.amCharts.PieSeries());
    pieSeries.dataFields.value = valueName;
    pieSeries.dataFields.category = categoryName;
    pieSeries.slices.template.stroke = this.amCore.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    if (options['isShowingSum']) {
      const label = pieSeries.createChild(this.amCore.Label);
      label.text = options['labelPrefix'] + '{values.value.sum}';
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'middle';
      label.fontSize = 40;
    }

    return chart;

  }


  /**
   *  ex:-
   * chart.data = [
   {      categoryName: 'Three',
   valueName: 3,
   },

   {      categoryName: 'Four',
   valueName: 4,
   }
   ]
   * @param divId
   * @param categoryName
   * @param valueName
   */
  createDnutChartV2(divId: string, categoryName: string, valueName: string, innerRadius: number = 40,
                    options: any = {labelPrefix: '', isShowingSum: false}) {

    const chart = this.amCore.create(divId, this.amCharts.PieChart);

    const pieSeries = chart.series.push(new this.amCharts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'country';
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'right';

    chart.innerRadius = this.amCore.percent(innerRadius);

    if (options['isShowingSum']) {
      const label = pieSeries.createChild(this.amCore.Label);
      label.text = options['labelPrefix'] + '{values.value.sum}';
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'middle';
      label.fontSize = 40;
    }

    return chart;
  }

  /**
   * This is a function that creates a Gantt chart using the amCharts library.
   * The chart is identified by the provided chartId.
   * The function takes in several parameters including the category name,
   * the x-axis values for the open date, the x-axis values for the date,
   * the y-axis values for the category, and the color codes for the chart.
   *
   * The function initializes the chart and sets its opacity to 0 for a fade-in effect. It also sets the date format for the chart.
   *
   * The function creates a category axis and sets its properties,
   * such as the location of the grid and the minimum grid distance.
   * It also creates a date axis and sets its properties, such as the date format, the minimum grid distance, and the base interval.
   *
   * A column series is created and its properties are set.
   * The tooltip text is updated to include the allocation percentage.
   * The data fields are associated with the provided parameters,
   * including the open date, date, category, and value.
   * The column series properties, such as stroke opacity, height, and fill color, are also set.
   *
   * A scrollbar added to the x-axis of the chart.
   *
   * Finally, the function returns the created chart.
   *
   * Please let me know if you have any further questions or if there's anything else I can assist you with.
   * @param chartId
   * @param categoryName
   * @param seriesOpenDateX
   * @param seriesDateX
   * @param seriesValue
   * @param colorCodes
   */
  createGanttChart(chartId: string, categoryName: string,
                   seriesOpenDateX: string, seriesDateX: string, seriesValue: string, colorCodes: string) {

    const chart = this.amCore.create(chartId, this.amCharts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    const categoryAxis = chart.yAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 60;

    const dateAxis = chart.xAxes.push(new this.amCharts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.baseInterval = { count: 1, timeUnit: 'day' };
    dateAxis.renderer.tooltipLocation = 0;

    const series1 = chart.series.push(new this.amCharts.ColumnSeries());
    series1.columns.template.width = this.amCore.percent(60);

    // Update tooltipText to include allocationPercentage
    series1.columns.template.tooltipText = '{categoryY}: {openDateX} - {dateX}\nAllocation: {value}%';

    series1.dataFields.openDateX = seriesOpenDateX;
    series1.dataFields.dateX = seriesDateX;
    series1.dataFields.categoryY = categoryName;
    series1.dataFields.value = seriesValue; // Add this line to associate allocationPercentage with the column height
    series1.columns.template.strokeOpacity = 1;
    series1.columns.template.height = this.amCore.percent(40);
    series1.columns.template.fill = colorCodes; // Set the first color from the colorSet

    chart.scrollbarX = new this.amCore.Scrollbar();

    return chart;
  }


  createDnutWithRadialGradient(chartId: string, categoryAxis: string, valueAxis: string, colorCodes: Array<String>) {

    // Create chart instance
    const chart = this.amCore.create(chartId, this.amCharts.PieChart);

    // Add and configure Series
    const pieSeries = chart.series.push(new this.amCharts.PieSeries());
    pieSeries.dataFields.value = valueAxis;
    pieSeries.dataFields.category = categoryAxis;
    pieSeries.innerRadius = this.amCore.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    colorCodes.forEach(color => {
      pieSeries.colors.list.push(this.amCore.color(color));
    });

    const rgm = new this.amCore.RadialGradientModifier();
    // rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
    rgm.brightnesses.push(0, 0, 0, 0, 0);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    // pieSeries.slices.template.strokeOpacity = 0;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'bottom';
    chart.legend.useDefaultMarker = true;
    chart.legend.fontSize = 10;
    chart.legend.valueLabels.template.disabled = true;
    const marker = chart.legend.markers.template.children.getIndex(0);
    const markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;

    return pieSeries;
  }

  createPieChartWithRadialGradient(chartId: string, categoryAxis: string, valueAxis: string, colorCodes: Array<String>) {
    // Create chart instance
    const chart = this.amCore.create(chartId, this.amCharts.PieChart);

    // Add and configure Series
    const pieSeries = chart.series.push(new this.amCharts.PieSeries());
    pieSeries.dataFields.value = valueAxis;
    pieSeries.dataFields.category = categoryAxis;

    // Remove innerRadius to create a basic pie chart without the space in the middle
    pieSeries.innerRadius = 0;

    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    colorCodes.forEach(color => {
      pieSeries.colors.list.push(this.amCore.color(color));
    });

    const rgm = new this.amCore.RadialGradientModifier();
    rgm.brightnesses.push(0, 0, 0, 0, 0);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'bottom';
    chart.legend.useDefaultMarker = true;
    chart.legend.fontSize = 10;
    chart.legend.valueLabels.template.disabled = true;
    const marker = chart.legend.markers.template.children.getIndex(0);
    const markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;

    return pieSeries;
  }

  createDnutWithRadialGradientWithCustomizedFields(chartId: string, categoryAxis: string, valueAxis: string, colorCodes: Array<String>,
                                                   distribution: Array<any>, total: number) {

    console.log( distribution);
    // Create chart instance
    const chart = this.amCore.create(chartId, this.amCharts.PieChart);
    // Get Data array object
    chart.data = distribution;
    const totalCount = total;
    // Add and configure Series
    const pieSeries = chart.series.push(new this.amCharts.PieSeries());
    pieSeries.dataFields.value = valueAxis;
    pieSeries.dataFields.category = categoryAxis;
    pieSeries.innerRadius = this.amCore.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    // Total count in inner circle
    const innerLabel = pieSeries.createChild(this.amCore.Label);
    innerLabel.text = totalCount;
    innerLabel.horizontalCenter = 'middle';
    innerLabel.verticalCenter = 'middle';
    innerLabel.fontSize = 40;

    // Set legend settings
    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'right';
    chart.legend.useDefaultMarker = false;
    chart.legend.labels.template.text = '{type}';
    chart.legend.labels.template.truncate = false;
    chart.legend.labels.template.wrap = true;
    chart.legend.valueLabels.template.text = '{count}';

    colorCodes.forEach(color => {
      pieSeries.colors.list.push(this.amCore.color(color));
    });

    const rgm = new this.amCore.RadialGradientModifier();
    // rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
    rgm.brightnesses.push(0, 0, 0, 0, 0);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;
    // pieSeries.slices.template.text = '{type}';

    const marker = chart.legend.markers.template.children.getIndex(0);
    const markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;

    return pieSeries;
  }

  createLineChartWithScroll(devId: string, categoryName: string, valueName: string,
                            strokeColor: string, fillColor: string) {

    const chart = this.createLineChart(devId, categoryName, valueName, strokeColor, fillColor);
    // Scrollbars
    chart.scrollbarX = new this.amCore.Scrollbar();
    // chart.scrollbarY = new this.amCore.Scrollbar();

    return chart;
  }

  createStackedBarChart(chartID: any, categoryName: string, valueNames: Array<String>, colors: Array<String>) {
    const chart = this.amCore.create(chartID, this.amCharts.XYChart);
    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);

    const categoryAxis = chart.xAxes.push(new this.amCharts.CategoryAxis());
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.disabled = true;


    const valueAxis = chart.yAxes.push(new this.amCharts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;

    for (const valueName of valueNames) {
      chart.series.push(this.createStackedColumnSeries(categoryName, valueName, '', colors[valueNames.indexOf(valueName)]));
    }


    chart.legend = new this.amCharts.Legend();
    chart.legend.position = 'bottom';
    chart.legend.valign = 'bottom';
    chart.legend.useDefaultMarker = true;
    chart.legend.fontSize = 10;
    const marker = chart.legend.markers.template.children.getIndex(0);
    const markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 0;
    marker.strokeOpacity = 0;
    chart.scrollbarX = new this.amCore.Scrollbar();

    return chart;
  }

  private createStackedColumnSeries(categoryName: string, valueName: String, seriesName: string = '', color: any) {
    const series = new this.amCharts.ColumnSeries();
    // series.columns.template.width = this.amCore.percent(40);
    series.columns.template.tooltipText =
      '{name}: {valueY.totalPercent.formatNumber(\'#.00\')}%';
    series.name = valueName;
    series.dataFields.categoryX = categoryName;
    series.dataFields.valueY = valueName;
    series.dataFields.valueYShow = 'totalPercent';
    series.dataItems.template.locations.categoryX = 0.5;
    series.stacked = true;
    series.tooltip.pointerOrientation = 'vertical';
    series.fill = this.amCore.color(color);

    const bullet = series.bullets.push(new this.amCharts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.label.text = '{valueY}';
    bullet.label.fill = this.amCore.color('#ffffff');
    bullet.locationY = 0.5;

    return series;
  }


  /**
   *
   * @param devId
   * @param categoryName
   * @param valueNames
   * @param colors
   * @param strokeWidth
   * @param options
   */
  createMultipleLineChartWithFill(devId: string, categoryName: string, valueNames: Array<string>,
                                  colors: Array<string>, strokeWidth: number = 3,
                                  options: any = {
                                    isFill: false,
                                    fillOpacity: 0.4
                                  }
  ) {
    const lineChart = this.amCore.create(devId, this.amCharts.XYChart);

    const xAxis = lineChart.xAxes.push(new this.amCharts.CategoryAxis());
    xAxis.renderer.grid.template.location = 0.5;
    xAxis.dataFields.category = categoryName;
    xAxis.renderer.minGridDistance = 50;
    xAxis.startLocation = 0.5;
    xAxis.endLocation = 0.5;
    xAxis.renderer.labels.fontSize = 10;
    xAxis.renderer.grid.template.disabled = true;

    const yAxis = lineChart.yAxes.push(new this.amCharts.ValueAxis());
    yAxis.renderer.grid.template.disabled = true;
    yAxis.min = 0;

    for (let i = 0; i < valueNames.length; i++) {
      lineChart.series.push(this.createLineSeriesFill(categoryName, valueNames[i], colors[i], strokeWidth, options));
    }

    // lineChart.legend = new this.amCharts.Legend();
    lineChart.legend = new this.amCharts.Legend();
    lineChart.legend.position = 'bottom';
    lineChart.legend.valign = 'bottom';
    lineChart.legend.useDefaultMarker = true;
    const marker = lineChart.legend.markers.template.children.getIndex(0);
    const markerTemplate = lineChart.legend.markers.template;
    markerTemplate.width = 12;
    markerTemplate.height = 12;
    marker.cornerRadius(6, 6, 6, 6);
    marker.strokeWidth = 0;
    marker.strokeOpacity = 0;

    // Add cursor
    lineChart.cursor = new this.amCharts.XYCursor();
    lineChart.cursor.xAxis = xAxis;


    return lineChart;
  }


  private createLineSeriesFill(categoryName: string, valueName: string, strokeColor, strokeWidth, options: any = {}) {
    const series = new this.amCharts.LineSeries();
    series.name = valueName;
    series.dataFields.categoryX = categoryName;
    series.dataFields.valueY = valueName;
    series.tooltipText =  valueName + ': {valueY}'; // Display y-axis value in the tooltip
    // series.valueYShow = 'both'; // Display the y-axis value on both the tooltip and the data point
    series.tooltip.label.fill = '#000000'; // Set the tooltip text color


    series.stroke = strokeColor;
    series.strokeWidth = strokeWidth;
    series.tensionX = 0.7;
    series.fillOpacity = 0.3;
    series.fill = strokeColor;
    series.bullets.push(new this.amCharts.CircleBullet());
    series.connect = false;
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.tooltip.getFillFromObject = false;
    return series;
  }

}


