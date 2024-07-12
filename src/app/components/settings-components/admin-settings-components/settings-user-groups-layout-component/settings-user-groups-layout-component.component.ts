// import {Component, OnInit} from '@angular/core';
// import {Profile} from '../../../../_global/profile';
// import {Search} from '../../../../_global/search';
// import {Router} from '@angular/router';
// import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
// import {UserGroupServiceService} from '../../../../service/user-group-service.service';
// import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
// import {FeedServiceService} from '../../../../service/feed-service.service';
// import {ModalUiServiceService} from "../../../../service/ui-services/modal-ui-service.service";
//
// @Component({
//   selector: 'app-settings-user-groups-layout-component',
//   templateUrl: './settings-user-groups-layout-component.component.html',
//   styleUrls: ['./settings-user-groups-layout-component.component.css']
// })
// export class SettingsUserGroupsLayoutComponentComponent implements OnInit {
//   existingUserGroupsObj: any;
//   existingUserGroupsList = [];
//   showExistingUserGroupsList = false;
//
//   filteredExistingUserGroupList = [];
//   groupFilter = '';
//
//   allUsersList = [];
//   showAllUsersList = false;
//
//   groupUsersList = [];
//   showGroupUsersList = false;
//
//   groupTypes = [];
//
//   addedUser = '';
//
//   groupDetails = {
//     'groupName': 'Custom Group',
//     'groupPrivacy': 'Public',
//     'groupType': 'Custom',
//     'membersEmpNos': [],
//     'permissionsGrantable': false,
//     'superGroupName': ''
//   };
//   showSavingLoad = false;
//
//   showEdit = false;
//   objectToEdit: any;
//
//   errorCode;
//   errorType;
//   errorMessage;
//   filteredValues = [];
//   filterValuesLoaded;
//   nameFilter = '';
//   filteredEmployeeList;
//
//   constructor(private userGroupServiceService: UserGroupServiceService, public router: Router,
//               private feedServiceService: FeedServiceService,
//               private interCommunicationServiceService: InterCommunicationServiceService,
//               private modalUiService: ModalUiServiceService) {
//   }
//
//   ngOnInit() {
//     this.loadAll();
//   }
//
//   loadAll() {
//     this.loadPermissionAllowedUserGroups();
//     this.loadNames();
//     this.loadGroupTypes();
//   }
//
//   loadPermissionAllowedUserGroups() {
//     this.userGroupServiceService.getAllUserGroups()
//       .subscribe((data: any) => {
//           let arr = [
//             {'data': data.customUserGroups, 'type': 'Custom User Groups'},
//             {'data': data.systemDefinedUserGroups, 'type': 'System Defined User Groups'}
//           ];
//           this.existingUserGroupsList = arr;
//           this.existingUserGroupsObj = data;
//           this.filteredExistingUserGroupList = arr;
//           console.log(arr);
//           this.showExistingUserGroupsList = true;
//         }, error1 => {
//           this.showExistingUserGroupsList = false;
//         }
//       );
//   }
//
//   loadNames() {
//     this.feedServiceService.getNameList()
//       .subscribe(
//         (data: any) => {
//           this.allUsersList = data.empNames;
//           this.filteredValues = data.empNames;
//           this.showAllUsersList = true;
//         }
//       );
//   }
//
//   loadGroupTypes() {
//     this.userGroupServiceService.getUserGroupTypes()
//       .subscribe((data: any) => {
//         this.groupTypes = data;
//       });
//   }
//
//   profileRedirect(employeeId) {
//     if (employeeId === Profile.EMPLOYEE_ID) {
//       this.router.navigate(['./profile/main']);
//     } else {
//       Search.SEARCH_EMPLOYEE_ID = employeeId;
//       localStorage.setItem('lsei_', employeeId);
//       this.router.navigate(['./profile/_search']);
//     }
//   }
//
//   changeGroupType(gType) {
//     this.groupDetails.groupPrivacy = gType;
//   }
//
//   setGroupType(gType) {
//     if (gType === this.groupDetails.groupPrivacy) {
//       return 'user-group-modal__item--checked';
//     } else {
//       return '';
//     }
//   }
//
//   dropUpdatePermissionGroups(event: CdkDragDrop<string[]>) {
//     this.showAllUsersList = true;
//     this.showGroupUsersList = true;
//
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex);
//     }
//   }
//
//   addUsers(event) {
//     let obj = this.allUsersList.find(searchFor => searchFor.name === event);
//     this.groupUsersList.push(obj);
//     this.showGroupUsersList = true;
//
//     // Remove Duplicates from the list
//     let index = this.filteredValues.indexOf(obj);
//     this.filteredValues.splice(index, 1);
//     this.addedUser = '';
//     this.filterValuesLoaded = false;
//   }
//
//   inputKeyPress(event: Event) {
//     this.nameFilter = (event.target as HTMLInputElement).value;
//     if (this.nameFilter != null) {
//       let res = [];
//       res = this.filteredValues.filter(it => new RegExp(this.nameFilter, 'i').test((it.name)));
//       this.filteredEmployeeList = res;
//       this.filterValuesLoaded = true;
//     }
//     if (this.addedUser === '') {
//       this.filterValuesLoaded = false;
//     }
//   }
//
//   applyFilterToGroups(event: Event) {
//     this.showExistingUserGroupsList = false;
//     this.groupFilter = (event.target as HTMLInputElement).value;
//     if (this.groupFilter != null) {
//       let newRes = [];
//
//       this.filteredExistingUserGroupList.forEach( response => {
//         let userGrpInclude = false;
//         if (response.type.toLowerCase().includes(this.groupFilter.toLowerCase())) {
//           userGrpInclude = true;
//         }
//         if (response.data.filter(fit => new RegExp(this.groupFilter, 'i').test((fit.groupName))).length > 0) {
//           newRes.push(
//             {type: response.type, data: response.data.filter
//               (fit => new RegExp(this.groupFilter, 'i').test((fit.groupName)))});
//         } else if (userGrpInclude === true) {
//           newRes.push(response);
//         }
//       });
//
//       this.existingUserGroupsList = newRes;
//       this.showExistingUserGroupsList = true;
//     }
//   }
//
//   saveUserGroup() {
//     for (let key in this.groupUsersList) {
//       this.groupDetails.membersEmpNos.push(this.groupUsersList[key].empNo);
//     }
//     console.log(this.groupDetails);
//
//     this.userGroupServiceService.saveUserGroup(this.groupDetails)
//       .subscribe(
//         (data: any) => {
//           if (data.httpStatusCode === 200) {
//             this.resetValue();
//             // (<HTMLInputElement>document.getElementById('closeUserGroupOpenWizard')).click();
//             this.hideModal('saveUserGroup');
//             this.openErrorModal(1111, 'SUCCESS', 'User Group Added successfully');
//           } else {
//             console.log('Error Occurred');
//             this.openErrorModal(1112, 'ERROR', 'Error Occurred');
//           }
//         }
//       );
//   }
//
//   editUserGroup() {
//     this.objectToEdit.groupName = this.groupDetails.groupName;
//     this.objectToEdit.groupPrivacyObj.type = this.groupDetails.groupPrivacy;
//     this.objectToEdit.groupTypeObj.type = this.groupDetails.groupType;
//     this.objectToEdit.groupTypeObj.editable = this.groupDetails.permissionsGrantable;
//     this.objectToEdit.superEmployeeGroup.groupName = this.groupDetails.superGroupName;
//     // this.objectToEdit.groupMemberInfos = this.groupDetails.membersEmpNos;
//
//     console.log(this.objectToEdit);
//   }
//
//   resetValue() {
//     this.loadPermissionAllowedUserGroups();
//     this.loadNames();
//     this.loadGroupTypes();
//     this.groupUsersList = [];
//     this.groupDetails.membersEmpNos = [];
//     this.groupDetails.superGroupName = '';
//     this.groupDetails.permissionsGrantable = false;
//     this.groupDetails.groupName = 'Custom Group';
//     this.groupDetails.groupType = 'Public';
//     this.objectToEdit = {};
//   }
//
//   clickOnEditButton(groupObj) {
//     console.log(groupObj);
//     this.showEdit = true;
//     this.objectToEdit = groupObj;
//     this.groupDetails.groupName = groupObj.groupName;
//     this.groupDetails.groupPrivacy = groupObj.groupPrivacyObj.type;
//     this.groupDetails.groupType = groupObj.groupTypeObj.type;
//     this.groupDetails.permissionsGrantable = groupObj.groupTypeObj.editable;
//     if (groupObj.superEmployeeGroup !== null) {
//       this.groupDetails.superGroupName = groupObj.superEmployeeGroup.groupName;
//     }
//     this.groupDetails.membersEmpNos = groupObj.groupMemberInfos;
//     this.groupUsersList = groupObj.groupMemberInfos;
//     this.showGroupUsersList = true;
//     for (let key in groupObj.groupMemberInfos) {
//       let obj = this.allUsersList.find(searchFor => searchFor.empNo === groupObj.groupMemberInfos[key].empNo);
//       let index = this.allUsersList.indexOf(obj);
//       this.allUsersList.splice(index, 1);
//     }
//     // (<HTMLInputElement>document.getElementById('openUserGroupOpenWizard')).click();
//     this.showSaveQuoteModal('saveUserGroup');
//   }
//   showSaveQuoteModal(modalId) {
//     this.modalUiService.showModal(modalId);
//   }
//
//   hideModal(modalId) {
//     this.modalUiService.hideModal(modalId);
//   }
//   // added
//   openErrorModal(errorCode, errorType, errorMessage) {
//     this.errorCode = errorCode;
//     this.errorType = errorType;
//     this.errorMessage = errorMessage;
//     this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
//     (<HTMLInputElement>document.getElementById('modalTrigger')).click();
//   }
//
// }
