import {Component, Input, OnInit} from '@angular/core';
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";
import {Project} from "../../../../../../../../_global/project";
import {AttendanceServiceService} from "../../../../../../../../service/attendance-service.service";

@Component({
  selector: 'app-project-gitlab-performance',
  templateUrl: './project-gitlab-performance.component.html',
  styleUrls: ['./project-gitlab-performance.component.css']
})
export class ProjectGitlabPerformanceComponent implements OnInit {

  selectedValue = 'month';
  Additions;
  Deletions;
  gitlabDataLoaded = false;

  loadedMonthFilters: string[] = [];
  selectedMonthFilter: string;
  overallPerformanceMonthFilter: string;
  isMonthFilter = false;

  constructor(private httpService: ProjectServiceService,
              private attendanceService: AttendanceServiceService) { }

  ngOnInit() {
    // this.getGitData();
  }

  getGitData(date) {
    this.gitlabDataLoaded = false;
      this.httpService.getGitlabAdditionsAndDeletionsOfProject(Project.PROJECT_CODE, date).subscribe( (response) => {
        this.getAdditionsAndDeletions(response);
      });
  }


  getAdditionsAndDeletions(data) {
    if (data != null) {
      if (data[0] != null && data[1] != null) {
        this.Additions = this.formatNumber(data [0]) ;
        this.Deletions = this.formatNumber(data [1]);
      } else {
        this.Additions = 'N/A';
        this.Deletions = 'N/A';
      }
    } else {
      this.Additions = 'N/A';
      this.Deletions = 'N/A';
    }
    this.gitlabDataLoaded = true;
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  loadAttendanceMonthFilter() {
    this.attendanceService.getMonthFilterAttendanceMainDashboard().subscribe((data: any) => {
      this.loadedMonthFilters = data;
      this.selectedMonthFilter = this.loadedMonthFilters[0];
      this.overallPerformanceMonthFilter = this.loadedMonthFilters[0];
      this.isMonthFilter = true;
    });
  }

  changeRecordCount() {
    const arr = this.selectedMonthFilter.split(' ');
    const monthFirstDate = '01-' + arr[2].substring(0, 3) + '-' + arr[0];
    this.getGitData(monthFirstDate);
  }

}
