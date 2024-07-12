import {Component, HostListener, Input, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationServiceService} from '../../../../../service/notification-service.service';
import {Profile} from '../../../../../_global/profile';
import {Feed} from '../../../../../_global/feed';
import {Search} from '../../../../../_global/search';
import {IssueLetterServiceService} from '../../../../../service/issue-letter-service.service';
import {
  InterCommunicationServiceService
} from '../../../../../service/support-services/inter-communication-service.service';
import {FacilityManagementServiceService} from '../../../../../service/facility-management-service.service';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {OpdManagementServiceService} from '../../../../../service/opd-management-service.service';
import {GeneralOps} from '../../../../../utility/GeneralOps';
import {catchError, switchMap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

@Component({
  selector: 'app-noti-list',
  templateUrl: './noti-list.component.html',
  styleUrls: ['./noti-list.component.css']
})
export class NotiListComponent implements OnInit {

  @Input() selectedTab: {search: any, section: any, year: any, filter: any};
  checkPermission = new GeneralOps();
  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  fullNotificationList = [];
  fullNotificationLoaded;

  fullRequestList = [];
  fullRequestLoaded;

  supervisorRating;

  viewRequestModalContent = false;
  notificationText;
  notificationId;
  notificationCreatorId;
  notificationCreatorImg;
  notificationRequestPostid;
  notificationLoading = true;

  loadMoreNotification = false;
  loadNotificationOffSet = 0;
  notificationMaxOffset;

  loadRequestOffSet = 0;
  loadMoreRequests = false;

  fullLetterRequest = [];
  letterRequestData = [];
  fullFacilityRequest = [];
  fullOpdRequest = [];
  opdRequestData = [];
  modalFacilityId;
  deleteLetterId;
  errorCode;
  errorType;
  errorMessage;
  newCount = 0;
  processingCount = 0;
  printedCount = 0;
  readyCount = 0;
  completedCount = 0;

  newColor = '#00bfff';
  processingColor = '#FF8503';
  printedColor = '#05AC72';
  readyColor = '#1D800E';
  completedColor = '#00563F';
  declinedColor = '#b3b3cc';
  facilityRequest: any = [];
  opdRequest: any = [];
  feedback;
  authorizationOPDnotification = 'RequestNotificationsTab';
  opdRequestFilterType = 'All';
  facilityRequestFilterType = 'All';
  letterRequestFilterType = 'All';
  selectedTabSectionLoaded = true;
  empSelectedTab = 'notifications';
  selectedEmpID;
  yearList = [];
  selectedYear = new Date().getFullYear();
  selectedYearForFacilityRequest = new Date().getFullYear();
  selectedYearForLetterRequest = new Date().getFullYear();
  facilityRequestDataLoaded = false;
  issueLetterDataLoaded = false;

  constructor(public router: Router, private httpservice: NotificationServiceService, private issueLetterService: IssueLetterServiceService, private interCommunicationServiceService: InterCommunicationServiceService, private facilityManagementService : FacilityManagementServiceService, private responsiveService: ResponsiveService, private zone: NgZone, private OpdManagementService: OpdManagementServiceService) {

    // GET INITIAL VALUE BASED ON DEVICE WIDTHS AT TIME THE APP RENDERS
    this.isMobile = this.responsiveService.isPhone();
    this.isTablet = this.responsiveService.isTablet();
    this.isDesktop = this.responsiveService.isDesktop();

    const that = this;
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

  ngOnInit() {
    if (this.selectedTab.search === 'personal') {
      this.authorizationOPDnotification = 'OPDSummary';
      this.selectedEmpID = localStorage.getItem('leid_');
    } else {
      this.authorizationOPDnotification = 'OtherOPDSummary';
      this.selectedEmpID = localStorage.getItem('lsei_');
    }
    this.selectedYear = this.selectedTab.year;
    this.yearList = this.checkPermission.getYearList(new Date().getFullYear(), 2);
    this.empSelectedTab = this.selectedTab.section;
    this.opdRequestFilterType = this.selectedTab.filter;
    this.loadFullNotificationList(this.loadNotificationOffSet);
    this.loadFullRequestList(0);
    this.loadMaxOffset();
    this.supervisorRating = 5;
    this.loadLetterRequest();
    this.loadFacilityRequest();
    this.loadOpdRequest();
    this.interCommunicationServiceService.onConfirmationWizard.subscribe(confirmedValue => {
      (<HTMLInputElement>document.getElementById('closeConfirmationPopupWizard')).click();
      if (confirmedValue !== 'default') {
        if (confirmedValue == 'confirmed') {
          this.interCommunicationServiceService.confirmationOnWizard('default');
          this.confirmDelete();
        }
      }
      return 0;
    });

  }

  changeTab(tabName) {
      this.empSelectedTab = tabName;
  }

  openConfirmationModal() {
    this.interCommunicationServiceService.openConfirmationAlertWizard('confirmed');
    (<HTMLInputElement>document.getElementById('openConfirmationPopupWizard')).click();
  }
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  editRequest(letterId) {

  }

  deleteRequest(letterId) {
    this.deleteLetterId = letterId;
    this.openConfirmationModal();
  }

  confirmDelete() {
    this.issueLetterService.deleteRequestByLetterId(this.deleteLetterId).subscribe((data: any) => {
      if (data) {
        this.openErrorModal (1010, 'SUCCESS', `Successfully deleted the request`);
        this.loadLetterRequest();
      }else {
        this.openErrorModal (1011, 'ERROR', 'Error while deleting the request');
      }
    });
  }

  loadFullNotificationList(offset) {
    this.httpservice.getNotifications(Profile.EMPLOYEE_ID, offset)
      .pipe(
        switchMap((data: any) => {
          this.setFilteredNotificationsList(data);
          this.notificationLoading = false;
          return of(data);
        }),
        catchError(error => {
          // Handle errors here
          console.error('An error occurred:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  /**
   * This function sets a filtered list of notifications by removing any notifications with notification types 15, 16, or 17.
   * It first maps through the given data and
   * creates a new array of notifications with the filtered notificationResponsesForDate.
   * If the notificationResponsesForDate is null, it will set it to null in the new array as well.
   * Then, it concatenates the new array with the existing fullNotificationList
   * and sets the fullNotificationLoaded flag to true if the list is not empty.
   * @param data
   */
  setFilteredNotificationsList(data) {
    console.log(data)
    const notifications = data.map(res => ({
      ...res,
      notificationResponsesForDate: res.notificationResponsesForDate
        ? res.notificationResponsesForDate.filter(noti => ![15, 16, 17].includes(noti.notificationType))
        : null
    }));
    this.fullNotificationList = this.fullNotificationList.concat(notifications);
    console.log(this.fullNotificationList)
    this.fullNotificationLoaded = this.fullNotificationList.length > 0;
  }


  loadFullRequestList(offset) {
    this.httpservice.getRequests(Profile.EMPLOYEE_ID, offset)
      .pipe(
        switchMap((data: any) => {
          this.fullRequestList = this.fullRequestList.concat(data);
          this.fullRequestLoaded = this.fullRequestList.length > 0;
          return of(this.fullRequestList);
        }),
        catchError(error => {
          // Handle errors here
          console.error('An error occurred:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  loadLetterRequest() {
    // this.issueLetterService.fetchSpecificEmployeesLetterRequests(Profile.EMPLOYEE_ID)
    //   .subscribe((data: any) => {
    //     this.letterRequestData = data;
    //     this.fullLetterRequest = data;
    //     this.displayDataWithLetterRequestFilter();
    //     this.fullLetterRequest.map((request) => {
    //     this.countLetterRequests(request.letterStatus);
    //   });
    // });

    this.issueLetterDataLoaded = false;
    this.issueLetterService.fetchEmployeeLetterRequests(
      this.checkPermission.getFirstDateOfYear(this.selectedYearForLetterRequest),
      this.checkPermission.getLastDateOfYear(this.selectedYearForLetterRequest), this.letterRequestFilterType,
      this.selectedEmpID, localStorage.getItem('leid_'), 'profile'
    ).subscribe((data: any) => {
      this.fullLetterRequest = data;
      this.issueLetterDataLoaded = true;
    });
  }
  loadFacilityRequest() {
    this.facilityRequestDataLoaded = false;
    this.facilityManagementService.fetchEmployeeFacilityRequests(
      this.facilityRequestFilterType, this.checkPermission.getFirstDateOfYear(this.selectedYearForFacilityRequest),
      this.checkPermission.getLastDateOfYear(this.selectedYearForFacilityRequest),
      this.selectedEmpID, localStorage.getItem('leid_'), 'profile'
    ).subscribe((data: any) => {
      this.fullFacilityRequest = data;
      this.facilityRequestDataLoaded = true;
    });
  }

  loadOpdRequest() {
    this.OpdManagementService.fetchFilteredOpdRequests(this.selectedEmpID,
      this.checkPermission.getFirstDateOfYear(this.selectedYear), this.checkPermission.getLastDateOfYear(this.selectedYear),
      this.opdRequestFilterType, this.authorizationOPDnotification, this.selectedYear)
      .subscribe((data: any) => {
        this.opdRequestData = data;
        this.fullOpdRequest = data;
      });
  }

  countLetterRequests(status){
    switch (status){
      case 'New': this.newCount++;
        break;
      case 'Processing': this.processingCount++;
        break;
      case 'Printed': this.printedCount++;
        break;
      case 'Ready': this.readyCount++;
        break;
      case 'Completed': this.completedCount++;
        break;
    }
  }

  loadMaxOffset() {
    this.httpservice.getNotificationMaxOffset(Profile.EMPLOYEE_ID, 'normal')
      .subscribe(
        (data: any) => {
          this.notificationMaxOffset = data.offsetCount;
        }
      );
  }

  /**
   * This code snippet is a listener function that is triggered when the user scrolls the window.
   * It checks the value of the  `empSelectedTab`
   * variable to determine which tab is currently selected (either "notifications" or "requests").
   *
   * If the selected tab is "notifications",
   * it checks if the user has scrolled to the bottom of the page
   * ( `$(window).scrollTop() + window.innerHeight >= $(document).height()` ).
   * If so, it checks if the  `loadNotificationOffSet`  variable is less than  `notificationMaxOffset` .
   * If it is, it increments  `loadNotificationOffSet`  by 1 and calls
   * the  `loadFullNotificationList`  function with the updated offset value.
   *
   * If the selected tab is "requests",
   * it follows a similar logic but instead increments and checks
   * the  `loadRequestOffSet`  variable and calls the  `loadFullRequestList`  function.
   *
   * In summary,
   * this code handles the scroll logic for loading more notifications or
   * requests when the user reaches the bottom of the page.
   * The offset values are used to determine which set of notifications or requests to load.
   */
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.empSelectedTab === 'notifications') {
      if ($(window).scrollTop() + window.innerHeight >= $(document).height()) {
        // this.loadMoreNotification = true;
        // Handle scroll logic for notifications
        if (this.loadNotificationOffSet < this.notificationMaxOffset) {
          this.loadNotificationOffSet = this.loadNotificationOffSet + 1;
          this.loadFullNotificationList(this.loadNotificationOffSet);
          // this.loadMoreNotification = false;
        }
      }
    } else if (this.empSelectedTab === 'requests') {
      if ($(window).scrollTop() + window.innerHeight >= $(document).height()) {
        // this.loadMoreRequests = true;
        // Handle scroll logic for requests
        if (this.loadRequestOffSet < this.notificationMaxOffset) {
          this.loadRequestOffSet = this.loadRequestOffSet + 1;
          this.loadFullRequestList(this.loadRequestOffSet);
          // this.loadMoreRequests = false;
        }
      }
    }
  }


  fullNotificationRedirect(postId, notificationId, notificationType) {
    if (notificationType === 'BIRTHDAY' || notificationType === 'SKILL_REQ' || notificationType === 'SKILL_ACK' || notificationType === 'SKILL_REQ_RESP') {
      this.router.navigate(['./notification/main']);
    } else if (notificationType === 'TIME_LINE_LIKE') {
      this.router.navigate(['./profile/main']);
    } else if (notificationType === 'LETTER_REQUEST'){

      document.getElementById('letterRequestNotification').getElementsByTagName('a')[0].click();
    }else if (notificationType === 'FACILITY_REQUEST'){

      document.getElementById('facilityRequestNotification').getElementsByTagName('a')[0].click();
    }else if (notificationType === 'OPD_REQUEST'){

      document.getElementById('opdRequestNotification').getElementsByTagName('a')[0].click();
    }else{
      this.loadFullNotificationList(this.loadNotificationOffSet);
      Feed.FEED_POST_ID = postId;
      Feed.NOTIFICATION_ID = notificationId;
      localStorage.setItem('FEED_POST_ID', postId);
      localStorage.setItem('NOTIFICATION_ID', notificationId);
      this.fullReadNotification(notificationId);
      this.router.navigate(['./feed/post', postId]);
    }
  }

  fullNotificationImgRedirect(e) {
    if (e === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = e;
      localStorage.setItem('lsei_', e);
      this.router.navigate(['./profile/_search']);
    }
  }

  fullReadNotification(e) {
    const json = {
      'audienceId': e
    };

    this.httpservice.readNotification(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadFullNotificationList(this.loadNotificationOffSet);
          } else if (data.httpStatusCode === 500) {
            this.loadFullNotificationList(this.loadNotificationOffSet);
          }
        }
      );
  }

  readFullAllNotification() {
    const json = {
      'empNo': Profile.EMPLOYEE_ID,
      'notificationType': 'NORMAL'
    };

    this.httpservice.readAllNotifications(json);
  }

  changeSupervisorRating() {
    this.supervisorRating = (<HTMLInputElement>document.getElementById('skillsSupervisorRating')).value;
  }

  skillRequestPopup(text, id, empNo, img, postId) {
    this.notificationText = text;
    this.notificationId = id;
    this.notificationCreatorId = empNo;
    this.notificationCreatorImg = img;
    this.notificationRequestPostid = postId;
    this.viewRequestModalContent = true;
  }

  acceptSkillRequest(acceptType) {
    const acceptJson = {
      'id': this.notificationRequestPostid,
      'supervisor_rate': this.supervisorRating,
      'response': acceptType
    };

    this.httpservice.notificationRequestAccept(acceptJson)
      .subscribe(
        (data: any) => {
          this.fullRequestList = [];
          if (data.httpStatusCode === 200) {
            this.loadFullRequestList(this.loadRequestOffSet);
            this.supervisorRating = 5;
          } else if (data.httpStatusCode === 500) {
            this.loadFullRequestList(this.loadRequestOffSet);
          }
        }
      );
    this.viewRequestModalContent = false;
  }
  deleteFacilityRequest(facilityId){
    this.facilityManagementService.deleteUserFacilityRequests(facilityId).subscribe( () => {
      this.openErrorModal (1010, 'SUCCESS', `Successfully deleted the request`);
      this.loadFacilityRequest();
    });
  }

  setFacilityId(facilityId){
    this.modalFacilityId = facilityId;
  }

  saveFeedback(){
    const json = {
      'facilityId' : this.modalFacilityId,
      'feedback' : this.feedback
    };
    this.facilityManagementService.saveFeedback(json).subscribe((data: any) => {
      if (data){
        this.openErrorModal('1010', 'SUCCESS', 'Successfully saved the feedback');
        document.getElementById('closeModal').click();
        this.loadFacilityRequest();
      }else{
        this.openErrorModal('1010', 'ERROR', 'Could not save the feedback');
      }
    });
  }

  loadIndividualRequest(facilityId){
    this.facilityManagementService.fetchSpecificFacilityRequests(Profile.EMPLOYEE_ID, facilityId).subscribe( (data: any) => {
      this.facilityRequest = data;
    });
  }
  loadIndividualOpdRequest(opdId){
    this.OpdManagementService.fetchSpecificOPDRequest(opdId , this.authorizationOPDnotification).subscribe((data: any) => {
      this.opdRequest = data;
    });
  }
  openFile(url) {
    window.open(url);
  }
}
