import { Component, HostListener, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Profile} from '../../../../../../_global/profile';
import {FeedServiceService} from '../../../../../../service/feed-service.service';
import {Router} from '@angular/router';
import {Search} from '../../../../../../_global/search';
import {Feed} from '../../../../../../_global/feed';
import {ResponsiveService} from '../../../../../../utility/responsive-service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Page} from '../../../../../../_global/page';
import {PageServiceService} from '../../../../../../service/page-service.service';
import {environment} from '../../../../../../../environments/environment';
import {ModalUiServiceService} from "../../../../../../service/ui-services/modal-ui-service.service";
import {GeneralOps} from "../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit,OnDestroy {
  @Input() employeeId: any;
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  userType = Profile.USER_TYPE;
  luim_ = Profile.LOGGED_IN_IMAGE;
  dataLoaded = false;
  postLoading = true;
  postList = [];
  taggedList = [];
  fullNameList = [];
  postVisibilityVal;

  imageUploadArray = [];
  showImageModal = false;
  postObjofImageToView;
  sendEmailToAll = false;
  peopleModalHeader;

  editTaggedFriendsArray: any = [];
  taggedFriends = [];

  editImageArray = [];
  postID;
  editPostTitle;
  editPostvisibilityVal;
  editPostedOnemp;
  loadPostOffSet = 0;
  maxOffset;

  loadMorePosts = false;
  showNoMorePosts = false;

  greetingObj;
  greetingLoaded = false;
  getImages = false;

  errorCode;
  errorType;
  errorMessage;

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/feed/upload/' + Profile.EMPLOYEE_ID;
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
      'font-family': 'roboto',
      'border-radius': '3px'
    },
    previewPanel: {
      'display': 'none'
    }
  };

  sharePost;
  showPostBeforeSharing = false;
  originalSharePostID;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  showResizeModalDialog = '';
  showResizeModalDialogContent = '';

  pagesListForUser = [];
  showPagesList = false;
  postPrivacyList = ['Public', 'Friends'];

  callingFrom = 'feed';

  postSubscription:Subscription;
  loadFeedSubscription:Subscription;
  editPrivacy: string;
  currentHour = 0;
  greetingType = '';

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone, private httpservice: FeedServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService, private pagehttpservice: PageServiceService,
              private modalUiService: ModalUiServiceService) {
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

    if (this.isMobile === true) {
      this.showResizeModalDialog = ' modal-sm';
      this.showResizeModalDialogContent = '';
    } else if (this.isTablet === true) {
      this.showResizeModalDialog = '';
      this.showResizeModalDialogContent = 'resided-modal-content';
    } else if (this.isDesktop === true) {
      this.showResizeModalDialog = '';
      this.showResizeModalDialogContent = 'resided-modal-content';
    }
  }

  ngOnInit() {
    this.currentHour = new Date().getHours();
    if (0 <= this.currentHour && this.currentHour < 12) {
      this.greetingType = 'Morning';
    } else if (12 <= this.currentHour && this.currentHour < 16) {
      this.greetingType = 'Afternoon';
    } else if (16 <= this.currentHour && this.currentHour < 21) {
      this.greetingType = 'Evening';
    } else {
      this.greetingType = 'Night';
    }
    this.loadFeedSubscription = this.interCommunicationServiceService.loadFeed.subscribe(loadFeed => {
      if (loadFeed) {
        this.loadFeed(this.loadPostOffSet);
      }
    });

    this.postSubscription =this.interCommunicationServiceService.postDivScrolling.subscribe(scroll => {
      if (scroll && scroll === 'scrolling') {

        this.loadMorePosts = true;
        if (this.loadPostOffSet <= this.maxOffset) {
          this.loadPostOffSet = this.loadPostOffSet + 1;
          this.httpservice.getFeed(this.loadPostOffSet)
              .subscribe(
                (data: any) => {
                  for (let key in data) {
                    if (data.length === 0) {
                      this.showNoMorePosts = true;
                      this.loadMorePosts = false;
                    } else {
                      this.postList.push(data[key]);
                    }
                  }
                  this.loadMorePosts = false;
                }, error => {
                  this.loadMorePosts = false;
                  this.showNoMorePosts = true;
                }
              );
        }

      }
    });



    this.loadMaxOffset();
    this.loadFeed(this.loadPostOffSet);
    this.loadNames();
    this.loadPagesForUsers();
  }

  onClickOpenPostSave() {
    (<HTMLInputElement>document.getElementById('savePostOpen')).click();
    (<HTMLInputElement>document.getElementById('writePost')).focus();
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  loadPagesForUsers() {
    this.pagehttpservice.getPagesForUser()
      .subscribe(
        (data: any) => {
          if (data.length > 1) {
            this.pagesListForUser = data;
            this.showPagesList = true;
          }
        }
      );
  }

  loadFeed(offsetCount) {
    this.httpservice.getFeed(offsetCount)
      .subscribe(
        (data: any) => {
          this.postList = data;
          this.postLoading = false;
          if (this.postList.length === 0) {
            this.dataLoaded = false;
          } else {
            this.dataLoaded = true;
          }
        }
      );
    this.loadMorePosts = false;
    this.showNoMorePosts = false;
  }

  loadComments(postId, fromWhere) {
    let obj = this.postList.find(o => o.id === postId);
    if (obj.postComments.length <= 1) {
      this.httpservice.getFeedComments(postId)
        .subscribe(
          (data: any) => {
            switch (fromWhere) {
              case 'fromfeed':
                obj.postComments = data;
                break;
              case 'frommodal':
                this.postObjofImageToView.postComments = data;
                break;
            }
          }
        );
    } else {
      obj.postComments.splice(1);
    }
  }

  loadNames() {
    // this.httpservice.getNameList()
    //   .subscribe(
    //     (data: any) => {
    //       this.fullNameList = data.empNames;
    //     }
    //   );

    this.interCommunicationServiceService.getCompanyEmployees
      .subscribe( employeeResponse => {
        if (employeeResponse.status) {
          this.fullNameList = Profile.EMPLOYEE_NAME_LIST.empNames;
        }
      });
  }

  loadMaxOffset() {
    this.httpservice.getMaxOffset()
      .subscribe(
        (data: any) => {
          this.maxOffset = data.data.offsetCount;
        }
      );
  }

  loadMorePost(postId) {
    this.httpservice.getLoadMorePost(postId, this.employeeId)
      .subscribe(
        (data: any) => {
          for (let key in this.postList) {
            if (this.postList[key].id === postId) {
              this.postList[key] = data[0];
            }
          }
        }
      );
  }

  loadIndividualPostForShare(e) {
    this.originalSharePostID = e;
    this.httpservice.getSinglePost(e, this.employeeId)
      .subscribe(
        (data: any) => {
          this.sharePost = data[0];
          this.showPostBeforeSharing = true;
        }
      );
  }

  addTags(from) {
    if (from === 'new') {
      const tagKey = (<HTMLInputElement>document.getElementById('tagInput')).value;

      if (tagKey.length === 0) {
        this.openErrorModal(2001, 'ERROR', '');
        (<HTMLInputElement>document.getElementById('tagInput')).value = '';
      } else {
        let obj = this.fullNameList.find(searchFor => searchFor.name === tagKey);
        if (this.fullNameList.indexOf(obj) >= 0) {
          this.taggedFriends.push(obj);
        } else {
          this.openErrorModal(2002, 'ERROR', '');
        }
        // Remove Duplicates from the list
        let index = this.fullNameList.indexOf(obj);
        this.fullNameList.splice(index, 1);

        (<HTMLInputElement>document.getElementById('tagInput')).value = '';
      }
    } else if (from === 'edit') {
      const edittagKey = (<HTMLInputElement>document.getElementById('edittagInput')).value;
      if (edittagKey.length === 0) {
        this.openErrorModal(2001, 'ERROR', '');
      } else {
        let obj = this.fullNameList.find(searchFor => searchFor.name === edittagKey);

        if (this.fullNameList.indexOf(obj) >= 0) {
          this.editTaggedFriendsArray.push(obj);
        } else {
          this.openErrorModal(2002, 'ERROR', '');
        }

        // Remove Duplicates from the list
        let index = this.fullNameList.indexOf(obj);
        this.fullNameList.splice(index, 1);

        (<HTMLInputElement>document.getElementById('edittagInput')).value = '';
      }
    }
  }

  inputKeyPress(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      (<HTMLInputElement>document.getElementById('tagBtn')).click();
      return false;
    }
    return true;
  }

  untagFriend(e, f) {
    if (f === 'new') {
      let index = this.taggedFriends.indexOf(e);
      if (index > -1) {
        this.taggedFriends.splice(index, 1);
      }
      this.fullNameList.push(e);
    } else if (f === 'edit') {
      let index = this.editTaggedFriendsArray.indexOf(e);
      if (index > -1) {
        this.editTaggedFriendsArray.splice(index, 1);
      }
      this.fullNameList.push(e);
    }
  }

  profileRedirect(employeeId, postedAs, postedPageObj) {
    switch (postedAs) {
      case 0:
        if (employeeId === Profile.EMPLOYEE_ID) {
          // location.reload();
          this.router.navigate(['./profile/main']);
        } else {
          Search.SEARCH_EMPLOYEE_ID = employeeId;
          localStorage.setItem('lsei_', employeeId);
          // location.reload();
          this.router.navigate(['./profile/_search']);
        }
        break;
      case 1:
        Page.PAGE_ID = postedPageObj.pageId;
        localStorage.setItem('pgid', postedPageObj.pageId);
        localStorage.setItem('pgnm', postedPageObj.pageName);
        // location.reload();
        this.router.navigate(['./page/main', postedPageObj.pageId]);
        break;
    }
  }

  postRedirect(e) {
    Feed.FEED_POST_ID = e;
    localStorage.setItem('FEED_POST_ID', e);
    this.router.navigate(['./feed/post', e]);
  }

  viewTaggedAll(postType, postID) {
    if (postType === 1) {
      this.peopleModalHeader = 'Tagged on this post';
      this.httpservice.getFeedTagged(postID)
        .subscribe(
          (data: any) => {
            this.taggedList = data;
          }
        );
    } else if (postType === 2) {
      this.peopleModalHeader = 'Liked this post';
      this.httpservice.getFeedLikers(postID)
        .subscribe(
          (data: any) => {
            this.taggedList = data;
          }
        );
    }
  }

  viewImageModal(postId, imageArray, image) {
    let obj = this.postList.find(o => o.id === postId);
    this.postObjofImageToView = obj;
    this.interCommunicationServiceService.changeImageArray(imageArray, image);
    this.showImageModal = true;
    this.getImages = true;
    this.showSaveQuoteModal('viewImageModal2');
  }

  emailToAll() {
    if (this.sendEmailToAll === false) {
      this.sendEmailToAll = true;
    } else if (this.sendEmailToAll === true) {
      this.sendEmailToAll = false;
    }
  }

  savePost() {
    const postVisibility = (<HTMLInputElement>document.getElementById('postVisibilitySelect')).value;
    if (postVisibility === 'Public') {
      this.postVisibilityVal = 0;
    } else {
      this.postVisibilityVal = 1;
    }

    const postBody = (<HTMLInputElement>document.getElementById('writePost')).value;
    const postImage = this.imageUploadArray;
    const taggedEmp = [];

    let postAsId;

    if (this.showPagesList) {
      let postAs = (<HTMLInputElement>document.getElementById('postPostAs')).value;
      for (let key in this.pagesListForUser) {
        if (this.pagesListForUser[key].pageName === postAs) {
          postAsId = this.pagesListForUser[key].pageId;
        }
      }
    } else {
      postAsId = Profile.EMPLOYEE_ID;
    }

    for (let key in this.taggedFriends) {
      taggedEmp.push(this.taggedFriends[key].empNo);
    }

    const json = {
      'title': null,
      'content': postBody,
      'postedOn': '',
      'postType': 'post',
      'visibility': this.postVisibilityVal,
      'images': postImage,
      'taggedInEmployees': taggedEmp,
      'emailToAll': this.sendEmailToAll,
      'postedByPage': {
        'pageId': postAsId
      }
    };

    if (postBody.length === 0 && postImage.length === 0) {
      this.openErrorModal(2000, 'ERROR', '');
    } else {
      this.httpservice.saveWallPost(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.postList.unshift(data.data);
              (<HTMLInputElement>document.getElementById('writePost')).value = '';
              (<HTMLInputElement>document.getElementById('tagInput')).value = '';
              // (<HTMLInputElement>document.getElementsByClassName('img-ul-clear')[0]).click();
            } else if (data.httpStatusCode === 500) {
              this.loadFeed(0);
            }
          }
        );
    }
    this.loadNames();
    this.taggedFriends = [];
    this.imageUploadArray = [];
  }

  editPostOnClick(a, b, c, d, e, g) {
    let taggedGetArray: any = [];

    this.httpservice.getFeedTagged(a)
      .subscribe(
        (data: any) => {
          taggedGetArray = data;

          this.editTaggedFriendsArray = taggedGetArray;

          for (let key in this.editTaggedFriendsArray) {
            let index = this.fullNameList.indexOf(this.editTaggedFriendsArray[key]);
            this.fullNameList.splice(index, 1);
          }

          this.postID = a;
          this.editPostTitle = b;
          (<HTMLInputElement>document.getElementById('editPostContent')).value = c;
          if (d === 0) {
            this.editPrivacy = 'Public';
            // (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value = 'Public';
          } else if (d === 1 && this.editTaggedFriendsArray.length !== 0 ) {
            this.editPrivacy  = 'Friends';
            // (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value = 'Friends';
          } else {
            this.editPrivacy  = 'Only me';
            // (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value = 'Only me';
          }
          this.editImageArray = e;

          this.editPostedOnemp = g;
        }
      );
  }

  editPost() {
    const postVisibility = (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value;
    if (postVisibility === 'Public') {
      this.editPostvisibilityVal = 0;
    } else if (postVisibility === 'Friends' || postVisibility === 'Only me') {
      this.editPostvisibilityVal = 1;
    }

    if (this.editPostedOnemp === null) {
      this.editPostedOnemp = '';
    }

    const postBody = (<HTMLInputElement>document.getElementById('editPostContent')).value;
    const postImage = this.editImageArray;

    let taggedEmp = [];

    for (let key in this.editTaggedFriendsArray) {
      taggedEmp.push(this.editTaggedFriendsArray[key].empNo);
      taggedEmp.push(this.editTaggedFriendsArray[key].empNo);
    }

    for (let key in taggedEmp) {
      if (taggedEmp[key] === null || taggedEmp[key] === undefined) {
        var index = taggedEmp.indexOf(taggedEmp[key]);
        if (index > -1) {
          taggedEmp.splice(index, 1);
        }
      }
    }

    const json = {
      'id': this.postID,
      'title': this.editPostTitle,
      'content': postBody,
      'postedOn': this.editPostedOnemp,
      'visibility': this.editPostvisibilityVal,
      'images': postImage,
      'taggedInEmployees': taggedEmp
    };

    if (postBody.length === 0 && postImage.length === 0) {
      this.openErrorModal(2000, 'ERROR', '');
    } else {
      this.httpservice.editWallPost(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              for (let key in this.postList) {
                if (this.postList[key].id === this.postID) {
                  this.postList[key] = data.data;
                }
              }
              (<HTMLInputElement>document.getElementById('writePost')).value = '';
              (<HTMLInputElement>document.getElementById('edittagInput')).value = '';
            } else if (data.httpStatusCode === 500) {
            }
          }
        );
    }
    this.loadNames();
    this.imageUploadArray = [];
    this.editTaggedFriendsArray = [];
    this.editImageArray = [];
  }

  deletePostMenuClick(e) {
    this.postID = e;
    this.showSaveQuoteModal('deletePost');
  }

  deletePost() {
    this.httpservice.deleteWallPost(this.postID, this.employeeId)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            for (let key in this.postList) {
              if (this.postList[key].id === this.postID) {
                const deleteIndex = parseInt(key);
                if (deleteIndex > -1) {
                  this.postList.splice(deleteIndex, 1);
                }
              }
            }
            // this.loadFeed(0);
          }
        }
      );
  }

  modalClose() {
    // this.loadFeed(0);
    this.imageUploadArray = [];
    this.editTaggedFriendsArray = [];
    this.editImageArray = [];
    this.sharePost = '';
    this.originalSharePostID = '';
    this.showPostBeforeSharing = false;
  }

  likeUnlikePost(postId, operation, fromWhere) {
    let obj = this.postList.find(o => o.id === postId);

    if (obj.viewerAlreadyLiked === true) {
      obj.viewerAlreadyLiked = false;
      if (obj.likerString === '') {
        obj.likerString = '';
      } else if (obj.likerString !== '') {
        obj.likerString = obj.likerString;
      }
    } else if (obj.viewerAlreadyLiked === false) {
      obj.viewerAlreadyLiked = true;
      if (obj.likerString === '') {
        obj.likerString = 'You liked this';
      } else if (obj.likerString !== '') {
        obj.likerString = 'You and ' + obj.actualLikeCount + ' others liked this';
      }
    }

    const json = {
      'postId': postId,
      'liked': operation
    };

    this.httpservice.likeWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            switch (fromWhere) {
              case 'fromfeed':
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                  }
                }
                break;
              case 'frommodal':
                this.postObjofImageToView = data.data;
                break;
            }
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  commentPost(postId, fromWhere) {
    let comment = '';
    if (fromWhere === 'frommodal') {
       comment = (<HTMLInputElement>document.getElementById('comType' + postId)).value;
    } else {
      comment = (<HTMLInputElement>document.getElementById('postComment' + postId)).value;
    }
    const json = {
      'postId': postId,
      'text': comment
    };

    this.httpservice.saveCommentWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            if (fromWhere === 'frommodal') {
              (<HTMLInputElement>document.getElementById('comType' + postId)).value = '';
            } else {
              (<HTMLInputElement>document.getElementById('postComment' + postId)).value = '';
            }
            switch (fromWhere) {
              case 'fromfeed':
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                  }
                }
                break;
              case 'frommodal':
                this.postObjofImageToView = data.data;
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                  }
                }
                break;
            }
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  deleteComment(commentid, postId, fromWhere) {
    this.httpservice.deleteCommentWallPost(commentid, postId)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            switch (fromWhere) {
              case 'fromfeed':
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                  }
                }
                break;
              case 'frommodal':
                this.postObjofImageToView = data.data;
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                  }
                }
                break;
            }
          }
        }
      );
  }

  hideFromFeed(e, f) {
    const json = {
      'postId': e,
      'empNo': this.employeeId,
      'postOrFeed': f
    };

    this.httpservice.hideFromFeedPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadFeed(0);
          } else if (data.httpStatusCode === 500) {
          }
        }
      );

  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    if ($(window).scrollTop() + window.innerHeight >= $(document).height() - 50) {
      $(window).unbind('scroll');
      this.loadMorePosts = true;
      if (this.loadPostOffSet <= this.maxOffset) {
        this.loadPostOffSet = this.loadPostOffSet + 1;
        this.httpservice.getFeed(this.loadPostOffSet)
          .subscribe(
            (data: any) => {
              for (let key in data) {
                if (data.length === 0) {
                  this.showNoMorePosts = true;
                  this.loadMorePosts = false;
                } else {
                  this.postList.push(data[key]);
                }
              }
              this.loadMorePosts = false;
            }, error => {
              this.loadMorePosts = false;
              this.showNoMorePosts = true;
            }
          );
      }
    }
  }

  postGreeting() {
    const json = {
      'emp_no': this.employeeId
    };

    this.httpservice.postGreeting(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  // Image Upload
  uploadFinish(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.imageUploadArray.push(uploadedImage);
  }

  deleteUploadedImage(url) {
    let index = this.imageUploadArray.indexOf(url);
    if (index > -1) {
      this.imageUploadArray.splice(index, 1);
    }
  }

  // post Share
  sharePublishPost() {
    const postVisibility = (<HTMLInputElement>document.getElementById('sharepostVisibilitySelect')).value;
    if (postVisibility === 'Public') {
      this.postVisibilityVal = 0;
    } else {
      this.postVisibilityVal = 1;
    }

    const postBody = (<HTMLInputElement>document.getElementById('sharePostContent')).value;
    const taggedEmp = [];
    const sharePostID = this.originalSharePostID;

    const json = {
      'content': postBody,
      'postType': 'share',
      'visibility': this.postVisibilityVal,
      'taggedInEmployees': taggedEmp,
      'extraId': sharePostID
    };

    this.httpservice.saveWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadFeed(0);
            // this.postList.unshift(data.data);
            // (<HTMLInputElement>document.getElementById('sharePostContent')).value = '';
          } else if (data.httpStatusCode === 500) {
            this.loadFeed(0);
            this.sharePost = '';
            this.originalSharePostID = '';
          }
        }
      );
    this.imageUploadArray = [];
    this.sharePost = '';
    this.originalSharePostID = '';
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

  ngOnDestroy(){

    if(this.loadFeedSubscription){
      this.loadFeedSubscription.unsubscribe();
    }

    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

}
