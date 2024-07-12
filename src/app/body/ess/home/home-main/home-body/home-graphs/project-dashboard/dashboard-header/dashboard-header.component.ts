import {Component, OnChanges, OnInit} from '@angular/core';
import {Project} from "../../../../../../../../_global/project";
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {


  projectDto;
  projectManager;
  projectOwner;
  projectName;
  projectImage;
  projectCount;
  headerDataLoaded = true;

  constructor(private httpService: ProjectServiceService) { }

  ngOnInit() {
    // this.getHeaderData();
  }

  getHeaderData() {
    console.log("getting heder data")
    this.headerDataLoaded = false;
    this.httpService.getProjectHeadDetail(Project.PROJECT_CODE).subscribe((response) => {
      this.getProjectCount(response);
    });
    this.httpService.getProjectManagerDetail(Project.PROJECT_CODE).subscribe((response) => {
      this.getProjectManager(response);
    });
    this.httpService.getProjectOwner(Project.PROJECT_CODE).subscribe((response) => {
      this.getProjectOwner(response);
    });
    this.headerDataLoaded = true;
  }


  getProjectManager(data) {
    this.projectManager = data;
  }

  getProjectOwner(data) {
    // for (let i = 0; i < data.length; i++) {
    //   this.projectOwner = data[i][0];
    // }
    if ( data != null) {
      this.projectOwner = data;
    } else {
      this.projectOwner = 'N/A';
    }
  }
  getProjectCount(data) {

    // for (let i = 0 ;  i < data.length ; i++) {
    this.projectName = data[0];
    this.projectCount = data[1];
    this.projectImage = data[2];
    // console.log((array));
    // }
    // this.projectDto = array;

  }

}
