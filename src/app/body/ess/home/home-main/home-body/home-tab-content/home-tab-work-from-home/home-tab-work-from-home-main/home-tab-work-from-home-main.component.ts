import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';
import {Subscription} from 'rxjs';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import {Profile} from '../../../../../../../../_global/profile';
import {GeneralOps} from "../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-tab-work-from-home-main',
  templateUrl: './home-tab-work-from-home-main.component.html',
  styleUrls: ['./home-tab-work-from-home-main.component.css']
})
export class HomeTabWorkFromHomeMainComponent implements OnInit, OnDestroy {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  totalRegisteredUserCount: any;
  totalOnlineUserCount: any;
  totalAbsentUserCount: any;
  absentUsers: any;
  fromDate: any;
  toDate: any;
  fromTime: any;
  toTime: any;
  showUsersNotOnline: boolean;
  mainDashboardDataLoaded: boolean;
  dateRange: any;

  selectionObj: any;
  finalSelectionObjKey: any;
  wwtHeaderData: Subscription;
  @ViewChild('summaryView', { static: false }) summaryViewComponent!: ElementRef;

  constructor(private workFromHomeService: WorkFromHomeService, private interCommunicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    // this.getMainDashboardData();
  }

  getMainDashboardData() {
    this.wwtHeaderData = this.interCommunicationService.workFromHomeObjectToUpdate.subscribe(
      selectionObj => {
        if (selectionObj) {
          this.mainDashboardDataLoaded = false;
          if (selectionObj.hasOwnProperty('key') && ((selectionObj['key'] !== this.finalSelectionObjKey))) {
            this.finalSelectionObjKey = selectionObj['key'];
            this.workFromHomeService.getWfhMainDashboardData(selectionObj).subscribe(
              (response) => {
                if (response) {
                  if (this.finalSelectionObjKey === response.key) {
                    this.totalRegisteredUserCount = response.totalRegisteredUserCount;
                    this.totalOnlineUserCount = response.totalPresentCount;
                    this.totalAbsentUserCount = response.totalAbsentCount;
                    this.fromDate = response.fromDate;
                    this.toDate = response.toDate;
                    this.fromTime = response.fromTime;
                    this.toTime = response.toTime;
                    this.absentUsers = response.absentUserData;
                    this.mainDashboardDataLoaded = true;
                  }
                }
              });
          }}
      });
  }

  showUsersNotOnlineOnClick() {
    this.showUsersNotOnline = !this.showUsersNotOnline;
  }

  tabChange(detailedView) {
    detailedView.checked = true;
    // this.detailedView = this.detailedView !== true;
  }

  ngOnDestroy() {
    if (this.wwtHeaderData) {
      this.wwtHeaderData.unsubscribe();
    }
  }

}
