// import {Component, OnInit} from '@angular/core';
// import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
// import {PermissionGroupServiceService} from '../../../../service/permission-group-service.service';
// import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
//
// @Component({
//   selector: 'app-settings-existing-permission-group-component',
//   templateUrl: './settings-existing-permission-group-component.component.html',
//   styleUrls: ['./settings-existing-permission-group-component.component.css']
// })
// export class SettingsExistingPermissionGroupComponentComponent implements OnInit {
//   existingPermissionGroups = [];
//   showExistingPermissionGroups = false;
//   public searchTerm = '';
//   public icon_direction = 'down';
//
//   errorCode;
//   errorType;
//   errorMessage;
//   private setDeletePermissionGroupId: number;
//
//   constructor(private permissionGroupServiceService: PermissionGroupServiceService,
//               private interCommunicationServiceService: InterCommunicationServiceService,
//               private modalUiService: ModalUiServiceService) {
//   }
//
//   ngOnInit() {
//     this.interCommunicationServiceService.loadExistingPermissionGroups.subscribe(loadExistingPermissionGroups => {
//       if (loadExistingPermissionGroups) {
//         this.loadExistingPermissionGroups();
//       }
//     });
//     // this.interCommunicationServiceService.onConfirmationWizard.subscribe(confirmedValue => {
//     //   if (confirmedValue !== 'default') {
//     //     this.deletePermissionGroup(confirmedValue);
//     //   }
//     // });
//   }
//
//   loadExistingPermissionGroups() {
//     this.permissionGroupServiceService.getExistingPermissionGroups()
//       .subscribe(
//         (data: any) => {
//           this.existingPermissionGroups = data;
//           if (this.existingPermissionGroups.length > 0) {
//             this.showExistingPermissionGroups = true;
//           } else {
//             this.showExistingPermissionGroups = false;
//           }
//         }
//       );
//   }
//
//   setRecordsEditPermissionGroup(permissionName) {
//     console.log(permissionName);
//     this.interCommunicationServiceService.passPermissionGroupNameToGetPermissions(permissionName);
//
//     $('html, body').animate({
//       scrollTop: $('#defaultPermissionGrantView').offset().top
//     }, 1000);
//   }
//
//   onClickDeletePermissionGroup(permissionGroup) {
//     console.log(permissionGroup);
//     this.setDeletePermissionGroupId = permissionGroup.id;
//     this.showSaveQuoteModal('deletePermissionGroupModal');
//   }
//
//   deletePermissionGroup() {
//     this.permissionGroupServiceService.deletePermissionGroup(this.setDeletePermissionGroupId).subscribe((data: any) => {
//       this.hideModal('deletePermissionGroupModal');
//       if (data.httpStatusCode === 200) {
//         this.openErrorModal(1111, 'SUCCESS', 'Permission Group deleted Successfully!');
//         this.loadExistingPermissionGroups();
//       }
//       }, error => {
//         this.openErrorModal(1112, 'ERROR', error);
//       }
//     );
//   }
//
//   onClickShowHideGroup(i: number) {
//     if ((<HTMLInputElement>document.getElementById('groupList_' + i)).style.display === '') {
//       // console.log('down', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
//       (<HTMLInputElement>document.getElementById('groupList_' + i)).setAttribute('style', 'display:none');
//       (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-down-circle');
//       this.icon_direction = 'down';
//     } else {
//       // console.log('up', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
//       (<HTMLInputElement>document.getElementById('groupList_' + i)).setAttribute('style', '');
//       (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-up-circle');
//       this.icon_direction = 'up';
//
//     }
//   }
//   showSaveQuoteModal(modalId) {
//     this.modalUiService.showModal(modalId);
//   }
//
//   hideModal(modalId) {
//     this.modalUiService.hideModal(modalId);
//   }
//   openErrorModal(errorCode, errorType, errorMessage) {
//     this.errorCode = errorCode;
//     this.errorType = errorType;
//     this.errorMessage = errorMessage;
//     this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
//     (<HTMLInputElement>document.getElementById('modalTrigger')).click();
//   }
// }
