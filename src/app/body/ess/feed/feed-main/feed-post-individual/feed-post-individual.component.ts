import {Component, NgZone, OnInit} from '@angular/core';
import {Profile} from '../../../../../_global/profile';
import {FeedServiceService} from '../../../../../service/feed-service.service';
import {Router} from '@angular/router';
import {Feed} from '../../../../../_global/feed';
import {Search} from '../../../../../_global/search';
import {ResponsiveService} from '../../../../../utility/responsive-service';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';
import {Page} from '../../../../../_global/page';
import {environment} from '../../../../../../environments/environment';
import {ModalUiServiceService} from "../../../../../service/ui-services/modal-ui-service.service";

@Component({
  selector: 'app-feed-post-individual',
  templateUrl: './feed-post-individual.component.html',
  styleUrls: ['./feed-post-individual.component.css']
})
export class FeedPostIndividualComponent implements OnInit {
  employeeID = Profile.EMPLOYEE_ID;
  luim_ = Profile.LOGGED_IN_IMAGE;
  dataLoaded = false;
  individualPostData;
  taggedList = [];
  fullNameList = [];
  addTagFriends = [];
  imageUploadArray = [];
  showImageModal = false;
  peopleModalHeader;

  editTaggedFriendsArray = [];

  editImageArray = [];
  postID;
  editPostTitle;
  editPostvisibilityVal;
  editPostedOnemp;

  errorCode;
  errorType;
  errorMessage;

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/feed/upload/' + Profile.EMPLOYEE_ID;
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
  postVisibilityVal;

  // for UI Responsive
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  showResizeModalDialog = '';
  showResizeModalDialogContent = '';

  callingFrom = 'feed';

  constructor(private responsiveService: ResponsiveService,
              private zone: NgZone, public router: Router, private feedServiceService: FeedServiceService,
              private interCommunicationServiceService: InterCommunicationServiceService,
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
    this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
    this.loadNames();
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  loadIndividualPost(postId, employeeId) {
    this.feedServiceService.getSinglePost(postId, employeeId)
      .subscribe(
        (data: any) => {
          if (data.status === 400) {
            this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
          } else {
            this.individualPostData = data[0];
            this.dataLoaded = true;
          }
        }
      );
  }

  loadComments(postId, fromWhere) {
    if (this.individualPostData.postComments.length <= 1) {
      this.feedServiceService.getFeedComments(postId)
        .subscribe(
          (data: any) => {
            this.individualPostData.postComments = data;

            // switch (fromWhere) {
            //   case 'fromfeed':
            //     this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
            //     break;
            //   case 'frommodal':
            //     this.individualPostData.postComments = data.data;
            //     break;
            // }
          }
        );
    } else {
      this.individualPostData.postComments.splice(1);
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

  loadMorePost(postId) {
    this.feedServiceService.getLoadMorePost(postId, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.individualPostData = data[0];
        }
      );
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

  viewImageModal(postid, imageArray, image) {
    this.interCommunicationServiceService.changeImageArray(imageArray, image);
    this.showImageModal = true;
  }

  editPostOnClick(a, b, c, d, e, g) {
    let taggedGetArray: any = [];

    this.feedServiceService.getFeedTagged(a)
      .subscribe(
        (data: any) => {
          taggedGetArray = data;
          this.editTaggedFriendsArray = taggedGetArray;

          this.postID = a;
          this.editPostTitle = b;
          (<HTMLInputElement>document.getElementById('editPostContent')).value = c;
          if (d === 0) {
            (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value = 'Public';
          } else if (d === 1) {
            (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value = 'Friends';
          }
          this.editImageArray = e;

          this.editPostedOnemp = g;
        }
      );
  }

  addTags(from) {
    if (from === 'edit') {
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

  untagFriend(name, from) {
    if (from === 'edit') {
      let index = this.editTaggedFriendsArray.indexOf(name);
      if (index > -1) {
        this.editTaggedFriendsArray.splice(index, 1);
      }
      this.fullNameList.push(name);
    }
  }

  editPost() {
    const postVisibility = (<HTMLInputElement>document.getElementById('editpostVisibilitySelect')).value;
    if (postVisibility === 'Public') {
      this.editPostvisibilityVal = 0;
    } else if (postVisibility === 'Friends') {
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
              this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
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
  }

  deletePost() {
    this.feedServiceService.deleteWallPost(this.postID, Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.router.navigate(['./feed/main']);
          }
        }
      );
  }

  likeUnlikePost(postId, operation, fromWhere) {
    if (this.individualPostData.viewerAlreadyLiked === true) {
      this.individualPostData.viewerAlreadyLiked = false;
      if (this.individualPostData.likerString === '') {
        this.individualPostData.likerString = '';
      } else if (this.individualPostData.likerString !== '') {
        this.individualPostData.likerString = this.individualPostData.likerString;
      }
    } else if (this.individualPostData.viewerAlreadyLiked === false) {
      this.individualPostData.viewerAlreadyLiked = true;
      if (this.individualPostData.likerString === '') {
        this.individualPostData.likerString = 'You liked this';
      } else if (this.individualPostData.likerString !== '') {
        this.individualPostData.likerString = 'You and ' + this.individualPostData.actualLikeCount + ' others liked this';
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
                this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
                break;
              case 'frommodal':
                this.individualPostData = data.data;
                break;
            }
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  commentPost(postId, fromWhere) {
    console.log(postId)
    const comment = (<HTMLInputElement>document.getElementById('postComment' + postId)).value;
    const json = {
      'postId': postId,
      'text': comment
    };

    console.log(json)

    this.feedServiceService.saveCommentWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            (<HTMLInputElement>document.getElementById('postComment' + postId)).value = '';
            switch (fromWhere) {
              case 'fromfeed':
                this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
                break;
              case 'frommodal':
                this.individualPostData = data.data;
                break;
            }
          } else if (data.httpStatusCode === 500) {
            this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
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
                this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
                break;
              case 'frommodal':
                this.individualPostData = data.data;
                break;
            }
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
            this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
          } else if (data.httpStatusCode === 500) {
          }
        }
      );

  }

  // Image Upload

  modalClose() {
    // this.loadFeed();
    this.imageUploadArray = [];
    this.addTagFriends = [];
    this.editTaggedFriendsArray = [];
    this.editImageArray = [];
    this.sharePost = '';
    this.originalSharePostID = '';
    this.showPostBeforeSharing = false;
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
            this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
            // this.postList.unshift(data.data);
            // (<HTMLInputElement>document.getElementById('sharePostContent')).value = '';
          } else if (data.httpStatusCode === 500) {
            this.loadIndividualPost(Feed.FEED_POST_ID, Profile.EMPLOYEE_ID);
            this.sharePost = '';
            this.originalSharePostID = '';
          }
        }
      );
    this.imageUploadArray = [];
    this.addTagFriends = [];
    this.sharePost = '';
    this.originalSharePostID = '';
  }

  showSaveQuoteModal(modalId) {
    this.modalUiService.showModal(modalId);
  }

  hideModal(modalId) {
    this.modalUiService.hideModal(modalId);
  }
}
