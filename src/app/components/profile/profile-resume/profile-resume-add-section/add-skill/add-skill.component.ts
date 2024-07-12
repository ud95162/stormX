import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  skillList = [];
  accomplishmentList;
  loadingOverlayView = false;

  skillTypeArray = [];
  softSkillsArray = [];
  technicalSkillsArray = [];
  personalRating;
  supervisorList = [];
  skillResponseList = [];
  showSupervisor = false;
  techSupervisorId;
  showSkillPostedSuccessAlert = false;
  showSkillPostedFailedAlert = false;
  skillPostedString;

  showAccomplishmentSuccessAlert = false;
  showAccomplishmentFailedAlert = false;

  postJson: any;

  errorCode;
  errorType;
  errorMessage;

  constructor(private httpservice: ProfileUserServiceService, public router: Router, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.loadList();
    this.personalRating = 5;
  }

  loadList() {
    this.httpservice.loadAllSkills()
      .subscribe(
        (data: any) => {
          const skillTypes = [];
          let softSkills = [];
          let technicalSkills = [];
          for (let key in data) {
            skillTypes.push(data[key].skill_type);
            if (data[key].skill_type === 'Soft Skills') {
              softSkills = data[key].dataSets;
            } else if (data[key].skill_type === 'Technical Skills') {
              technicalSkills = data[key].dataSets;
            }
          }
          this.skillResponseList = data;
          this.skillTypeArray = skillTypes;
          this.softSkillsArray = softSkills;
          this.technicalSkillsArray = technicalSkills;
          this.skillList = this.softSkillsArray;
        }
      );
    this.httpservice.loadAllSupervisors(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.supervisorList = data;
        }
      );
    this.httpservice.loadAllAccomplishments()
      .subscribe(
        (data: any) => {
          this.accomplishmentList = data;
        }
      );
  }

  changeSkillType() {
    const skillType = (<HTMLInputElement>document.getElementById('skillTypeDropdown')).value;
    if (skillType === 'Soft Skills') {
      this.showSupervisor = false;
      this.skillList = this.softSkillsArray;
    } else if (skillType === 'Technical Skills') {
      this.showSupervisor = true;
      this.skillList = this.technicalSkillsArray;
    }
  }

  changePersonalRating() {
    let slider = (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value;
    this.personalRating = slider;
  }

  onSubmitSkill() {
    this.loadingOverlayView = true;
    const employeeid = Profile.USER_TOKEN;
    const skillName = (<HTMLInputElement>document.getElementById('input_skill')).value;
    const skillType = (<HTMLInputElement>document.getElementById('skillTypeDropdown')).value;
    const skillDescription = (<HTMLInputElement>document.getElementById('input_skill_description')).value;
    const skillPostonFeed = (<HTMLInputElement>document.getElementById('skillPostOnFeedCheck')).checked;

    let skillObj = this.skillResponseList.find(o => o.skill_type === skillType);
    const skillTypeId = skillObj.id;

    if (this.showSupervisor === true) {
      const supervisorName = (<HTMLInputElement>document.getElementById('input_skill_supervisor')).value;
      if (supervisorName === null || supervisorName === '') {
        this.techSupervisorId = '';
      } else {
        let supervisorObj = this.supervisorList.find(o => o.name === supervisorName);
        this.techSupervisorId = supervisorObj.empNo;
      }
    } else {
      this.techSupervisorId = '';
    }

    if (skillName === '' || skillName === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'empNo': employeeid,
        'skillName': skillName,
        'personal_rate': this.personalRating,
        'skill_type': skillTypeId,
        'approved_emp_no': this.techSupervisorId,
        'saveToFeed': skillPostonFeed,
        'comment': skillDescription
      };

      this.httpservice.saveSkill(json)
        .subscribe(
          (data: any) => {
            console.log(json);
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              if (this.showSupervisor === true) {
                this.skillPostedString = 'Skill will be added to your profile once the supervisor accept the request';
                (<HTMLInputElement>document.getElementById('input_skill')).value = '';
                (<HTMLInputElement>document.getElementById('input_skill_supervisor')).value = '';
                (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value = '5';
                this.personalRating = 5;
              } else {
                this.skillPostedString = 'Skill will be added to your profile in a while';
                (<HTMLInputElement>document.getElementById('input_skill')).value = '';
                (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value = '5';
                this.personalRating = 5;
              }
              this.showSkillPostedSuccessAlert = true;
              this.interCommunicationServiceService.updateProfileContent(true);
              (<HTMLInputElement>document.getElementById('addSkillsAccomplishmentsModalClose')).click();
            } else if (data.httpStatusCode === 500) {
              this.showSkillPostedFailedAlert = true;
            }
          }
        );
    }
  }

  skillWarningClose() {
    this.showSkillPostedSuccessAlert = false;
    this.showSkillPostedFailedAlert = false;
  }

  onSubmitAccomplishment() {
    this.loadingOverlayView = true;
    const employeeid = Profile.USER_TOKEN;
    const accomplishmentName = (<HTMLInputElement>document.getElementById('input_accomplishment')).value;
    const accomplishmentIssuer = (<HTMLInputElement>document.getElementById('input_accomplishmentissuer')).value;
    const accomplishmentDate = (<HTMLInputElement>document.getElementById('input_accomplishmentdate')).value;
    const accomplishmentDescription = (<HTMLInputElement>document.getElementById('input_accomplishmentdescription')).value;
    const accomplishmentPostonFeed = (<HTMLInputElement>document.getElementById('accomplishmentPostOnFeedCheck')).checked;


    if (accomplishmentName === '' || accomplishmentName === null || accomplishmentDate === '' || accomplishmentDate === null) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {
      const json = {
        'accomplishment': accomplishmentName,
        'issuer': accomplishmentIssuer,
        'date': accomplishmentDate,
        'description': accomplishmentDescription,
        'saveToFeed': accomplishmentPostonFeed
      };

      // console.log(json);
      this.httpservice.saveAccomplishment(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              this.showAccomplishmentSuccessAlert = true;
              this.openErrorModal(100, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('input_accomplishment')).value = '';
              (<HTMLInputElement>document.getElementById('input_accomplishmentissuer')).value = '';
              (<HTMLInputElement>document.getElementById('input_accomplishmentdate')).value = '';
              (<HTMLInputElement>document.getElementById('input_accomplishmentdescription')).value = '';
              // this.interCommunicationServiceService.updateProfileContent(true);
              // (<HTMLInputElement>document.getElementById('addSkillsAccomplishmentsModalClose')).click();
            } else if (data.httpStatusCode === 500) {
              this.showAccomplishmentFailedAlert = true;
            }
          }
        );
        this.httpservice.callMyMethod("Niroshan");

    }
  }

  accomplishmentWarningClose() {
    this.showAccomplishmentSuccessAlert = false;
    this.showAccomplishmentFailedAlert = false;
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
