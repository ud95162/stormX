import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from '../../../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {forkJoin} from "rxjs";
import {ModalUiServiceService} from "../../../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-skills-new',
  templateUrl: './skills-new.component.html',
  styleUrls: ['./skills-new.component.css']
})
export class SkillsNewComponent implements OnInit {
  @Input() employeeNo: any;
  @Input() skillType: any;
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

  errorCode;
  errorType;
  errorMessage;
  techSkillSupervisor = 0;
  private skillTypeId: any;
  skillName: any;
  description: any;
  selectedSkillId: any;

  constructor(private httpservice: ProfileUserServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalService: ModalUiServiceService) {
  }

  ngOnInit() {
    this.loadList();
    this.personalRating = 10;
  }

  setSkillData(skillsList: any) {
    const skillTypes = [];
    let softSkills = [];
    let technicalSkills = [];
    for (let key in skillsList) {
      skillTypes.push(skillsList[key].skill_type);
      if (skillsList[key].skill_type === 'Soft Skills') {
        softSkills = skillsList[key].dataSets;
      } else if (skillsList[key].skill_type === 'Technical Skills') {
        technicalSkills = skillsList[key].dataSets;
      }
    }

    this.skillResponseList = skillsList;
    this.skillTypeArray = skillTypes;
    this.softSkillsArray = softSkills;
    this.technicalSkillsArray = technicalSkills;
    this.skillList = this.softSkillsArray;
  }

  loadList() {

    const skillList = this.httpservice.loadAllSkills();
    const supervisorList = this.httpservice.loadAllSupervisors(Profile.EMPLOYEE_ID);

    forkJoin([skillList, supervisorList]).subscribe((result: any) => {
      this.setSkillData(result[0]);
      this.supervisorList = result[1];
    })

  }

  // changeSkillType() {
  //   const skillType = (<HTMLInputElement>document.getElementById('skillTypeDropdown')).value;
  //   if (skillType === 'Soft Skills') {
  //     this.showSupervisor = false;
  //     this.skillList = this.softSkillsArray;
  //   } else if (skillType === 'Technical Skills') {
  //     this.showSupervisor = true;
  //     this.skillList = this.technicalSkillsArray;
  //   }
  // }

  changePersonalRating() {
    const slider = (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value;
    this.personalRating = slider;
  }

  onSubmitSkill(skillPostonFeed) {

    if (this.skillType === 'Technical Skills') {
      this.skillTypeId = 2;
      this.selectedSkillId = this.technicalSkillsArray.find( skill => skill.name === this.skillName).id;
    } else {
      this.skillTypeId = 1;
      this.techSkillSupervisor = 0;
      this.selectedSkillId = this.softSkillsArray.find( skill => skill.name === this.skillName).id;
    }

    if (this.skillName === '' || this.skillName === null) {
      this.openErrorModal(1200, 'WARNING', '');
    } else if (this.skillType === 'Soft Skills' && !this.softSkillsArray.some(skill => skill.name === this.skillName)) {
      this.openErrorModal(1202, 'WARNING', '');
    } else if (this.skillType === 'Technical Skills' && !this.technicalSkillsArray.some(skill => skill.name === this.skillName)) {
      this.openErrorModal(1202, 'WARNING', '');
    } else if (this.skillType === 'Technical Skills' && this.techSkillSupervisor === 0 || this.techSkillSupervisor === undefined ) {
      this.openErrorModal(1201, 'WARNING', '');
    }
    else {
      const json = {
        'empNo': Profile.EMPLOYEE_ID,
        'skillName': this.skillName,
        'personal_rate': this.personalRating,
        'skill_type': this.skillTypeId,
        'approved_emp_no': this.techSkillSupervisor,
        'saveToFeed': skillPostonFeed,
        'comment': this.description,
        'skillId': this.selectedSkillId,
        'approvedEmpId': this.techSkillSupervisor,
        'approved_status': 1
      };

      this.httpservice.saveSkill(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.openErrorModal(100, 'SUCCESS', '');
              this.skillName = null;
              this.personalRating = 10;
              this.skillTypeId = null;
              this.techSkillSupervisor = 0;
              this.description = null;
              this.success.emit('complete');
              this.interCommunicationServiceService.updateProfileContent(true);
              this.hideModal('editSkills');
            }
          }, error => {
            this.openErrorModal(1112, 'ERROR', 'Error saving skill');
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

  hideModal(modalId: string) {
    this.modalService.hideModal(modalId);
  }

}
