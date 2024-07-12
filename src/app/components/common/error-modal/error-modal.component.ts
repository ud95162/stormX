import {Component, OnInit} from '@angular/core';
import {InterCommunicationServiceService} from '../../../service/support-services/inter-communication-service.service';
import {ModalUiServiceService} from '../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  errorCode;
  errorType;
  errorMessage;
  errorTypeHeader;
  errorContentClass;


  constructor(private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService) {
  }

  ngOnInit() {
  }

  openErrorModal() {
    // Save Errors
    // 901 - fill mandatory fields
    // 902 - employee save successful
    // 903 - employee save failed

    // Edit Errors
    // 1000 - double search error
    // 1001 - university not saving error
    // 1002 - high school not saving error
    // 1003 - other qualification not saving error
    // 1004 - previous work not saving error
    // 1005 - null search error
    // 1006 - employee edit successful
    // 1007 - employee edit failed
    // 1008 - invalid employee id

    // Feed Errors
    // 2000 - posting blank post error
    // 2001 - posting blank post error

    // Report Errors
    // 3000 - invalid search key
    // 3001 - not selecting fields
    // 3002 - new report popup
    // 3003 - no results available

    // Image Upload
    // 4000 - blank image

    // Event
    // 5000 - Event Create Successful
    // 5001 - Event Create Failed

    // Page
    // 6000 - Page Save Successful
    // 6001 - Page Save Failed

    // Recruitment
    // 7000 - Candidate Move Successful
    // 7001 - Candidate Move Failed


    let errorHeader;
    let errorContent;
    //let modelBackdrop = ;

    this.interCommunicationServiceService.currentErrorCode.subscribe(errorCodeFrom => {
      this.errorCode = errorCodeFrom;
    });
    this.interCommunicationServiceService.currentErrorType.subscribe(errorTypeFrom => {
      this.errorType = errorTypeFrom;
      this.errorTypeHeader = errorTypeFrom;
    });
    this.interCommunicationServiceService.currentErrorMessage.subscribe(errorMessageFrom => {
      this.errorMessage = errorMessageFrom;
    });


    if (this.errorMessage === '') {
      switch (this.errorCode) {
        case 1111:
          errorHeader = 'Success!';
          errorContent = 'Record Updated Successfully!';
          break;
        case 1112:
          errorHeader = 'Failed!';
          errorContent = 'Operation Failed!';
          break;
        case 900:
          errorHeader = 'Invalid value!';
          errorContent = 'Please fill all the mandatory fields!';
          break;
        case 901:
          errorHeader = 'Employee Save Successful!';
          errorContent = '';
          break;
        case 902:
          errorHeader = 'Employee Save Failed!';
          errorContent = '';
          break;
        case 903:
          errorHeader = 'Invalid value!';
          errorContent = 'Employee resignation date should be greater than or equal to last working date';
          break;
        case 904:
          errorHeader = 'Invalid value!';
          errorContent = 'Employee EPF number should be either - or a number';
          break;
        case 905:
          errorHeader = 'Invalid value!';
          errorContent = 'Employee EPF number should be a number';
          break;
        case 906:
          errorHeader = 'Invalid value!';
          errorContent = 'Employee joined date should be greater than current date';
          break;
        case 1000:
          errorHeader = 'Please save the previous search';
          errorContent = 'You can\'t perform another search when you are in the middle of a search';
          break;
        case 1001:
          errorHeader = 'Please save the University Section by clicking on ✔';
          errorContent = 'You can\'t save a record before saving individual component first';
          break;
        case 1002:
          errorHeader = 'Please save the High School Section by clicking on ✔';
          errorContent = 'You can\'t save a record before saving individual component first';
          break;
        case 1003:
          errorHeader = 'Please save the Other Qualification Section by clicking on ✔';
          errorContent = 'You can\'t save a record before saving individual component first';
          break;
        case 1004:
          errorHeader = 'Please save the Previous Work Section by clicking on ✔';
          errorContent = 'You can\'t save a record before saving individual component first';
          break;
        case 1005:
          errorHeader = 'Invalid Employee ID!';
          errorContent = 'You can\'t perform a search with a blank employee ID. Please check again and enter a valid employee id!';
          break;
        case 1006:
          errorHeader = 'Employee Edit Successful!';
          errorContent = '';
          break;
        case 1007:
          errorHeader = 'Employee Edit Failed!';
          errorContent = '';
          break;
        case 1008:
          errorHeader = 'Invalid Employee ID!';
          errorContent = 'Please enter a valid employee ID!';
          break;
        case 1009:
          errorHeader = 'Please add a request body!';
          errorContent = '';
          break;
        case 1010:
          errorHeader = 'Request Submission Successful!';
          errorContent = '';
          break;
        case 1011:
          errorHeader = 'Request Submission Failed!';
          errorContent = '';
          break;
        case 2000:
          errorHeader = 'Post is blank!';
          errorContent = 'This post appears to be blank. Please write something or attach a link or photo to post.';
          break;
        case 2001:
          errorHeader = 'Please enter a valid username!';
          errorContent = 'Person you are trying to tag is not a registered user. Please enter a valid username.';
          break;
        case 2002:
          errorHeader = 'User not found!';
          errorContent = 'Person you are trying to tag is not a registered user. Please enter a valid username.';
          break;
        case 3000:
          errorHeader = 'Invalid Search key!';
          errorContent = 'You cannot perform a search with blank area!';
          break;
        case 3001:
          errorHeader = 'Please select at least one field!';
          errorContent = 'Please select at least one field to generate the report!';
          break;
        case 3002:
          errorHeader = 'Are you sure!';
          errorContent = 'You will lose all the unsaved data!';
          break;
        case 3003:
          errorHeader = 'No results available!';
          errorContent = 'Please perform the search using a different search key!';
          break;
        case 4000:
          errorHeader = 'You cannot upload blank image!';
          errorContent = 'Please choose a valid image to upload!';
          break;
        case 5000:
          errorHeader = 'Event Save Successful!';
          errorContent = '';
          break;
        case 5001:
          errorHeader = 'Event Save Failed!';
          errorContent = '';
          break;
        case 5002:
          errorHeader = 'Event Edit Successful!';
          errorContent = '';
          break;
        case 5003:
          errorHeader = 'Event Edit Failed!';
          errorContent = '';
          break;
        case 5004:
          errorHeader = 'Event Save Failed!';
          errorContent = 'Booking already existing!';
          break;
        case 5005:
          errorHeader = 'Success!';
          errorContent = 'An Event is created Successfully!';
          break;
        case 6000:
          errorHeader = 'Page Save Successful!';
          errorContent = 'Your Page will be published after the Admin approval';
          break;
        case 6001:
          errorHeader = 'Page Save Failed!';
          errorContent = 'Page Save Failed!';
          break;
        case 6002:
            errorHeader = 'Warning!';
            errorContent = 'Please add atleast one admin!';
            break;
        case 7000:
          errorHeader = 'Candidate Move Successful!';
          errorContent = 'You have Successfully moved the Candidate to the new category!';
          break;
        case 7001:
          errorHeader = 'Candidate Move Failed!';
          errorContent = 'Oops.. Something went wrong! Please try again to move the candidate!';
          break;
        case 21001:
          errorHeader = 'JSON Update Successful!';
          errorContent = '';
          break;
        case 21099:
          errorHeader = 'JSON Update Failed!';
          errorContent = '';
          break;
        case 100:
          errorHeader = 'Record Added Successfully!';
          errorContent = 'Record added Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 101:
          errorHeader = 'Record Updated Successfully!';
          errorContent = 'Record Updated Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 102:
            errorHeader = 'Record Deleted Successfully!';
            errorContent = 'Record Deleted Successfully!';
            this.errorContentClass = 'o-modal-text';
            break;
        case 103:
            errorHeader = 'Profile Picture Updated Successfully!';
            errorContent = 'Profile Picture Updated Successfully!';
            break;
        case 6009:
          errorHeader = 'OPD Config Delete Failed!';
          errorContent = 'OPD Config Delete Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 6010:
          errorHeader = 'OPD Config Added Failed!';
          errorContent = 'OPD Config Added Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 6011:
          errorHeader = 'OPD Config Update Failed!';
          errorContent = 'OPD Config Update Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 6012:
          errorHeader = 'Please fill all fields!';
          errorContent = 'Please fill all fields!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 9010:
          errorHeader = 'Event Created Successfully!';
          errorContent = 'Event Created Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 9100:
          errorHeader = 'Failed!';
          errorContent = 'Review Added Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 8002:
          errorHeader = 'Company Policy Saved Successfully!';
          errorContent = 'Company Policy Saved Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 8003:
          errorHeader = 'Company Policy Updated Successfully!';
          errorContent = 'Company Policy Updated Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 8004:
          errorHeader = 'Company Policy Deleted Successfully!';
          errorContent = 'Company Policy Deleted Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 8005:
          errorHeader = 'Company Policy Save Failed!';
          errorContent = 'Company Policy Save Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 8006:
          errorHeader = 'Company Policy Update Failed!';
          errorContent = 'Company Policy Update Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 8007:
          errorHeader = 'Company Policy Delete Failed!';
          errorContent = 'Company Policy Delete Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 8008:
          errorHeader = 'New Company Policy Version Added Successfully!';
          errorContent = 'New Company Policy Version Added Successfully!';
          this.errorContentClass = 'o-modal-text';
          break;
        case 8009:
          errorHeader = 'New Company Policy Version Added Failed!';
          errorContent = 'New Company Policy Version Added Failed!';
          this.errorContentClass = 'o-modal-text-failed';
          break;

      //     profile error codes
        case 1200:
          errorHeader = 'Please Fill All the Required Fields!';
          errorContent = 'Please Fill All the Required Fields!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 1201:
          errorHeader = 'Please Select Supervisor!';
          errorContent = 'Please Select Supervisor!';
          this.errorContentClass = 'o-modal-text-failed';
          break;
        case 1202:
          errorHeader = 'Skill does not exist in the list!';
          errorContent = 'Skill does not exist in the list!';
          this.errorContentClass = 'o-modal-text-failed';
          break;

      }
    } else {
      errorHeader = this.errorType;
      errorContent = this.errorMessage;
    }

    (<HTMLInputElement>document.getElementById('errorHeader')).innerHTML = this.errorTypeHeader;
    (<HTMLInputElement>document.getElementById('errorContent')).innerHTML = errorContent;
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);

  }
}
