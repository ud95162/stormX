import {Component, NgZone, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';

@Component({
  selector: 'app-standard-vs-special-leave-graph',
  templateUrl: './standard-vs-special-leave-graph.component.html',
  styleUrls: ['./standard-vs-special-leave-graph.component.css']
})
export class StandardVsSpecialLeaveGraphComponent implements OnInit {
  year = new Date().getFullYear();
  selectedYear: any;
  yearList: any[] = [];

  allRecruitmentResignationsData;
  standardLeavesData;
  specialLeavesData;

  public lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  public standardSpecialChartData = [
    {
      label: 'Standard Leave Count',
      data: []
    },
    {
      label: 'Special Leave Count',
      data: []
    },
  ];

  showCustomGraph = false;
  showCustomLoading = true;
  showNoDataCustomError = false;

  isMobile = false;
  isTablet = false;
  isDesktop = false;

// lineChart
  public lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public leaveChartColors: Array<any> = [
    { // dark - standard
      backgroundColor: 'rgba(73,144,226,0)',
      borderColor: '#0d47a1cc',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#1565c0cc',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // light - special
      backgroundColor: 'rgba(73,144,226,0)',
      borderColor: '#621055',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#621055',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  getStandardVsSpecialDataSubscription: Subscription;
  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone,
              private leaveServiceService: LeaveServiceService) {
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    const that = this;

    this.responsiveService.OnPhone(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnTablet(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnDesktop(
      function (mediaQueryList: MediaQueryList) {
        that.ShowDesktop();
      }
    );
  }

  ngOnInit() {
    this.loadYearList(this.year);
  }
  loadYearList(year) {
    this.getStandardVsSpecialDataSubscription = this.leaveServiceService.getLeaveDetailsForAdminGraphs(year)
      .subscribe((data: any) => {

          this.standardLeavesData = data.standardLeaves;
          this.specialLeavesData = data.specialLeaves;
          if (data !== null) {
            const tempData1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.standardLeavesData.length; j++) {
                if (this.standardLeavesData[j].month === labels[i]) {
                  tempData1[i] = this.standardLeavesData[j].leaveAmount;
                }
              }
            }
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.specialLeavesData.length; j++) {
                if (this.specialLeavesData[j].month === labels[i]) {
                  tempData2[i] = this.specialLeavesData[j].leaveAmount;
                }
              }
            }
            this.lineChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            this.standardSpecialChartData[0].data = tempData1;
            this.standardSpecialChartData[1].data = tempData2;

            this.showCustomGraph = true;
            this.showCustomLoading = false;
            this.showNoDataCustomError = false;
            this.getStandardVsSpecialDataSubscription.unsubscribe();
          }
        }, error => {
          this.showCustomGraph = false;
          this.showNoDataCustomError = true;
          this.showCustomLoading = false;

        }
      );
  }
  onYearChange(year: any) {
    this.year = year.target.value;
    this.loadYearList(this.year);
  }
  ShowMobile() {
    this.zone.run(() => {
      this.isMobile = true;
      this.isTablet = false;
      this.isDesktop = false;
    });
  }

  ShowDesktop() {
    this.zone.run(() => {
      this.isMobile = false;
      this.isTablet = false;
      this.isDesktop = true;
    });
  }

  ShowTablet() {
    this.zone.run(() => {
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    });
  }

  ngOnDestroy() {
    if (this.getStandardVsSpecialDataSubscription) {
      this.getStandardVsSpecialDataSubscription.unsubscribe();
    }
  }

}
