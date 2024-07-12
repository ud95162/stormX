import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { Profile } from '../../../../../../../_global/profile';
import {ResponsiveService} from '../../../../../../../utility/responsive-service';
import {ProjectServiceService} from "../../../../../../../service/project-service.service";
import {Project} from "../../../../../../../_global/project";
import {DashboardHeaderComponent} from "../../home-graphs/project-dashboard/dashboard-header/dashboard-header.component";
import {ProjectGitlabPerformanceComponent} from "../../home-graphs/project-dashboard/project-gitlab-performance/project-gitlab-performance.component";
import {ProjectPerformanceTimelogComponent} from "../../home-graphs/project-dashboard/project-performance-timelog/project-performance-timelog.component";
import {ProjectPerformanceBacklogComponent} from "../../home-graphs/project-dashboard/project-performance-backlog/project-performance-backlog.component";
import {ProjectFinanceDataComponent} from "../../home-graphs/project-dashboard/project-finance-data/project-finance-data.component";
import {ProjectDesignationCategoryComponent} from "../../home-graphs/project-dashboard/project-designation-category/project-designation-category.component";
import {DesignationWiseMembersComponent} from "../../home-graphs/project-dashboard/designation-wise-members/designation-wise-members.component";
import {MembersDetailsComponent} from "../../home-graphs/project-dashboard/members-details/members-details.component";
import {AttendanceServiceService} from "../../../../../../../service/attendance-service.service";
import {GeneralOps} from "../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-tab-project',
  templateUrl: './home-tab-project.component.html',
  styleUrls: ['./home-tab-project.component.css']
})
export class HomeTabProjectComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  projectResponse;
  dataLoadingProj = false;

  loadedMonthFilters: string[] = [];
  selectedMonthFilter: string;
  overallPerformanceMonthFilter: string;
  isMonthFilter = false;

  changeText = false;
  projectFilter = '';
  filtered;


  @ViewChild(DashboardHeaderComponent, { static: false }) dashboardHeader!: DashboardHeaderComponent;
  @ViewChild(ProjectGitlabPerformanceComponent, { static: false }) gitlabPerformance!: ProjectGitlabPerformanceComponent;
  @ViewChild(ProjectPerformanceTimelogComponent, { static: false }) timeLogPerformance!: ProjectPerformanceTimelogComponent;
  @ViewChild(ProjectPerformanceBacklogComponent, { static: false }) backLogPerformance!: ProjectPerformanceBacklogComponent;
  @ViewChild(ProjectFinanceDataComponent, { static: false }) financeData!: ProjectFinanceDataComponent;
  @ViewChild(ProjectDesignationCategoryComponent, { static: false }) designationCategory!: ProjectDesignationCategoryComponent;
  @ViewChild(DesignationWiseMembersComponent, { static: false }) designationWiseCount!: DesignationWiseMembersComponent;
  @ViewChild(MembersDetailsComponent, { static: false }) membersDetails!: MembersDetailsComponent;


  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone,
              private httpServiceProjects: ProjectServiceService,
              private attendanceService: AttendanceServiceService) {
    // GET INITIAL VALUE BASED ON DEVICE WIDTHS AT TIME THE APP RENDERS
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    let that = this;

    /*---------------------------------------------------
     TAP INTO LISTENERS FOR WHEN DEVICE WIDTH CHANGES
     ---------------------------------------------------*/

    this.responsiveService.OnPhone(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnTablet(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveService.OnDesktop(
      function (mediaQueryList: MediaQueryList) {
        that.ShowDesktop();
      }
    );
  }

  ngOnInit() {
    this.loadAttendanceMonthFilter();
    this.loadProjResponse();
  }

  loadProjResponse() {
    this.httpServiceProjects.getProjectDetails()
      .subscribe(data => {
        // let response;
        // response = data;
        // const array = [];
        // for (let i = 0; i < response.length; i++) {
        //   let pmDetails = [];
        //   const vpDetails = [];
        //   if ( response[i].pmDetails != null) {
        //     for (let x = 0; x < response[i].pmDetails.length; x++) {
        //       pmDetails[x] = {
        //         pmName: response[i].pmDetails[x].pmName,
        //         pmImage: response[i].pmDetails[x].pmImage,
        //         pmId: response[i].pmDetails[x].pmId
        //
        //       };
        //     }
        //   } else {
        //     pmDetails = [{pmName: 'N/A', pmImage: 'N/A', pmId: 'N/A'}];
        //   }
        //   for ( let a = 0 ; a < response[i].vpDetails.length; a++) {
        //     let vpName;
        //     let vpId;
        //     let vpImage;
        //     if (response[i].vpDetails[a].vpName != null) {
        //       vpName = response[i].vpDetails[a].vpName;
        //     } else {
        //       vpName = 'N/A';
        //     }
        //     if (response[i].vpDetails[a].vpId != null) {
        //       vpId = response[i].vpDetails[a].vpId;
        //     } else {
        //       vpId = 'N/A';
        //     }
        //     if (response[i].vpDetails[a].vpImage != null) {
        //       vpImage = response[i].vpDetails[a].vpImage;
        //     } else {
        //       vpImage = 'N/A';
        //     }
        //     vpDetails[a] = {
        //       vpName: vpName,
        //       vpId: vpId,
        //       vpImage: vpImage
        //     };
        //   }
        //   array[i] = {
        //     projectName: response[i].projectName,
        //     projectCode: response[i].projectCode,
        //     projectCount: response[i].projectCount,
        //     projectImage: response[i].projectImage,
        //     projectType: response[i].projectType,
        //     projectManager: pmDetails,
        //     vp: vpDetails
        //   };
        // }
        // this.filterd = array;
        // this.projectResponse = array;
        this.filtered = data;
        this.projectResponse = data;
        this.dataLoadingProj = true;
        this.projectRedirect(this.projectResponse[0].code, this.projectResponse[0].name, this.projectResponse[0].members);
      });
  }

  projectRedirect(code, name, count) {
    const arr = this.selectedMonthFilter.split(' ');
    console.log('months for filters',this.selectedMonthFilter)
    console.log('months before substring',arr[2]);
    const monthFirstDate = '01-' + arr[2].substring(0, 3) + '-' + arr[0];
    console.log('this is project redirect',monthFirstDate)
    console.log(monthFirstDate)
    Project.PROJECT_CODE = code;
    Project.PROJECT_NAME = name;
    Project.PROJECT_COUNT = count;
    localStorage.setItem('projectCode', code);
    localStorage.setItem('projectName', name);
    localStorage.setItem('employeeCount' , count);
    this.dashboardHeader.getHeaderData();
    this.gitlabPerformance.loadAttendanceMonthFilter();
    this.timeLogPerformance.loadAttendanceMonthFilter();
    this.gitlabPerformance.getGitData(monthFirstDate);
    this.timeLogPerformance.getTimeLogData(monthFirstDate);
    this.financeData.loadProjectFinanceData();
    this.designationCategory.getHeadDesignationCount();
    this.designationWiseCount.loadDesignationInfo(monthFirstDate);
    this.membersDetails.getMembersDetails(monthFirstDate);
    this.backLogPerformance.getChartData();
  }

  loadAttendanceMonthFilter() {
    this.attendanceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
      this.loadedMonthFilters = data;
      this.selectedMonthFilter = this.loadedMonthFilters[0];
      this.overallPerformanceMonthFilter = this.loadedMonthFilters[0];
      this.isMonthFilter = true;
    });
  }

  ShowMobile() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = true;
      this.isTablet = false;
      this.isDesktop = false;
    });
  }

  ShowDesktop() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = false;
      this.isDesktop = true;
    });
  }

  ShowTablet() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.isMobile = false;
      this.isTablet = true;
      this.isDesktop = false;
    });
  }

  getMembersWithTime() {
    const arr = this.selectedMonthFilter.split(' ');
    const monthFirstDate = '01-' + arr[2].substring(0, 3) + '-' + arr[0];
    this.designationWiseCount.loadDesignationInfo(monthFirstDate);
    this.membersDetails.getMembersDetails(monthFirstDate);
  }

  applyFilter(event: Event) {
    this.dataLoadingProj = false;
    this.projectFilter = (event.target as HTMLInputElement).value;
    if (this.projectFilter != null) {
      let res = [];
      res = this.filtered.filter(it => new RegExp(this.projectFilter, 'i').test((it.name)));
      this.projectResponse = res;
      this.dataLoadingProj = true;
    }
  }
}
