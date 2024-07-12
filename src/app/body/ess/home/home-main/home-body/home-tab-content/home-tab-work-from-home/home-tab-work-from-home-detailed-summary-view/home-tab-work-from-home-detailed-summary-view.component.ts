import {Component, OnInit, Output} from '@angular/core';
import {WorkFromHomeService} from '../../../../../../../../service/work-from-home-services/work-from-home.service';
import {Profile} from '../../../../../../../../_global/profile';
import {Router} from '@angular/router';
import {GeneralOps} from '../../../../../../../../utility/GeneralOps';

@Component({
  selector: 'app-home-tab-work-from-home-detailed-summary-view',
  templateUrl: './home-tab-work-from-home-detailed-summary-view.component.html',
  styleUrls: ['./home-tab-work-from-home-detailed-summary-view.component.css']
})
export class HomeTabWorkFromHomeDetailedSummaryViewComponent implements OnInit {

  checkPermission = new GeneralOps();
  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  leaveDropDownIcon_down: boolean;
  employeeWiseWHA: boolean;
  employeeWiseWHAYesterday: boolean;
  employeeWiseWHAWeek: boolean;
  employeeWiseWHAMonth: boolean;

  attendanceOverviewClicked = false;
  workedHourAnalysisClicked = false;
  overallWorkedHoursClicked = false;
  projectWiseWorkedHourClicked = false;
  leaveAnalysisClicked = false;
  employeeWiseHoursClicked = false;
  taskTimeClicked = false;
  statisticAnalysisClicked = false;

  statistic = false;

  overviewTabClicked = false;
  summaryTabClicked = false;
  configTabClicked = false;
  detailedTabClicked = false;

  attendance_overview_class = 'c-page-nav__item';
  worked_analysis_class = 'c-page-nav__item';
  overall_hours_class = 'c-page-nav__item';
  project_wise_class = 'c-page-nav__item';
  leave_analysis_class = 'c-page-nav__item';
  employee_wise_class = 'c-page-nav__item';
  task_time_class = 'c-page-nav__item';
  statistic_analysis_class = 'c-page-nav__item';

  effort_overview_tab_class = 'c-page-nav__item';
  statistic_tab_class = 'c-page-nav__item';
  detailed_view_tab_class = 'c-page-nav__item';
  config_tab_class = 'c-page-nav__item';
  summary_view_tab_class = 'c-page-nav__item';

  mainTabSelection = 'Work Effort Overview';

  // @Output() attendanceOverviewDataSources= ['wwt', 'faceRec'];

  constructor(private workFromHomeService: WorkFromHomeService, public router: Router) {
  }

  ngOnInit() {
    this.overviewTabClicked = true;
    this.effort_overview_tab_class = 'c-page-nav__item is-selected';
    this.employeeWiseWHAYesterday = true;
    this.attendanceOverviewClicked = true;
    this.attendance_overview_class = 'page-nav__active';
    // this.overallWorkHourDistributionDateRangeChangeWWT('wwt-today');
    // this.overallWorkHourDistributionDateRangeChangeJira('jira-today');
    // this.overallWorkHourDistributionDateRangeChangeAttendanceSys('attd-today');
  }


  showWHAUsersProjectWise(id: any) {
    const users = document.getElementById(id).style.display = 'block';
    this.employeeWiseWHA = true;
  }

  hideWHAUsersProjectWise(id: any) {
    const users = document.getElementById(id).style.display = 'none';
    this.employeeWiseWHA = false;
  }

  // show hide time range divs
  showEmployeeWiseWHAWeek() {
    this.employeeWiseWHAYesterday = false;
    this.employeeWiseWHAMonth = false;
    this.employeeWiseWHAWeek = true;
  }

  showEmployeeWiseWHAYesterday() {
    this.employeeWiseWHAWeek = false;
    this.employeeWiseWHAMonth = false;
    this.employeeWiseWHAYesterday = true;
  }

  showEmployeeWiseWHAMonth() {
    this.employeeWiseWHAYesterday = false;
    this.employeeWiseWHAWeek = false;
    this.employeeWiseWHAMonth = true;
  }

