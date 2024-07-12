import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../../../../_global/profile';
import {HttpErrorResponse} from '@angular/common/http';
import {PulseResourcesService} from '../../../../../../../service/pulse-resources.service';

@Component({
  selector: 'app-home-tab-project-history',
  templateUrl: './home-tab-project-history.component.html',
  styleUrls: ['./home-tab-project-history.component.css']
})
export class HomeTabProjectHistoryComponent implements OnInit {

  constructor(private pulseResourcesService: PulseResourcesService) {
  }

  showForm: boolean;

  toDateUntilNow: boolean;

  formData: {
    empId: number,
    fromDate: any,
    toDate: any,
    project: { projectCode: string, projectName: string, teams: string[] },
    team: string,
    value?: number
  };

  projectTeamList: { projectCode: string, projectName: string, teams: string[] }[];

  selectedProjectTeams: string[] = [];

  empUtilizationHistory: EmpUtilData[] = [];

  newTeam: boolean;

  message: string;

  ngOnInit() {
    this.showForm = false;
    this.toDateUntilNow = false;
    this.newTeam = false;
    // this.loadProjectsAndTeams();
  }

  loadProjectsAndTeams() {
    this.pulseResourcesService.getAllProjectTeams().subscribe((data: any[]) => {
      this.projectTeamList = data;
      this.initFormData(new Date(), new Date(), null, null, null);
    }, err => console.log(err));
  }

  initFormData(fromDate: any, toDate: any, project: string, team: string, percentage: number) {
    this.formData = {empId: null, fromDate: null, toDate: null, project: null, team: null, value: null};
    this.formData.empId = Profile.EMPLOYEE_ID;
    this.formData.fromDate = fromDate.toISOString().split('T')[0];
    this.formData.toDate = toDate.toISOString().split('T')[0];

    // auto select project
    if (project !== null) {
      this.formData.project = this.projectTeamList.find(prj => prj.projectCode === project);
    } else {
      this.formData.project = this.projectTeamList.length > 0 ? this.projectTeamList[0] : {projectCode: '', projectName: '', teams: ['']};
    }

    // console.log(this.formData);
    // auto select team
    if (this.formData.project === undefined) {
      this.formData.project = this.projectTeamList.length > 0 ? this.projectTeamList[0] : {projectCode: '', projectName: '', teams: ['']};
    }
    this.selectedProjectTeams = this.formData.project.teams;
    if (team !== null) {
      this.formData.team = this.selectedProjectTeams.find(team => team === team);
    } else {
      this.formData.team = this.selectedProjectTeams.length > 0 ? this.selectedProjectTeams[0] : '';
    }

    // set default allocation
    if (percentage !== null) {
      this.formData.value = percentage;
    } else {
      this.formData.value = 100;
    }
    this.showForm = true;
    // console.log(this.formData);
    // this.loadEmpUtilizationHistory();
  }

  onChangeProject() {
    if (this.formData.project === null) {
      this.formData.project = this.projectTeamList.length > 0 ? this.projectTeamList[0] : {projectCode: '', projectName: '', teams: ['']};
      this.selectedProjectTeams = this.formData.project.teams;
      this.formData.team = this.selectedProjectTeams.length > 0 ? this.selectedProjectTeams[0] : '';
    }
    this.closeNewTeam()
  }

  onChangeTeam() {
    // console.log(this.formData);
    if (this.formData.team == '-1') {
      this.formData.team = '';
      this.newTeam = true;
    }
  }

  onChangeFromDate() {
    let fromDate = new Date(this.formData.fromDate);
    let toDate = new Date(this.formData.toDate);
    if (toDate < fromDate) {
      this.formData.toDate = this.formData.fromDate;
    }
  }

  onChangeToDate(untilNow: boolean) {
    if (untilNow) {
      this.toDateUntilNow = !this.toDateUntilNow;
    } else {
      let fromDate = new Date(this.formData.fromDate);
      let toDate = new Date(this.formData.toDate);
      if (toDate < fromDate) {
        this.formData.fromDate = this.formData.toDate;
      }
    }
  }

  onChangeValue() {
    if (this.formData.value > 100 || this.formData.value < 1) {
      this.formData.value = 100;
    }
  }

  // loadEmpUtilizationHistory() {
  //   this.pulseResourcesService.getUtilizationHistory(Profile.EMPLOYEE_ID).subscribe((data: any[]) => {
  //     // console.log(data);
  //     this.empUtilizationHistory = data;
  //   }, err => console.log(err))
  // }

  onSaveResourceUtilization() {
    // console.log(this.formData);
    let utilRecord: UtilRecord = {
      empId: Profile.EMPLOYEE_ID,
      project: this.formData.project.projectCode,
      team: this.formData.team,
      fromDate: this.formData.fromDate,
      toDate: this.toDateUntilNow ? 'UNTIL_NOW' : this.formData.toDate,
      value: this.formData.value
    };
    this.newTeam = false;
    this.pulseResourcesService.saveEmployeeUtilization(utilRecord).subscribe(result => {
      if (result) {
        if (this.formData.toDate !== 'UNTIL_NOW') {
          this.initFormData(new Date(this.formData.toDate), new Date(this.formData.toDate), null, null, null);
        } else {
          this.initFormData(new Date(this.formData.fromDate), new Date(this.formData.fromDate), null, null, null);
        }
      } else {
        this.setMessage('Save Failed! Date conflict detected.');
        this.initFormData(new Date(this.formData.fromDate), new Date(this.formData.toDate), null, null, null);
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.setMessage(`Save Failed! SERVER ERROR ${err.statusText}`);
    });
    this.loadProjectsAndTeams();
  }

  onDeleteResourceUtilization(util: EmpUtilData) {
    this.pulseResourcesService
      .deleteEmployeeUtilization(util.key)
      .subscribe(data => {
        // console.log(data);
        // console.log(util);
        this.initFormData(new Date(util.fromDate), new Date(util.toDate), util.project, util.team, util.percentage);
      }, err => console.log(err));
  }

  closeNewTeam() {
    this.newTeam = false;
    this.formData.team = this.selectedProjectTeams.length > 0 ? this.selectedProjectTeams[0] : '';
  }

  setMessage(message: string) {
    this.message = message;
    setTimeout(() => this.message = '', 2000);
  }
}

// TODO: move to a class
export class EmpUtilData {
  key: string;
  empId: string;
  project: string;
  team: string;
  percentage: number;
  fromDate: string;
  toDate: string;
  duration: string
}

export class UtilRecord {
  empId: string;
  project: string;
  team: string;
  fromDate: string;
  toDate: string;
  value: number;
}
