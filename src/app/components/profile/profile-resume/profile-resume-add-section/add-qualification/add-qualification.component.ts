import {Component, OnInit} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent implements OnInit {
  UniTypeView = true;
  HighSchoolTypeView = false;
  EducationType = 'university';
  UniType = 'State';
  UniNameLabel = true;
  HighSchoolNameLabel = false;

  qualificationList;
  schoolList;
  universityList;
  loadingOverlayView = false;

  showEducationSuccessAlert = false;
  showEducationFailedAlert = false;
  showQualificationSuccessAlert = false;
  showQualificationFailedAlert = false;

   errorCode;
   errorType;
   errorMessage;

  constructor(private httpservice: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.httpservice.loadAllQualifications()
      .subscribe(
        (data: any) => {
          this.qualificationList = data;
        }
      );
    this.httpservice.loadAllSchools()
      .subscribe(
        (data: any) => {
          this.schoolList = data;
        }
      );
    this.httpservice.loadAllUniversities()
      .subscribe(
        (data: any) => {
          this.universityList = data;
        }
      );
  }

  educationTypeCheck(e) {
    this.EducationType = e;
    if (e === 'university') {
      this.UniTypeView = true;
      this.HighSchoolTypeView = false;
      this.UniNameLabel = true;
      this.HighSchoolNameLabel = false;
    } else if (e === 'high_school') {
      this.UniTypeView = false;
      this.HighSchoolTypeView = true;
      this.HighSchoolNameLabel = true;
      this.UniNameLabel = false;
    }
  }

  uniTypeCheck(e) {
    this.UniType = e;
  }

  onSubmitEducationBtnClick() {
    this.loadingOverlayView = true;
    const eduType = this.EducationType;
    const uniName = (<HTMLInputElement>document.getElementById('input_uniname')).value;
    const uniType = this.UniType;
    const uniDegree = (<HTMLInputElement>document.getElementById('input_degree')).value;
    const uniResults = (<HTMLInputElement>document.getElementById('input_result')).value;
    const uniFromDate = (<HTMLInputElement>document.getElementById('input_fromDate')).value;
    const uniToDate = (<HTMLInputElement>document.getElementById('input_toDate')).value;
    const uniDescription = (<HTMLInputElement>document.getElementById('input_edudescription')).value;
    const educationPostonFeed = (<HTMLInputElement>document.getElementById('educationPostOnFeedCheck')).checked;

    if (uniName === '' || uniName === null || uniDegree === '' || uniDegree === null || uniResults === '' || uniResults === null || uniFromDate === '' || uniFromDate === null || uniToDate === '' || uniToDate === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'educationType': eduType,
        'name': uniName,
        'type': uniType,
        'degree': uniDegree,
        'results': uniResults,
        'fromDate': uniFromDate,
        'toDate': uniToDate,
        'description': uniDescription,
        'saveToFeed': educationPostonFeed
      };

      this.httpservice.saveEducation(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              this.showEducationSuccessAlert = true;
              this.openErrorModal(100, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('input_uniname')).value = '';
              (<HTMLInputElement>document.getElementById('input_degree')).value = '';
              (<HTMLInputElement>document.getElementById('input_result')).value = '';
              (<HTMLInputElement>document.getElementById('input_toDate')).value = '';
              (<HTMLInputElement>document.getElementById('input_edudescription')).value = '';
            } else if (data.httpStatusCode === 500) {
              this.showEducationFailedAlert = true;
            }
          }
        );
        this.httpservice.callMyMethod("Niroshan");
    }
  }

  educationWarningClose() {
    this.showEducationSuccessAlert = false;
    this.showEducationFailedAlert = false;
  }

  onSubmitQualificationBtnClick() {
    this.loadingOverlayView = true;
    const qualificationName = (<HTMLInputElement>document.getElementById('input_qualification')).value;
    const qualificationIssuer = (<HTMLInputElement>document.getElementById('input_issuer')).value;
    const qualificationDate = (<HTMLInputElement>document.getElementById('input_qualificationdate')).value;
    const qualificationResults = (<HTMLInputElement>document.getElementById('input_qulresult')).value;
    const qualificationDescription = (<HTMLInputElement>document.getElementById('input_quldescription')).value;
    const qualificationPostonFeed = (<HTMLInputElement>document.getElementById('qualificationPostOnFeedCheck')).checked;

    if (qualificationName === '' || qualificationName === null || qualificationIssuer === '' || qualificationIssuer === null || qualificationDate === '' || qualificationDate === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'qualificationName': qualificationName,
        'issuer': qualificationIssuer,
        'date': qualificationDate,
        'results': qualificationResults,
        'description': qualificationDescription,
        'saveToFeed': qualificationPostonFeed
      };

      this.httpservice.saveQualification(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              this.showQualificationSuccessAlert = true;
              this.openErrorModal(100, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('input_qualification')).value = '';
              (<HTMLInputElement>document.getElementById('input_issuer')).value = '';
              (<HTMLInputElement>document.getElementById('input_qualificationdate')).value = '';
              (<HTMLInputElement>document.getElementById('input_qulresult')).value = '';
              (<HTMLInputElement>document.getElementById('input_quldescription')).value = '';
            } else if (data.httpStatusCode === 500) {
              this.showQualificationFailedAlert = true;
            }
          }
        );
        this.httpservice.callMyMethod("Niroshan");
    }
  }

  qualificationWarningClose() {
    this.showQualificationSuccessAlert = false;
    this.showQualificationFailedAlert = false;
  }
   //added
openErrorModal(errorCode, errorType, errorMessage) {
  this.errorCode = errorCode;
  this.errorType = errorType;
  this.errorMessage = errorMessage;
  this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
  (<HTMLInputElement>document.getElementById('modalTrigger')).click();
}
}
