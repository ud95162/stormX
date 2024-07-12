import {Component, Input, OnInit, NgZone, HostListener, ViewChild, Output, EventEmitter} from '@angular/core';
import {Profile} from '../../../_global/profile';
import {Router} from '@angular/router';
import {ProfileUserServiceService} from 'app/service/profile-user-service.service';
import {InterCommunicationServiceService} from 'app/service/support-services/inter-communication-service.service';
import {HttpHeaders} from '@angular/common/http';
import {ResponsiveService} from 'app/utility/responsive-service';
import {GitJiraDashboardComponent} from './profile-git-jira-dashboard/git-jira-dashboard.component';
import {DailyDashboardComponent} from './profile-daily-dashboard/daily-dashboard.component';
import {ProfileSkillChartComponent} from './profile-skill-chart/profile-skill-chart.component';
import {ProfileCodelineIssueChartComponent} from './profile-codeline-issue-chart/profile-codeline-issue-chart.component';
import {ProfileUserProjectsComponent} from './profile-user-projects/profile-user-projects.component';
import {ProfileAchievementsComponent} from './profile-achievements/profile-achievements.component';
import {ProfileExtraActivitiesComponent} from './profile-extra-activities/profile-extra-activities.component';
import {ProfileResumeComponent} from '../profile-resume/profile-resume.component';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {
  @Input() employeeId;
  @Input() employeeFirstName;

  @Output() profileBodyEventEmitter = new EventEmitter();

  @ViewChild(GitJiraDashboardComponent, {static: false}) gitJiraChild: GitJiraDashboardComponent;
  @ViewChild(DailyDashboardComponent, {static: false}) dailDashboardChild: DailyDashboardComponent;
  @ViewChild(ProfileSkillChartComponent, {static: false}) skillChartChild: ProfileSkillChartComponent;
  @ViewChild(ProfileCodelineIssueChartComponent, {static: false}) codeChartChild: ProfileCodelineIssueChartComponent;
  @ViewChild(ProfileUserProjectsComponent, {static: false}) userProjectChild: ProfileUserProjectsComponent;
  @ViewChild(ProfileAchievementsComponent, {static: false}) achievementChild: ProfileAchievementsComponent;
  @ViewChild(ProfileExtraActivitiesComponent, {static: false}) extraChild: ProfileExtraActivitiesComponent;

  componentPermission = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  //  for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  defaultRange = 'lastmonth';

  // for skill chart
  skillLabels = [];
  skillValuesSupervisorRate = [];
  skillValuesPersonalRate = [];

  achievements = [];
  extra = [];
  projects = [];

  // code lines graph
  codelines = [];
  graphTitle;
  graphYLabel;
  labels = [];
  data = [];

  designation;

  // for get last week git & jira data
  day;
  month_no;
  year;

  // for WWT
  wwtTotalTime = 0;
  wwtLevel;

  // for custom date picker
  showDatePickers = false;

  // custom date range
  customDateRange = {
    'dateRangeFromDate': null,
    'dateRangeToDate': null
  };

  // for mouse hover effect
  isCommits = false;
  isIssues = false;

  sharedFilteredObj: any;
  public mainDashBoardOffice: Array<any> = [];
  attendanceWorkingHoursStats: any;
  trainingHours;
  csrCount;

  // for to get skill data
  skillData: any;

  // for to get no of code lines/ issues data
  codeLinesData = [];

  // codeline or issue count chart name
  chartTitle: string;

  isCodelineVisible = true;

  clientPermission: any; // permission holder for client

  constructor(
    public router: Router,
    private interCommunicationServiceService: InterCommunicationServiceService,
    private _httpService: ProfileUserServiceService,
    private responsiveService: ResponsiveService,
    private zone: NgZone
  ) {


    if (this.router.url.includes('_search')) {
      // this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION.OtherProfile;
      for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
        if (val.includes('Other')) {
          this.componentPermission.push(val.slice(5));
        }
      }
    } else {
        this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
    }

    // try {
    //   // tslint:disable-next-line:max-line-length
    //   for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
    //     if (val.includes('Other', 0)) {
    //       this.componentPermission =  val;
    //     }
    //   }
    //   this.clientPermission = this.componentPermission.subComponentPermissions.ProfileBody.subComponentPermissions.Overview.subComponentPermissions.OverviewClient.subComponentPermissions;
    // } catch (e) {
    //   console.log(e);
    // }

  }

  ngOnInit() {
    this.loadWWTData(this.defaultRange);
    this.loadOtherData();

    // this.dailDashboardChild.getAtttendanceValues(this.defaultRange);
  }

