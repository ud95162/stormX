import {Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output} from '@angular/core';
import {ResponsiveService} from '../../../../utility/responsive-service';
import {Feed} from '../../../../_global/feed';
import {Search} from '../../../../_global/search';
import {Profile} from '../../../../_global/profile';
import {FeedServiceService} from '../../../../service/feed-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {Router} from '@angular/router';
import {Page} from '../../../../_global/page';
import {PageServiceService} from '../../../../service/page-service.service';
import {environment} from '../../../../../environments/environment';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css']
})
export class ProfileFeedComponent implements OnInit {
  @Input() employeeId;

  componentPermission = [];

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/feed/upload/' + Profile.EMPLOYEE_ID;
  uploadImageSize = environment.POST_IMAGE_SIZE;

  userType = Profile.USER_TYPE;
  luim_ = Profile.LOGGED_IN_IMAGE;
  dataLoaded = false;
  postLoading = true;
  postList = [];
  taggedList = [];
  fullNameList = [];
  postVisibilityVal;
  addTagFriends = [];
  addTagFriendsName = [];
  imageUploadArray = [];
  showImageModal = false;
  postObjofImageToView;
  sendEmailToAll = false;
  peopleModalHeader;

  editTaggedFriendsArray = [];
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
  errorCode;
  errorType;
  errorMessage;
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
  postPrivacyListNew = ['Public', 'Only me'];

  callingFrom = 'feed';

  postText: string;
  privacy: any;
  postFilter: any;
  filter = 2; // no filter
  publicPostList = [];
  privatePostList = [];
  publicPrivatePostList = [];
  editPrivacy: any;
  activeFilterPrivate = 'a-btn--trinity';
  activeFilterPublic = 'a-btn--trinity';
  getImages = false;

  // for active filter

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone, private feedServiceService: FeedServiceService, public router: Router,
              private interCommunicationServiceService: InterCommunicationServiceService,
              private pageServiceService: PageServiceService,
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
    this.loadMaxOffset();
    this.loadPosts(this.loadPostOffSet);
    this.loadNames();
    this.loadPagesForUsers();
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  loadPagesForUsers() {
    this.pageServiceService.getPagesForUser()
      .subscribe(
        (data: any) => {
          if (data.length > 1) {
            this.pagesListForUser = data;
            this.showPagesList = true;
          }
        }
      );
  }

  loadPosts(e) {
    this.feedServiceService.getWallPost(this.employeeId, e)
      .subscribe(
        (data: any) => {
          this.publicPrivatePostList = data;
          this.postList = this.publicPrivatePostList;
          for (let post of this.postList) {
            if (post.visibility === 0) {
              this.publicPostList.push(post);
            } else {
              this.privatePostList.push(post);
            }
          }
          this.postLoading = false;
          if (this.postList.length === 0) {
            this.dataLoaded = false;
          } else {
            this.dataLoaded = true;
          }
        }
      );
  }

  loadComments(postID, fromWhere) {
    const obj = this.postList.find(o => o.id === postID);

    if (obj.postComments.length <= 1) {
      this.feedServiceService.getFeedComments(postID)
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
    this.feedServiceService.getNameList()
      .subscribe(
        (data: any) => {
          this.fullNameList = data.empNames;
        }
      );
  }

  loadMaxOffset() {
    this.feedServiceService.getMaxOffset()
      .subscribe(
        (data: any) => {
          this.maxOffset = data.data.offsetCount;
        }
      );
  }

  loadMorePost(postId) {
    this.feedServiceService.getLoadMorePost(postId, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          for (const key in this.postList) {
            if (this.postList[key].id === postId) {
              this.postList[key] = data[0];
            }
          }
        }
      );
  }

