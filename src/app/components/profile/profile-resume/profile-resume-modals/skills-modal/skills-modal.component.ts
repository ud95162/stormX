import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalUiServiceService} from '../../../../../service/ui-services/modal-ui-service.service';
import {SkillsNewComponent} from './skills-new/skills-new.component';
import {SkillsEditComponent} from './skills-edit/skills-edit.component';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.css']
})
export class SkillsModalComponent implements OnInit {
  @Input() skillInfo: any;
  @Input() employeeNo: any;
  @Input() modalType: any;
  @Input() modalId: any;
  @Input() techSkillDetailsToEdit: any;
  @Input() softSkillDetailsToEdit: any;
  @Output() success = new EventEmitter<string>();
  @ViewChild(SkillsNewComponent, {static: false}) skillsNew: SkillsNewComponent;
  @ViewChild(SkillsEditComponent, {static: false}) skillsEdit: SkillsEditComponent;
  employeeNoForComponent: any;
  skillType: string;
  constructor(private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
    this.employeeNoForComponent = this.skillInfo.empNo;
  }

  changeSkillType(type: string) {
    this.skillType = type;
  }
  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    (<HTMLInputElement>document.getElementById('skillsPersonalRating')).value = '0';
    this.modalUiService.hideModal(modalId);
  }
  emitSuccess($event: string) {
    this.success.emit('complete');
  }

  save() {
    const skillPostonFeed = (<HTMLInputElement>document.getElementById('skillPostonFeedCheck')).checked;
    if (this.modalType === 'new') {
      this.skillsNew.onSubmitSkill(skillPostonFeed);
    } else {
      this.skillsEdit.onSubmitEditSkill(skillPostonFeed);
    }
  }

  deleteSkill() {
    this.skillsEdit.onPostDelete();
    this.hideModal('editSkills');
  }
}
