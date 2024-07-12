import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileUserServiceService} from '../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {Event} from '../../../../_global/event';
import {environment} from "../../../../../environments/environment";
import {Profile} from "../../../../_global/profile";
import {FacilityManagementServiceService} from "../../../../service/facility-management-service.service";
import {DomSanitizer} from '@angular/platform-browser';
import {OpdManagementServiceService} from "../../../../service/opd-management-service.service";
import {FileUploadService} from '../../../../service/profile-request-file-upload-service/file-upload.service';
import {CONSTANT} from "../../../../utility/Constants";

@Component({
  selector: 'app-letter-requests',
  templateUrl: './letter-requests.component.html',
  styleUrls: ['./letter-requests.component.css']
})
export class LetterRequestsComponent implements OnInit {
  letterTypes = [];
  facilityTypes = [];
  venueTypes = [];
  OPDTypes;
  itemArray:any = [];
  currentEdit = -1;
  editItemSelected;
  itemTotalAmount = 0;
  showRequestBody = false;
  requestingFromEmployeesList = [];
  showRequestFromPerson = false;
  showFacilityRequestFromPerson = false;
  showOpdRequestFromPerson = false;
  showLetterRequestHeader = true;
  showLetterRequestBody = true;
  showLetterRequestFooter = true;
  showFacilityRequestHeader = false;
  showFacilityRequestBody = false;
  showFacilityRequestFooter = false;
  showOPDRequestHeader = false;
  showOPDRequestBody = false;
  showOPDRequestFooter = false;
  OpdBalance= 0.0;
  defaultOpdBalance = 0.0;
  remainOpdAmount = 0;
  remainingDatesForOpd = 0;
  opdValidStartDate: any;
  opdValidEndDate: any;
  opdData;
  empNo;
  maritalStatus;
  permanent=0;
  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/feed/upload/' + Profile.EMPLOYEE_ID;
  fileUploadUrl = '/OPD-request/admin-req-OPD/upload-file/' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.POST_IMAGE_SIZE;
  authorizationOPDRequests = 'RequestLetter';
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
  letterRequestObject = {
    'expectingDate': '',
    'letterBody': ''
  };
  facilityRequestObject = {
    'facilityVenue': '',
    'facilityBody': '',
    'attachment' : ''
  };
  imageUploadArray = [];
  fileUploadArray = [];
  files: File[] = [];
  errorCode;
  errorType;
  errorMessage;
  selectedYear = new Date().getFullYear();
  leaveYearList = [];
  opdDataLoaded = false;
  deadlinePassedForOpd = false;
  notEligibleForOpd = false;
  validationErrorMsg = '';
  opdRequestBtnDisabled = false;

  constructor(private httpservice: ProfileUserServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private facilityManagementService:  FacilityManagementServiceService,
              public sanitizer: DomSanitizer,
              private fileUploadService: FileUploadService,
              private  OpdManagementService: OpdManagementServiceService) {
  }

  ngOnInit() {
    console.log('opd header ' + this.showOPDRequestHeader)
    console.log('facility header ' + this.showFacilityRequestHeader)
    console.log('letter header ' + this.showLetterRequestHeader)
    console.log('letter body ' + this.showLetterRequestBody)
    console.log('facility body ' + this.showFacilityRequestBody)
    console.log('opd body ' + this.showOPDRequestBody)
    this.empNo = localStorage.getItem('leid_');
    this.getIntermediateYears();
    this.getDataForSelectedYear();
    this.loadHRPeople();
    this.loadLetterTypes();
    this.loadFacilityTypes();
    this.loadFacilityVenues();
    this.loadOPDTypes();

  }

  getIntermediateYears() {
    const nowYear = new Date().getFullYear();
    const startYear = nowYear - 2;
    for (let i = nowYear; i >= startYear; i--) {
      this.leaveYearList.push(i);
    }
  }

