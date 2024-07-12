import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from "../../../../../../service/profile-user-service.service";
import {EmpSkillHistory} from "../../../../classes/emp-skills";
import {ModalUiServiceService} from "../../../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-skill-history',
  templateUrl: './skill-history.component.html',
  styleUrls: ['./skill-history.component.css']
})
export class SkillHistoryComponent implements OnInit {

  @Input() empSelectedSkillId: any;
  @Output() modalHide = new EventEmitter();
  empSkillHistory: EmpSkillHistory[] = [];
  empSkillHistoryDataLoaded: boolean = false;
  constructor(private httpService: ProfileUserServiceService,
              private modalService: ModalUiServiceService) { }

  ngOnInit(): void {
    this.getSelectedSkillHistory();
  }

  getSelectedSkillHistory() {
    this.httpService.getSelectedSkillHistoryOfEmployee(this.empSelectedSkillId)
      .subscribe((data: any) => {
        this.empSkillHistory = data;
        this.empSkillHistoryDataLoaded = true;
      });
    this.showModal('skillHistory');
  }

  showModal(modalId: string) {
    this.modalService.showModal(modalId);
  }

  hideModal(modalId: string) {
    this.modalHide.emit(true);
    this.modalService.hideModal(modalId)
  }

  generateText(data: EmpSkillHistory) {
    switch (data.newStatus) {
      case 1:
        return 'New Skill Added with ' + data.newRate + '/10 rating By ';
      case 2:
        return 'Skill Approved with ' + data.newRate + '/10 rating By ';
      case 4:
        return 'Skill Edit with ' + data.newRate + '/10 rating By ';
    }
  }
}
