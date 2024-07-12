import {Component, Input, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-settings-page-requests-processed-component',
  templateUrl: './settings-page-requests-processed-component.component.html',
  styleUrls: ['./settings-page-requests-processed-component.component.css']
})
export class SettingsPageRequestsProcessedComponentComponent implements OnInit {
  currentpages = [];
  showcurrentpages = false;
  searchTerm = '';

  constructor(private settingshttpservice: SettingsServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.interCommunicationServiceService.loadProcessedPageList.subscribe(loadProcessedPageList => {
      if (loadProcessedPageList) {
        this.loadPendingPages();
      }
    });
    // this.loadPendingPages();
  }

  loadPendingPages() {
    this.interCommunicationServiceService.loadRequestedPageList.subscribe(
      change => {
        if (change) {
          this.settingshttpservice.getExistingPages()
            .subscribe(
              (data: any) => {
                this.currentpages = data;
                if (data.length > 0) {
                  this.showcurrentpages = true;
                } else {
                  this.showcurrentpages = false;
                }
              }
            );
        }
      });
  }

  deletePage(id: number){
    this.settingshttpservice.deleteExistingPage(id).subscribe(
      data => {
        this.loadPendingPages();
        this.interCommunicationServiceService.changeRequestedPageList(true);
      }
    );
  }

}
