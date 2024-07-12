import {Component, NgZone, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';
import {GeneralOps} from "../../../../../../../../utility/GeneralOps";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-total-count-of-leaves-graph',
  templateUrl: './total-count-of-leaves-graph.component.html',
  styleUrls: ['./total-count-of-leaves-graph.component.css']
})
export class TotalCountOfLeavesGraphComponent implements OnInit {

  generalOps = new GeneralOps();
  year = new Date().getFullYear();
  selectedYear: any;
  yearList: any[] = [];

  standardLeavesData;
  specialLeavesData;

  public lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  public standardSpecialChartData = [
    {
      label: 'Total Leave Count',
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

  getStandardVsSpecialDataSubscription: Subscription;
  dataLoaded = false;
  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone,
              private leaveServiceService: LeaveServiceService,
              private amChartService: AmChartService) {
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
    this.dataLoaded = true;
  }

  loadYearList() {
    this.leaveServiceService.getLeaveDetailsForAdminGraphs(this.year).subscribe(
        (data: any) => {
          this.standardLeavesData = data.standardLeaves;
          this.specialLeavesData = data.specialLeaves;
          if (this.standardLeavesData !== null) {
            const tempData1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.standardLeavesData.length; j++) {
                if (this.standardLeavesData[j].month === labels[i]) {
                  tempData1[i] = this.standardLeavesData[j].leaveAmount;
                }
              }
              for (let j = 0; j < this.specialLeavesData.length; j++) {
                if (this.specialLeavesData[j].month === labels[i]) {
                  tempData2[i] = this.specialLeavesData[j].leaveAmount;
                }
              }
              tempData3[i] = tempData1[i] + tempData2[i];
            }
            this.lineChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            this.standardSpecialChartData[0].data = tempData3;

            // Populate the chart data after receiving leaves data
            const chart = this.amChartService.createLineChart(
                'totalCountLeaveGraph', 'Month', 'Total Leave Count', 'rgb(116, 51, 255, 0.3)', 'rgb(116, 51, 255)'
            );

            for(let key in this.lineChartLabels) {
              chart.data.push({
                'Month': this.lineChartLabels[key],
                'Total Leave Count': this.standardSpecialChartData[0].data[key]
              });
            }
          }
        },
        error => {
          console.log(error);
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
    if (this.getStandardVsSpecialDataSubscription) {
      this.getStandardVsSpecialDataSubscription.unsubscribe();
    }
  }
}
