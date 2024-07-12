import {Component, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {ProfileUserServiceService} from '../../../../service/profile-user-service.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-settings-quick-links-add-component',
  templateUrl: './settings-quick-links-add-component.component.html',
  styleUrls: ['./settings-quick-links-add-component.component.css']
})
export class SettingsQuickLinksAddComponentComponent implements OnInit {
  categoryList = [];
  showQuickLinkForm = false;

  employeelist = [];
  showquickLinkform = false;
  quickLinkId = 0;

  showSaveButton = true;
  showEditButton = false;

  showBanner = false;
  bannerContent;
  bannerType;

  openAddPanel = '';


  showImage = false;
  showImageUploader = true;
  quickLinkImage = '';
  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/references-image/upload';
  uploadImageSize = environment.PROFILE_IMAGE_SIZE;
  customStyle = {
    selectButton: {
      'background-color': 'transparent',
      'border-radius': '25px',
      'color': '#333333',
      'box-shadow': 'none',
      'margin': '0'
    },
    clearButton: {
      'display': 'none'
    },
    layout: {
      'background-color': 'transparent',
      'color': '#838383',
      'font-size': '10px !important',
      'width': '100%',
      'font-family': 'roboto',
      'border-radius': '3px'
    },
    previewPanel: {
      'display': 'none'
    }
  };
  private errorCode;
  private errorType;
  private errorMessage;

  constructor(private settingsServiceService: SettingsServiceService, private profilehttpservice: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadQuickLinkCategory();

    this.interCommunicationServiceService.currentQuickLinkData.subscribe(quickLinkToEdit => {
      if (JSON.stringify(quickLinkToEdit).length > 2) {
        this.openCollapsePanel();
        this.setQuickLinkDataToEdit(quickLinkToEdit);
        this.showSaveButton = false;
        this.showEditButton = true;
      }
    });
  }

  openCollapsePanel() {
    if (this.openAddPanel === '') {
      this.openAddPanel = 'in';
    } else if (this.openAddPanel === 'in') {
      this.openAddPanel = '';
    }
  }

  loadQuickLinkCategory() {
    this.settingsServiceService.getQuickLinksCategory()
      .subscribe(
        (data: any) => {
          this.categoryList = data;
          if (this.categoryList.length > 0) {
            this.showQuickLinkForm = true;
          }
        }
      );
  }

  quickLinkImageUploadDone(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.quickLinkImage = uploadedImage;
    this.showImage = true;
    this.showImageUploader = false;
  }

  deleteImage() {
    this.quickLinkImage = '';
    this.showImage = false;
    this.showImageUploader = true;
  }

  getIdFromType(name) {
    let categoryObj = this.categoryList.find(searchFor => searchFor.type === name);
    return categoryObj.designationGroupId;
  }

  getNameFromId(empId) {
    let employeeobj = this.employeelist.find(searchFor => searchFor.empId === empId);
    return employeeobj.name;
  }

  onSaveQuickLink(type) {
    const quickLinkURL = (<HTMLInputElement>document.getElementById('quickLinkURL')).value;
    const quickLinkName = (<HTMLInputElement>document.getElementById('quickLinkName')).value;
    const quickLinkCategory = (<HTMLInputElement>document.getElementById('quickLinkCategory')).value;
    const quickLinkAbout = (<HTMLInputElement>document.getElementById('quickLinkAbout')).value;

    const json = {
      'id': this.quickLinkId,
      'category': this.getIdFromType(quickLinkCategory),
      'description': quickLinkAbout,
      'icon': this.quickLinkImage,
      'name': quickLinkName,
      'url': quickLinkURL,
      'displayName': quickLinkName
    };

    if (quickLinkURL.length === 0) {
      this.openBanner(111);
    } else if (quickLinkName.length === 0) {
      this.openBanner(112);
    } else if (quickLinkURL.indexOf('http') < 0) {
      this.openBanner(111);
    } else {
      switch (type) {
        case 'save' :
          this.settingsServiceService.saveQuickLinks(json)
            .subscribe(
              (data: any) => {
                this.openBanner(data.httpStatusCode);
              }
            );
          break;
        case 'edit':
          this.settingsServiceService.editQuickLinks(json)
            .subscribe(
              (data: any) => {
                this.openBanner(data.httpStatusCode);
              }
            );
          break;
      }
    }
  }

  clearData() {
    (<HTMLInputElement>document.getElementById('quickLinkURL')).value = '';
    (<HTMLInputElement>document.getElementById('quickLinkName')).value = '';
    (<HTMLInputElement>document.getElementById('quickLinkCategory')).value = '';
    (<HTMLInputElement>document.getElementById('quickLinkAbout')).value = '';
    this.deleteImage();
  }

  openBanner(statuscode) {
    switch (statuscode) {
      case 200:
        this.bannerContent = 'Quick Link Saved Successfully!';
        this.bannerType = 'SUCCESS';
        this.openErrorModal(1111, this.bannerType, this.bannerContent);
        this.interCommunicationServiceService.updateQuickLinksList(true);
        this.clearData();
        break;
      case 500:
        this.bannerContent = 'Quick Link Saved Failed!';
        this.bannerType = 'ERROR';
        this.openErrorModal(1112, this.bannerType, this.bannerContent);
        break;
      case 111:
        this.bannerContent = 'Please enter a valid URL!';
        this.bannerType = 'ERROR';
        this.openErrorModal(1112, this.bannerType, this.bannerContent);
        break;
      case 112:
        this.bannerContent = 'Please enter a valid Name!';
        this.bannerType = 'ERROR';
        this.openErrorModal(1112, this.bannerType, this.bannerContent);
        break;
    }
    this.showBanner = true;
  }

  setQuickLinkDataToEdit(quickLink) {
    (<HTMLInputElement>document.getElementById('quickLinkURL')).value = quickLink.url;
    (<HTMLInputElement>document.getElementById('quickLinkName')).value = quickLink.name;
    (<HTMLInputElement>document.getElementById('quickLinkCategory')).value = quickLink.categoryName;
    (<HTMLInputElement>document.getElementById('quickLinkAbout')).value = quickLink.description;
    this.quickLinkImage = quickLink.icon;
    this.quickLinkId = quickLink.id;
    this.showImage = true;
    this.showImageUploader = false;
  }
  //added
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  onCancelQuickLink() {
    this.clearData();
  }
}
