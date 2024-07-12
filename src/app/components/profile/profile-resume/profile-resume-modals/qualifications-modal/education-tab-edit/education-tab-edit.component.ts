import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-education-tab-edit',
  templateUrl: './education-tab-edit.component.html',
  styleUrls: ['./education-tab-edit.component.css']
})
export class EducationTabEditComponent implements OnInit {

  @Input() educationDetails: any;
  @Input() employeeNo: any;
  @Input() modalType: any;
  @Output() success = new EventEmitter<string>();

  showEdit = false;

  dataLoaded = false;
  // educationID;
  // educationType = 'university';
  // uniType;
  //
  // UniTypeView = true;
  // HighSchoolTypeView = false;
  // UniNameLabel = true;
  // HighSchoolNameLabel = false;

  editschoolList;
  edituniversityList;

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
    this.dataLoaded = this.educationDetails.length !== 0;
    this.showEdit = this.employeeNo === Profile.EMPLOYEE_ID;
    console.log('educationdetails:', this.educationDetails)

    this.loadList();
  }

  loadEmpEducationData() {
    this.httpservice.loadEmpData(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.educationDetails = data[0].educationInformation.employeeEducations;
          this.dataLoaded = this.educationDetails.length !== 0;
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
    this.educationDetails.uniType = e;
  }

  educationTypeCheck(e) {
    this.educationDetails.type = e;
    // if (e === 'university') {
    //   this.UniTypeView = true;
    //   this.HighSchoolTypeView = false;
    //   this.UniNameLabel = true;
    //   this.HighSchoolNameLabel = false;
    // } else if (e === 'high_school') {
    //   this.UniTypeView = false;
    //   this.HighSchoolTypeView = true;
    //   this.HighSchoolNameLabel = true;
    //   this.UniNameLabel = false;
    // }
  }

  onPostEdit(qualificationPostonFeed) {
    const jsonPut = {
      'id': this.educationDetails.id,
      'educationType': this.educationDetails.type,
      'name': this.educationDetails.school,
      'type': this.educationDetails.uniType,
      'degree': this.educationDetails.degree,
      'results': this.educationDetails.grade,
      'fromDate': this.educationDetails.fromDate,
      'toDate': this.educationDetails.toDate,
      'description': this.educationDetails.description,
      'saveToFeed': qualificationPostonFeed,
      'batchName': this.educationDetails.batchName
    };

    this.httpservice.editEducation(jsonPut)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            // this.loadEmpEducationData();
            this.openErrorModal(101, 'SUCCESS', '');
            this.success.emit('complete');
          }
        }, error => {
          this.openErrorModal(1112, 'ERROR', error);
        }
      );
  }

  onEducationDelete() {
    const eduType = this.educationDetails.type;
    const eduID = this.educationDetails.id;
    this.httpservice.deleteEducation(eduType, eduID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadEmpEducationData();
            this.openErrorModal(102, 'SUCCESS', '');
            this.success.emit('complete');
            this.interCommunicationServiceService.updateProfileContent(true);
          }
        }
      );
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
