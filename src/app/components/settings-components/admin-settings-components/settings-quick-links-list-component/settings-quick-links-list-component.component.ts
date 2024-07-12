import {Component, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-settings-quick-links-list-component',
  templateUrl: './settings-quick-links-list-component.component.html',
  styleUrls: ['./settings-quick-links-list-component.component.css']
})
export class SettingsQuickLinksListComponentComponent implements OnInit {

  allQuickLinks = [];
  showAllQuickLinks = false;
  public searchTerm = '';

  constructor(private settingshttpservice: SettingsServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadAllQuickLinks();

    this.interCommunicationServiceService.onSaveQuickLink.subscribe(loadQuickLinks => {
      if (loadQuickLinks) {
        this.loadAllQuickLinks();
      }
    });
  }

  loadAllQuickLinks() {
    this.settingshttpservice.getAllQuickLinks()
      .subscribe(
        (data: any) => {
          this.allQuickLinks = data;
          if (data.length > 0) {
            this.showAllQuickLinks = true;
          }
        }
      );
  }


  editQuickLink(quickLink) {
    this.interCommunicationServiceService.editQuickLinkDataFromList(quickLink);
  }

  deleteQuickLink(quickLinkId) {
    this.settingshttpservice.deleteQuickLinks(quickLinkId)
      .subscribe(
        (data: any) => {
          this.loadAllQuickLinks();
        }
      );
  }
}