// get wwt related daa
  loadWWTData(range: string) {

    const payload = {
      'emp_no': this.employeeId,
      'range': range,
      // 'range': 'today',
      // 'selectedMonth': 0
    };

    this._httpService.getProfileWWTData(payload)
      .subscribe((data: any) => {
        console.log(data)
        try {
          this.wwtLevel = data[0]['level'];
          // to convert hrs
          this.wwtTotalTime = data[0]['totalWorkTime'] / 60;
        } catch (e) {
          console.log(e);
          this.wwtLevel = 0;
          this.wwtTotalTime = 0;
        }

        this.dailDashboardChild.setWWTData(this.wwtTotalTime, this.wwtLevel);
      });
  }

  initCharts() {

    this.skillChartChild.updateChart(this.skillData);

    this.codeChartChild.updateChart(this.codeLinesData, this.chartTitle);
  }

  loadOtherData() {

    try {
      // if (this.clientPermission.CodelineChartPermission.mainComponentPermission) {
      if (this.componentPermission.includes('CodelineChartPermission')) {
        this.isCodelineVisible = true;
      } else {
        this.isCodelineVisible = false;
      }
    } catch (e) {
      this.isCodelineVisible = false; // handle undefined case
    }

    this._httpService.getProfileOtherData(this.employeeId)
      // this._httpService.getProfileOtherData('E019')
      .subscribe((data: any) => {
        this.designation = data['designation'];

        // chk dev or qa or ...
        switch (this.designation) {

          case 'DEV':
            this.chartTitle = 'Codelines';
            try {
              this.codelines = data['totalCommits'];
              this.graphTitle = 'Total Codelines';
              this.graphYLabel = 'No Of Codelines';
            } catch (e) {
              console.log(e);
            }
            break;

          case 'QA':
            this.chartTitle = 'Issue Count';
            try {
              this.codelines = data['totalIssueCount'];
              this.graphTitle = 'Total Issues Count';
              this.graphYLabel = 'No Of Issues';
            } catch (e) {
              console.log(e);
            }
            break;

          //  case 'BA', ....:
          default:
            this.chartTitle = 'other';
            this.isCodelineVisible = false;
            break;
        }

        //  training data
        try {
          this.trainingHours = data['trainingHours'][0]['hrs'];
        } catch (e) {
          // console.log(e);
          this.trainingHours = 0;
        }

        // csr count
        try {
          this.csrCount = data['csrCount'];
        } catch (e) {
          console.log(e);
          this.csrCount = 0;
        }

        // acievement
        try {
          for (const d of data['archievement']) {
            this.achievements.push(d['achivementName']);
          }
        } catch (e) {
          console.log(e);
        }

        // extra
        try {
          for (const d of data['extra']) {
            this.extra.push(d['clubName']);
          }
        } catch (e) {
          console.log(e);
        }

        // project
        try {
          // tslint:disable-next-line:forin
          for (const d in data['project']) {
            this.projects.push([d.substring(0, 10), data['project'][d]]);
          }
        } catch (e) {
          console.log(e);
        }

        // skill
        try {
          this.skillData = data['skill'];
          // for (let d of data['skill']) {
          //
          //   this.skillLabels.push(d['skill']);
          //   this.skillValuesSupervisorRate.push(d['surpervisorRate']);
          //   this.skillValuesPersonalRate.push(d['personalRate']);
          //
          // }
        } catch (e) {
          console.log(e);
        }

        // generate labels
        for (let i = 0; i < this.codelines.length; i++) {
          // this.labels.push(this.codelines[i]['month'] + ' / ' + this.codelines[i]['week']);
          // this.data.push(this.codelines[i]['totalCount']);

          // change format which am chart require
          this.codeLinesData.push({
            // 'data': this.codelines[i]['year'] + '-' + this.codelines[i]['month'] + '-' + this.codelines[i]['week'],
            'data': this.codelines[i]['month'] + '/' + this.codelines[i]['week'],
            'value': this.codelines[i]['totalCount'],
          });
        }
        // this.labels.reverse();

        this.initCharts();

        // pass and update other dashboard values
        this.dailDashboardChild.setCsrAndTraingData({
          'csr': this.csrCount,
          'training': this.trainingHours
        });

        // add project details
        this.userProjectChild.projects = this.projects;

        // add achievement data
        this.achievementChild.achievements = this.achievements;

        // add extra data
        this.extraChild.extra = this.extra;

        // pass again data to specified child components after timeout
        setTimeout(() => {
          this.updateChildComponents();
        }, 1000);
      });

  }


  updateAttendanceRequest() {
    //  console.log(this.customDateRange.dateRangeFromDate);
  }


  updateDataWithTimeRange(value) {

    // pass data to get git jira
    this.gitJiraChild.updateGitJiraData({
      'emp_no': this.employeeId,
      'data': value
    });

    // pass data to get attendance
    this.dailDashboardChild.getAtttendanceValues(value);

    // update wwt value
    this.loadWWTData(value['range']);
  }

  /**
   * call profile body component method via emitter for
   * redirecting tab inside profile
   * @param event : json { 'tabName': name of the tab }
   */
  redirectFromChild(event: any) {
    this.profileBodyEventEmitter.emit(event);
  }

  /**
   * to pass again to child component
   * cuz component which added *nfIf didn't update
   * therefore have pass again after timeout
   */
  updateChildComponents() {
    // add project details
    this.userProjectChild.projects = this.projects;

    // add extra data
    this.extraChild.extra = this.extra;
  }
}


