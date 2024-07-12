import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {
  InterCommunicationServiceService
} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';
import {ModalUiServiceService} from "../../../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() skillType: any;
  @Input() techSkillDetails: any;
  @Input() softSkillDetails: any;
  @Output() success = new EventEmitter<string>();

  skillList = [];
  accomplishmentList;
  loadingOverlayView = false;

  skillTypeArray = [];
  softSkillsArray = [];
  technicalSkillsArray = [];
  personalRating;
  supervisorList = [];
  skillResponseList = [];
  techSupervisorId;

  errorCode;
  errorType;
  errorMessage;
  techSkillSupervisor = 0;
  skillTypeId: any;
  skillName: any;
  description: any;
  postJson: any;
  skillID: any;
  validationErrorMessage = '';
  skillPersonalRate: number = 0;

  constructor(private httpservice: ProfileUserServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalService: ModalUiServiceService) {
  }

  ngOnInit() {
    if (this.skillType === 'Technical Skills') {
      this.skillPersonalRate = this.techSkillDetails.personal_rate;
      (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value = this.techSkillDetails.personal_rate
    } else {
      this.skillPersonalRate = this.techSkillDetails.personal_rate;
      (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value = this.softSkillDetails.personal_rate
    }
    this.loadList();
  }


  loadList() {
    this.httpservice.loadAllSupervisors(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.supervisorList = data;
          if (this.techSkillDetails.approvedEmpId !== 0) {
            this.techSkillSupervisor = this.supervisorList.find(emp => emp.empId === this.techSkillDetails.approvedEmpId).empId;
          }
        }
      );
  }

  changePersonalRating() {
    const ratingValue = (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value;

    this.skillPersonalRate = Number(ratingValue);
  }


  formValidation() {
    if (this.skillType === 'Technical Skills') {
      if (this.techSkillSupervisor === 0 || this.techSkillSupervisor === undefined) {
        this.setErrorMessage('Please select Supervisor!');
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  onSubmitEditSkill(skillPostonFeed) {
    if (this.formValidation()) {
      if (this.skillType === 'Technical Skills') {
        this.skillTypeId = 2;
        const json = {
          'id': this.techSkillDetails.id,
          'empNo': Profile.EMPLOYEE_ID,
          'personal_rate': this.skillPersonalRate,
          'skill_type': this.skillTypeId,
          'approvedEmpId': this.techSkillSupervisor,
          'saveToFeed': skillPostonFeed,
          'comment': this.techSkillDetails.comment,
          'approved_status': 4,
          'supervisor_rate': this.techSkillDetails.supervisor_rate,
          'skillId': this.techSkillDetails.skillId,
        };
        this.postJson = json;
      } else {
        this.skillTypeId = 1;
        this.techSkillSupervisor = 0;
        const json = {
          'id': this.softSkillDetails.id,
          'empNo': Profile.EMPLOYEE_ID,
          'skillName': this.softSkillDetails.skillName,
          'personal_rate': this.skillPersonalRate,
          'skill_type': this.skillTypeId,
          'skillId': this.softSkillDetails.skillId,
          'approvedEmpId': this.techSkillSupervisor,
          'saveToFeed': skillPostonFeed,
          'comment': this.softSkillDetails.comment,
          'approved_status': 4
        };
        this.postJson = json;
      }
      this.httpservice.saveSkill(this.postJson)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(100, 'SUCCESS', '');
              this.skillTypeId = null;
              (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value = '0';
              // this.success.emit('complete');
              this.interCommunicationServiceService.updateProfileContent(true);
              this.hideModal('editSkills');
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', 'Error saving skill');
          }
        );
    }

  }

  onPostDelete() {
    if (this.skillType === 'Technical Skills') {
      this.skillID = this.techSkillDetails.id;
    } else {
      this.skillID = this.softSkillDetails.id;
    }
    this.httpservice.deleteSkill(this.skillID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            // this.loadEmpSkillsData();
            this.openErrorModal(102, 'SUCCESS', '');
            // this.success.emit('complete');
            this.interCommunicationServiceService.updateProfileContent(true);

          }
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Error deleting skill');
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

  setErrorMessage(message: string) {
    this.validationErrorMessage = '*' + message;
    setTimeout(() => this.validationErrorMessage = '', 6000);
  }

  hideModal(modalId: string) {
    this.modalService.hideModal(modalId);
  }
}



