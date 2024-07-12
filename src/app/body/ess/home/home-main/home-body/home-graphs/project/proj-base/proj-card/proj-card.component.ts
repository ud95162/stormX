import {Component, NgZone, OnInit} from '@angular/core';
import { DashboardOverallDataServiceService } from '../../../../../../../../../service/dashboard-overall-data-service.service';
import { Project } from '../../../../../../../../../_global/project';
import { Router } from '@angular/router';
import { Search } from '../../../../../../../../../_global/search';
import { InterCommunicationServiceService } from '../../../../../../../../../service/support-services/inter-communication-service.service';
import { ProjectServiceService} from '../../../../../../../../../service/project-service.service';
import {Profile} from '../../../../../../../../../_global/profile';
import {ResponsiveService} from '../../../../../../../../../utility/responsive-service';

@Component({
  selector: 'app-proj-card',
  templateUrl: './proj-card.component.html',
  styleUrls: ['./proj-card.component.css']
})
export class ProjCardComponent implements OnInit {
  projectResponse;
  filterd;
  dataLoadingProj = false;
  showLoading = true;
  showNoDataError = false;
  showprojectform = false;
  projectName;
  projectCode;
  employeeCount;
  projectImage;
  settings;
  pmList;
  ownerList;
  selectedFile;
  imgUrl: any;

  showImage = false;
  showImageUploader = true;
  selectedProjectImage = '';

  isMobile = false;
  isTablet = false;
  isDesktop = false;

  projectFilter = '';

