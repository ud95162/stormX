import {Component, NgZone, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';
import {GeneralOps} from "../../../../../../../../utility/GeneralOps";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-short-leave-utlization',
  templateUrl: './short-leave-utlization.component.html',
  styleUrls: ['./short-leave-utlization.component.css']
})
export class ShortLeaveUtlizationComponent implements OnInit {

  generalOps = new GeneralOps();
  year = new Date().getFullYear();
  selectedYear: any;
  yearList: any[] = [];
  isDataLoaded = false;
  shortLeavesData;
  public lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  public standardSpecialChartData = [
    {
      label: 'Short Leave Count',
      data: []
    },
  ];

  showCustomGraph = false;
  showCustomLoading = true;
  showNoDataCustomError = false;

  isMobile = false;
  isTablet = false;
  isDesktop = false;


  public lineChartLegend = true;
  public lineChartType = 'line';

  getShortLeaveDataSubscription: Subscription;
  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private leaveServiceService: LeaveServiceService, private amChartService: AmChartService) {
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
    this.yearList = this.generalOps.getYearList(new Date().getFullYear(), 2);
    this.loadYearList();
    this.isDataLoaded = true;
  }

  loadYearList() {
    this.getShortLeaveDataSubscription = this.leaveServiceService.getShortLeaveUtilization(this.year)
      .subscribe((data: any) => {

          this.shortLeavesData = data;
          if (this.shortLeavesData !== null) {
            const tempData1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.shortLeavesData.length; j++) {
                if (this.shortLeavesData[j].month === labels[i]) {
                  tempData1[i] = this.shortLeavesData[j].amount;
                }
              }
              tempData3[i] = tempData1[i];
            }
            this.lineChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            this.standardSpecialChartData[0].data = tempData3;
            const chart = this.amChartService.createLineChart(
              'shortLeaveUtilizationChart',
              'month',
              'Short Leave Count',
              'rgb(0, 113, 255, 0.3)',
              'rgb(0, 113, 255)'
            )

            for(let key in this.lineChartLabels) {
                chart.data.push({
                  'month': this.lineChartLabels[key],
                  'Short Leave Count': this.standardSpecialChartData[0].data[key]
                })
            }
          }
        }, error => {
          this.showCustomGraph = false;
          this.showNoDataCustomError = true;
          this.showCustomLoading = false;

        }
      );
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
    if (this.getShortLeaveDataSubscription) {
      this.getShortLeaveDataSubscription.unsubscribe();
    }
  }

}
