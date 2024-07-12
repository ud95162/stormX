import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-education-tab-new',
  templateUrl: './education-tab-new.component.html',
  styleUrls: ['./education-tab-new.component.css']
})
export class EducationTabNewComponent implements OnInit {
  @Input() educationDetails: any;
  @Input() employeeNo: any;
  @Input() modalType: any;
  @Output() success = new EventEmitter<string>();

  showEdit = false;

  dataLoaded = false;
  educationID;
  educationType = 'university';
  uniType;
  showHighSchool;
  showUniversity;

  UniTypeView = true;
  HighSchoolTypeView = false;
  UniNameLabel = true;
  HighSchoolNameLabel = false;

  editschoolList;
  edituniversityList;

  uniSchool = null;
  degree = null;
  grade = null;
  eduFrom = null;
  eduTo = null;
  description = null;
  batch = null;

  myMethodSubs: Subscription;//added

  eduName;
  eduName1;

  //added
  errorCode;
  errorType;
  errorMessage;
  showList: boolean;
  searchTerm: any;

  constructor(private httpservice: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    if (this.modalType === 'new') {
      this.uniSchool = null;
      this.degree = null;
      this.grade = null;
      this.eduFrom = null;
      this.eduTo = null;
      this.description = null;
    } else {
      this.loadEmpEducationData();
      this.dataLoaded = this.educationDetails.length !== 0;
    }
    this.showEdit = this.employeeNo === Profile.EMPLOYEE_ID;

    this.loadList();
  }

  loadEmpEducationData() {
    this.httpservice.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.educationDetails = data[0].educationInformation.employeeEducations;
          if (this.educationDetails.length === 0) {
            this.dataLoaded = false;
          } else {
            this.dataLoaded = true;
          }
        }
      );
  }

  loadList() {
    this.httpservice.loadAllSchools()
      .subscribe(
        (data: any) => {
          this.editschoolList = data;
        }
      );
    this.httpservice.loadAllUniversities()
      .subscribe(
        (data: any) => {
          this.edituniversityList = data;
        }
      );
  }

  edituniTypeCheck(e) {
    this.uniType = e;
    console.log(this.uniType)
  }

  educationTypeCheck(e) {
    this.educationType = e;
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

  onSubmitEducationBtnClick(qualificationPostonFeed) {
    if (this.uniSchool === '' || this.uniSchool === null || this.degree === '' || this.degree === null ||
      this.grade === '' || this.grade === null || this.eduFrom === '' || this.eduFrom === null || this.eduTo === '' ||
      this.eduTo === null || this.batch === null) {
      alert('Please fill the required fields');
      // this.loadingOverlayView = false;
    } else {
      const json = {
        'educationType': this.educationType,
        'name': this.uniSchool,
        'type': this.uniType,
        'degree': this.degree,
        'results': this.grade,
        'fromDate': this.eduFrom,
        'toDate': this.eduTo,
        'description': this.description,
        'saveToFeed': qualificationPostonFeed,
        'batchName': this.batch
      };
      this.httpservice.saveEducation(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(100, 'SUCCESS', '');
              this.educationType = null;
              this.uniSchool = null;
              this.uniType = null;
              this.degree = null;
              this.grade = null;
              this.eduFrom = null;
              this.eduTo = null;
              this.description = null;
              this.batch = null;
              this.success.emit('complete');
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', error);
          }
        );
    }
  }

  // added
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }
}
