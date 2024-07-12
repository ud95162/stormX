// import {Component, OnInit} from '@angular/core';
// import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
// import {PermissionGroupServiceService} from '../../../../service/permission-group-service.service';
// import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
//
// @Component({
//   selector: 'app-settings-default-permission-list-component',
//   templateUrl: './settings-default-permission-list-component.component.html',
//   styleUrls: ['./settings-default-permission-list-component.component.css']
// })
// export class SettingsDefaultPermissionListComponentComponent implements OnInit {
//   defaultPermissionList = [];
//   showDefaultPermissionList = false;
//
//   loadingOverlayView = false;
//
//   permissionGroupSaveObject = {
//     'permissionGroup': '',
//     'description': '',
//     'permissionAvailabilitiesToPermissionGroup': [{}]
//   };
//
//   customPermissionGroupToBeEdited: any;
//
//   showSaveButton = true;
//   showEditButton = false;
//
//
//   errorCode;
//   errorType;
//   errorMessage;
//   parentSetFromChild = false;
//
//   constructor(private permissionGroupServiceService: PermissionGroupServiceService,
//               private interCommunicationServiceService: InterCommunicationServiceService,
//               private modalUiService: ModalUiServiceService) {
//   }
//
//   ngOnInit() {
//     this.loadDefaultPermissionObject();
//     this.interCommunicationServiceService.passedPermissionGroupName.subscribe(passedPermissionGroupName => {
//       this.loadCustomPermissionObject(passedPermissionGroupName);
//     });
//   }
//
//   loadDefaultPermissionObject() {
//     this.permissionGroupServiceService.getDefaultPermissionObject()
//       .subscribe(
//         (data: any) => {
//           this.defaultPermissionList = data;
//           if (this.defaultPermissionList !== null) {
//             this.showDefaultPermissionList = true;
//           }
//           this.showSaveButton = true;
//           this.showEditButton = false;
//         }
//       );
//   }
//
//   loadCustomPermissionObject(permissionGroupName) {
//     console.log(permissionGroupName);
//     this.permissionGroupServiceService.getCustomPermissionObject(permissionGroupName)
//       .subscribe(
//         (data: any) => {
//           this.defaultPermissionList = data.permissionAvailabilitiesToPermissionGroup;
//           this.customPermissionGroupToBeEdited = data;
//           if (this.defaultPermissionList !== null) {
//             this.showSaveButton = false;
//             this.showEditButton = true;
//             this.showDefaultPermissionList = true;
//           }
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
//
//   setIdName(stringToUpdate) {
//     return stringToUpdate.replace(/\s/g, '');
//   }
//
//   checkPermissionAvailable(permissionAvailable) {
//     let permissionChecked;
//     switch (permissionAvailable) {
//       case true:
//         permissionChecked = 'checked';
//         break;
//       case false:
//         permissionChecked = '';
//         break;
//     }
//     return permissionChecked;
//   }
//
//   checkDisabled(disable) {
//     let disableComponent;
//     switch (disable) {
//       case true:
//         disableComponent = '';
//         break;
//       case false:
//         disableComponent = 'disabled';
//         break;
//     }
//     return disableComponent;
//   }
//
//   changePermissionGroup(permName, childArray, parentPermCode) {
//
//     if ((<HTMLInputElement>document.getElementById('checkbox' + permName)).checked === false) {
//       if (childArray.length >= 0) {
//         for (let child1 of childArray) {
//           // (<HTMLInputElement>document.getElementById('checkbox' + childArray[key].permCode)).click();
//           child1.grantedToGroup = false;
//           if (child1.subPerms.length > 0) {
//             for (let child2 of child1.subPerms) {
//               child2.grantedToGroup = false;
//               if (child2.subPerms.length > 0) {
//                 for (let child3 of child2.subPerms) {
//                   child3.grantedToGroup = false;
//                   if (child3.subPerms.length > 0) {
//                     for (let child4 of child3.subPerms) {
//                       child4.grantedToGroup = false;
//                       if (child4.subPerms.length > 0) {
//                         for (let child5 of child4.subPerms) {
//                           child5.grantedToGroup = false;
//                           if (child5.subPerms.length > 0) {
//                             for (let child6 of child5.subPerms) {
//                               child6.grantedToGroup = false;
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     } else {
//       if (childArray.length >= 0) {
//         for (let key in childArray) {
//           (<HTMLInputElement>document.getElementById('checkbox' + childArray[key].permName)).click();
//         }
//       }
//       if (parentPermCode !== null) {
//         // (<HTMLInputElement>document.getElementById('checkbox' + parentPermCode)).checked = true;
//         this.parentSetFromChild = true;
//         // (<HTMLInputElement>document.getElementById('checkbox' + parentPermCode)).click();
//       }
//     }
//   }
//   setParentsPermission(permissionLevel6: any, permissionLevel5: any, permissionLevel4: any,
//                        permissionLevel3: any, permissionLevel2: any, permissionLevel1: any, permissionLevel0: any, level: number) {
//     if (this.parentSetFromChild) {
//       switch (level) {
//         case 7:
//           permissionLevel6.grantedToGroup = true;
//           permissionLevel5.grantedToGroup = true;
//           permissionLevel4.grantedToGroup = true;
//           permissionLevel3.grantedToGroup = true;
//           permissionLevel2.grantedToGroup = true;
//           permissionLevel1.grantedToGroup = true;
//           permissionLevel0.grantedToGroup = true;
//           break;
//         case 6:
//           permissionLevel5.grantedToGroup = true;
//           permissionLevel4.grantedToGroup = true;
//           permissionLevel3.grantedToGroup = true;
//           permissionLevel2.grantedToGroup = true;
//           permissionLevel1.grantedToGroup = true;
//           permissionLevel0.grantedToGroup = true;
//           break;
//         case 5:
//           permissionLevel4.grantedToGroup = true;
//           permissionLevel3.grantedToGroup = true;
//           permissionLevel2.grantedToGroup = true;
//           permissionLevel1.grantedToGroup = true;
//           permissionLevel0.grantedToGroup = true;
//           break;
//         case 4:
//           permissionLevel3.grantedToGroup = true;
//           permissionLevel2.grantedToGroup = true;
//           permissionLevel1.grantedToGroup = true;
//           permissionLevel0.grantedToGroup = true;
//           break;
//         case 3:
//           // (<HTMLInputElement>document.getElementById('checkbox' + permissionLevel1.permCode)).checked = true;
//           // (<HTMLInputElement>document.getElementById('checkbox' + permissionLevel0.permCode)).checked = true;
//           permissionLevel2.grantedToGroup = true;
//           permissionLevel1.grantedToGroup = true;
//           permissionLevel0.grantedToGroup = true;
//           break;
//         case 2:
//           // (<HTMLInputElement>document.getElementById('checkbox' + permissionLevel0.permCode)).checked = true;
//           permissionLevel1.grantedToGroup = true;
//           permissionLevel0.grantedToGroup = true;
//           break;
//         case 1:
//           permissionLevel0.grantedToGroup = true;
//           break;
//       }
//       this.parentSetFromChild = false;
//     }
//
//   }
//
//   clickOnSavePermissionGroup() {
//     this.showSaveQuoteModal('addPermissionGroupModal');
//   }
//
//   savePermissionGroup() {
//     this.permissionGroupSaveObject.permissionAvailabilitiesToPermissionGroup = this.defaultPermissionList;
//     console.log(this.permissionGroupSaveObject);
//     this.permissionGroupServiceService.savePermissionGroup(this.permissionGroupSaveObject)
//       .subscribe(
//         (data: any) => {
//           this.hideModal('addPermissionGroupModal');
//           this.openErrorModal(1111, 'SUCCESS', 'Permission Group Saved Successfully');
//           this.permissionGroupSaveObject = {
//             'permissionGroup': '',
//             'description': '',
//             'permissionAvailabilitiesToPermissionGroup': [{}]
//           };
//           this.loadDefaultPermissionObject();
//           this.interCommunicationServiceService.loadExistingPermissionGroupsOnUpdate(true);
//         }, error => {
//           this.openErrorModal(1112, 'ERROR', error);
//         }
//       );
//   }
//
//   editPermissionGroup() {
//     this.customPermissionGroupToBeEdited.permissionAvailabilitiesToPermissionGroup = this.defaultPermissionList;
//     console.log(this.customPermissionGroupToBeEdited);
//     this.permissionGroupServiceService.editPermissionGroup(this.customPermissionGroupToBeEdited)
//       .subscribe(
//         (data: any) => {
//           this.openErrorModal(1111, 'SUCCESS', 'Permission Updated Successfully');
//           this.loadDefaultPermissionObject();
//           this.interCommunicationServiceService.loadExistingPermissionGroupsOnUpdate(true);
//         }, error => {
//           this.openErrorModal(1112, 'ERROR', error);
//         }
//       );
//   }
//
//   showSaveQuoteModal(modalId) {
//     this.modalUiService.showModal(modalId);
//   }
//
//   hideModal(modalId) {
//     this.modalUiService.hideModal(modalId);
//   }
// }
