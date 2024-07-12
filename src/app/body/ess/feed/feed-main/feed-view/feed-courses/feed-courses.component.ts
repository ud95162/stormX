import {Component, Input, OnInit} from '@angular/core';
import {FeedServiceService} from '../../../../../../service/feed-service.service';
import {Router} from '@angular/router';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-feed-courses',
  templateUrl: './feed-courses.component.html',
  styleUrls: ['./feed-courses.component.css']
})
export class FeedCoursesComponent implements OnInit {
  @Input() employeeId: any;

  dataLoaded = false;
  sCourseList = [];
  cCourseList = [];

  constructor(private httpservice: FeedServiceService, public router: Router) {
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.httpservice.getCourseList(this.employeeId)
      .subscribe(
        (data: any) => {
          this.sCourseList = data.specifiedCourses;
          this.cCourseList = data.commonCourses;
          if (data === 0) {
            this.dataLoaded = false;
          } else {
            this.dataLoaded = true;
          }
        }
      );
  }

  courseRead(a) {
    const json = {
      'courseId': a,
      'empNo': Profile.EMPLOYEE_ID,
      'readStatus': 1
    };

    this.httpservice.postCourseRead(json)
      .subscribe(
        (data: any) => {
          if (data.httpStatusCode === 200) {
            this.loadCourses();
          } else if (data.httpStatusCode === 500) {
            this.loadCourses();
          }
        }
      );
  }
}
