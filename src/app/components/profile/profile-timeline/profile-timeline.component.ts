import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from '../../../_global/profile';
import {ProfileUserServiceService} from '../../../service/profile-user-service.service';
import {Router} from '@angular/router';
import {Search} from '../../../_global/search';
import {InterCommunicationServiceService} from '../../../service/support-services/inter-communication-service.service';
import {environment} from '../../../../environments/environment';
import {ModalUiServiceService} from '../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-profile-timeline',
  templateUrl: './profile-timeline.component.html',
  styleUrls: ['./profile-timeline.component.css']
})
export class ProfileTimelineComponent implements OnInit {
  @Input() employeeId;
  @Input() employeeFirstName;
  @Output() profileBodyEventEmitter = new EventEmitter();

  componentPermission = [];
  clientPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;


  dataLoaded = false;
  timelineArray = [];
  positionArry = ['100%' , '50%' , '99%' ];
  value = 100 ;
  timelinerecordtype;
  timelineid;
  timelineType;
  timeLineTypeButton;

  uploadedTimelinePicture;
  loadTimelinePicture = false;
  showUploaderNew = true;

  imageToEdit;
  showImagetoEdit;
  showUploaderEdit = false;

  showAddNew = false;

  errorCode;
  errorType;
  errorMessage;

  userType = Profile.USER_TYPE;
  empId = Profile.EMPLOYEE_ID;
  searchEmpId = Search.SEARCH_EMPLOYEE_ID;

  currentEmployeeId; // used to store the current selected employee

  timelineInstance;

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/timeline/upload?emp_no=' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.POST_IMAGE_SIZE;
  customStyle = {
    selectButton: {
      'background-color': 'transparent',
      'border-radius': '25px',
      'color': '#333333',
      'box-shadow': 'none',
      'margin': '0'
    },
    clearButton: {
      'display': 'none'
    },
    layout: {
      'background-color': 'transparent',
      'color': '#838383',
      'font-size': '10px !important',
      'width': '100%',
      'font-family': 'roboto'
    },
    previewPanel: {
      'display': 'none'
    }
  };

  employeeIdToLoad;
  displayToEdit = false;
  editTimelineData = {
    id: '',
    group: '',
    title: '',
    date: '',
    description: '',
    image: ''
  };
  editTimelineDataArray = [];
  editDataLoaded = false;
  editIdClicked: any;
  dataObject: any;

  constructor(private httpservice: ProfileUserServiceService, private router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService ,
              private modalUiService: ModalUiServiceService) {
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
  }

  ngOnInit() {
    this.checkEmpId();
    this.loadEmployeeTimeline();
    this.timelineType = 1;
    this.timeLineTypeButton = 1;
    this.showAddNew = this.userType === '1' || this.userType === '5' || this.userType === '8' || this.userType === '18';
  }


  //new - enables for admin, hr, super user
  isDisabled(){
    if(this.userType === 'admin'){
      return false;
    }
      else{
        return true;
      }
  }



  checkEmpId() {
    switch (this.employeeId) {
      case Profile.EMPLOYEE_ID:
        this.displayToEdit = true;
        break;
      case Search.SEARCH_EMPLOYEE_ID:
        this.displayToEdit = false;
        break;
    }
    this.employeeIdToLoad = this.employeeId;
  }

  getSplitMilestoneTitle(title: string ) {

    if(title.split(' ').length >=2){
      return title.split(' ')[0] + ' ' + title.split(' ')[1];
    }else{
      return title
    }
  }

