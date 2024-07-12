import {Component, OnInit} from '@angular/core';
import {NotificationServiceService} from '../../../../../service/notification-service.service';
import {Profile} from '../../../../../_global/profile';
import {Router} from '@angular/router';
import {Search} from '../../../../../_global/search';
import {FeedServiceService} from '../../../../../service/feed-service.service';

@Component({
  selector: 'app-noti-bday-cal',
  templateUrl: './noti-bday-cal.component.html',
  styleUrls: ['./noti-bday-cal.component.css']
})
export class NotiBdayCalComponent implements OnInit {
  dataLoaded = false;
  previousWeek = [];
  thisWeek = [];
  nextWeek = [];
  searchText: string;

  constructor(private httpservice: NotificationServiceService, private wallpostService: FeedServiceService, public router: Router) {
  }

  ngOnInit() {
    this.loadBirthdays();
  }

  loadBirthdays() {
    this.httpservice.getBirthdays(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          const previousArray = [];
          const thisArray = [];
          const nextArray = [];
          for (let key in data) {
            previousArray.push(data[key].lastWeekBirthdayEmployees);
            thisArray.push(data[key].thisWeekBirthdayEmployees);
            nextArray.push(data[key].nextWeekBirthdayEmployees);
            this.dataLoaded = true;
          }
          this.previousWeek = previousArray[0];
          this.thisWeek = thisArray[0];
          this.nextWeek = nextArray[0];
        }
      );
  }

  bDayImgRedirect(e) {
    if (e === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = e;
      localStorage.setItem('lsei_', e);
      this.router.navigate(['./profile/_search']);
    }
  }

  postWishFromList(e) {
    const employeeid = Profile.USER_TOKEN;
    const birthdayWish = (<HTMLInputElement>document.getElementById('sayhappybirthday' + e)).value;

    const json = {
      'title': null,
      'content': birthdayWish,
      'postedOn': e,
      'postType': 'post',
      'visibility': 1,
      'images': [],
      'taggedInEmployees': []
    };

    this.wallpostService.saveWallPost(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadBirthdays();
          } else if (data.httpStatusCode === 500) {
          }
        }
      );
  }

  saveNewField(searchText) {
    console.log("searched Text", searchText);
  }

}
