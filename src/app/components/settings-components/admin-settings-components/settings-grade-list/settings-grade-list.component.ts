import { Component, OnInit } from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {
  InterCommunicationServiceService
} from '../../../../service/support-services/inter-communication-service.service';
import {EmployeeService} from '../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-settings-grade-list',
  templateUrl: './settings-grade-list.component.html',
  styleUrls: ['./settings-grade-list.component.css']
})
export class SettingsGradeListComponent implements OnInit {

  designationGrades = [];
  selectedDesignationGrades: any;
  showDesignationGradeList: any;
  editDesignationGradeClicked: any;
  icon_direction = 'down';

  constructor(private settingsServiceService: SettingsServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private employeeService: EmployeeService,
              private modalUiService: ModalUiServiceService) { }

  ngOnInit() {
    this.getAllGrades();
  }

  getAllGrades() {
    this.employeeService.getDesignationGrade()
      .subscribe((data: any) => {
        this.designationGrades = data;
        if (data.length > 0) {
          this.showDesignationGradeList = true;
        }
      });
  }

  setDesignationGradeDataToEdit(designationGrade: any) {
    this.selectedDesignationGrades = designationGrade;
    this.showModal('editDesignationGradeModal');
    this.editDesignationGradeClicked = true;
    console.log(this.selectedDesignationGrades);
  }

  editDesignationGrade() {
    console.log(this.selectedDesignationGrades);
    this.employeeService.updateDesignationGrade(this.selectedDesignationGrades)
      .subscribe((data) => {
        this.hideModal('editDesignationGradeModal');
        this.getAllGrades();
      });
  }

  deleteDesignationGrade(gradeID: any) {
    this.employeeService.deleteDesignationGrade(gradeID)
      .subscribe((data) => {
        this.hideModal('editDesignationGradeModal');
        this.getAllGrades();
      });
  }

  onClickShowHideGrades(i: number, designationGrade: any) {
    if ((<HTMLInputElement>document.getElementById('grade_' + i)).style.display === '') {
      // console.log('down', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
      (<HTMLInputElement>document.getElementById('grade_' + i)).setAttribute('style', 'display:none');
      (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-down');
      this.icon_direction = 'down';
    } else {
      // console.log('up', (<HTMLInputElement>document.getElementById('icon_direction_' + i)));
      (<HTMLInputElement>document.getElementById('grade_' + i)).setAttribute('style', '');
      (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-up');
      this.icon_direction = 'up';

    }
  }

  showModal(modalId: any) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId: any) {
    this.modalUiService.hideModal(modalId);
  }


}