  loadEmployeeTimeline() {


    this.httpservice.loadEmpTimeline(this.employeeIdToLoad, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          // this.timelineArray = dataObj;
          this.timelineArray = data;
          this.dataLoaded = true;

        }
      );


  }

  onTimelineEditReviewClick(a, b, c, d, e, f) {
    this.timelineid = a;
    this.timelinerecordtype = b;
    (<HTMLInputElement>document.getElementById('edit_timelineTitle')).value = c;
    (<HTMLInputElement>document.getElementById('edit_timelineDescription')).value = d;
    (<HTMLInputElement>document.getElementById('edit_timelineDate')).value = e;
    this.imageToEdit = f;
    if (f === '' || f === null) {
      this.showImagetoEdit = false;
    } else {
      this.showImagetoEdit = true;
    }
  }



  // old
  // timelineClick(e) {
  //   this.timelineType = e;
  // }


  // working on own profile
  //  timelineClick(e) {
  //   this.timeLineTypeButton = e;
  //   console.log(e);
  // }

  // onTimelineSave() {
  //   const timelineTitle = (<HTMLInputElement>document.getElementById('input_timelineTitle')).value;
  //   const timelineDate = (<HTMLInputElement>document.getElementById('input_timelineDate')).value;
  //   const timelineDescription = (<HTMLInputElement>document.getElementById('input_timelineDescription')).value;
  //   const timelineImage = this.uploadedTimelinePicture;
  //   // old
  //   //const timelineType = 1;

  //   let timelineType;

  //   if(this.timeLineTypeButton == 1){
  //     timelineType = 1; // personal
  //     console.log(timelineType);
  //   } else{
  //     timelineType = 0; // company
  //     console.log(timelineType);
  //   }


  //   if (timelineTitle === '' || timelineTitle === null || timelineDate === '' || timelineDate === null) {
  //     alert('Please fill the required fields');
  //   } else {
  //     const jsonPost = {
  //       'title': timelineTitle,
  //       'date': timelineDate,
  //       'description': timelineDescription,
  //       'image': timelineImage,
  //       'type': timelineType
  //     };
  //     this.httpservice.saveTimelineRecord(jsonPost)
  //       .subscribe(
  //         (data: any) => {
  //           if (data.httpStatusCode === 200) {
  //             this.loadEmployeeTimeline();
  //             (<HTMLInputElement>document.getElementById('input_timelineTitle')).value = '';
  //             (<HTMLInputElement>document.getElementById('input_timelineDate')).value = '';
  //             (<HTMLInputElement>document.getElementById('input_timelineDescription')).value = '';
  //             this.uploadedTimelinePicture = null;
  //             // (<any>$('#addToTimelineModal')).modal('hide');
  //             // location.reload();
  //           }
  //           console.log(jsonPost);
  //         }
  //       );
  //   }
  // }



   timelineClick(e) {
    this.timeLineTypeButton = e;
      console.log(e);
  }

  onTimelineSave() {
    const timelineTitle = (<HTMLInputElement>document.getElementById('input_timelineTitle')).value;
    const timelineDate = (<HTMLInputElement>document.getElementById('input_timelineDate')).value;
    const timelineDescription = (<HTMLInputElement>document.getElementById('input_timelineDescription')).value;
    const timelineImage = this.uploadedTimelinePicture;

    let timelineType;

    if(this.timeLineTypeButton == 1){
      timelineType = 1; // personal
    } else if (this.timeLineTypeButton == 0){
      timelineType = 0; // company
    }
    else if (this.timeLineTypeButton == 2){
      timelineType = 2; // education or qualification
    }
    else {
      timelineType = 3; // accomplishment
    }

    let currentEmployeeId;

    if (this.empId == this.searchEmpId) {
     currentEmployeeId = this.empId;
    } else {
      currentEmployeeId = this.searchEmpId;
    }

    if (timelineTitle === '' || timelineTitle === null || timelineDate === '' || timelineDate === null) {
      alert('Please fill the required fields');
    } else {
      const jsonPost = {
        'title': timelineTitle,
        'description': timelineDescription,
        'type': timelineType,
        'employeeNo': currentEmployeeId,
        'image': timelineImage,
        'date': timelineDate
      };

      this.httpservice.saveTimelineRecord(jsonPost)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadEmployeeTimeline();
              this.openErrorModal(100, 'SUCCESS', '');
              (<HTMLInputElement>document.getElementById('input_timelineTitle')).value = '';
              (<HTMLInputElement>document.getElementById('input_timelineDate')).value = '';
              (<HTMLInputElement>document.getElementById('input_timelineDescription')).value = '';
              this.uploadedTimelinePicture = null;
              // (<any>$('#addToTimelineModal')).modal('hide');
              // location.reload();
            }
             //    console.log(jsonPost);
          }
        );
    }
  }

  onTimelinePostEdit() {
    const timelineID = this.timelineid;
    const timelineTitle = (<HTMLInputElement>document.getElementById('edit_timelineTitle')).value;
    const timelineDate = (<HTMLInputElement>document.getElementById('edit_timelineDate')).value;
    const timelineDescription = (<HTMLInputElement>document.getElementById('edit_timelineDescription')).value;
    const timelineImage = this.imageToEdit;
    const timelineType = 1;

    if (timelineTitle === '' || timelineTitle === null || timelineDate === '' || timelineDate === null) {
      alert('Please fill the required fields');
    } else {
      const jsonPost = {
        'timeLineId': timelineID,
        'title': timelineTitle,
        'date': timelineDate,
        'description': timelineDescription,
        'image': timelineImage,
        'type': timelineType,
        'reason': ''
      };
      this.httpservice.editTimelineRecord(jsonPost)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadEmployeeTimeline();
            }
          }
        );
    }
  }

  onTimelinePostDelete() {
    const timelineID = this.timelineid;
    this.httpservice.deleteTimelineRecord(timelineID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadEmployeeTimeline();
          }
        }
      );
  }


  likeUnlikeTimelineRecord(likedUnliked, milestoneRecordId, timelineRecordDate) {
    const jsonPost = {
      'liked': likedUnliked,
      'postId': milestoneRecordId
    };
    this.httpservice.likeTimelineRecord(jsonPost)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            for (let key in this.timelineArray) {
              if (this.timelineArray[key].date === timelineRecordDate) {
                for (let newKey in this.timelineArray[key].milestones) {
                  if (this.timelineArray[key].milestones[newKey].id === milestoneRecordId) {
                    this.timelineArray[key].milestones[newKey] = data.data;
                  }
                }
              }
            }
          }
        }
      );
  }

  // Image Upload
  uploadFinish(url, from) {
    const uploadedImage = url.serverResponse.response.body[0];
    switch (from) {
      case 'new':
        this.uploadedTimelinePicture = uploadedImage;
        this.loadTimelinePicture = true;
        this.showUploaderNew = false;
        break;
      case 'edit':
        this.imageToEdit = uploadedImage;
        this.showImagetoEdit = true;
        this.showUploaderEdit = false;
        break;
    }
  }

  deleteUploadedImage(from) {
    switch (from) {
      case 'new':
        this.uploadedTimelinePicture = null;
        this.loadTimelinePicture = false;
        this.showUploaderNew = true;
        break;
      case 'edit':
        this.imageToEdit = null;
        this.showImagetoEdit = false;
        this.showUploaderEdit = true;
        break;
    }
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  getLeftPosition( i , j ){
    if (j%2 == 0 ){
      if ((i%3)== 2 ){
        return  '99%';
      }else if ((i%3)== 1 ){
        return '50%';
      }else {
        return 'unset';
      }
    }else {
      if ((i %3)== 0 ){
        return '100%';
      }else {
        return 'unset';
      }
    }
    }


  getRightPosition(i, j){

    if (j % 2 == 0 ) {
      if ((i % 3)== 0 ) {
        return '100%';
      }else {
        return 'unset';
      }
    }else {
      if ((i % 3) == 2 ) {
        return  '99%';
      } else if (( i % 3) == 1 ) {
        return '50%';
      } else {
        return 'unset';
      }
    }
  }



  showProfileTimelineCard(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  IdToEdit(id: any) {
    // console.log('received id', id)
    this.editIdClicked = id;
    this.setTimelineDataToEdit(this.editIdClicked);
  }
  setTimelineDataToEdit(clickedId) {
    this.editDataLoaded = false;
    // console.log('this.timelineArray', this.timelineArray)
    for (let postBlock of this.timelineArray) {
      for (let post of postBlock) {
        this.dataObject = post.milestones[0];
        // console.log('data object', this.dataObject)
        if (this.dataObject.id === clickedId) {
          this.editTimelineData.id = this.dataObject.id;
          this.editTimelineData.title = this.dataObject.title;
          this.editTimelineData.description = this.dataObject.description;
          this.editTimelineData.date = this.dataObject.date;
          this.editTimelineData.image = this.dataObject.image;
          this.editTimelineData.group = this.dataObject.type;
          // console.log('editTimelineData', this.editTimelineData)
          this.editDataLoaded = true;
          this.showSaveQuoteModal('editTimeline');
        }
      }
    }
  }

  refreshTimeline() {
    this.interCommunicationServiceService.loadProfile.subscribe(loadProfile => {
      if (loadProfile) {
        this.loadEmployeeTimeline();
      }
    });
  }

  changeTimelineType() {
    if ( this.userType === '1' || this.userType === '5' || this.userType === '8' || this.userType === '18') {
      // this.timelineType = 0;
      this.showSaveQuoteModal('addToTimelineModal');
    }
    // else {
    //   // this.timelineType = 1;
    //   this.redirect('resume');
    // }
  }

  /**
   * call profile body component method via emitter for
   * redirecting tab inside profile
   * @param tabName
   */
  redirect(tabName: string) {
    this.profileBodyEventEmitter.emit({'tabName': tabName});
  }
}
