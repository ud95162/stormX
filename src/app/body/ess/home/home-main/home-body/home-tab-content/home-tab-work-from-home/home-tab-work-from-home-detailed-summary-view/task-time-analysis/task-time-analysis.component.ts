import { Component, OnInit } from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../../service/work-from-home-services/work-from-home.service';
import {Profile} from '../../../../../../../../../_global/profile';
import {GeneralOps} from '../../../../../../../../../utility/GeneralOps';

@Component({
  selector: 'app-task-time-analysis',
  templateUrl: './task-time-analysis.component.html',
  styleUrls: ['./task-time-analysis.component.css']
})
export class TaskTimeAnalysisComponent implements OnInit {

  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  fromDate: any;
  toDate: any;

  taskAnalysisData;
  responseDataLoaded: boolean;
  noDataAvailable = true;

  constructor(private workFromHomeService: WorkFromHomeService) { }

  ngOnInit() {
    this.responseDataLoaded = true;
    const monthEarlier = new Date();
    monthEarlier.setDate(monthEarlier.getDate() - 31);
    this.fromDate =  monthEarlier.toISOString().slice(0, 10);

    const today = new Date();
    today.setDate(today.getDate() - 1);
    this.toDate = today.toISOString().slice(0, 10);

    this.taskTimeAnalysisObj();
  }

  taskTimeAnalysisObj() {
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    this.responseDataLoaded = false;
    const selectionObj = {
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    this.workFromHomeService.getDetailedSummaryReportTaskTimeAnalysisData(selectionObj).subscribe(
      (response) => {
        this.taskAnalysisData = response;
        if (this.taskAnalysisData.length === 0) {
          this.noDataAvailable = true;
        } else {
          this.noDataAvailable = false;
        }
      }
    );
  }
}
