import { Component, OnInit } from '@angular/core';
import {AppUsageServiceService} from '../../../../service/app-usage-service.service';
import {InconsistentRecords} from '../models/InconsistentRecords';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-monitor-inconsistent-records',
  templateUrl: './monitor-inconsistent-records.component.html',
  styleUrls: ['./monitor-inconsistent-records.component.css']
})
export class MonitorInconsistentRecordsComponent implements OnInit {
  selectedStatus: string = 'NOT_CHECKED';
  inconsistentRecords: InconsistentRecords[] = [];
  selectedRequestsForTakeAction: InconsistentRecords[] = [];
  recordsDataLoaded: boolean = false;

  selectAll: boolean = false;

  constructor(private appUsageService: AppUsageServiceService,
              private modalService: ModalUiServiceService) { }

  ngOnInit(): void {
    this.getAllRecords();
  }

  hideModal(modalID: string) {
    this.modalService.hideModal(modalID);
  }

  changeRecordStatus( status: string ) {
    this.selectedStatus = status;
    this.getAllRecords();
  }

  /**
   * Retrieves inconsistent records based on the selected status.
   */
  getAllRecords() {
    this.appUsageService.loadInconsistentRecords( null, this.selectedStatus )
      .subscribe((data: InconsistentRecords[]) => {
        this.inconsistentRecords = data;

        this.inconsistentRecords = this.inconsistentRecords.map( request => ({
          ...request,
          selected: false,
        }));
        this.recordsDataLoaded = true;
      });
  }

  /**
   * Toggles the selection of all inconsistent records based on the 'selectAll' flag.
   */
  toggleSelectAll() {
    for (const data of this.inconsistentRecords) {
      if (data.status === 'NOT_CHECKED') {
        data.selected = this.selectAll;
      }
    }
    this.selectedRequestsForTakeAction =
      this.inconsistentRecords.filter(data => data.selected && data.status === 'NOT_CHECKED');
  }

  /**
   * Changes the status of all selected requests to 'CHECKED' and updates the records accordingly.
   */
  changeStatusOfAllRequestsModal() {
    const jsonArray = [];
    for (const request of this.selectedRequestsForTakeAction) {
      const json = {
        id: request.id,
        status: 'CHECKED'
      };
      jsonArray.push(json);
    }
    this.appUsageService.updateCheckedStatusOfRecord(jsonArray)
      .subscribe((data: any) => {
      }, (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.getAllRecords();
        }
      });
    this.selectedRequestsForTakeAction = [];
    this.selectAll = false;
  }

  /**
   * Updates the selected requests for taking action.
   */
  updateSelected(): void {
    this.selectAll = false;
    this.selectedRequestsForTakeAction = this.inconsistentRecords.filter(data => data.selected);
    if (this.selectedRequestsForTakeAction.length ===
      this.inconsistentRecords.filter(data => data.status === 'NOT_CHECKED').length) {
      this.selectAll = true;
    }
  }
}
