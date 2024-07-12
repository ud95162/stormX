// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {ModalUiServiceService} from "../../../../service/ui-services/modal-ui-service.service";
//
// @Component({
//   selector: 'app-settings-permission-user-group-card-component',
//   templateUrl: './settings-permission-user-group-card-component.component.html',
//   styleUrls: ['./settings-permission-user-group-card-component.component.css']
// })
// export class SettingsPermissionUserGroupCardComponentComponent implements OnInit {
//   @Input() userGroup;
//   @Output() toGetUserGroupPermission = new EventEmitter<any>();
//
//   constructor(private modalUiService: ModalUiServiceService) {
//   }
//
//   ngOnInit() {
//   }
//
//   onClickPermissionGroupName(groupId, groupObject) {
//     this.toGetUserGroupPermission.emit({
//         groupId: groupId,
//         groupObject: groupObject
//       }
//     );
//   }
//   showSaveQuoteModal(modalId) {
//     this.modalUiService.showModal(modalId);
//   }
//
//   hideModal(modalId) {
//     this.modalUiService.hideModal(modalId);
//   }
// }
