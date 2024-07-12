import {Component, OnInit} from '@angular/core';
import {Event} from '../../../_global/event';
import {AttendanceServiceService} from '../../../service/attendance-service.service';
import {AppUsageServiceService} from '../../../service/app-usage-service.service';
import {UsageFilter} from '../usage-filter.model';

@Component({
  selector: 'app-app-usage-dashbord',
  templateUrl: './app-usage-dashboard.component.html',
  styleUrls: ['./app-usage-dashboard.component.css']
})
export class AppUsageDashboardComponent implements OnInit {



  dateButtonOptions: string[];
  showDatePickers = false;
  showMonthSelectDropdown = false;
  dateRangeError: boolean;
  selectedMonthFilter: string;
  isMonthFilter = false;
  today = Event.setCurrentDateTime().processedFullDate;
  customDateRange = {
    'dateRangeFromDate': this.today,
    'dateRangeToDate': this.today
  };
  loadedMonthFilters: string[] = [];

  
  totalLogins: string;
  totalApiUsage: string;

  public barChartLoginsDailyLabels: string[] | number[] = [];
  public barChartApiUsagesDailyLabels: string[] | number[] = [];
  public barChartLoginsHourlyLabels: string[] | number[] = [];
  public barChartApiUsagesHourlyLabels: string[] | number[] = [];

  barChartLoginsDailyData = [
    {
      label: 'Logins Count',
      data: []
    }];

  barChartApiUsagesDailyData = [
    {
      label: 'API Usage Count',
      data: []
    }];

  barChartLoginsHourlyData = [
    {
      label: 'Logins Count',
      data: []
    }];

