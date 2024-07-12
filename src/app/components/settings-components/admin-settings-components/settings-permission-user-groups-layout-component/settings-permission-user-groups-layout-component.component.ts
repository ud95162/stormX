// import {Component, OnInit} from '@angular/core';
// import {UserGroupServiceService} from '../../../../service/user-group-service.service';
// import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
// import {PermissionGroupServiceService} from '../../../../service/permission-group-service.service';
// import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
// import {ModalUiServiceService} from "../../../../service/ui-services/modal-ui-service.service";
//
// @Component({
//   selector: 'app-settings-permission-user-groups-layout-component',
//   templateUrl: './settings-permission-user-groups-layout-component.component.html',
//   styleUrls: ['./settings-permission-user-groups-layout-component.component.css']
// })
// export class SettingsPermissionUserGroupsLayoutComponentComponent implements OnInit {
//   permissionAllowedUserGroups: any;
//   showPermissionAllowedUserGroups = false;
//
//   existingPermissionGroups: any;
//   showExistingPermissionGroups = false;
//
//   currentUserGroup: any;
//   showCurrentUserGroup = false;
//
//   selectedUserGroup = '';
//
//   assignedPermissionList = [];
//   existingPermissionList = [];
//
//   errorCode;
//   errorType;
//   errorMessage;
//
//   showSavingLoad = false;
//   public searchTerm = '';
//   public showUserGroupTitle = true;
//
//   constructor(private userGroupServiceService: UserGroupServiceService,
//               private permissionGroupServiceService: PermissionGroupServiceService,
//               private interCommunicationServiceService: InterCommunicationServiceService,
//               private modalUiService: ModalUiServiceService) {
//     this.interCommunicationServiceService.userGroupFilterPipe.subscribe(data => {
//         this.showUserGroupTitle = data.showTitle;
//     });
//   }
//
//   ngOnInit() {
//     this.loadOnLoad();
//   }
//
//   loadOnLoad() {
//     this.loadPermissionAllowedUserGroups();
//     this.loadExistingPermissionGroups();
//   }
//
//   loadPermissionAllowedUserGroups() {
//     this.userGroupServiceService.getPermissionAllowedUserGroups()
//       .subscribe((data: any) => {
//           this.permissionAllowedUserGroups = data;
//           this.showPermissionAllowedUserGroups = true;
//         }, error1 => {
//           this.showPermissionAllowedUserGroups = false;
//         }
//       );
//   }
//
//   loadExistingPermissionGroups() {
//     this.permissionGroupServiceService.getExistingPermissionGroups()
//       .subscribe(
//         (data: any) => {
//           this.existingPermissionGroups = data;
//           for (let key in data) {
//             this.existingPermissionList.push(data[key].permissionGroup);
//           }
//           this.showExistingPermissionGroups = this.existingPermissionGroups.length > 0;
//         }, error1 => {
//           this.showExistingPermissionGroups = false;
//         }
//       );
//   }
//
//   onClickUserGroupNameToLoadPermissionGroups(obj) {
//     this.assignedPermissionList = [];
//     this.existingPermissionList = [];
//     this.loadExistingPermissionGroups();
//     this.selectedUserGroup = obj.groupObject.groupName;
//
//     let empGroupPermGroup = obj.groupObject.employeeGroupPermissionGroups;
//
//     if (empGroupPermGroup.length > 0) {
//       for (let key in empGroupPermGroup) {
//         this.assignedPermissionList.push(empGroupPermGroup[key].permissionGroup);
//       }
//       this.showCurrentUserGroup = true;
//     } else {
//       this.showCurrentUserGroup = false;
//     }
//     // (<HTMLInputElement>document.getElementById('openUserGroupPermissionGroupWizard')).click();
//     this.showSaveQuoteModal('userGroupPermissionGroupWizard');
//   }
//
//   dropUpdatePermissionGroups(event: CdkDragDrop<string[]>) {
//     this.showExistingPermissionGroups = true;
//     this.showCurrentUserGroup = true;
//
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex);
//     }
//     console.log(this.existingPermissionList);
//     console.log(this.assignedPermissionList);
//   }
//
//   updateUserGroupPermission() {
//     this.showSavingLoad = true;
//     let json = {
//       'employeeGroupName': this.selectedUserGroup,
//       'permissionGroupNames': this.assignedPermissionList
//     };
//     this.permissionGroupServiceService.savePermissionGroupsToUserGroup(json)
//       .subscribe(
//         (data: any) => {
//           this.showSavingLoad = false;
//           // (<HTMLInputElement>document.getElementById('closeUserGroupPermissionGroupWizard')).click();
//           this.hideModal('userGroupPermissionGroupWizard');
//           this.openErrorModal(1111, 'SUCCESS', 'Permission groups Added to the user group!!');
//           this.loadOnLoad();
//           console.log(data);
//         }, error => {
//           console.log(error);
//           this.openErrorModal(1112, 'ERROR', 'Error Occurred');
//         }
//       );
//   }
//
//   openErrorModal(errorCode, errorType, errorMessage) {
//     this.errorCode = errorCode;
//     this.errorType = errorType;
//     this.errorMessage = errorMessage;
//     this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
//     (<HTMLInputElement>document.getElementById('modalTrigger')).click();
//   }
//   showSaveQuoteModal(modalId) {
//     this.modalUiService.showModal(modalId);
//   }
//
//   hideModal(modalId) {
//     this.modalUiService.hideModal(modalId);
//   }
// }
