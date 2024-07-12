// import {Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
// import {Profile} from '../../../../../../../../_global/profile';
// import {AttendanceServiceService} from '../../../../../../../../service/attendance-service.service';
// import {Subscription} from 'rxjs';
// import {ResponseDataObject} from '../models/ObjectModels/response-data-object';
// import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
// import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';
// import * as moment from "moment";
// import {System} from "../../../../../../../../_global/system";
//
//
// @Component({
//   selector: 'app-home-tab-work-from-home-detailed-view',
//   templateUrl: './home-tab-work-from-home-detailed-view.component.html',
//   styleUrls: ['./home-tab-work-from-home-detailed-view.component.css']
// })
// export class HomeTabWorkFromHomeDetailedViewComponent implements OnInit, OnDestroy, AfterViewChecked {
//
//   componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
//   message: string;
//   gettingDataMessage: any;
//   responses: Array<ResponseDataObject> = [];
//   completeResponses: Array<ResponseDataObject> = [];
//   responsesFilteredWithProject: Array<ResponseDataObject> = [];
//   totalRegisteredUsers = 0;
//   totalUsers = 0;
//   isTodayUsers = true;
//   showTable = false;
//
//   fullName: string;
//   email: string;
//
//   numberOfWorkingDays = 0;
//   numberOfDays = 1;
//   totalUsersLoaded = false;
//   totalRegUsersLoaded = false;
//
//   totalWorkTime = 0;
//   averageWorkTimePerDay: any;
//   averageWorkTimePerUser: any;
//   averageWorkTimePerDayPerUser: any;
//   summeryDataLoaded = false;
//   uniqueUsers = new Set();
//   absentUsers: Array<string> = [];
//
//   isSorting: boolean;
//   dateAsc = true;
//   totalTimeAsc: boolean;
//   totalTimeDsc: boolean;
//   avgActionsAsc: boolean;
//   avgActionsDsc: boolean;
//   totalMouseAsc: boolean;
//   totalMouseDsc: boolean;
//   totalKeyboardAsc: boolean;
//   totalKeyboardDsc: boolean;
//   levelAsc: boolean;
//   levelDsc: boolean;
//   nameAsc: boolean;
//   nameDsc: boolean;
//   emailAsc: boolean;
//   emailDsc: boolean;
//   wwtActivityAsc: boolean;
//   wwtActivityDsc: boolean;
//   jiraIssueCountAsc: boolean;
//   jiraIssueCountDsc: boolean;
//   gitAdditionsAsc: boolean;
//   gitAdditionsDsc: boolean;
//   gitDeletionsAsc: boolean;
//   gitDeletionsDsc: boolean;
//   gitTotalAsc: boolean;
//   gitTotalDsc: boolean;
//
//   showUsersNotOnline: boolean;
//
//   activityService: Subscription;
//   setDataSubscribe: Subscription;
//
//   finalSelectionObjKey: string;
//
//   // new variables
//   activeDashboard: boolean;
//
//   searchTermName: any;
//   searchTermEmail: any;
//   searchTermProject: any;
//
//   totalGitAdditions: any;
//   totalGitDeletions: any;
//   totalGit: any;
//   totalJiraIssueCount: any;
//
//   workFromHeaderData: Subscription;
//
//   selectionObj: any;
//   detailedView: boolean;
//   filterType: any;
//
//   constructor(private workFromHomeService: WorkFromHomeService,
//               private attendanceService: AttendanceServiceService,
//               private changeDetector: ChangeDetectorRef,
//               private interCommunicationService: InterCommunicationServiceService) { }
//
//   ngOnInit() {
//     this.detailedView = false;
//     this.getWorkFromHomeData();
//   }
//
//   getWorkFromHomeData() {
//     this.workFromHeaderData = this.interCommunicationService.workFromHomeObjectToUpdateForDetailedView.subscribe(
//       selectionObj => {
//         this.selectionObj = selectionObj;
//         this.isTodayUsers = this.selectionObj['range'] === 'today';
//         if (this.selectionObj.hasOwnProperty('key') && this.selectionObj.key !== this.finalSelectionObjKey) {
//           this.finalSelectionObjKey = selectionObj.key;
//           this.setInitialValues();
//           this.workFromHomeService.getWfhFilteredResponses(this.selectionObj).subscribe(
//             (response) => {
//               if (response) {
//                 if (response.responses.length !== 0) {
//                   if (this.finalSelectionObjKey === response.key) {
//                     this.completeResponses = response.responses;
//                     this.completeResponses = this.completeResponses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//                     this.totalUsers = response.summeryDetailsObject.totalUsers;
//                     this.numberOfWorkingDays = response.summeryDetailsObject.numberOfWorkingDays;
//                     this.numberOfDays = response.summeryDetailsObject.numberOfDays;
//                     this.totalWorkTime = response.summeryDetailsObject.totalNumberOfHours;
//                     this.totalUsers = response.summeryDetailsObject.totalNumberOfUsers;
//                     this.averageWorkTimePerDay = response.summeryDetailsObject.hoursPerDay;
//                     this.averageWorkTimePerUser = response.summeryDetailsObject.hoursPerUser;
//                     this.averageWorkTimePerDayPerUser = response.summeryDetailsObject.hoursPerUserPerDay;
//                     this.totalGitAdditions = response.totalGitAdditions;
//                     this.totalGitDeletions = response.totalGitDeletions;
//                     this.totalGit = response.totalGit;
//                     this.totalJiraIssueCount = response.totalJiraIssueCount;
//                   }
//                 }else {
//                   this.message = 'No Data Available!';
//                 }
//               }else {
//                 this.message = 'No Data Available!';
//               }
//               this.showTable = true;
//               this.activeDashboard = true;
//               this.gettingDataMessage = '';
//               this.totalUsersLoaded = true;
//               this.summeryDataLoaded = true;
//             }, (errors) => {
//               this.gettingDataMessage = 'An Error Occurred while Reading Data From the API ';
//             });
//         }
//     });
//   }
//
//   setInitialValues() {
//     this.activeDashboard = false;
//     this.showTable = false;
//     this.dateAsc = true;
//     this.totalUsersLoaded = false;
//     this.summeryDataLoaded = false;
//     this.responses = [];
//     this.completeResponses = [];
//     this.responsesFilteredWithProject = [];
//     this.uniqueUsers = new Set();
//     this.totalWorkTime = 0;
//     this.averageWorkTimePerUser = 0;
//     this.averageWorkTimePerDay = 0;
//     this.averageWorkTimePerDayPerUser = 0;
//     this.gettingDataMessage = 'Obtaining Data From the API';
//     this.message = '';
//   }
//
//   async sortByDateDes() {
//     this.isSorting = true;
//     this.dateAsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//     this.isSorting = false;
//   }
//
//   async sortByDateAsc() {
//     this.isSorting = true;
//     this.dateAsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//     this.isSorting = false;
//   }
//
//   sortByTotalTimeDes() {
//     this.isSorting = true;
//     this.totalTimeAsc = false;
//     this.totalTimeDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.totalWorkTime - a.totalWorkTime);
//     this.isSorting = false;
//   }
//
//   sortByTotalTimeAsc() {
//     this.isSorting = true;
//     this.totalTimeAsc = true;
//     this.totalTimeDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.totalWorkTime - b.totalWorkTime);
//     this.isSorting = false;
//   }
//
//   sortByAvgActionsPerMinuteAsc() {
//     this.isSorting = true;
//     this.avgActionsAsc = true;
//     this.totalTimeDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.avgActionsPerMinute - b.avgActionsPerMinute);
//     this.isSorting = false;
//   }
//
//   sortByAvgActionsPerMinuteDsc() {
//     this.isSorting = true;
//     this.avgActionsAsc = false;
//     this.avgActionsDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.avgActionsPerMinute - a.avgActionsPerMinute);
//     this.isSorting = false;
//   }
//
//   sortByTotalMouseClicksAsc() {
//     this.isSorting = true;
//     this.totalMouseAsc = true;
//     this.totalMouseDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.mouseActions - b.mouseActions);
//     this.isSorting = false;
//   }
//
//   sortByTotalMouseClicksDsc() {
//     this.isSorting = true;
//     this.totalMouseAsc = false;
//     this.totalMouseDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.mouseActions - a.mouseActions);
//     this.isSorting = false;
//   }
//
//   sortByKeyBoardStrokesAsc() {
//     this.isSorting = true;
//     this.totalKeyboardAsc = true;
//     this.totalKeyboardDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.keyBoardActions - b.keyBoardActions);
//     this.isSorting = false;
//   }
//
//   sortByKeyBoardStrokesDsc() {
//     this.isSorting = true;
//     this.totalKeyboardAsc = false;
//     this.totalKeyboardDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.keyBoardActions - a.keyBoardActions);
//     this.isSorting = false;
//   }
//
//   sortByKeyLevelAsc() {
//     this.isSorting = true;
//     this.levelAsc = true;
//     this.levelDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.level - b.level);
//     this.isSorting = false;
//   }
//
//   sortByKeyLevelDsc() {
//     this.isSorting = true;
//     this.levelAsc = false;
//     this.levelDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.level - a.level);
//     this.isSorting = false;
//   }
//
//   sortByNameAsc() {
//     this.nameAsc = true;
//     this.nameDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => (a.fullName < b.fullName ? -1 : 1));
//   }
//
//   sortByNameDsc() {
//     this.nameAsc = false;
//     this.nameDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => (b.fullName < a.fullName ? -1 : 1));
//   }
//
//   sortByEmailAsc() {
//     this.isSorting = true;
//     this.emailAsc = true;
//     this.emailDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => (a.email < b.email ? -1 : 1));
//     this.isSorting = false;
//   }
//
//   sortByEmailDsc() {
//     this.isSorting = true;
//     this.emailAsc = false;
//     this.emailDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => (b.email < a.email ? -1 : 1));
//     this.isSorting = false;
//   }
//
//   sortByWWTActivityAsc() {
//     this.wwtActivityAsc = true;
//     this.wwtActivityDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.wwtActivity - b.wwtActivity);
//   }
//
//   sortByWWTActivityDsc() {
//     this.wwtActivityAsc = false;
//     this.wwtActivityDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.wwtActivity - a.wwtActivity);
//   }
//
//   sortByJiraIssueCountAsc() {
//     this.jiraIssueCountAsc = true;
//     this.jiraIssueCountDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.jiraIssueCount - b.jiraIssueCount);
//   }
//
//   sortByJiraIssueCountDsc() {
//     this.jiraIssueCountAsc = false;
//     this.jiraIssueCountDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.jiraIssueCount - a.jiraIssueCount);
//   }
//
//   sortByGitAdditionsAsc() {
//     this.gitAdditionsAsc = true;
//     this.gitAdditionsDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.gitAdditions - b.gitAdditions);
//   }
//
//   sortByGitAdditionsDsc() {
//     this.gitAdditionsAsc = false;
//     this.gitAdditionsDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.gitAdditions - a.gitAdditions);
//   }
//
//   sortByGitDeletionsAsc() {
//     this.gitDeletionsAsc = true;
//     this.gitDeletionsDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.gitDeletions - b.gitDeletions);
//   }
//
//   sortByGitDeletionsDsc() {
//     this.gitDeletionsAsc = false;
//     this.gitDeletionsDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.gitDeletions - a.gitDeletions);
//   }
//
//   sortByGitTotalAsc() {
//     this.gitTotalAsc = true;
//     this.gitTotalDsc = false;
//     this.completeResponses = this.completeResponses.sort((a, b) => a.gitTotal - b.gitTotal);
//   }
//
//   sortByGitTotalDsc() {
//     this.gitTotalAsc = false;
//     this.gitTotalDsc = true;
//     this.completeResponses = this.completeResponses.sort((a, b) => b.gitTotal - a.gitTotal);
//   }
//
//   ngAfterViewChecked(): void {
//     this.changeDetector.detectChanges();
//   }
//
//   ngOnDestroy() {
//     if (this.workFromHeaderData) {
//       this.workFromHeaderData.unsubscribe();
//     }
//   }
//
//   sortByTotalTime() {
//     this.totalTimeAsc = true;
//     this.sortByTotalTimeAsc();
//   }
//
// }
