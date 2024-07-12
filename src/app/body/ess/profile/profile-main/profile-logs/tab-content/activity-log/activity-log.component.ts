import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileUserServiceService} from '../../../../../../../service/profile-user-service.service';
import {Profile} from '../../../../../../../_global/profile';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  viewLogCard = true;
  activityLogList = [];

  constructor(private httpservice: ProfileUserServiceService, public router: Router) {
  }

  ngOnInit() {
    this.loadActivityLogList();
  }

  loadActivityLogList() {
    this.httpservice.getActivityLog(Profile.EMPLOYEE_ID)
      .subscribe(
        (data: any) => {
          this.activityLogList = data;
        }
      );
  }

}
