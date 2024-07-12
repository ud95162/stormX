import {Component, Input, OnInit} from '@angular/core';
import {SettingsServiceService} from '../../../../service/settings-service.service';
import {
  InterCommunicationServiceService
} from '../../../../service/support-services/inter-communication-service.service';
import {EmployeeService} from '../../../../new-design/hr-dashboard/hr-dashboard/service/employee/employee.service';

@Component({
  selector: 'app-settings-grade-define-card',
  templateUrl: './settings-grade-define-card.component.html',
  styleUrls: ['./settings-grade-define-card.component.css']
})
export class SettingsGradeDefineCardComponent implements OnInit {

  @Input() cardTitle;
  @Input() callingType;
  @Input() titleLabel;

  code: any;

  gradeObj = {
    'createdBy': null,
    'createdDateTime': null,
    'description': '',
    'gradeCode': '',
    'gradeID': null,
    'gradeName': '',
    'modifiedBy': null,
    'modifiedDateTime': null,
    'status': null
  };

  constructor(private settingsServiceService: SettingsServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getGrades();
  }

  getGrades() {
    this.employeeService.getDesignationGrade().subscribe((data: any) => {
      console.log(data);
    });
  }

  generateCode() {
    const words = this.gradeObj.gradeName.split(' ');
    this.gradeObj.gradeCode = '';
    for (const word of words) {
      if (!isNaN(Number(word))) {
        this.gradeObj.gradeCode += word;
      } else {
        this.gradeObj.gradeCode += word.charAt(0).toUpperCase();
      }
    }
  }

  saveDesignationGrade() {
    console.log(this.gradeObj);
    this.employeeService.saveDesignationGrade(this.gradeObj)
      .subscribe((data) => {
        console.log('success');
        this.getGrades();
        this.gradeObj = {
          'createdBy': null,
          'createdDateTime': null,
          'description': '',
          'gradeCode': '',
          'gradeID': null,
          'gradeName': '',
          'modifiedBy': null,
          'modifiedDateTime': null,
          'status': null
        };
      });
  }

}
