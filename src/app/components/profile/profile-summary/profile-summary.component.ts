import {Component, Input, OnInit} from '@angular/core';
import {LeaveServiceService} from '../../../service/attendance-leave/leave-service.service';
import {CONSTANT} from '../../../utility/Constants';
import {OpdManagementServiceService} from '../../../service/opd-management-service.service';
import {Router} from "@angular/router";
import {Profile} from "../../../_global/profile";
import {IssueLetterServiceService} from "../../../service/issue-letter-service.service";
import {FacilityManagementServiceService} from "../../../service/facility-management-service.service";
import {GeneralOps} from "../../../utility/GeneralOps";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit {

  generalOps = new GeneralOps();
  @Input() employeeFullName: any;
  standardLeaveSummary;
  specialLeaveSummary;
  annualLeaveSummary;
  casualLeaveSummary;
  medicalLeaveSummary;
  annualLeaveDataLoaded = false;
  casualLeaveDataLoaded = false;
  medicalLeaveDataLoaded = false;
  specialLeavesAllocated = 0;
  specialLeavesRemaining = 0;
  allocatedAllLeaveCount = 0;
  remainingAllLeaveCount = 0;
  utilizedAllLeaveCount = 0;
  utilizedLeavePercentage = 0;
  leaveYearList = [];
  selectedYear = new Date().getFullYear();
  leaveDataLoaded = false;
  specialLeaveDataLoaded = false;
  authorizationOPDRequests = 'RequestLetter';
  // authorizationOPDRequests = 'OPDSummary';
  OpdBalance;
  validStartForOpd;
  validEndForOpd;
  opdDataLoaded = false;
  deadlinePassedForOpd = false;
  opdData;
  opdStatusData;
  issueLetterData;
  issueLetterDataLoaded = false;
  facilityRequestData;
  facilityRequestDataLoaded = false;
  letterReqComponent = false;
  searchEmpID;
  personalOrOther;
  componentPermission = [];
  remainingDatesForOpd = 0;

  constructor(private leaveService: LeaveServiceService,
              private OpdManagementService: OpdManagementServiceService,
              private issueLetterService: IssueLetterServiceService,
              private facilityRequestService: FacilityManagementServiceService,
              private router: Router) {

    if (this.router.url.includes('_search')) {
      for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
        if (val.includes('Other')) {
          this.componentPermission.push(val.slice(5));
        }
      }
    } else {
      this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
    }
  }

  ngOnInit() {
    if (this.router.url === '/profile/_search') {
      this.searchEmpID = localStorage.getItem('lsei_');
      this.personalOrOther = 'other';
    } else {
      this.searchEmpID = localStorage.getItem('leid_');
      this.personalOrOther = 'personal';
    }
    this.getYears();
    this.getLeaveSummary();
    this.getOpdData();
    this.getIssueLetterData();
    this.getFacilityRequestData();
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 1;
    for (let i = currentYear; i >= startYear; i--) {
      this.leaveYearList.push(i);
    }
  }

  getFacilityRequestData() {
    this.facilityRequestDataLoaded = false;
    this.facilityRequestService.fetchEmployeeFacilityRequests(
      'All', this.generalOps.getFirstDateOfYear(this.selectedYear), this.generalOps.getLastDateOfYear(this.selectedYear),
      this.searchEmpID, localStorage.getItem('leid_'), 'profile'
    ).subscribe((data: any) => {
      this.facilityRequestData = data;
      this.facilityRequestDataLoaded = true;
    });
  }


  getIssueLetterData() {
    this.issueLetterDataLoaded = false;
    this.issueLetterService.fetchEmployeeLetterRequests(
      this.generalOps.getFirstDateOfYear(this.selectedYear), this.generalOps.getLastDateOfYear(this.selectedYear), 'All',
      this.searchEmpID, localStorage.getItem('leid_'), 'profile'
    ).subscribe((data: any) => {
      this.issueLetterData = data;
      this.issueLetterDataLoaded = true;
    });
  }

  getOpdData() {
    this.opdDataLoaded = false;
    this.OpdManagementService.getOpdBalance(
      localStorage.getItem('lsei_'), this.authorizationOPDRequests, this.selectedYear).subscribe((data: any) => {
      this.opdData = data;
      this.remainingDatesForOpd = Math.floor((new Date(data.validEnd).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      this.OpdManagementService.fetchOPDRequestSummary(localStorage.getItem('lsei_'), null, null, this.selectedYear,
        this.searchEmpID)
        .subscribe((data1: any) => {
          this.opdStatusData = data1;
          this.validStartForOpd = data.validStart;
          this.validEndForOpd = data.validEnd;
          if (this.validStartForOpd !== null && this.validEndForOpd !== null) {
            this.opdDataLoaded = true;
            this.deadlinePassedForOpd = new Date() > new Date(data.validEnd);
          }
        }, (err: HttpErrorResponse) => {
          this.opdDataLoaded = false;
        });
    });

  }

  getLeaveSummary() {
    this.specialLeavesAllocated = 0;
    this.specialLeavesRemaining = 0;
    this.allocatedAllLeaveCount = 0;
    this.remainingAllLeaveCount = 0;
    this.utilizedAllLeaveCount = 0;
    this.utilizedLeavePercentage = 0;
    this.leaveService.getOtherEmployeesLeaveBalances(localStorage.getItem('lsei_'), this.selectedYear)
      .subscribe((data: any) => {
        this.standardLeaveSummary = data.standardLeaves;
        this.specialLeaveSummary = data.specialLeaves;
        if (this.standardLeaveSummary.length > 0) {
          for (const val of this.standardLeaveSummary) {
            if (val.leaveTypeNO === CONSTANT.LEAVE_TYPES.STANDARD.ANNUAL) {
              this.annualLeaveSummary = val;
              this.annualLeaveDataLoaded = true;
            } else if (val.leaveTypeNO === CONSTANT.LEAVE_TYPES.STANDARD.MEDICAL) {
              this.medicalLeaveSummary = val;
              this.medicalLeaveDataLoaded = true;
            } else if (val.leaveTypeNO === CONSTANT.LEAVE_TYPES.STANDARD.CASUAL) {
              this.casualLeaveSummary = val;
              this.casualLeaveDataLoaded = true;
            }
            this.allocatedAllLeaveCount = this.allocatedAllLeaveCount + val.allocated;
            this.remainingAllLeaveCount = this.remainingAllLeaveCount + val.remaining;
          }
          this.leaveDataLoaded = true;
        } else {
          this.leaveDataLoaded = false;
        }

        if (this.specialLeaveSummary.length > 0) {
          for (const sp of this.specialLeaveSummary) {
            this.specialLeavesAllocated = this.specialLeavesAllocated + sp.allocated;
            this.specialLeavesRemaining = this.specialLeavesRemaining + sp.remaining;
            this.allocatedAllLeaveCount = this.allocatedAllLeaveCount + sp.allocated;
            this.remainingAllLeaveCount = this.remainingAllLeaveCount + sp.remaining;
          }
          this.specialLeaveDataLoaded = true;
        }
        if (this.leaveDataLoaded && this.specialLeaveDataLoaded) {
          this.utilizedAllLeaveCount = this.allocatedAllLeaveCount - this.remainingAllLeaveCount;
          this.utilizedLeavePercentage = Math.floor(this.utilizedAllLeaveCount * 100 / this.allocatedAllLeaveCount);
          document.getElementById('utilized-vs-allocated-leave-percent').style.width =
            Math.floor(this.utilizedAllLeaveCount * 100 / this.allocatedAllLeaveCount).toString() + '%';
        }
      });
  }

  routeToNotification(section, filter) {
    if (this.router.url.includes('_search')) {
      if (section === CONSTANT.PROFILE_SUMMARY.OPD) {
        this.router.navigate(['./opd/main'],
          {
            queryParams: {empID: this.searchEmpID, filter: filter},
            queryParamsHandling: 'merge'
          }
        );
      } else if (section === CONSTANT.PROFILE_SUMMARY.ISSUE_LETTER) {
        this.router.navigate(['./issue/main'],
          {
            queryParams: {empID: this.searchEmpID, filter: filter},
            queryParamsHandling: 'merge'
          }
        );
      } else {
        this.router.navigate(['./facility/main'],
          {
            queryParams: {empID: this.searchEmpID, filter: filter},
            queryParamsHandling: 'merge'
          }
        );
      }

    } else {
      this.router.navigate(['./notification/main'],
        {
          queryParams: {search: this.personalOrOther, section: section, year: this.selectedYear, filter: filter},
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  changeYear() {
    this.annualLeaveDataLoaded = false;
    this.casualLeaveDataLoaded = false;
    this.medicalLeaveDataLoaded = false;
    this.leaveDataLoaded = false;
    this.specialLeaveDataLoaded = false;
    document.getElementById('utilized-vs-allocated-leave-percent').style.width = '0%';
    this.getLeaveSummary();
    this.getOpdData();
    this.getIssueLetterData();
    this.getFacilityRequestData();
  }

}
