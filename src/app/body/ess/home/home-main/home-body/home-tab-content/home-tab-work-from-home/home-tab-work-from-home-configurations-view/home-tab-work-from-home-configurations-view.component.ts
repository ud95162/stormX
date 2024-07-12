import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
import {Profile} from '../../../../../../../../_global/profile';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {InterCommunicationServiceService} from '../../../../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-home-tab-work-from-home-configurations-view',
  templateUrl: './home-tab-work-from-home-configurations-view.component.html',
  styleUrls: ['./home-tab-work-from-home-configurations-view.component.css']
})
export class HomeTabWorkFromHomeConfigurationsViewComponent implements OnInit, OnDestroy {

  @Input('summaryViewComponent') summaryView;
  usersToExclude = [];
  users = [];
  userGroups = [];
  timeGaps = [];
  timeGapsToSave = [];
  selectedFullName: string;
  userFullNamesLoaded: boolean;
  createGroupSelected: boolean;
  chosenGroupName: string;
  message: string;
  deleteGroupConfirmationModel: any;
  timeGapFrom: any;
  timeGapTo: any;
  updateTimeGapHit: boolean;
  timeGapInstanceIdToUpdate: any;
  activeFilterMap = new Map();
  projects = [];
  nameAsc: boolean;
  nameDsc: boolean;
  timeGapFilterType: any;
  selectionObj: any;
  wwtHeaderData: Subscription;
  userConfigurationsLoaded: boolean;
  range: any;

  constructor(private workFromHomeService: WorkFromHomeService,
              private interCommunicationService: InterCommunicationServiceService) { }

  ngOnInit() {
    this.getUserData();
    this.getUserGroups();
    this.getTimeGaps();
    this.getProjectData();
    this.getTheHeaderData();
    this.getTheUserFilterConfigurations();
  }

  getTheHeaderData() {
    this.wwtHeaderData = this.interCommunicationService.workFromHomeObjectToUpdate.subscribe(
      selectionObj => {
        this.selectionObj = selectionObj;
        console.log(this.selectionObj);
        this.range = selectionObj['range'];
      });
  }

  getTheUserFilterConfigurations() {
    this.userConfigurationsLoaded = false;
    this.workFromHomeService.getUserFilterConfigurations(Profile.EMPLOYEE_ID).subscribe(
      (response) => {
        // this.activeFilterMap = response['excludedGroups'].reduce(function(map, obj) {
        //   map[obj.key] = obj.val;
        //   return map;
        // }, {});
        response['excludedGroups'].forEach((data) => {
            this.activeFilterMap.set(data[0], data[1]);
        });
        this.timeGapFilterType = response['defaultTimeGaps'];
        this.userConfigurationsLoaded = true;
      }
    );
  }

  getUserData() {
    this.userFullNamesLoaded = false;
    this.workFromHomeService.getWfhUsers().subscribe(
      (response) => {
        this.users = response;
        this.userFullNamesLoaded = true;
        });
  }

  getProjectData() {
    this.workFromHomeService.getWfhProjects().subscribe(
      (response) => {
        this.projects = response;
      }
    );
  }

  addUserToExclude() {
    this.usersToExclude.push(this.selectedFullName);
  }

  removeUserFromExclusion(rowIndex) {
    delete this.usersToExclude[rowIndex];
    this.usersToExclude.splice(rowIndex, 1);
  }

  showCreateGroupWidget() {
    this.createGroupSelected = true;
  }

  getUserGroups() {
    this.workFromHomeService.getUserFilterGroups(Profile.EMPLOYEE_ID).subscribe(
      (response) => {
        this.userGroups = response;
      }
    );
  }

  getTimeGaps() {
    this.workFromHomeService.getUserFilterTimeGaps((Profile.EMPLOYEE_ID)).subscribe(
      (response) => {
        this.timeGaps = response;
      }
    );
  }

  createExcludeFilterGroup() {
    this.workFromHomeService.createExcludeFilterGroup(this.usersToExclude, this.chosenGroupName, Profile.EMPLOYEE_ID).subscribe(
      (response) => {
        if (response) {
          this.getUserGroups();
          this.usersToExclude = [];
          this.createGroupSelected = false;
          this.selectedFullName = '';
        } else {
          this.message = 'An Error Occurred While Saving the Data. Please Try Again!';
        }
      });
  }

  deleteGroup(groupId: any) {
    this.workFromHomeService.deleteFilterGroup(groupId, Profile.EMPLOYEE_ID).subscribe(
      (response) => {
        this.getUserGroups();
      }
    );
  }

