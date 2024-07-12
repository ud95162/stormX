import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {SettingsPageRequestsProcessedComponentComponent} from "../settings-page-requests-processed-component/settings-page-requests-processed-component.component";
import {InterCommunicationServiceService} from "../../../../service/support-services/inter-communication-service.service";

@Component({
  selector: 'app-settings-page-requests-list-component',
  templateUrl: './settings-page-requests-list-component.component.html',
  styleUrls: ['./settings-page-requests-list-component.component.css']
})
export class SettingsPageRequestsListComponentComponent implements OnInit {
  pendingpages = [];
  showpendingpages = false;
  constructor(private settingshttpservice: SettingsServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.interCommunicationServiceService.loadRequestedPageList.subscribe(requestedPageList => {
      if (requestedPageList) {
        this.loadPendingPages();
      }
    });
    // this.loadPendingPages();
  }

  loadPendingPages() {
    this.interCommunicationServiceService.loadProcessedPageList.subscribe(
      change => {
        if (change) {
          this.settingshttpservice.getPendingPages()
            .subscribe(
              (data: any) => {
                this.pendingpages = data;
                if (data.length > 0) {
                  this.showpendingpages = true;
                } else {
                  this.showpendingpages = false;
                }
              }, error => {
                this.showpendingpages = false;
              }
            );
        }
      });
  }

  pageAcceptDecline(relatedBodyId, response) {
    const json = {
      'relatedBodyId': relatedBodyId,
      'response': response
    };

    this.settingshttpservice.acceptDeclinePage(json)
      .subscribe(
        (data: any) => {
          this.loadPendingPages();
          this.interCommunicationServiceService.changeProcessedPageList(true);
        }
      );
  }
}
