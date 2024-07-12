import { Component, OnInit } from '@angular/core';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';
import {ModalUiServiceService} from "../../../../../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-utilized-leaves-by-des-group',
  templateUrl: './utilized-leaves-by-des-group.component.html',
  styleUrls: ['./utilized-leaves-by-des-group.component.css']
})
export class UtilizedLeavesByDesGroupComponent implements OnInit {

  finalResponse;
  leaveDataLoaded = false;

  constructor(private leaveService: LeaveServiceService,
              private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
    this.getRoleWiseLeaveUtilization();
  }

  getRoleWiseLeaveUtilization() {
    this.leaveDataLoaded = false;
    this.leaveService.getUtilizedLeavesVsRoleAndNoOfEmployees()
      .subscribe( response => {
        console.log(response)
        this.finalResponse = response[0];
        this.leaveDataLoaded = true;
      });
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

}
