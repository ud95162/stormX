import { Component, OnInit } from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {System} from '../../../../../../../../../_global/system';
import {Profile} from '../../../../../../../../../_global/profile';
import {GeneralOps} from "../../../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-leave-analysis',
  templateUrl: './leave-analysis.component.html',
  styleUrls: ['./leave-analysis.component.css']
})
export class LeaveAnalysisComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  leaveDropDownIcon_down: boolean;

  responseDataLoaded: boolean;
  projects: any;

  fromDate: any;
  toDate: any;
  projectName: any;

  originalResponse: any;
  response: any;
  visibleIndex = -1;

  constructor(private workFromHomeService: WorkFromHomeService) { }

  ngOnInit() {
    this.getProjectData();
    const today = new Date();
    today.setDate(today.getDate());
    this.fromDate = this.toDate = today.toISOString().slice(0, 10);
    this.setDetailedSummaryReportObject();
  }

  getProjectData() {
    this.workFromHomeService.getWfhProjects().subscribe(
      (response) => {
        this.projects = response;
      }
    );
  }

  setDetailedSummaryReportObject() {
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    this.responseDataLoaded = false;
    const selectionObj = {
      'fromDate' : this.fromDate,
      'toDate' : this.toDate,
      'range' : 'custom',
      'key' : System.generateRandomKey(32),
      'token' : Profile.USER_TOKEN
    };
    console.log(selectionObj)
    this.getLeaveAnalysisData(selectionObj);
  }

  showLeaveData(rowIndex: any, iconId: any) {
    const table = document.getElementById(rowIndex).style.display = 'table';
    this.leaveDropDownIcon_down = true;
  }

  hideLeaveData(rowIndex: any, iconId: any) {
    const table = document.getElementById(rowIndex).style.display = 'none';
    this.leaveDropDownIcon_down = false;
  }

  getLeaveAnalysisData(selectionObj) {
    this.workFromHomeService.getDetailedSummaryReportLeaveAnalysisData(selectionObj).subscribe(
      (response) => {
        console.log(response);
        this.response = response;
        this.originalResponse = response;
        this.responseDataLoaded = true;
      }
    );
  }

  projectFilter() {
    this.responseDataLoaded = false;
    const bucket = [];
    const subResponse = [];
    this.originalResponse.forEach((data) => {
      const projectFiltered = [];
      let k = 0;
      data[1].forEach((subData) => {
        if (subData[5]) {
          subData[5].forEach((micro) => {
            if (micro === this.projectName) {
              k++;
              projectFiltered.push(subData);
            }
          });
        }
      });
      if (k > 0) {
        bucket.push(data[0]);
        bucket.push(projectFiltered);
        subResponse.push(bucket);
      }
    });
    // console.log(this.originalResponse);
    // console.log(subResponse);
    this.response = subResponse;
    this.responseDataLoaded = true;
  }

  showSubLeaveResponses(index: number) {
    if (this.visibleIndex === index) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = index;
    }
  }
}
