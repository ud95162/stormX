import {Component, Input, NgZone, OnInit, AfterViewInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {ResponsiveService} from '../../../utility/responsive-service';
import {Profile} from '../../../_global/profile';
import {ProfileUserServiceService} from '../../../service/profile-user-service.service';
import {Search} from '../../../_global/search';
import {Router} from '@angular/router';
import {InterCommunicationServiceService} from '../../../service/support-services/inter-communication-service.service';
import {AddPreviousWorkDetailPreloadData} from './profile-resume-add-section/model/add-previous-work-detail-preload-data.model';
import {ModalUiServiceService} from '../../../service/ui-services/modal-ui-service.service';
import {QualificationsModalComponent} from './profile-resume-modals/qualifications-modal/qualifications-modal.component';
import {SkillsModalComponent} from './profile-resume-modals/skills-modal/skills-modal.component';
import {SkillsNewComponent} from './profile-resume-modals/skills-modal/skills-new/skills-new.component';
import {SkillsEditComponent} from './profile-resume-modals/skills-modal/skills-edit/skills-edit.component';
import {Observable, of} from 'rxjs';
import {AttendanceServiceService} from '../../../service/attendance-service.service';
import {System} from '../../../_global/system';

@Component({
  selector: 'app-profile-resume',
  templateUrl: './profile-resume.component.html',
  styleUrls: ['./profile-resume.component.css']
})
export class ProfileResumeComponent implements OnInit, AfterViewInit {

  clientPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION; // to handle rnj client permission

  @Input() employeeId: any;
  @Input() employeeFirstName;
  @Input() attendanceData: any;

  @ViewChild(QualificationsModalComponent, {static: false}) qualificationsModal: QualificationsModalComponent;
  // @ViewChild(SkillsNewComponent) skillsNewModal: SkillsNewComponent;
  // @ViewChild(SkillsEditComponent) skillsEditModal: SkillsEditComponent;
  @ViewChild(SkillsModalComponent, {static: false}) skillsModal: SkillsModalComponent;
  // @Output() modalType = new EventEmitter<string>();

  componentPermission = [];

  showLoadingSpinner = true;
  showEmployeeRecords = false;
  isProjectsLoading = false;

  personalInformation: any;
  qualificationInformation: any;
  skillInformation: any;
  previousWorkInformation: any;
  workInformation: any;
  educationDetailsToEditComponent: any;
  accomplishmentSplitList = [];
  familyDetailsSplitList = [];

  familyDetail: any;

  skillAccomplishmentInformationDataObject: any;
  showSkillAccomplishmentInformationDataObject = false;

  qualificationModalType: any;

  employeeCurrentProject;
  employeeContributedProjects = [];


  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  showAddRecords: any;
  showEdit = false;

  addPreviousWorkDetailPreloadData: AddPreviousWorkDetailPreloadData;
  private qualificationDetailsToEditComponent: any;
  private viewMorePersonal = false;
  private viewLessPersonal = true;
  private viewMoreContact = false;
  private viewLessContact = true;
  private viewMoreFamily = false;
  private viewLessFamily = true;
  modalType: string;

  techSkillDetailsToEditComponent: any;
  softSkillDetailsToEditComponent: any;
  private prevWorkIndex = 0;
  private accomplishmentIndex = 0;
  accomplishmentDetailsToEditComponent: any;
  prevWorkSplitList = [];
  prevWorkDetailsToEditComponent: any;
  modalId: string;
  private familyIndex = 0;


  wwtLevel = 0;
  wwtTotalTime = 0;
  csrCount = 0;
  trainingHours = 0;
  avgInTime = 0;
  avgOutTime = 0;
  avgWorkHrs = 0;
  avgOfficeHrs = 0;

  empSelectedSkillId = 0;
  empSelectedSkillHistoryModalDisplay: boolean = false;


  constructor(private responsiveService: ResponsiveService, private zone: NgZone,
              private profileUserServiceService: ProfileUserServiceService,
              public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private modalUiService: ModalUiServiceService,
              private attendanceService: AttendanceServiceService) {
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
    this.loadEmployeeDataOnload();
    // this.loadEmployeeSkillDataOnload();
    this.loadEmployeeProjects();

    this.interCommunicationServiceService.loadProfile.subscribe(loadProfile => {
      if (loadProfile) {
        this.loadEmployeeDataOnload();
        // this.loadEmployeeSkillDataOnload();
      }
    });

    if (this.employeeId === Profile.EMPLOYEE_ID) {
      this.showAddRecords = true;
      this.showEdit = true;
    } else {
      this.showAddRecords = false;
      this.showEdit = false;
    }

    this.getAtttendanceValues('lastyear');
    this.getMatricDataFromApi();

  }

  ngAfterViewInit() {
  }


  loadEmployeeDataOnload() {
    this.showEmployeeRecords = false;
    this.accomplishmentSplitList = [];
    this.profileUserServiceService.loadEmpData(this.employeeId)
      .subscribe(
        (data: any) => {

          if (data.length > 0) {
            this.showLoadingSpinner = false;
            this.prevWorkIndex = 0;
            this.accomplishmentIndex = 0;
            this.familyIndex = 0;
            this.prevWorkSplitList = [];
            this.accomplishmentSplitList = [];
            this.familyDetailsSplitList = [];
            this.personalInformation = data[0].personalInformation;
            while (this.familyIndex < this.personalInformation.family_details.length) {
              this.familyDetailsSplitList.push(this.personalInformation.family_details.slice(
                this.familyIndex, this.familyIndex = this.familyIndex + 2));
            }
            // console.log('personldata: ', this.personalInformation)
            this.qualificationInformation = data[0].educationInformation;
            // console.log('qualification data: ', this.qualificationInformation)
            this.skillInformation = data[0].skillInformation;
            // console.log('skills data: ', this.skillInformation)
            this.previousWorkInformation = data[0].workExperienceInformation;
            // console.log('previous Work data: ', this.previousWorkInformation)
            this.workInformation = data[0].workInformation;
            // console.log('wokh DATA', this.workInformation)
            while (this.prevWorkIndex < this.previousWorkInformation.workExperiences.length) {
              this.prevWorkSplitList.push(this.previousWorkInformation.workExperiences.slice(
                this.prevWorkIndex, this.prevWorkIndex = this.prevWorkIndex + 2));
            }
            if (this.skillInformation && this.skillInformation.accomplishmentList) {
              while (this.accomplishmentIndex < this.skillInformation.accomplishmentList.length) {
                this.accomplishmentSplitList.push(this.skillInformation.accomplishmentList.slice(
                  this.accomplishmentIndex, this.accomplishmentIndex = this.accomplishmentIndex + 2));
              }
            }


            if (this.employeeId === Profile.EMPLOYEE_ID) {
              Profile.EMPLOYEE_DATA_SET = data;
            } else {
              Search.SEARCH_RESULT_SET = data;
            }

            this.showEmployeeRecords = true;
          } else {
            this.showLoadingSpinner = true;
            this.showEmployeeRecords = false;
          }
        }
      );
  }

  // not using
  loadEmployeeSkillDataOnload() {
    this.showSkillAccomplishmentInformationDataObject = false;
    this.profileUserServiceService.getEmployeeSkillAccomplishmentData(this.employeeId)
      .subscribe(
        (data: any) => {
          this.skillAccomplishmentInformationDataObject = data;
          if (data !== null) {
            this.showSkillAccomplishmentInformationDataObject = true;
          }
        }, error => {
          this.showSkillAccomplishmentInformationDataObject = false;
        }
      );
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
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

  loadEmpData($event) {
    this.interCommunicationServiceService.loadProfile.subscribe(loadProfile => {
      if (loadProfile) {
        this.loadEmployeeDataOnload();
      }
    });
  }

  changeModalType(type: string, modalId: string) {
    this.modalType = type;
    this.modalId = modalId;
  }

  setDetailsToEdit(i: number, tab: string) {
    switch (tab) {
      case 'Education':
        this.educationDetailsToEditComponent = this.qualificationInformation.employeeEducations[i];
        break;
      case 'Other':
        this.qualificationDetailsToEditComponent = this.qualificationInformation.employeeQualifications[i];
        break;
      case 'Technical Skills':
        this.techSkillDetailsToEditComponent = this.skillInformation.skillLists[1].skills[i];
        break;
      case 'Soft Skills':
        this.softSkillDetailsToEditComponent = this.skillInformation.skillLists[0].skills[i];
        break;
    }
  }

  setAccomplishmentDetailsToEdit(index: number, position: number) {
    this.accomplishmentDetailsToEditComponent = this.accomplishmentSplitList[index][position];
  }

  setPrevWorkDetailsToEdit(i: number, position: number) {
    this.prevWorkDetailsToEditComponent = this.prevWorkSplitList[i][position];
  }

  changeActiveTab(tab: string, modal: string) {
    switch (modal) {
      case 'editQualifications':
        this.qualificationsModal.onChangeTab(tab);
        break;
      case 'editSkills':
        break;
    }
  }

  // setQualificationDetailsToEdit(i: number) {
  //   this.qualificationDetailsToEditComponent = this.qualificationInformation.employeeQualifications[i];
  //   console.log('qual index', this.qualificationDetailsToEditComponent)
  // }

  onClickViewMore(id: string) {
    switch (id) {
      case 'personal':
        this.viewMorePersonal = true;
        this.viewLessPersonal = false;
        break;
      case 'contact':
        this.viewMoreContact = true;
        this.viewLessContact = false;
        break;
      case 'family':
        this.viewMoreFamily = true;
        this.viewLessFamily = false;
        break;
    }
  }

  onClickViewLess(id: string) {
    switch (id) {
      case 'personal':
        this.viewMorePersonal = false;
        this.viewLessPersonal = true;
        break;
      case 'contact':
        this.viewMoreContact = false;
        this.viewLessContact = true;
        break;
      case 'family':
        this.viewMoreFamily = false;
        this.viewLessFamily = true;
        break;
    }
  }

  loadEmployeeProjects() {
    this.isProjectsLoading = false;
    this.employeeContributedProjects = [];
    this.profileUserServiceService.getEmployeeWorkingProject(this.employeeId)
      // this.profileUserServiceService.getEmployeeWorkingProject('E1167')
      .subscribe(data => {
        let projectData;
        projectData = data;
        this.employeeCurrentProject = projectData.currentProject;
        this.employeeContributedProjects = projectData.contributeProjects;
        this.isProjectsLoading = true;
      });
  }

  changeSkillType(type: string) {
    this.skillsModal.changeSkillType(type);
  }

  /**
   *
   */
  getMatricDataFromApi() {

    const payload = {
      'emp_no': this.employeeId,
      'range': 'thismonth'
    };

    // get wwt related data
    this.profileUserServiceService.getProfileWWTData(payload).subscribe((data: any) => {

      try {
        this.wwtLevel = data[0]['level'];
        // to convert hrs
        this.wwtTotalTime = data[0]['totalWorkTime'] / 60;
      } catch (e) {
        console.log(e);
        this.wwtLevel = 0;
        this.wwtTotalTime = 0;
      }
    });

    this.profileUserServiceService.getProfileOtherData(this.employeeId).subscribe((data: any) => {
      //  training data
      try {
        if (data['trainingHours'].length > 0) {
          this.trainingHours = data['trainingHours'][0]['hrs'];
        }
      } catch (e) {
        console.log(e);
        this.trainingHours = 0;
      }

      // csr count
      try {
        this.csrCount = data['csrCount'];
      } catch (e) {
        console.log(e);
        this.csrCount = 0;
      }
    });

  }


  // get attendace details
  getAttendacedataFromApi(payload) {
    this.attendanceService.postToLoadOfficeActualHourStatsData(payload)
      .subscribe((data: any) => {
        this.avgInTime = data['summaryHeadData'][0]['value'];
        this.avgOutTime = data['summaryHeadData'][1]['value'];
        this.avgWorkHrs = data['summaryHeadData'][2]['value'];
        this.avgOfficeHrs = data['summaryHeadData'][3]['value'];
      });
  }

  // for getting attendance values
  project: any;
  getAtttendanceValues(range: String) {
    const d = new Date();

    let start = '';
    let end = '';
    switch (range) {
      case 'lastweek':
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 7);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;

      case 'lastmonth':
        d.setDate(d.getDate() - 30);
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 30);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;

      case 'lastquarter':
        d.setDate(d.getDate() - 30);
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 90);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;

      case 'lastyear':
        end = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        d.setDate(d.getDate() - 365);
        start = d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        break;
    }
    const selectionObj = {
      'orderBy': '',
      'empNoList': [localStorage.getItem('lsei_')],
      'selectedProject': 'Personal',
      'rangeType': 'Custom',
      'fromDate': start,
      'toDate': end,
      'key': System.generateRandomKey(32),
      'sortingObj': {
        'sortBy': 'outTime',
        'reversed': 'false'
      }
    };

    this.getAttendacedataFromApi(selectionObj);
  }

  viewSelectedSkillHistory(techSkill: any) {
    this.empSelectedSkillId = techSkill.id;
    this.empSelectedSkillHistoryModalDisplay = true;
  }

  changeStatusOfHistoryModal() {
    this.empSelectedSkillHistoryModalDisplay = false;
  }
}
