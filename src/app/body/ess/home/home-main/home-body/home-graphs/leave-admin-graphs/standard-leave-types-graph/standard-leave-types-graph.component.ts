import {Component, NgZone, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponsiveService} from '../../../../../../../../utility/responsive-service';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';
import {GeneralOps} from "../../../../../../../../utility/GeneralOps";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";

@Component({
  selector: 'app-standard-leave-types-graph',
  templateUrl: './standard-leave-types-graph.component.html',
  styleUrls: ['./standard-leave-types-graph.component.css']
})
export class StandardLeaveTypesGraphComponent implements OnInit {

  generalOps = new GeneralOps();
  year = new Date().getFullYear();
  selectedYear: any;
  yearList: any[] = [];
  isDataLoaded = false;

  allRecruitmentResignationsData;
  casualLeavesData;
  annualLeavesData;
  medicalLeavesData;
  maternityLeavesData;
  specialLeaveData;

  public lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  public standardSpecialChartData = [
    {
      label: 'Casual',
      data: []
    },
    {
      label: 'Medical',
      data: []
    },
    {
      label: 'Annual',
      data: []
    },
    {
      label: 'Maternity',
      data: []
    }
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
    this.isDataLoaded = true;
  }
  loadYearList() {
    this.getStandardVsSpecialDataSubscription = this.leaveServiceService.getStandardLeaveTypesSummaryForAdminGraphs(this.year)
      .subscribe((data: any) => {
        this.leaveServiceService.getSpecialLeaveTypesSummaryForAdminGraphs(this.year)
          .subscribe(response => {
          this.specialLeaveData = response;
          this.casualLeavesData = data.casualLeaveSummary;
          this.medicalLeavesData = data.medicalLeaveSummary;
          this.annualLeavesData = data.annualLeaveSummary;
          this.maternityLeavesData = this.specialLeaveData.maternitySummary;
            if (this.casualLeavesData !== null) {
            const tempData1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const tempData4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.casualLeavesData.length; j++) {
                if (this.casualLeavesData[j].month === labels[i]) {
                  tempData1[i] = this.casualLeavesData[j].leaveAmount;
                }
              }
            }
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.medicalLeavesData.length; j++) {
                if (this.medicalLeavesData[j].month === labels[i]) {
                  tempData2[i] = this.medicalLeavesData[j].leaveAmount;
                }
              }
            }
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.annualLeavesData.length; j++) {
                if (this.annualLeavesData[j].month === labels[i]) {
                  tempData3[i] = this.annualLeavesData[j].leaveAmount;
                }
              }
            }
            for (let i = 0; i < 12; i++) {
              for (let j = 0; j < this.maternityLeavesData.length; j++) {
                if (this.maternityLeavesData[j].month === labels[i]) {
                  tempData4[i] = this.maternityLeavesData[j].leaveAmount;
                }
              }
            }
            this.lineChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            this.standardSpecialChartData[0].data = tempData1;
            this.standardSpecialChartData[1].data = tempData2;
            this.standardSpecialChartData[2].data = tempData3;
            this.standardSpecialChartData[3].data = tempData4;

              const chart = this.amChartService.createMultipleLineChartWithFill(
              'standardLeaveTypeGraph',
              'Month',
              ['Casual', 'Medical', 'Annual', 'Maternity'],
              ['rgb(33, 150, 83)', 'rgb(199, 97, 39)', 'rgb(116, 51, 255)', 'rgb(0, 113, 255)'])

              for (let key in this.lineChartLabels){
                chart.data.push({
                  "Month": this.lineChartLabels[key],
                  "Casual": this.standardSpecialChartData[0].data[key],
                  "Medical": this.standardSpecialChartData[1].data[key],
                  "Annual": this.standardSpecialChartData[2].data[key],
                  "Maternity": this.standardSpecialChartData[3].data[key]
                })
              }
            }
          });
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