  deleteConfirmation(groupId: any) {
    if (confirm('Are you sure to delete this Group?')) {
      this.deleteGroup(groupId);
    }
  }

  addTimeGap() {
    this.timeGapsToSave.push(this.timeGapFrom + '-' + this.timeGapTo);
  }

  saveTimeGaps() {
    this.workFromHomeService.saveFilterTimeGaps(Profile.EMPLOYEE_ID, this.timeGapsToSave).subscribe(
      (response) => {
        this.getTimeGaps();
        this.timeGapsToSave = [];
        this.timeGapFrom = '';
        this.timeGapTo = '';
        this.message = 'Time Gaps Saved Successfully';
      }
    );
  }

  updateTimeGapInstance(instanceId: any, timeGap: any) {
    this.updateTimeGapHit = true;
    this.timeGapInstanceIdToUpdate = instanceId;
    this.timeGapFrom = timeGap.split('-')[0];
    this.timeGapTo = timeGap.split('-')[1];
  }

  updateTimeGap() {
    this.workFromHomeService.updateUserFilterTimeGapInstance(this.timeGapInstanceIdToUpdate, this.timeGapFrom + '-' + this.timeGapTo).subscribe(
      (response) => {
        this.getTimeGaps();
        this.cancelTimeGapUpdate();
      }
    );
  }

  cancelTimeGapUpdate(){
    this.timeGapTo = '';
    this.timeGapFrom = '';
    this.updateTimeGapHit = false;
  }

  deleteTimeGapInstanceConfirmation(timeGapInstanceId: any) {
    if (confirm('Are you sure to delete this TimeGap Instance?')) {
      this.deleteTimeGapInstance(timeGapInstanceId);
    }
  }

  deleteTimeGapInstance(timeGapInstanceId: any) {
    this.workFromHomeService.deleteFilterTImeGapInstance(timeGapInstanceId).subscribe(
      (response) => {
        this.getTimeGaps();
        this.message = 'Time Gap Instance Deleted Successfully';
      }
    );
  }

  deleteAllConfirmation() {
    if (confirm('Are you sure to delete All the TimeGap Instances?')) {
      this.deleteAllFilterTimeGaps();
    }
  }

  deleteAllFilterTimeGaps() {
    this.workFromHomeService.deleteAllFilterTimeGaps(Profile.EMPLOYEE_ID).subscribe(
      (response) => {
        this.getTimeGaps();
        this.message = 'All Time Gaps Deleted Successfully';
      });
  }

  addToFilterEmails(groupName: any, groupEmails: any) {
    this.activeFilterMap.set(groupName, groupEmails);
  }

  removeGroupFromActiveFilters(key: string) {
    this.activeFilterMap.delete(key);
  }

  sortByNameAsc() {
    this.nameAsc = true;
    this.nameDsc = false;
    this.projects = this.projects.sort((a, b) => (a.project_name < b.project_name ? -1 : 1));
  }

  sortByNameDsc() {
    this.nameAsc = false;
    this.nameDsc = true;
    this.projects = this.projects.sort((a, b) => (b.project_name < a.project_name ? -1 : 1));
  }

  generateSummaryReport() {
    const convMap = {};
    this.activeFilterMap.forEach((val: string, key: string) => {
      convMap[key] = val;
    });

    const configurationObject = {
      'excludeUserGroups' : convMap,
      'timeGapFilterType' : this.timeGapFilterType,
      'selectionObj' : this.selectionObj,
      'empId' : Profile.EMPLOYEE_ID
    };
    this.interCommunicationService.updateSummaryReport(configurationObject);
  }

  saveConfigurations() {
    const convMap = {};
    this.activeFilterMap.forEach((val: string, key: string) => {
      convMap[key] = val;
    });

    const configurationObject = {
      'excludeUserGroups' : convMap,
      'timeGapFilterType' : this.timeGapFilterType,
      'empId' : Profile.EMPLOYEE_ID
    };

    this.workFromHomeService.saveUserFilterConfigurations(configurationObject).subscribe(
      (response) => {
        this.message = 'Configurations Saved Successfully';
      });
  }

  closeMessage() {
    this.message = '';
  }

  tabChange() {
    this.summaryView.checked = true;
    // this.detailedView = this.detailedView !== true;
  }

  ngOnDestroy() {
    if (this.wwtHeaderData){
      this.wwtHeaderData.unsubscribe();
    }
    this.interCommunicationService.updateSummaryReport('');
  }
}