  showHideColumn(classname, btnId) {
    $('.' + classname).each(function () {
      if ($(this).css('display') === 'none') {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  // extra methods
  overallWorkHourDistributionDateRangeChangeWWT(id: any) {
    document.getElementById(id).style.backgroundColor = '#9C8BD6';
    $('.overall-worked-hours-distribution-table-date-range-wwt').click(function () {
      $('.overall-worked-hours-distribution-table-date-range-wwt').css('backgroundColor', 'lightblue');
      $(this).css('backgroundColor', '#9C8BD6');
    });
  }

  overallWorkHourDistributionDateRangeChangeJira(id: any) {
    document.getElementById(id).style.backgroundColor = '#9C8BD6';
    $('.overall-worked-hours-distribution-table-date-range-jira').click(function () {
      $('.overall-worked-hours-distribution-table-date-range-jira').css('backgroundColor', 'lightblue');
      $(this).css('backgroundColor', '#9C8BD6');
    });
  }

  overallWorkHourDistributionDateRangeChangeAttendanceSys(id: any) {
    document.getElementById(id).style.backgroundColor = '#9C8BD6';
    $('.overall-worked-hours-distribution-table-date-range-attendance-sys').click(function () {
      $('.overall-worked-hours-distribution-table-date-range-attendance-sys').css('backgroundColor', 'lightblue');
      $(this).css('backgroundColor', '#9C8BD6');
    });
  }

  activeTabChange(activeTab) {
    if (activeTab === 'AttendanceOverview') {
      this.attendanceOverviewClicked = true;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = false;
      this.statistic = false;

      this.attendance_overview_class = 'page-nav__active';
      this.worked_analysis_class = 'c-page-nav__item';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'WorkedHourAnalysis') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = true;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = false;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'page-nav__active';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'OverallWorkedHour') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = true;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = false;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'c-page-nav__item';
      this.overall_hours_class = 'page-nav__active';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'ProjectWiseHours') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = true;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = false;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'c-page-nav__item';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'page-nav__active';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'LeaveAnalysis') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = true;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = false;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'c-page-nav__item';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'page-nav__active';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'EmployeeWiseHours') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = true;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = false;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'c-page-nav__item';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'page-nav__active';
      this.task_time_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'TaskTime') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = true;
      this.statisticAnalysisClicked = false;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'page-nav__active';
      this.statistic_analysis_class = 'c-page-nav__item';
    }
    if (activeTab === 'StatisticAnalysis') {
      this.attendanceOverviewClicked = false;
      this.workedHourAnalysisClicked = false;
      this.overallWorkedHoursClicked = false;
      this.projectWiseWorkedHourClicked = false;
      this.leaveAnalysisClicked = false;
      this.employeeWiseHoursClicked = false;
      this.taskTimeClicked = false;
      this.statisticAnalysisClicked = true;

      this.attendance_overview_class = 'c-page-nav__item';
      this.worked_analysis_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.overall_hours_class = 'c-page-nav__item';
      this.project_wise_class = 'c-page-nav__item';
      this.leave_analysis_class = 'c-page-nav__item';
      this.employee_wise_class = 'c-page-nav__item';
      this.task_time_class = 'page-nav__item';
      this.statistic_analysis_class = 'c-page-nav__active';
    }

  }

  changeMainActiveTab(option: string) {
    this.mainTabSelection = option;
    if (option === 'HomePage') {
      this.router.navigate(['./home/main']);
    }
    if (option === 'Work Effort Overview') {
      this.overviewTabClicked = true;
      this.detailedTabClicked = false;
      this.summaryTabClicked = false;
      this.configTabClicked = false;
      this.statistic = false;

      this.effort_overview_tab_class = 'c-page-nav__item is-selected';
      this.detailed_view_tab_class = 'c-page-nav__item';
      this.summary_view_tab_class = 'c-page-nav__item';
      this.config_tab_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
    }
    if (option === 'Detailed View') {
      this.overviewTabClicked = false;
      this.detailedTabClicked = true;
      this.summaryTabClicked = false;
      this.configTabClicked = false;

      this.effort_overview_tab_class = 'c-page-nav__item';
      this.detailed_view_tab_class = 'c-page-nav__item is-selected';
      this.summary_view_tab_class = 'c-page-nav__item';
      this.config_tab_class = 'c-page-nav__item';
    }
    if (option === 'Summary View') {
      this.overviewTabClicked = false;
      this.detailedTabClicked = false;
      this.summaryTabClicked = true;
      this.configTabClicked = false;

      this.effort_overview_tab_class = 'c-page-nav__item';
      this.detailed_view_tab_class = 'c-page-nav__item';
      this.summary_view_tab_class = 'c-page-nav__item is-selected';
      this.config_tab_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
    }
    if (option === 'Configuration') {
      this.overviewTabClicked = false;
      this.detailedTabClicked = false;
      this.summaryTabClicked = false;
      this.configTabClicked = true;

      this.effort_overview_tab_class = 'c-page-nav__item';
      this.detailed_view_tab_class = 'c-page-nav__item';
      this.summary_view_tab_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item';
      this.config_tab_class = 'c-page-nav__item is-selected';
    }
    if (option === 'statistic') {
      this.statistic = true;
      this.overviewTabClicked = false;
      this.detailedTabClicked = false;
      this.summaryTabClicked = false;
      this.configTabClicked = false;

      this.effort_overview_tab_class = 'c-page-nav__item';
      this.detailed_view_tab_class = 'c-page-nav__item';
      this.summary_view_tab_class = 'c-page-nav__item';
      this.config_tab_class = 'c-page-nav__item';
      this.statistic_tab_class = 'c-page-nav__item is-selected';
    }

  }
}