  onFileSelect(event) {
    let initLength = this.files.length;
    this.files.push(...event.addedFiles);
    if (this.files.length > initLength ){
      const formData = new FormData();
      formData.append('image', this.files[this.files.length - 1]);
      this.fileUploadService.uploadFile(formData ,this.authorizationOPDRequests).subscribe(res => {
        this.fileUploadArray.push({name: this.files[this.files.length - 1].name, url: res[0]});
      });
    }
  }

  loadLetterTypes() {
    this.httpservice.getLetterTypes()
      .subscribe(
        (data: any) => {
          this.letterTypes = data;
          this.letterRequestObject.expectingDate = Event.setCurrentDateTime().processedFullDate;
          this.letterRequestObject.letterBody = '';
          this.showRequestBody = true;
        }
      );
  }
  loadOPDTypes() {

    this.OpdManagementService.fetchOPDTypes(this.authorizationOPDRequests).subscribe((data:any) => {
      this.OPDTypes = ['Medical'];
    });

    // this.OpdManagementService.getOpdBalance(this.empNo , this.authorizationOPDRequests, this.selectedYear).subscribe((data: any) => {
    //   this.OpdBalance = data.opdBalance;
    //   console.log(data)
    //   if (this.OpdBalance < 0) {
    //     this.OpdBalance = 0.0;
    //   }
    //   const currentDate = new Date();
    //   const validEndDate = new Date(data.validEnd);
    //   this.opdDataLoaded = currentDate > validEndDate;
    // });

    this.OpdManagementService.getCadre(this.empNo ,this.authorizationOPDRequests).subscribe((data: any) => {
      this.permanent = data;
    });

    this.OpdManagementService.getMaritalStatus(this.empNo,this.authorizationOPDRequests).subscribe((data :any)=>{
      this.maritalStatus = data;
    });
  }

