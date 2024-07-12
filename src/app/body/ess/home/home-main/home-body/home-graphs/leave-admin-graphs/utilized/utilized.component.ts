import { Component, OnInit } from '@angular/core';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';
import {ModalUiServiceService} from "../../../../../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-utilized',
  templateUrl: './utilized.component.html',
  styleUrls: ['./utilized.component.css']
})
export class UtilizedComponent implements OnInit {

  finalResponse;
  leaveDataLoaded = false;

  constructor(private leaveService: LeaveServiceService,
              private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
    this.getDesWiseLeaveUtilization();
  }

  getDesWiseLeaveUtilization() {
    this.leaveService.getDesignationWiseLeaveUtilization()
      .subscribe( data => {
        this.finalResponse = data[0];
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
