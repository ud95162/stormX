import { Component, OnInit } from '@angular/core';
import {Project} from "../../../../../../../../_global/project";
import {Profile} from "../../../../../../../../_global/profile";
import {Search} from "../../../../../../../../_global/search";
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css']
})
export class MembersDetailsComponent implements OnInit {

  elements_employee = [];
  elements_trainee = [];
  isuuecountmap = new Map();
  timeLogMap = new Map();
  additionMap = new Map();
  deletionMap = new Map();
  modalName;
  modalId;
  modalCount;
  employee;
  employeeDetail;
  employeeImage;
  selectedValue = 'month';
  template = false;

  monthFirstDate;
  startDateOfMonth;
  monthMap = new Map();

  constructor(private httpService: ProjectServiceService, public router: Router) { }

  ngOnInit() {
    const curr  = new Date();
    curr.setDate(curr.getDate());
    this.setMonthMapValues();
    this.startDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 2).toISOString().slice(0, 10);
    this.getMembersDetails('01-' + this.monthMap.get(this.startDateOfMonth.slice(5, 7)) + '-' + this.startDateOfMonth.slice(0, 4));
  }

  getMembersDetails(monthFirstDate) {

let currentMonthDate='01-' + this.monthMap.get(this.startDateOfMonth.slice(5, 7)) + '-' + this.startDateOfMonth.slice(0, 4)
    this.httpService.getMembersDetails(Project.PROJECT_CODE, currentMonthDate).subscribe((response) => {

      this.getTeamMembers(response);
      this.httpService.getProjectMembersTotalIssues(Project.PROJECT_CODE, monthFirstDate).subscribe((response2) => {
        this.getMembersIssuesCount(response2);
        this.httpService.getProjectMembersTimeLogs(Project.PROJECT_CODE, monthFirstDate).subscribe((response8) => {
          this.getMembersTimeLogs(response8);
          this.httpService.getProjectMembersGitLabAdditionsAndDeletions(Project.PROJECT_CODE, monthFirstDate).subscribe((response9) => {
            this.getMembersAdditionsAndDeletions(response9);


          });
        });
      });
    });
    this.httpService.getProjectTrainee(Project.PROJECT_CODE, currentMonthDate).subscribe((response) => {

      this.getTrainees(response);
      this.httpService.getProjectMembersTotalIssues(Project.PROJECT_CODE, monthFirstDate).subscribe((response1) => {
        this.getMembersIssuesCount(response1);
        this.httpService.getProjectMembersTimeLogs(Project.PROJECT_CODE, monthFirstDate).subscribe((response8) => {
          this.getMembersTimeLogs(response8);
          this.httpService.getProjectMembersGitLabAdditionsAndDeletions(Project.PROJECT_CODE, monthFirstDate).subscribe((response9) => {
            this.getMembersAdditionsAndDeletions(response9);

          });
        });
      });
    });
  }
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  getMembersAdditionsAndDeletions(data) {
    this.additionMap = new Map();
    this.deletionMap = new Map();
    for (let i = 0; i < data.length; i++) {
      this.additionMap.set(data[i].empNo, data[i].addition);
    }
    for (let i = 0; i < data.length; i++) {
      this.deletionMap.set(data[i].empNo, data[i].deletion);
    }
  }

  getMembersTimeLogs(data) {
    this.timeLogMap = new Map();
    for (let i = 0; i < data.length; i++) {
      this.timeLogMap.set(data[i].empNo, data[i].time);
    }
  }

  getMembersIssuesCount(data) {
    this.isuuecountmap = new Map();
    for (let i = 0; i < data.length; i++) {
      if (data[i][1] !== 'null') {
        this.isuuecountmap.set(data[i][1].split('@')[0], data[i][2]);
      } else {
      }
    }
  }

  getTeamMembers(data) {
    const array = [];
    this.elements_employee = [];
    let j = 0;
    let issucount = 0;
    let timeLog;
    let addition;
    let deletion;

    for (let i = 0; i < data.length; i++) {
      if (this.isuuecountmap.has(data[i][3])) {
        issucount = this.isuuecountmap.get(data[i][3]);
      } else {
        issucount = 0;
      }
      if (this.timeLogMap.has(data[i][0])) {
        timeLog = this.timeLogMap.get(data[i][0]);
      } else {
        timeLog = 0;
      }
      if (this.additionMap.has(data[i][0])) {
        addition = this.additionMap.get(data[i][0]);
      } else {
        addition = 0;
      }
      if (this.deletionMap.has(data[i][0])) {
        deletion = this.deletionMap.get(data[i][0]);
      } else {
        deletion = 0;
      }
      array[i] = {
        empId: data[i][0], empName: data[i][1],
        empDesignation: data[i][2], addition: addition, deletion: deletion,
        timeLog: timeLog, issueCount: issucount
      };
    }
    this.elements_employee = array;

  }

  getTrainees(data) {
    const array = [];
    this.elements_trainee = [];
    let j = 0;
    let issucount = 0;
    let timeLog;
    let addition;
    let deletion;
    for (let i = 0; i < data.length; i++) {
      if (this.isuuecountmap.has(data[i][3])) {
        issucount = this.isuuecountmap.get(data[i][3]);
      } else {
        issucount = 0;
      }
      if (this.timeLogMap.has(data[i][0])) {
        timeLog = this.timeLogMap.get(data[i][0]);
      } else {
        timeLog = 0;
      }
      if (this.additionMap.has(data[i][0])) {
        addition = this.additionMap.get(data[i][0]);
      } else {
        addition = 0;
      }
      if (this.deletionMap.has(data[i][0])) {
        deletion = this.deletionMap.get(data[i][0]);
      } else {
        deletion = 0;
      }
      array[i] = {
        empId: data[i][0], empName: data[i][1],
        empDesignation: data[i][2], addition: addition, deletion: deletion, timeLog: timeLog,
        issueCount: issucount
      };
    }
    this.elements_trainee = array;
  }

  getEmployeeName(name, id, count) {
    this.modalName = name;
    this.modalCount = count;
    this.modalId = id;
    this.employeeImage = '';
    this.employeeDetail = [];
    // console.log(this.selectedValue)
    this.httpService.getSelectedMemberJiraIssueDetails(this.modalId, this.selectedValue, Project.PROJECT_CODE).subscribe((response) => {
      this.employee = response;
      this.employeeImage = this.employee.image;
      this.employeeDetail = this.employee.detail;
    });
  }

  getTime(data): number {
    return (Math.round(data * 10 / 60 / 60)) / 10;
  }

  employeeRedirect(id) {
    const employeeId = id;
    if (employeeId === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = employeeId;
      localStorage.setItem('lsei_', employeeId);
      this.router.navigate(['./profile/_search']);
    }
  }

  // set month value for month number
  setMonthMapValues() {
    this.monthMap.set( '01', 'Jan');
    this.monthMap.set( '02', 'Feb');
    this.monthMap.set( '03', 'Mar');
    this.monthMap.set( '04', 'Apr');
    this.monthMap.set( '05', 'May');
    this.monthMap.set( '06', 'Jun');
    this.monthMap.set( '07', 'Jul');
    this.monthMap.set( '08', 'Aug');
    this.monthMap.set( '09', 'Sep');
    this.monthMap.set( '10', 'Oct');
    this.monthMap.set( '11', 'Nov');
    this.monthMap.set( '12', 'Dec');
  }
}
