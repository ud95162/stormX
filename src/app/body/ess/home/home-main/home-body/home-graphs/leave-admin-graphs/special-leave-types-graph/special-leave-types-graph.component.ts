import {Component, NgZone, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ResponsiveService} from "../../../../../../../../utility/responsive-service";
import {LeaveServiceService} from "../../../../../../../../service/attendance-leave/leave-service.service";
import {GeneralOps} from "../../../../../../../../utility/GeneralOps";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-special-leave-types-graph',
  templateUrl: './special-leave-types-graph.component.html',
  styleUrls: ['./special-leave-types-graph.component.css']
})
export class SpecialLeaveTypesGraphComponent implements OnInit {

  generalOps = new GeneralOps();
  year = new Date().getFullYear();
  selectedYear: any;
  yearList: any[] = [];
  isDataLoaded = false;

  onSiteLeavesData;
  maternityLeavesData;
  lieuLeavesData;
  noPayLeavesData;
  officialLeavesData;

  public lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  public standardSpecialChartData = [
    {
      label: 'OnSite',
      data: []
    },
    {
      label: 'Lieu',
      data: []
    },
    {
      label: 'Official',
      data: []
    },
  ];

  isMobile = false;
  isTablet = false;
  isDesktop = false;


  public lineChartLegend = true;
  public lineChartType = 'line';

  getStandardVsSpecialDataSubscription: Subscription;
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
    this.isDataLoaded = true
  }
  loadYearList() {
    this.getStandardVsSpecialDataSubscription = this.leaveServiceService.getSpecialLeaveTypesSummaryForAdminGraphs(this.year)
      .subscribe((data: any) => {

          this.onSiteLeavesData = data.onSiteSummary;
          this.maternityLeavesData = data.maternitySummary;
          this.lieuLeavesData = data.lieuSummary;
          this.noPayLeavesData = data.noPaySummary;
          this.officialLeavesData = data.officialSummary;
          if (this.lieuLeavesData !== null) {
            const tempData1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            // const tempData2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            // const tempData4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.onSiteLeavesData.length; j++) {
                if (this.onSiteLeavesData[j].month === label[i]) {
                  tempData1[i] = this.onSiteLeavesData[j].leaveAmount;
                }
              }
            }
            // for (let i = 0; i < 12; i++) {
            //   for (let j = 0; j < this.maternityLeavesData.length; j++) {
            //     if (this.maternityLeavesData[j].month === label[i]) {
            //       tempData2[i] = this.maternityLeavesData[j].leaveAmount;
            //     }
            //   }
            // }
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.lieuLeavesData.length; j++) {
                if (this.lieuLeavesData[j].month === label[i]) {
                  tempData3[i] = this.lieuLeavesData[j].leaveAmount;
                }
              }
            }
            // for (let i = 0; i < 12; i++) {
            //   for (let j = 0; j < this.noPayLeavesData.length; j++) {
            //     if (this.noPayLeavesData[j].month === label[i]) {
            //       tempData4[i] = this.noPayLeavesData[j].leaveAmount;
            //     }
            //   }
            // }
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.officialLeavesData.length; j++) {
                if (this.officialLeavesData[j].month === label[i]) {
                  tempData5[i] = this.officialLeavesData[j].leaveAmount;
                }
              }
            }
            this.lineChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            this.standardSpecialChartData[0].data = tempData1;
            // this.standardSpecialChartData[1].data = tempData2;
            this.standardSpecialChartData[1].data = tempData3;
            // this.standardSpecialChartData[2].data = tempData4;
            this.standardSpecialChartData[2].data = tempData5;

            const chart = this.amChartService.createMultipleLineChartWithFill(
              'specialLeavesTypesGraph',
              'Month',
              ['On Site', 'Lieu', 'Official'],
              ['rgb(33, 150, 83)', 'rgb(199, 97, 39)', 'rgb(116, 51, 255)'],
            )

            for (let key in this.lineChartLabels){
              chart.data.push({
                'Month': this.lineChartLabels[key],
                'On Site': this.standardSpecialChartData[0].data[key],
                'Lieu': this.standardSpecialChartData[1].data[key],
                'Official': this.standardSpecialChartData[2].data[key]
              })
            }

          }
        }, error => {
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