  barChartApiUsagesHourlyData = [
    {
      label: 'API Usage Count',
      data: []
    }];

  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartLoginsDailyColors: Array<any> = [
    {
      backgroundColor: '#0093ff',
      borderColor: '#0093ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public barChartLoginsHourlyColors: Array<any> = [
    {
      backgroundColor: '#0093ff',
      borderColor: '#0093ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public barChartApiUsagesDailyColors: Array<any> = [
    {
      backgroundColor: '#0093ff',
      borderColor: '#0093ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public barChartApiUsagesHourlyColors: Array<any> = [
    {
      backgroundColor: '#0093ff',
      borderColor: '#0093ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  barChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  dailyLoginData: { key: string, value: number }[] = [];
  dailyApiUsageData: { key: string, value: number }[] = [];
  hourlyLoginData: { key: string, value: number }[] = [];
  hourlyApiUsageData: { key: string, value: number }[] = [];

  summary: { key: string, value: number };

  usageFilter = new UsageFilter('Last 7 Days', '2020-04-01', '2020-04-18', 'April - 2020');

  constructor(private attendanceServiceService: AttendanceServiceService,
              private appUsageServiceService: AppUsageServiceService) {
  }

  ngOnInit() {
    this.loadMonthFilter();
    this.dateButtonOptions = ['Last 7 Days', 'Last Week', 'This Week', 'Select Month', 'Today', 'Custom'];
    this.loadGraphs();

    this.appUsageServiceService.usageFilterSubject.subscribe(
      usageFilter => {
        this.usageFilter = usageFilter;
        this.loadGraphs();
        
      });


  }

  loadGraphs() {
    this.loadDailyLoginStats(this.usageFilter);
    this.loadHourlyLoginStats(this.usageFilter);
    this.loadDailyApiUsageStats(this.usageFilter);
    this.loadHourlyApiUsageStats(this.usageFilter);
    this.loadLoginSummaries(this.usageFilter);
    this.loadApiUsageSummaries(this.usageFilter);
   
  }

  updateRequest() {
    let selectedDateRange;
    let selectedMonth;
    for (const key in this.dateButtonOptions) {
      if ((<HTMLInputElement>document.getElementById('dateRangeRadio' + this.removeSpace(this.dateButtonOptions[key]))).checked) {
        selectedDateRange = this.dateButtonOptions[key];
      }
    }

    this.showDatePickers = selectedDateRange === 'Custom';

    let dateRangeFromDate = this.customDateRange.dateRangeFromDate;
    let dateRangeToDate = this.customDateRange.dateRangeToDate;

    if (selectedDateRange === 'Select Month') {
      this.showMonthSelectDropdown = true;
      this.showDatePickers = false;
      selectedDateRange = 'Select Month';
      selectedMonth = this.selectedMonthFilter;
    } else if (selectedDateRange === 'Custom') {

      if (this.compareDate(dateRangeFromDate, dateRangeToDate) < 0) {
        this.dateRangeError = true;
      } else {
        this.dateRangeError = false;
      }


      this.showDatePickers = true;
      this.showMonthSelectDropdown = false;
    } else {
      this.showDatePickers = false;
      this.showMonthSelectDropdown = false;
    }

    let usageFilter = new UsageFilter(selectedDateRange, dateRangeFromDate, dateRangeToDate, selectedMonth);
    this.appUsageServiceService.usageFilterSubject.next(usageFilter);

  }

  compareDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) {
      return 0;
    }

    // Check if the first is greater than second
    if (d1 < d2) {
      return 1;
    }

    // Check if the first is less than second
    if (d1 > d2) {
      return -1;
    }
  }

  removeSpace(stringToUpdate) {
    return stringToUpdate.replace(/\s/g, '');
  }

  setRadioChecked(arrayElement, array) {
    if (array.indexOf(arrayElement) === 0) {
      return 'checked';
    } else {
      return '';
    }
  }

  changeFilter() {
    this.updateRequest();
  };

  loadMonthFilter() {

    this.attendanceServiceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
      this.loadedMonthFilters = data;
      this.selectedMonthFilter = this.loadedMonthFilters[0];
      this.isMonthFilter = true;
    });
  }

  loadDailyLoginStats(recordsObject: UsageFilter) {
    this.appUsageServiceService.loadDailyLoginStats(recordsObject, 'login', 'daily')
      .subscribe(
        (data: any) => {
          this.dailyLoginData = data;
          var dataMapped = this.mapData(this.dailyLoginData);

          this.barChartLoginsDailyLabels = dataMapped[0];
          // @ts-ignore
          this.barChartLoginsDailyData[0].data = dataMapped[1];


        });
  }

  loadHourlyLoginStats(recordsObject: UsageFilter) {
    this.appUsageServiceService.loadDailyLoginStats(recordsObject, 'login', 'hourly')
      .subscribe(
        (data: any) => {
          this.hourlyLoginData = data;
          var dataMapped = this.mapData(this.hourlyLoginData);

          this.barChartLoginsHourlyLabels = dataMapped[0];
          // @ts-ignore
          this.barChartLoginsHourlyData[0].data = dataMapped[1];


        });
  }

  loadDailyApiUsageStats(recordsObject: UsageFilter) {
    this.appUsageServiceService.loadDailyLoginStats(recordsObject, 'api-usage', 'daily')
      .subscribe(
        (data: any) => {
          this.dailyApiUsageData = data;
          var dataMapped = this.mapData(this.dailyApiUsageData);

          this.barChartApiUsagesDailyLabels = dataMapped[0];
          // @ts-ignore
          this.barChartApiUsagesDailyData[0].data = dataMapped[1];
        });
  }

  loadHourlyApiUsageStats(recordsObject: UsageFilter) {
    this.appUsageServiceService.loadDailyLoginStats(recordsObject, 'api-usage', 'hourly')
      .subscribe(
        (data: any) => {
          this.hourlyApiUsageData = data;
          var dataMapped = this.mapData(this.hourlyApiUsageData);

          this.barChartApiUsagesHourlyLabels = dataMapped[0];
          // @ts-ignore
          this.barChartApiUsagesHourlyData[0].data = dataMapped[1];
        });
  }

  loadLoginSummaries(recordsObject: UsageFilter) {
    this.appUsageServiceService.loadSummaries(recordsObject, 'login')
      .subscribe(
        (data: any) => {
          this.summary = data;
          this.totalLogins = this.summary.value.toString()
        });
        
  }

  loadApiUsageSummaries(recordsObject: UsageFilter) {
    this.appUsageServiceService.loadSummaries(recordsObject, 'api-usage')
      .subscribe(
        (data: any) => {
          this.summary = data;
          this.totalApiUsage = this.summary.value.toString();
          
        });
      
  }

  mapData(list: { key: string, value: number }[]) {

    let labels: string[] = [];
    let values: number[] = [];

    for (let singleData in list) {
      labels.push(list[singleData].key);
      values.push(list[singleData].value);
    }

    return [labels, values];
  }

}
