import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Search} from '../../_global/search';
import {Event} from '../../_global/event';
import {Admindashboard} from '../../_global/admindashboard';
import {LeaveDetail} from '../../classes/leave/employee-leave-d-a-o';
import {LeaveOnLeave} from '../../classes/leave/leave-summary';
import {Subject} from 'rxjs';
import {GeneralOps} from '../../utility/GeneralOps';
import {any} from 'codelyzer/util/function';
import {ProjectEntity} from "../../components/settings-components/admin-settings-components/models/ProjectSettings";

@Injectable()
export class InterCommunicationServiceService {

  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  private searchObject = new BehaviorSubject<any>(Search.SEARCH_OBJECT);
  currentSearchObject = this.searchObject.asObservable();

  private errorCode = new BehaviorSubject<number>(0);
  currentErrorCode = this.errorCode.asObservable();

  private errorType = new BehaviorSubject<string>('error');
  currentErrorType = this.errorType.asObservable();

  private errorMessage = new BehaviorSubject<string>('');
  currentErrorMessage = this.errorMessage.asObservable();

  private alertDisplayStatus = new BehaviorSubject<boolean>(false);
  currentAlertDisplayStatus = this.alertDisplayStatus.asObservable();

  private alertType = new BehaviorSubject<string>('');
  currentAlertType = this.alertType.asObservable();

  private alertMessage = new BehaviorSubject<any>('');
  currentAlertMessage = this.alertMessage.asObservable();

  private imageArray = new BehaviorSubject<any>([]);
  currentImageArray = this.imageArray.asObservable();

  private modalImage = new BehaviorSubject<string>('assets/image/gallery-not-found.png');
  currentModalImage = this.modalImage.asObservable();