  constructor(
    private httpservice: DashboardOverallDataServiceService, public router: Router,
    private httpservicecommunication: InterCommunicationServiceService,
    private httpServiceProjects: ProjectServiceService,
    private responsiveUI: ResponsiveService,
    private zone: NgZone
  ) {
    this.isMobile = this.responsiveUI.isPhone();
    this.isTablet = this.responsiveUI.isTablet();
    this.isDesktop = this.responsiveUI.isDesktop();

    const that = this;

    this.responsiveUI.OnPhone(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveUI.OnTablet(
      function (mediaQueryList: MediaQueryList) {
        that.ShowMobile();
      }
    );

    this.responsiveUI.OnDesktop(
      function (mediaQueryList: MediaQueryList) {
        that.ShowDesktop();
      }
    );
  }

  ngOnInit() {
    this.loadProjResponse();
    this.getProjectManagers();
    this.getProjectOwners();
  }

  loadProjResponse() {
    this.httpServiceProjects.getProjectDetails()
      .subscribe( (data) => {
        let response;
        response = data;
        const array = [];
        for (let i = 0; i < response.length; i++) {
          let pmDetails = [];
          const vpDetails = [];
          if ( response[i].pmDetails != null) {
            for (let x = 0; x < response[i].pmDetails.length; x++) {
              pmDetails[x] = {
                pmName: response[i].pmDetails[x].pmName,
                pmImage: response[i].pmDetails[x].pmImage,
                pmId: response[i].pmDetails[x].pmId

              };
            }
          } else {
            pmDetails = [{pmName: 'N/A', pmImage: 'N/A', pmId: 'N/A'}];
          }
          for ( let a = 0 ; a < response[i].vpDetails.length; a++) {
            let vpName;
            let vpId;
            let vpImage;
            if (response[i].vpDetails[a].vpName != null) {
              vpName = response[i].vpDetails[a].vpName;
            } else {
              vpName = 'N/A';
            }
            if (response[i].vpDetails[a].vpId != null) {
              vpId = response[i].vpDetails[a].vpId;
            } else {
              vpId = 'N/A';
            }
            if (response[i].vpDetails[a].vpImage != null) {
              vpImage = response[i].vpDetails[a].vpImage;
            } else {
              vpImage = 'N/A';
            }
            vpDetails[a] = {
              vpName: vpName,
              vpId: vpId,
              vpImage: vpImage
            };
          }
            array[i] = {
              projectName: response[i].projectName,
              projectCode: response[i].projectCode,
              projectCount: response[i].projectCount,
              projectImage: response[i].projectImage,
              projectType: response[i].projectType,
              projectManager: pmDetails,
              vp: vpDetails
            };
        }
        this.filterd = array;
        this.projectResponse = array;
        this.dataLoadingProj = true;
        this.showLoading = false;
      });
  }

  applyFilter(event: Event) {
    this.dataLoadingProj = false;
    this.showLoading = true;

    this.projectFilter = (event.target as HTMLInputElement).value;
    if (this.projectFilter != null) {
      const pmResponse = [];
      let res = [];
      res = this.filterd.filter(it => new RegExp(this.projectFilter, 'i').test((it.projectName)));
      for (let i = 0; i < this.filterd.length; i++) {
        if ((this.filterd[i].projectManager.filter(it => new RegExp(this.projectFilter, 'i').test(it.pmName))).length > 0) {
          if (res.length > 0) {
              if (res.some(x => x.projectName === this.filterd[i].projectName)) {
              } else {
                res.push(this.filterd[i]);
              }
          } else {
            res.push(this.filterd[i]);
          }
        }
      }
      for (let i = 0; i < this.filterd.length; i++) {
        if ((this.filterd[i].vp.filter(it => new RegExp(this.projectFilter, 'i').test(it.vpName))).length > 0) {
          if (res.length > 0) {
            if (res.some(x => x.projectName === this.filterd[i].projectName)) {
            } else {
              res.push(this.filterd[i]);
            }
          } else {
            res.push(this.filterd[i]);
          }
        }
      }
      this.projectResponse = res;
      this.dataLoadingProj = true;
      this.showLoading = false;
    }
  }
  highlight(data) {
  return data.replace(new RegExp(this.projectFilter, 'gi'), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }


  // events
  chartClicked(e) {
  }

  chartHovered(e) {
  }

  projectRedirect(code, name, count) {
    Project.PROJECT_CODE = code;
    Project.PROJECT_NAME = name;
    Project.PROJECT_COUNT = count;
    localStorage.setItem('projectCode', code);
    localStorage.setItem('projectName', name);
    localStorage.setItem('employeeCount' , count);
    this.router.navigate(['./project/main']);
    // this.projectName = Project.PROJECT_NAME;
  }
  projectEdit(code, name, count, image) {
    Project.PROJECT_CODE = code;
    Project.PROJECT_NAME = name;
    Project.PROJECT_COUNT = count;
    Project.PROJECT_IMAGE = image;
    localStorage.setItem('projectCode', code);
    localStorage.setItem('projectName', name);
    localStorage.setItem('employeeCount' , count);
    localStorage.setItem('projectImage' , image);
    this.projectName = Project.PROJECT_NAME;
    this.projectCode = Project.PROJECT_CODE;
    this.imgUrl = Project.PROJECT_IMAGE;
  }

  designationSearch(a, b) {
    Search.SEARCH_KEY = a + ',' + b;
    localStorage.setItem('lsk_', a + ',' + b);
    this.router.navigate(['./advance-search/main']);
  }
  employeeRedirect(id) {
    const employeeId = id;
    if (employeeId === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = employeeId;
      localStorage.setItem('lsei_', employeeId);
      this.router.navigate(['./profile/_search']);
    }
  }

  projectSettings() {
    Project.SETTINGS = 'project';
    localStorage.setItem('settings', 'project');
    this.router.navigate(['./settings/main']);
  }
  memberSearch(graphValue) {
    const searchObject = {
      'searchKey': graphValue,
      'searchOffset': 0,
      'searchFilter': 'All',
      'searchFilterValue': 'any'
    };

    this.httpservicecommunication.changeSearchKey(searchObject);
    Search.SEARCH_KEY = searchObject.searchKey;
    localStorage.setItem('lsk_', searchObject.searchKey);
    this.router.navigate(['./advance-search/main']);
  }

  getProjectManagers() {
    this.httpServiceProjects.getWholePMsOfCompany()
      .subscribe((data) => {
        this.pmList = data;
        if (this.pmList.length > 0) {
          this.showprojectform = true;
        } else {
          this.showprojectform = false;
        }
      });
  }
  getProjectOwners() {
    this.httpServiceProjects.getWholeProjectOwnersOfCompany()
      .subscribe((data) => {
        this.ownerList = data;
        if (this.ownerList.length > 0) {
          this.showprojectform = true;
        } else {
          this.showprojectform = false;
        }
      });
  }

  deleteImage() {
    this.imgUrl = '';
    this.showImage = false;
    this.showImageUploader = true;
    this.onFileChanged('');
    // $('#imageId').val('');
  }
  onFileChanged(event) {
    if (event !== '') {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.imgUrl = reader.result;
        this.selectedProjectImage = this.imgUrl;
      };
    } else {
      this.selectedFile = '';
    }

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
}


