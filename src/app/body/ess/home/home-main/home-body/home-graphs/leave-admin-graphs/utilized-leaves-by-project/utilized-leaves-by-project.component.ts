import { Component, OnInit } from '@angular/core';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';
import {LeaveProjectResponse} from '../../../home-tab-content/home-tab-work-from-home/models/LeaveProjectResponse';
import {ModalUiServiceService} from '../../../../../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-utilized-leaves-by-project',
  templateUrl: './utilized-leaves-by-project.component.html',
  styleUrls: ['./utilized-leaves-by-project.component.css']
})
export class UtilizedLeavesByProjectComponent implements OnInit {

  finalResponse;
  leaveDataLoaded = false;
  constructor(private leaveService: LeaveServiceService,
              private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
    this.projectLeaveUtilizationObj();
  }

  projectLeaveUtilizationObj() {
    this.leaveService.getUtilizedLeavesByProject()
      .subscribe( data => {
        this.finalResponse = data;
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