  private eventStartDate = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate);
  currentEventStartDate = this.eventStartDate.asObservable();

  private eventStartTime = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullTime);
  currentEventStartTime = this.eventStartTime.asObservable();

  private eventEndDate = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate);
  currentEventEndDate = this.eventEndDate.asObservable();

  private eventEndTime = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullNextTime);
  currentEventEndTime = this.eventEndTime.asObservable();

  private eventVenue = new BehaviorSubject<string>(Event.CURRENT_EVENT_VENUE);
  CURRENT_EVENT_VENUE = this.eventVenue.asObservable();

  private venueIdForLocation = new BehaviorSubject<string>(Event.VENUE_ID_FOR_CALENDAR);
  currentVenueId = this.venueIdForLocation.asObservable();

  private venueNameForLocation = new BehaviorSubject<string>(Event.VENUE_NAME_FOR_CALENDAR);
  currentVenueName = this.venueNameForLocation.asObservable();

  private updateUserGroup = new BehaviorSubject<boolean>(true);
  loadUserGroup = this.updateUserGroup.asObservable();

  private updateDesignationGroup = new BehaviorSubject<boolean>(true);
  loadDesignationGroup = this.updateDesignationGroup.asObservable();

  // for the main designation categories
  private updateDesignationCategory = new BehaviorSubject<boolean>(true);
  loadDesignationCategory= this.updateDesignationCategory.asObservable();

  private updateDesignationGroupList = new BehaviorSubject<boolean>(true);
  loadDesignationGroupList = this.updateDesignationGroupList.asObservable();

  private updateProcessedPageList = new BehaviorSubject<boolean>(true);
  loadProcessedPageList = this.updateProcessedPageList.asObservable();

  private updateRequestedPageList = new BehaviorSubject<boolean>(true);
  loadRequestedPageList = this.updateRequestedPageList.asObservable();

  private savedProject = new BehaviorSubject<boolean>(false);
  onSaveProject = this.savedProject.asObservable();

  private loadEventsForCalendar = new BehaviorSubject<boolean>(false);
  onSaveEvent = this.loadEventsForCalendar.asObservable();

  private eventStartDateTimeToMain = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().processedFullTime);
  eventStartDateTime = this.eventStartDateTimeToMain.asObservable();

  private eventEndDateTimeToMain = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().processedFullNextTime);
  eventEndDateTime = this.eventEndDateTimeToMain.asObservable();

  private eventVenueToMain = new BehaviorSubject<string>(Event.VENUE_NAME_FOR_CALENDAR);
  eventVenueMain = this.eventVenueToMain.asObservable();

  private eventNameToMain = new BehaviorSubject<string>('My Event');
  eventNameMain = this.eventNameToMain.asObservable();

  private eventTypeToMain = new BehaviorSubject<string>('Meeting');
  eventTypeMain = this.eventTypeToMain.asObservable();

  private eventCallingFromToMain = new BehaviorSubject<string>('calendar');
  eventCallingFrom = this.eventCallingFromToMain.asObservable();

  private eventEditObj = new BehaviorSubject<any>({});
  eventObjToEdit = this.eventEditObj.asObservable();

  private eventStartDateToSummary = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().processedFullTime);
  eventStartDateTimeToSummary = this.eventStartDateToSummary.asObservable();

  private eventEndDateToSummary = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate + 'T' +
    Event.setCurrentDateTime().processedFullNextTime);
  eventEndDateTimeToSummary = this.eventEndDateToSummary.asObservable();

  private attendanceRecordsObject = new BehaviorSubject<any>({});
  attendanceRecordsObjectToUpdate = this.attendanceRecordsObject.asObservable();

  private leaveRecordsObject = new BehaviorSubject<any>(LeaveOnLeave.ON_LEAVE_OBJ);
  leaveRecordsObjectToUpdate = this.leaveRecordsObject.asObservable();

  private savedQuickLink = new BehaviorSubject<boolean>(false);
  onSaveQuickLink = this.savedQuickLink.asObservable();

  private quickLinkDataToEdit = new BehaviorSubject<any>({});
  currentQuickLinkData = this.quickLinkDataToEdit.asObservable();

  private loadCandidateList = new BehaviorSubject<boolean>(false);
  onCandidateListUpdate = this.loadCandidateList.asObservable();

  private candidateAttributeObject = new BehaviorSubject<any>({});
  candidateAttributes = this.candidateAttributeObject.asObservable();

  private showCandidateAttributeObject = new BehaviorSubject<boolean>(false);
  onShowCandidateAttributeObject = this.showCandidateAttributeObject.asObservable();

  private ongoingInterviewObject = new BehaviorSubject<any>({});
  ongoingInterview = this.ongoingInterviewObject.asObservable();

  private showOngoingInterviewObject = new BehaviorSubject<boolean>(false);
  onShowOngoingInterviewObject = this.showOngoingInterviewObject.asObservable();

  private candidateToScheduleInterviewObject = new BehaviorSubject<any>({});
  candidateToScheduleInterview = this.candidateToScheduleInterviewObject.asObservable();

  private showCandidateToScheduleInterviewObject = new BehaviorSubject<boolean>(false);
  onShowCandidateToScheduleInterview = this.showCandidateToScheduleInterviewObject.asObservable();

  private emailTemplateObject = new BehaviorSubject<any>({});
  emailTemplate = this.emailTemplateObject.asObservable();

  private showEmailTemplateObject = new BehaviorSubject<boolean>(false);
  onShowEmailTemplateObject = this.showEmailTemplateObject.asObservable();

  private updateFeed = new BehaviorSubject<boolean>(false);
  loadFeed = this.updateFeed.asObservable();

  private updateProfile = new BehaviorSubject<boolean>(false);
  loadProfile = this.updateProfile.asObservable();

  private advanceSearchEmployeeObject = new BehaviorSubject<any>({});
  processedAdvanceSearchEmployeeObject = this.advanceSearchEmployeeObject.asObservable();

  private advanceSearchFilterObject = new BehaviorSubject<any>({});
  processedAdvanceSearchFilterObject = this.advanceSearchFilterObject.asObservable();

  private calendarViewType = new BehaviorSubject<any>(Event.CALENDAR_TYPE);
  RequiredCalendarViewType = this.calendarViewType.asObservable();

  private getWeekNumber = new BehaviorSubject<number>(Event.DEFAULT_WEEK);
  currentWeek = this.getWeekNumber.asObservable();

  private getSelectedEventType = new BehaviorSubject<any>(Event.EVENT_TYPE);
  selectedEvent = this.getSelectedEventType.asObservable();

  private updatePushNotificationContent = new BehaviorSubject<any>({});
  pushNotificationContent = this.updatePushNotificationContent.asObservable();

  private passedPermissionGroupNameToGetPermissions = new BehaviorSubject<any>('string');
  passedPermissionGroupName = this.passedPermissionGroupNameToGetPermissions.asObservable();

  private onLoadExistingPermissionGroups = new BehaviorSubject<any>(true);
  loadExistingPermissionGroups = this.onLoadExistingPermissionGroups.asObservable();

  private adminDashboardUpdateObject = new BehaviorSubject<any>({});
  processedAdminDashboardUpdateObject = this.adminDashboardUpdateObject.asObservable();

  private adminDashboardFiltersObject = new BehaviorSubject<any>(Admindashboard.ADMIN_DASHBOARD_PRE_INSERT_DATA);
  updatedAdminDashboardFiltersObject = this.adminDashboardFiltersObject.asObservable();

  private adminDashboardUpdateView = new BehaviorSubject<boolean>(false);
  onAdminDashboardUpdateView = this.adminDashboardUpdateView.asObservable();

  private onOpenConfirmationAlertWizard = new BehaviorSubject<any>('default');
  onOpenWizard = this.onOpenConfirmationAlertWizard.asObservable();

  private onConfirmationOnWizard = new BehaviorSubject<any>('default');
  onConfirmationWizard = this.onConfirmationOnWizard.asObservable();

  private onUpdateEmployeeList = new BehaviorSubject<string>(null);
  onUpdateEmployeeListObservable = this.onUpdateEmployeeList.asObservable();

  private onOpenAttendanceSummaryWizard = new BehaviorSubject<any>({});
  onOpenASWizard = this.onOpenAttendanceSummaryWizard.asObservable();

  private onOpenAttendanceMissingLogRequestWizard = new BehaviorSubject<any>({'attendance': {}, 'date': ''});
  onOpenALogWizard = this.onOpenAttendanceMissingLogRequestWizard.asObservable();

  // leave
  private updateSelectedLeaveYearYear = new BehaviorSubject<any>(new Date().getFullYear());
  selectedLeaveYear = this.updateSelectedLeaveYearYear.asObservable();

  private updateLeaveYearListList = new BehaviorSubject<any>([]);
  leaveYearList = this.updateLeaveYearListList.asObservable();

  private updateRefreshLeaveDetailsTable = new BehaviorSubject<boolean>(false);
  refreshLeaveDetailsTable = this.updateRefreshLeaveDetailsTable.asObservable();


  private updateSelectedLeaveYearForRequest = new BehaviorSubject<any>(new Date().getFullYear());
  selectedYearForLeaveRequest = this.updateSelectedLeaveYearForRequest.asObservable();

  private updateClearLeaveRequestForm = new BehaviorSubject<any>({'status': true, 'year': new Date().getFullYear()});
  clearLeaveRequestForm = this.updateClearLeaveRequestForm.asObservable();

  private updateSelectedLeaveRequestData = new BehaviorSubject<LeaveDetail>(null);
  selectedLeaveRequestData = this.updateSelectedLeaveRequestData.asObservable();

  private updateSelectedMonth = new BehaviorSubject<any>('default');
  selectedMonthToUpdate = this.updateSelectedMonth.asObservable();

  private selectedTab = new BehaviorSubject<any>('dashboard');
  selectedTabToUpdate = this.selectedTab.asObservable();

  private isScrolling = new BehaviorSubject<any>('default');
  postDivScrolling = this.isScrolling.asObservable();

  private isSpecialDesktop = new BehaviorSubject<any>('default');
  setSpecialDesktop = this.isSpecialDesktop.asObservable();

  private isSelectedAppraiserEmpNo = new BehaviorSubject<any>({'empNo': 'empNo', 'empId': 'empId'});
  setSelectedAppraiserEmployeeNo = this.isSelectedAppraiserEmpNo.asObservable();

  private updateDesignationFilters = new BehaviorSubject<any>({'scheme': 'all', 'designation': 'all', 'project': 'all'});
  getDesignationFilters = this.updateDesignationFilters.asObservable();

  private changeDateRangeForOPD = new BehaviorSubject <any>( {'toDate': new Date().toISOString().slice(0, 10), 'fromDate': new Date(new Date().setDate(new Date().getDate() - 365)).toISOString().slice(0, 10), 'empID': 'All'});
  getDateRangeForOPD = this.changeDateRangeForOPD.asObservable();

  private filterObject = new BehaviorSubject<any>('');
  currentFilterObject = this.filterObject.asObservable();

  // work from home
  private updateWorkFromHomeObject = new BehaviorSubject<any>('');
  workFromHomeObjectToUpdate = this.updateWorkFromHomeObject.asObservable();

  // work from home detailed view
  private updateWorkFromHomeObjectForDetailedView = new BehaviorSubject<any>('');
  workFromHomeObjectToUpdateForDetailedView = this.updateWorkFromHomeObjectForDetailedView.asObservable();

  // profile timeline edit
  private editProfileTimelineData = new BehaviorSubject<any>('');
  profileTimelineData = this.editProfileTimelineData.asObservable();

  private updateSummaryReportData = new BehaviorSubject<any>('');
  summaryReportToUpdate = this.updateSummaryReportData.asObservable();

  // private  updateSelectedYearData = new BehaviorSubject<any>('year');
  // updateSelectedYear = this.updateSelectedYearData.asObservable();

  private userGroupFilterPipeSource = new Subject<any>();
  userGroupFilterPipe = this.userGroupFilterPipeSource.asObservable();

  private saveReview = new BehaviorSubject<any>(false);
  onSaveNewReview = this.saveReview.asObservable();

  private changeCompanyEmployees = new BehaviorSubject <any>( {'status': false, 'employees': any});
  getCompanyEmployees = this.changeCompanyEmployees.asObservable();

  private getEmployeeHeaderData = new BehaviorSubject <any>( {'status': false, 'data': any});
  onUpdateEmployeeHeaderData = this.getEmployeeHeaderData.asObservable();

  private getFaceRecAttendanceData = new BehaviorSubject <any> ({'status': false, 'headCount': any, 'faceData': any});
  faceRecAttendanceData = this.getFaceRecAttendanceData.asObservable();

  private getDesignationsForAdd = new BehaviorSubject<boolean>(false);
  onDesignationsForAdd = this.getDesignationsForAdd.asObservable();

  private changeTransportRequestSummary = new BehaviorSubject<any>({'status': false, 'data': any});
  transportRequestSummary = this.changeTransportRequestSummary.asObservable();

  private changeTransportRequestWeek = new BehaviorSubject<string>(new Date().toISOString().slice(0, 10));
  transportRequestWeek = this.changeTransportRequestWeek.asObservable();

  private editTransportRequest = new BehaviorSubject<any>({'status': false, 'data': any});
  selectedTransportRequest = this.editTransportRequest.asObservable();

  private deleteTransportRequest = new BehaviorSubject<boolean>(false);
  onDeleteTransportRequest = this.deleteTransportRequest.asObservable();

  private updateWorkStationSeatNumber = new BehaviorSubject<any>('');
  updatedSeatNumber = this.updateWorkStationSeatNumber.asObservable();

  private updateWorkstationBookingDetails = new BehaviorSubject<any>({'status': false, 'data': any});
  updatedWorkStationDetails =  this.updateWorkstationBookingDetails.asObservable();

  private deleteAlreadyBookedSeat = new BehaviorSubject<boolean>(false);
  deleteSeat = this.deleteAlreadyBookedSeat.asObservable();

  private setSelectedAccommodationRequestForEdit = new BehaviorSubject<any>({'status': false, 'data': any});
  selectedAccommodationRequest = this.setSelectedAccommodationRequestForEdit.asObservable();

  private loadAccommodationRequests = new BehaviorSubject<boolean>(false);
  accommodationRequests = this.loadAccommodationRequests.asObservable();

  private transportReportsViewDisplay = new BehaviorSubject<any>({status: false, date: new Date().toISOString().slice(0, 10)});
  onTransportReportsViewDisplay = this.transportReportsViewDisplay.asObservable();

  private accommodationBookingDatesArray = new BehaviorSubject<any>([]);
  onUpdateAccommodationBookingDatesArray = this.accommodationBookingDatesArray.asObservable();

  private breadCrumbData = new BehaviorSubject<any>({status: false, header: '', data: []});
  onUpdateBreadCrumbData = this.breadCrumbData.asObservable();

  private sectionWhenBreadcrumbClick = new BehaviorSubject<string>('');
  onUpdateSectionWhenBreadcrumbClick = this.sectionWhenBreadcrumbClick.asObservable();

  private employeePreInsertData = new BehaviorSubject<any>({});
  onUpdateEmployeePreInsertData = this.employeePreInsertData.asObservable();

  private addEmployeeSubmittedArray = new BehaviorSubject<any>([]);
  onUpdateAddEmployeeSubmittedArray = this.addEmployeeSubmittedArray.asObservable();

  private accommodationRequestDelete = new BehaviorSubject<boolean>(false);
  afterDeleteAccommodationRequest = this.accommodationRequestDelete.asObservable();

  private projectsAttendanceData = new BehaviorSubject<any>({status: false, data: any});
  OnUpdateProjectsAttendanceData = this.projectsAttendanceData.asObservable();

  private attendanceDashboardStartDate = new BehaviorSubject<string>(Event.setCurrentDateTime().processedFullDate);
  attendanceDashboardSelectedDate = this.attendanceDashboardStartDate.asObservable();

  private employeeDesignationChange = new BehaviorSubject<any>({status: false, designationID: any, designation: any});
  getNewlyUpdatedDesignation = this.employeeDesignationChange.asObservable();

  private activeProjectList = new BehaviorSubject<any>({status: false, project: ProjectEntity});
  onUpdateActiveProjectList = this.activeProjectList.asObservable();

  private selectedProjectData = new BehaviorSubject<any>({status: false, project: ProjectEntity});
  onSelectProjectData = this.selectedProjectData.asObservable();

  private createNewTaxiRequest = new BehaviorSubject<boolean>(false);
  onCreatedNewTaxiRequest = this.createNewTaxiRequest.asObservable();

  constructor() {
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeSearchKey(searchObject: any) {
    console.log('intercommunication function hit');
    this.searchObject.next(searchObject);
    Search.SEARCH_KEY = searchObject.searchKey;
  }

  changeErrorCode(errorCode: number, errorType, errorMessage) {
    this.errorCode.next(errorCode);
    this.errorType.next(errorType);
    this.errorMessage.next(errorMessage);
  }

  changerAlertDetails(displayStatus: boolean, alertType: string, alertMessage: string) {
    this.alertDisplayStatus.next(displayStatus);
    this.alertType.next(alertType);
    this.alertMessage.next(alertMessage);
  }

  changeImageArray(imageArray, modalImage) {
    this.imageArray.next(imageArray);
    this.modalImage.next(modalImage);
  }

  changeEventDetails(eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventVenue) {
    this.eventStartDate.next(eventStartDate);
    this.eventStartTime.next(eventStartTime);
    this.eventEndDate.next(eventEndDate);
    this.eventEndTime.next(eventEndTime);
    this.eventVenue.next(eventVenue);
  }

  changeVenueId(venueid: string, venuename: string) {
    this.venueIdForLocation.next(venueid);
    this.venueNameForLocation.next(venuename);
  }

  changeUserGroup(updategroup: boolean) {
    this.updateUserGroup.next(updategroup);
  }

  changeDesignationGroup(updateDesignationroup: boolean) {
    this.updateDesignationGroup.next(updateDesignationroup);
  }

  changeDesignationCategory(updateDesignationCategory: boolean) {
    this.updateDesignationCategory.next(updateDesignationCategory);
  }

  changeDesignationGroupList(updateDesignationGroupList: boolean) {
    this.updateDesignationGroupList.next(updateDesignationGroupList);
  }

  changeProcessedPageList(updateProcessedPageList: boolean) {
    this.updateProcessedPageList.next(updateProcessedPageList);
  }

  changeRequestedPageList(updateRequestedPageList: boolean) {
    this.updateRequestedPageList.next(updateRequestedPageList);
  }

  updateProjectList(updateproject: boolean) {
    this.savedProject.next(updateproject);
  }

  onSaveReview(updateproject: boolean) {
    this.saveReview.next(updateproject);
  }

  updateEventListOnCalendar(loadEvent: boolean) {
    this.loadEventsForCalendar.next(loadEvent);
  }

  changeEventToMain(eventStartDateTime, eventEndDateTime, eventVenueMain, eventNameMain, eventTypeMain, eventCallingFrom) {
    this.eventStartDateTimeToMain.next(eventStartDateTime);
    this.eventEndDateTimeToMain.next(eventEndDateTime);
    this.eventVenueToMain.next(eventVenueMain);
    this.eventNameToMain.next(eventNameMain);
    this.eventTypeToMain.next(eventTypeMain);
    this.eventCallingFromToMain.next(eventCallingFrom);
  }

  toEditEvent(eventObject) {
    this.eventEditObj.next(eventObject);
  }

  changeEventToSummary(eventStartDateTime, eventEndDateTime) {
    this.eventStartDateToSummary.next(eventStartDateTime);
    this.eventEndDateToSummary.next(eventEndDateTime);
  }

  updateAttendanceRecords(attendanceUpdateObject) {
    this.attendanceRecordsObject.next(attendanceUpdateObject);
  }

  updateLeaveRecords(leaveUpdateObject) {
    this.leaveRecordsObject.next(leaveUpdateObject);
  }

  updateQuickLinksList(updateQuickLinks: boolean) {
    this.savedQuickLink.next(updateQuickLinks);
  }

  editQuickLinkDataFromList(quickLinkData: boolean) {
    this.quickLinkDataToEdit.next(quickLinkData);
  }

  updateCandidateList(loadCandidates: boolean) {
    this.loadCandidateList.next(loadCandidates);
  }

  viewCandidateAttributes(candidateAttributes: any, showCandidateAttributes: boolean) {
    this.candidateAttributeObject.next(candidateAttributes);
    this.showCandidateAttributeObject.next(showCandidateAttributes);
  }

  viewOngoingInterviews(ongoingInterview: any, showOngoingInterview: boolean) {
    this.ongoingInterviewObject.next(ongoingInterview);
    this.showOngoingInterviewObject.next(showOngoingInterview);
  }

  viewCandidateToScheduleInterview(candidateToScheduleInterview: any, showCandidateToScheduleInterview: boolean) {
    this.candidateToScheduleInterviewObject.next(candidateToScheduleInterview);
    this.showCandidateToScheduleInterviewObject.next(showCandidateToScheduleInterview);
  }

  viewEmailTemplate(emailTemplate: any, showEmailTemplate: boolean) {
    this.emailTemplateObject.next(emailTemplate);
    this.showEmailTemplateObject.next(showEmailTemplate);
  }

  updateFeedContent(updateFeedContent: boolean) {
    this.updateFeed.next(updateFeedContent);
  }

  updateProfileContent(updateProfileContent: boolean) {
    this.updateProfile.next(updateProfileContent);
  }

  updateAdvanceSearchEmployeeObject(employeeObject) {
    this.advanceSearchEmployeeObject.next(employeeObject);
  }

  updateAdvanceSearchFilterObject(filterObject) {
    this.advanceSearchFilterObject.next(filterObject);
  }

  changeCalendarView(cType) {
    this.calendarViewType.next(cType);
  }

  changeWeekNumber(week) {
    this.getWeekNumber.next(week);
  }

  loadingSelectedType(typeArray) {
    this.getSelectedEventType.next(typeArray);
  }

  updatePushNotification(pushNotificationContent) {
    this.updatePushNotificationContent.next(pushNotificationContent);
  }

  passPermissionGroupNameToGetPermissions(permissionGroupName) {
    this.passedPermissionGroupNameToGetPermissions.next(permissionGroupName);
  }

  loadExistingPermissionGroupsOnUpdate(updateGroups) {
    this.onLoadExistingPermissionGroups.next(updateGroups);
  }

  updateAdminDashboardGraphs(graphObject) {
    this.adminDashboardUpdateObject.next(graphObject);
  }

  updateAdminDashboardFilters(filters: any) {
    this.adminDashboardFiltersObject.next(filters);
  }

  updateAdminDashboard(updateView: boolean) {
    this.adminDashboardUpdateView.next(updateView);
  }

  // action confirmation alert
  openConfirmationAlertWizard(valueToConfirm: any) {
    this.onOpenConfirmationAlertWizard.next(valueToConfirm);
  }

  confirmationOnWizard(confirmedValue: any) {
    this.onConfirmationOnWizard.next(confirmedValue);
  }

  updateOnUpdateEmployeeListObservable(defaultValues: string) {
    this.onUpdateEmployeeList.next(defaultValues);
  }

  openAttendanceSummaryWizard(attendanceSummary: any) {
    this.onOpenAttendanceSummaryWizard.next(attendanceSummary);
  }

  openAttendanceMissingLogRequestWizard(attendanceMissingLog: any) {
    this.onOpenAttendanceMissingLogRequestWizard.next(attendanceMissingLog);
  }

  // leave
  updateSelectedLeaveYear(year: any) {
    this.updateSelectedLeaveYearYear.next(year);
  }

  updateLeaveYearList(yearList: any[]) {
    this.updateLeaveYearListList.next(yearList);
  }

  updateRefreshStateOfLeaveDetailsTable(state: boolean) {
    this.updateRefreshLeaveDetailsTable.next(state);
  }

  updateClearLeaveRequestFormState(leaveObj) {
    this.updateClearLeaveRequestForm.next(leaveObj);
  }

  updateSelectedLeaveRequestDataForUpdateLeaveRequest(leaveRequest) {
    this.updateSelectedLeaveRequestData.next(leaveRequest);
  }

  updateSelectedMonthFilter(selectedMonth) {
    this.updateSelectedMonth.next(selectedMonth);
  }

  updatedSelectedTabDetail(selectedTab) {
    this.selectedTab.next(selectedTab);
  }

 updatingScrollingDiv(scroll) {
    this.isScrolling.next(scroll);
  }


  updateSpecialDesktop(scroll) {
    this.isSpecialDesktop.next(scroll);
  }


  updatedSelectedAppraiserEmployeeNo(empNo){
     this.isSelectedAppraiserEmpNo.next(empNo);
  }


  changeDesignationFilters(desObj){
    this.updateDesignationFilters.next(desObj);
  }

  changeDateRangeForOPDAdminHeader(dateObj) {
    this.changeDateRangeForOPD.next(dateObj);
  }

  changeFilter(filterObject: any) {
    this.filterObject.next(filterObject);
  }

  updateWorkFromHomeRecords(selectionObj: any) {
    this.updateWorkFromHomeObject.next(selectionObj);
  }

  // work from home detailed view
  updateWorkFromHomeRecordsForDetailedView(selectionObj: any) {
    this.updateWorkFromHomeObjectForDetailedView.next(selectionObj);
  }


  updateSummaryReport(configurationObject: any) {
    this.updateSummaryReportData.next(configurationObject);
  }

  editProfileTimelineInstance(selectionObj: any) {
    this.editProfileTimelineData.next(selectionObj);
  }

  // updateSelectedYear(year: string){
  //   this.updateSelectedYear.next(year);
  // }

  updateShowUserGroupTitle(json: any) {
    this.userGroupFilterPipeSource.next(json);
  }

  updateCompanyEmployeeList(json: any) {
    this.changeCompanyEmployees.next(json);
  }

  updateEmployeeHeaderData(json: any) {
    this.getEmployeeHeaderData.next(json);
  }

  updateFaceRecAttendanceData(json: any) {
    this.getFaceRecAttendanceData.next(json);
  }

  updateDesignationsForAdd(state: boolean) {
    this.getDesignationsForAdd.next(state);
  }

  updateTransportRequestSummary(json: any) {
    this.changeTransportRequestSummary.next(json);
  }

  updateTransportRequestWeek(date: string) {
   this.changeTransportRequestWeek.next(date);
  }

  editTransportSummaryRequest(json: any) {
    this.editTransportRequest.next(json);
  }

  onDeleteSelectedTransportRequest(status: boolean) {
    this.deleteTransportRequest.next(status);
  }

  updateSeatNumberForWorkStationBooking(seatNo: any) {
    this.updateWorkStationSeatNumber.next(seatNo);
  }

  updateSeatBookingDetailsForWorkStation(json: any) {
    this.updateWorkstationBookingDetails.next(json);
  }

  deleteBookedSeat(status: any) {
    this.deleteAlreadyBookedSeat.next(status);
  }

  editSelectedAccommodationRequest(json: any) {
    this.setSelectedAccommodationRequestForEdit.next(json);
  }

  getAccommodationRequests(status: any) {
    this.loadAccommodationRequests.next(status);
  }

  displayTransportReports(json: any) {
    this.transportReportsViewDisplay.next(json);
  }

  updateAccommodationBookingDatesArray(dates: any) {
    this.accommodationBookingDatesArray.next(dates);
  }

  updateBreadCrumbData(json) {
    this.breadCrumbData.next(json);
  }

  updateSectionToDisplayWhenBreadcrumbClicked(section) {
    this.sectionWhenBreadcrumbClick.next(section);
  }

  updateEmployeePreInsertData(data: any) {
    this.employeePreInsertData.next(data);
  }

  updateAddEmployeeSubmittedArray(data: any) {
    this.addEmployeeSubmittedArray.next(data);
  }
  getRemainingDatesForAccommodationAfterDelete(status: boolean) {
    this.accommodationRequestDelete.next(status);
  }

  updateProjectsAttendanceData(json) {
    this.projectsAttendanceData.next(json);
  }

  setAttendanceDashboardStartDate(date) {
    this.attendanceDashboardStartDate.next(date);
  }

  updateDesignationChangeData(json) {
    this.employeeDesignationChange.next(json);
    console.log(json);
  }

  updateActiveProjectList(json: { status: boolean, project: ProjectEntity }) {
    this.activeProjectList.next(json);
  }

  setSelectedProjectData(json: { status: boolean, project: ProjectEntity }) {
    this.selectedProjectData.next(json);
  }

  submitTaxiRequest(status: boolean) {
    this.createNewTaxiRequest.next(status);
  }
}