  loadIndividualPostForShare(e) {
    this.originalSharePostID = e;
    this.feedServiceService.getSinglePost(e, Profile.EMPLOYEE_ID)
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

      const Text = (<HTMLInputElement>document.querySelector('option[value="' + tagKey + '"]'));


      console.log(Text);
      console.log(tagKey.length);

      if (tagKey.length === 0) {
        this.openErrorModal(2001, 'ERROR', '');
        (<HTMLInputElement>document.getElementById('tagInput')).value = '';
      } else {
        const obj = this.fullNameList.find(searchFor => searchFor.name === tagKey);
        if (this.fullNameList.indexOf(obj) >= 0) {
          this.taggedFriends.push(obj);
        } else {
          this.openErrorModal(2002, 'ERROR', '');
        }
        // Remove Duplicates from the list
        const index = this.fullNameList.indexOf(obj);
        this.fullNameList.splice(index, 1);

        (<HTMLInputElement>document.getElementById('tagInput')).value = '';
      }
    } else if (from === 'edit') {
      const edittagKey = (<HTMLInputElement>document.getElementById('edittagInput')).value;
      if (edittagKey.length === 0) {
        this.openErrorModal(2001, 'ERROR', '');
      } else {
        const obj = this.fullNameList.find(searchFor => searchFor.name === edittagKey);

        if (this.fullNameList.indexOf(obj) >= 0) {
          this.editTaggedFriendsArray.push(obj);
        } else {
          this.openErrorModal(2002, 'ERROR', '');
        }

        // Remove Duplicates from the list
        const index = this.fullNameList.indexOf(obj);
        this.fullNameList.splice(index, 1);

        (<HTMLInputElement>document.getElementById('edittagInput')).value = '';
      }
    }
  }

  inputKeyPress(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      try {
        (<HTMLInputElement>document.getElementById('tagBtn')).click();
      }
      catch (e) {
        console.log(e);
        this.addTags('new');
      }
      return false;
    }
    return true;
  }

  untagFriend(e, f) {
    if (f === 'new') {
      const index = this.taggedFriends.indexOf(e);
      if (index > -1) {
        this.taggedFriends.splice(index, 1);
      }
      this.fullNameList.push(e);
    } else if (f === 'edit') {
      const index = this.editTaggedFriendsArray.indexOf(e);
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
          if (this.employeeId === Profile.EMPLOYEE_ID) {
            location.reload();
          } else {
            this.router.navigate(['./profile/main']);
          }
        } else {
          Search.SEARCH_EMPLOYEE_ID = employeeId;
          localStorage.setItem('lsei_', employeeId);
          if (this.employeeId === Profile.EMPLOYEE_ID) {
            this.router.navigate(['./profile/_search']);
          } else {
            location.reload();
          }
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
      this.feedServiceService.getFeedTagged(postID)
        .subscribe(
          (data: any) => {
            this.taggedList = data;
          }
        );
    } else if (postType === 2) {
      this.peopleModalHeader = 'Liked this post';
      this.feedServiceService.getFeedLikers(postID)
        .subscribe(
          (data: any) => {
            this.taggedList = data;
          }
        );
    }
  }

  viewImageModal(postId, imageArray, image) {
    const obj = this.postList.find(o => o.id === postId);
    this.postObjofImageToView = obj;
    this.interCommunicationServiceService.changeImageArray(imageArray, image);
    this.showImageModal = true;
    this.getImages = true;
    console.log('postObjofImageToView', this.postObjofImageToView)
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
    // const postVisibility = (<HTMLInputElement>document.getElementById('postVisibilitySelect')).value;
    const postVisibility = this.privacy;
    if (postVisibility === 'Public') {
      this.postVisibilityVal = 0;
    } else {
      this.postVisibilityVal = 1;
    }

    let postedOnEmployee;

    if (this.employeeId === Profile.EMPLOYEE_ID) {
      postedOnEmployee = '';
    } else {
      postedOnEmployee = this.employeeId;
    }

    const postBody = (<HTMLInputElement>document.getElementById('writePost')).value;
    const postImage = this.imageUploadArray;
    const taggedEmp = [];

    let postAsId;

    if (this.showPagesList) {
      const postAs = (<HTMLInputElement>document.getElementById('postPostAs')).value;
      for (const key in this.pagesListForUser) {
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
      'postedOn': postedOnEmployee,
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
      this.feedServiceService.saveWallPost(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              // this.postList.unshift(data.data);
              this.publicPrivatePostList.unshift(data.data);
              if (data.data.visibility === 0) {
                this.publicPostList.unshift(data.data);
              }  else {
                this.privatePostList.unshift(data.data);
              }
              (<HTMLInputElement>document.getElementById('writePost')).value = '';
              (<HTMLInputElement>document.getElementById('tagInput')).value = '';
            } else if (data.httpStatusCode === 500) {
              this.loadPosts(0);
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

    this.feedServiceService.getFeedTagged(a)
      .subscribe(
        (data: any) => {
          taggedGetArray = data;

          this.editTaggedFriendsArray = taggedGetArray;

          for (let key in this.editTaggedFriendsArray) {
            const index = this.fullNameList.indexOf(this.editTaggedFriendsArray[key]);
            this.fullNameList.splice(index, 1);
          }

          this.postID = a;
          this.editPostTitle = b;
          (<HTMLInputElement>document.getElementById('editPostContent')).value = c;
          if (d === 0) {
            this.editPrivacy  = 'Public';
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
      this.feedServiceService.editWallPost(json)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              for (let key in this.postList) {
                if (this.postList[key].id === this.postID) {
                  this.publicPrivatePostList[key] = data.data;
                }
              }
              if (data.data.visibility === 0) {
                if (this.publicPostList.find(x => x.id === this.postID)) {
                  this.publicPostList[this.publicPostList.findIndex(x => x.id === this.postID)] = data.data;
                } else {
                  this.privatePostList.splice(this.privatePostList.findIndex(x => x.id === this.postID),1);
                  this.publicPostList.unshift(data.data);
                }
              } else if (data.data.visibility === 1) {
                if (this.privatePostList.find(x => x.id === this.postID)) {
                  this.privatePostList[this.privatePostList.findIndex(x => x.id === this.postID)] = data.data;
                } else {
                  this.publicPostList.splice(this.publicPostList.findIndex(x => x.id === this.postID), 1);
                  this.privatePostList.unshift(data.data);
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
    this.feedServiceService.deleteWallPost(this.postID, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            for (let key in this.postList) {
              if (this.postList[key].id === this.postID) {
                const deleteIndex = parseInt(key);
                if (deleteIndex > -1) {
                  // this.postList.splice(deleteIndex, 1);
                  if (this.filter === 2) {
                    this.publicPrivatePostList.splice(deleteIndex, 1);
                    if (this.postList[key].visibility === 0) {
                      this.publicPostList.splice(deleteIndex, 1);
                    } else {
                      this.privatePostList.splice(deleteIndex, 1);
                    }
                  } else {
                    if (this.postList[key].visibility === 0) {
                      this.publicPostList.splice(deleteIndex, 1);
                    } else {
                      this.privatePostList.splice(deleteIndex, 1);
                    }
                    const commonDeleteIndex = this.publicPrivatePostList.findIndex(x => x.id === this.postID);
                    this.publicPrivatePostList.splice(commonDeleteIndex, 1);
                  }
                }
              }
            }
            // this.loadPosts(0);
          }
          this.hideModal('deletePost');
        }
      );
  }

  modalClose() {
    // this.loadPosts(0);
    this.imageUploadArray = [];
    this.addTagFriends = [];
    this.editTaggedFriendsArray = [];
    this.editImageArray = [];
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

    this.feedServiceService.likeWallPost(json)
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
    const comment = (<HTMLInputElement>document.getElementById('postComment' + postId)).value;
    const json = {
      'postId': postId,
      'text': comment
    };

    this.feedServiceService.saveCommentWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            (<HTMLInputElement>document.getElementById('postComment' + postId)).value = '';
            switch (fromWhere) {
              case 'fromfeed':
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                    if (this.filter === 2) {
                      this.publicPrivatePostList[this.publicPrivatePostList.findIndex(x => x.id === postId)] = data.data;
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                    } else {
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                      const commonIndex = this.publicPrivatePostList.findIndex(x => x.id === postId);
                      this.publicPrivatePostList[commonIndex] = data.data;
                    }
                  }
                }
                break;
              case 'frommodal':
                this.postObjofImageToView = data.data;
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                    // console.log('DATA', data.data)
                    if (this.filter === 2) {
                      this.publicPrivatePostList[this.publicPrivatePostList.findIndex(x => x.id === postId)] = data.data;
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                    } else {
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                      const commonIndex = this.publicPrivatePostList.findIndex(x => x.id === postId);
                      this.publicPrivatePostList[commonIndex] = data.data;
                    }
                  }
                }
                break;
            }
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  hideFromFeed(e, f) {
    const json = {
      'postId': e,
      'empNo': Profile.EMPLOYEE_ID,
      'postOrFeed': f
    };

    this.feedServiceService.hideFromFeedPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadPosts(0);
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  deleteComment(commentid, postId, fromWhere) {
    this.feedServiceService.deleteCommentWallPost(commentid, postId)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            switch (fromWhere) {
              case 'fromfeed':
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                    if (this.filter === 2) {
                      this.publicPrivatePostList[this.publicPrivatePostList.findIndex(x => x.id === postId)] = data.data;
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        console.log('index', this.privatePostList.findIndex(x => x.id === postId))
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                    } else {
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                      const commonIndex = this.publicPrivatePostList.findIndex(x => x.id === postId);
                      this.publicPrivatePostList[commonIndex] = data.data;
                    }
                  }
                }
                break;
              case 'frommodal':
                this.postObjofImageToView = data.data;
                for (let key in this.postList) {
                  if (this.postList[key].id === postId) {
                    this.postList[key] = data.data;
                    if (this.filter === 2) {
                      this.publicPrivatePostList[this.publicPrivatePostList.findIndex(x => x.id === postId)] = data.data;
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                    } else {
                      if (this.postList[key].visibility === 0) {
                        this.publicPostList[this.publicPostList.findIndex(x => x.id === postId)] = data.data;
                      } else {
                        this.privatePostList[this.privatePostList.findIndex(x => x.id === postId)] = data.data;
                      }
                      const commonIndex = this.publicPrivatePostList.findIndex(x => x.id === postId);
                      this.publicPrivatePostList[commonIndex] = data.data;
                    }
                  }
                }
                break;
            }
          }
        }
      );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ($(window).scrollTop() + window.innerHeight >= $(document).height() - 50) {
      $(window).unbind('scroll');
      this.loadMorePosts = true;
      if (this.loadPostOffSet <= this.maxOffset) {
        this.loadPostOffSet = this.loadPostOffSet + 1;
        this.feedServiceService.getWallPost(this.employeeId, this.loadPostOffSet)
          .subscribe(
            (data: any) => {
              for (let key in data) {
                if (data.length === 0) {
                  this.showNoMorePosts = true;
                } else {
                  // this.postList.push(data[key]);
                  this.publicPrivatePostList.push(data[key]);
                  if (data[key].visibility === 0) {
                    this.publicPostList.push(data[key]);
                  } else if (data[key].visibility === 1) {
                    this.privatePostList.push(data[key]);
                  }
                }
              }
              if (this.filter === 0) {
                this.postList = this.publicPostList;
              } else if (this.filter === 1) {
                this.postList = this.privatePostList;
              } else {
                this.postList = this.publicPrivatePostList;
              }
              this.loadMorePosts = false;
            }
          );
      }
    }
  }

  // Image Upload
  uploadFinish(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.imageUploadArray.push(uploadedImage);
  }

  deleteUploadedImage(url) {
    // console.log('url', url)
    // console.log('imageUploadArray', this.imageUploadArray)
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
    const taggedEmp = this.addTagFriends;
    const sharePostID = this.originalSharePostID;

    const json = {
      'content': postBody,
      'postType': 'share',
      'visibility': this.postVisibilityVal,
      'taggedInEmployees': taggedEmp,
      'extraId': sharePostID
    };

    this.feedServiceService.saveWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadPosts(0);
            // this.postList.unshift(data.data);
            // (<HTMLInputElement>document.getElementById('sharePostContent')).value = '';
          } else if (data.httpStatusCode === 500) {
            this.loadPosts(0);
            this.sharePost = '';
            this.originalSharePostID = '';
          }
        }
      );
    this.imageUploadArray = [];
    this.addTagFriends = [];
    this.addTagFriendsName = [];
    this.sharePost = '';
    this.originalSharePostID = '';
  }


  addPost() {
    this.postText = (<HTMLInputElement>document.getElementById('writePostModalText')).value;
    this.privacy = (<HTMLInputElement>document.getElementById('postVisibilitySelect')).value;
    this.hideModal('newPostModal');
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }

  changePostFilter(visibility: number) {
    if (this.filter === visibility ) {
      this.filter = 2;
    } else {
      this.filter = visibility;
    }
    if (this.filter === 0) {
      this.postList = this.publicPostList;
      this.activeFilterPublic = 'a-btn--trinity__active';
      this.activeFilterPrivate = 'a-btn--trinity';
      // (<HTMLInputElement>document.getElementById('filterChangePublic')).classList.toggle('a-btn a-btn--trinity__active c-profile-posts__btn');
    } else if (this.filter === 1) {
      this.postList = this.privatePostList;
      this.activeFilterPublic = 'a-btn--trinity';
      this.activeFilterPrivate = 'a-btn--trinity__active';
      // (<HTMLInputElement>document.getElementById('filterChangePrivate')).classList.toggle('a-btn a-btn--trinity__active c-profile-posts__btn');
    } else {
      this.activeFilterPublic = 'a-btn--trinity';
      this.activeFilterPrivate = 'a-btn--trinity';
      this.postList = this.publicPrivatePostList;
    }
  }
}