  getDataForSelectedYear() {
    this.opdDataLoaded = false;
    this.deadlinePassedForOpd = false;
    this.notEligibleForOpd = false;

    this.itemArray = [];
    this.itemTotalAmount = 0;
    this.OpdManagementService.getOpdBalance(this.empNo , this.authorizationOPDRequests, this.selectedYear).subscribe((data: any) => {
      this.opdData = data;
      this.OpdBalance = data.allocatedAmount - data.utilizedAmount;
      this.remainOpdAmount = data.allocatedAmount - data.utilizedAmount;
      this.defaultOpdBalance = data.allocatedAmount - data.utilizedAmount;
      this.opdValidStartDate = data.validStart;
      this.opdValidEndDate = data.validEnd;

      if (this.OpdBalance < 0) {
        this.OpdBalance = 0.0;
        this.defaultOpdBalance = 0.0;
      }
      const currentDate = new Date();
      const validEndDate = new Date(data.validEnd);
      this.remainingDatesForOpd = Math.floor((new Date(data.validEnd).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      if (currentDate < validEndDate && this.opdData.allocatedAmount > 0) {
        this.opdDataLoaded = true;
      }
      if (currentDate > validEndDate && this.opdData.allocatedAmount > 0) {
        this.deadlinePassedForOpd = true;
      }
      if (this.opdData.allocatedAmount === 0 && this.opdData.validStart === null && this.opdData.validEnd === null) {
        this.notEligibleForOpd = true;
      }
    });
  }

  loadHRPeople() {
    const groupName = "Letter Admin";
    const json = {
      'userGroupName': groupName,
    };
    this.httpservice.getSpecialEmployeeGroup(json)
      .subscribe(
        (data: any) => {
          this.requestingFromEmployeesList = data;
        }
      );
  }

  loadFacilityTypes() {
    this.facilityManagementService.fetchFaciityTypes()
      .subscribe((data: any) => {
        // console.log("***************  fetchFaciityTypes  *********************");
        this.facilityTypes = data;
      });
  }
  loadFacilityVenues() {
    this.facilityManagementService.fetchFaciityVenues()
      .subscribe((data: any) => {
        // console.log("******************** loadFacilityVenues ********" , data);
        this.venueTypes = data;
      });
  }
  increaseTextBoxSize(elementId) {
    setTimeout(function () {
      let element = (<HTMLInputElement>document.getElementById(elementId));
      // element.style.cssText = 'height:auto;';
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  requestFromCheckboxClick(type) {
    if(type === 'letter') {
      this.showRequestFromPerson = (<HTMLInputElement>document.getElementById('requestFromPerson')).checked;
    }
    if(type === 'facility') {
      this.showFacilityRequestFromPerson = (<HTMLInputElement>document.getElementById('requestFacilityFromPerson')).checked;
    }
  }

  postRequest() {
    const requestLetterType = (<HTMLInputElement>document.getElementById('requestLetterType')).value;
    const requestBody = this.letterRequestObject.letterBody;
    const letterRequestDate = this.letterRequestObject.expectingDate;
    // const letterRequestDate = (<HTMLInputElement>document.getElementById('letterRequestDate')).value;
    // const requestBody = (<HTMLInputElement>document.getElementById('requestBody')).value;

    let requestingFromName;
    let requestingFrom;

    if (this.showRequestFromPerson) {
      requestingFromName = (<HTMLInputElement>document.getElementById('requestingFromName')).value;
      let obj = this.requestingFromEmployeesList.find(o => o.name === requestingFromName);
      requestingFrom = obj.empNo;
    } else {
      requestingFrom = '';
    }

    const json = {
      'letterType': requestLetterType,
      'message': requestBody,
      'deadline': letterRequestDate,
      'requestingFromPerson': this.showRequestFromPerson,
      'requestingFrom': requestingFrom
    };

    if (requestBody.length === 0) {
      this.openErrorModal(1009, 'WARNING', 'Please enter letter request message');
    } else {
      this.httpservice.requestLetter(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(1010, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('requestBody')).value = '';
            } else if (data.httpStatusCode === 500) {
              this.openErrorModal(1011, 'ERROR', '');
            }
          }
        );

    }
  }

  postFacilityRequest() {
    const requestFacilityType = (<HTMLInputElement>document.getElementById('requestFacilityType')).value;
    const requestBody = (<HTMLInputElement>document.getElementById('facilityRequestBody')).value;
    const requestVenue = (<HTMLInputElement>document.getElementById('requestFacilityVenue')).value;
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    let requestingFromName;
    let requestingFrom;

    if (this.showFacilityRequestFromPerson) {
      requestingFromName = (<HTMLInputElement>document.getElementById('requestFacilityFromName')).value;
      let obj = this.requestingFromEmployeesList.find(o => o.name === requestingFromName);
      requestingFrom = obj.empNo;
    } else {
      requestingFrom = '';
    }

    const json = {
      'facilityType': requestFacilityType,
      'message': requestBody,
      'requestingFromPerson': this.showFacilityRequestFromPerson,
      'requestingFrom': requestingFrom,
      'venue' : requestVenue,
      'images' : this.imageUploadArray,
      'title' : title
    };
    if (requestBody.length === 0 || title.length === 0) {
      this.validationErrorMsg = CONSTANT.ERROR_MSG.FACILITY_REQ.NO_MSG_OR_TITLE;
      setTimeout(() => this.validationErrorMsg = '', 6000);
    } else if (this.imageUploadArray.length === 0) {
      this.validationErrorMsg = CONSTANT.ERROR_MSG.FACILITY_REQ.NO_DOCUMENTS;
      setTimeout(() => this.validationErrorMsg = '', 6000);
    } else {
      this.httpservice.requestFacility(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(1010, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('facilityRequestBody')).value = '';
              (<HTMLInputElement>document.getElementById('title')).value = '';
              this.imageUploadArray = [];
              (<HTMLInputElement>document.getElementById('facilityReqCloseButton')).click();
            } else if (data.httpStatusCode === 500) {
              this.openErrorModal(1011, 'ERROR', '');
            }
          }
        );

    }
  }
  onChangeRequest(type) {
    this.showFacilityRequestFromPerson = false;
    this.showRequestFromPerson = false;
    switch (type) {
      case 'letter' :
        this.showLetterRequestHeader = true;
        this.showLetterRequestBody = true;
        this.showLetterRequestFooter = true;
        this.showFacilityRequestHeader = false;
        this.showFacilityRequestBody = false;
        this.showFacilityRequestFooter = false;
        this.showOPDRequestHeader = false;
        this.showOPDRequestBody = false;
        this.showOPDRequestFooter = false;
        break;
      case 'facility' :
        this.showLetterRequestHeader = false;
        this.showLetterRequestBody = false;
        this.showLetterRequestFooter = false;
        this.showFacilityRequestHeader = true;
        this.showFacilityRequestBody = true;
        this.showFacilityRequestFooter = true;
        this.showOPDRequestHeader = false;
        this.showOPDRequestBody = false;
        this.showOPDRequestFooter = false;
        break;
      case 'OPD' :
        this.showLetterRequestHeader = false;
        this.showLetterRequestBody = false;
        this.showLetterRequestFooter = false;
        this.showFacilityRequestHeader = false;
        this.showFacilityRequestBody = false;
        this.showFacilityRequestFooter = false;
        this.showOPDRequestHeader = true;
        this.showOPDRequestBody = true;
        this.showOPDRequestFooter = true;
        break;
    }
  }

  // Image Upload
  uploadFinish(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.imageUploadArray.push(uploadedImage);
  }
  uploadFinishOPD(url) {
    const uploadedFile = url.serverResponse.response.body[0];

    const  fileName = url.file.name;
    this.fileUploadArray.push({url : uploadedFile, name: fileName});

  }

  deleteUploadedImage(url) {
    let index = this.imageUploadArray.indexOf(url);
    if (index > -1) {
      this.imageUploadArray.splice(index, 1);
    }
  }
  deleteUploadedImageFile(url,name) {
    const obj = this.fileUploadArray.find(file => file.url == url);
    let index = this.fileUploadArray.indexOf(obj);
    if (index > -1) {
      this.fileUploadArray.splice(index, 1);
    }
  }



  addItem() {
    if ((<HTMLInputElement>document.getElementById('addItemName')).value !== ''
      && (<HTMLInputElement>document.getElementById('addItemAmount')).value !== ''

    ) {

  // if (this.maritalStatus !== '') {
    if (parseFloat((<HTMLInputElement>document.getElementById('addItemAmount')).value) > this.OpdBalance) {
          return this.openErrorModal(1010, 'ERROR', 'You have exceeded the OPD amount!');
    }
    if ((<HTMLInputElement>document.getElementById('addItemAmount')).value.indexOf('-') > -1) {
      return this.openErrorModal(1010, 'ERROR', 'OPD Amount cannot be minus values!');
    }
  // }
  // else if (this.maritalStatus === '') {
  //         return this.openErrorModal(1010, 'ERROR', 'Please update your marital status in user profile and request!');
  // }
  // else {
  //       return this.openErrorModal(1010, 'ERROR', 'You are not eligible to request OPD!');
  // }

  // this.OpdBalance -= parseInt((<HTMLInputElement>document.getElementById('addItemAmount')).value);

      this.itemArray.push({
        name : (<HTMLInputElement>document.getElementById('addItemName')).value,
        amount: (<HTMLInputElement>document.getElementById('addItemAmount')).value
      });
      (<HTMLInputElement>document.getElementById('addItemName')).value = '';
      (<HTMLInputElement>document.getElementById('addItemAmount')).value = '';
      this.calculateTotal();
    }else {
      this.openErrorModal(1010, 'ERROR','Please fill the fields');
    }
  }
  removeItem(index) {
    // this.OpdBalance += parseFloat(this.itemArray[index].amount);
    this.itemArray.splice(index, 1);

    this.calculateTotal();
  }

  calculateTotal() {
    this.itemTotalAmount = 0.0;
    this.itemArray.map((item: any) => {
      this.itemTotalAmount = this.itemTotalAmount + parseFloat(item.amount);
    });
    this.OpdBalance = this.defaultOpdBalance - this.itemTotalAmount;
    this.remainOpdAmount = this.defaultOpdBalance - this.itemTotalAmount;
  }
  inputKeyPress(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      (<HTMLInputElement>document.getElementById('addItemBtnId')).click();
      return false;
    }
    return true;
  }
  inputKeyPressEdit(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      (<HTMLInputElement>document.getElementById('editItemBtnId')).click();
      return false;
    }
    return true;
  }
  selectEditItem(index) {
    this.currentEdit = index;
    this.editItemSelected = this.itemArray[index];
  }

  editItem(index) {
    if ((<HTMLInputElement>document.getElementById('editItemName')).value !== '' &&
      (<HTMLInputElement>document.getElementById('editItemAmount')).value !== '') {
      if ((this.remainOpdAmount + parseFloat(this.editItemSelected.amount)) < parseFloat((<HTMLInputElement>document.getElementById('editItemAmount')).value)) {
        return this.openErrorModal(1010, 'ERROR', 'You have exceeded the OPD amount!');
      }else if ((<HTMLInputElement>document.getElementById('editItemAmount')).value.indexOf('-') > -1) {
        return this.openErrorModal(1010, 'ERROR', 'OPD Amount cannot be minus values!');
      } else {
        // this.OpdBalance -= parseInt((<HTMLInputElement>document.getElementById('editItemAmount')).value);
        this.itemArray.forEach((item, i) => {
          if ( i === index) {
            this.itemArray[index] = {
              name : (<HTMLInputElement>document.getElementById('editItemName')).value,
              amount: (<HTMLInputElement>document.getElementById('editItemAmount')).value};
            this.currentEdit = -1;
          }
        });
        this.calculateTotal();
      }

    }else {
      this.openErrorModal(1010, 'ERROR', 'Please fill the fields');
    }
  }

  postOPDRequest() {
    this.opdRequestBtnDisabled = true;
    // const requestOpdType = (<HTMLInputElement>document.getElementById('requestOPDType')).value;
    const requestOpdType = 'Medical';
   const title = (<HTMLInputElement>document.getElementById('titleOpd')).value;
    let requestingFromName;
    let requestingFrom;

    if (this.showOpdRequestFromPerson) {
      requestingFromName = (<HTMLInputElement>document.getElementById('requestFacilityFromName')).value;
      let obj = this.requestingFromEmployeesList.find(o => o.name === requestingFromName);
      requestingFrom = obj.empNo;
    } else {
      requestingFrom = '';
    }

    const json = {
      'type': requestOpdType,
      'message': 'Requesting an OPD Request of type  ' + requestOpdType,
      'requestingFromPerson': this.showFacilityRequestFromPerson,
      'requestingFrom': requestingFrom,
      'files' : this.fileUploadArray,
      'items' : this.itemArray,
      'title' : title,
      'total' : this.itemTotalAmount,
      'year' : this.selectedYear
    };
    if (this.itemArray.length === 0 || title.length === 0 || this.fileUploadArray.length == 0 ) {
      this.opdRequestBtnDisabled = false;
      this.openErrorModal(1009, 'WARNING', 'Please enter OPD request title and atleast one item with the evidence document');
    } else {
      this.httpservice.requestOPD(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(1010, 'SUCCESS', '');

              (<HTMLInputElement>document.getElementById('titleOpd')).value = ''
              this.fileUploadArray = [];
              this.itemArray = [];
              this.itemTotalAmount = 0;
              this.opdRequestBtnDisabled = false;
            } else if (data.httpStatusCode === 500) {
              this.openErrorModal(1011, 'ERROR', '');
              this.opdRequestBtnDisabled = false;
            }
          }
        );

    }
  }

}
