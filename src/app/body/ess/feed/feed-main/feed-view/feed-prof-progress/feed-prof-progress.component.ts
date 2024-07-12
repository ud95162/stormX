import {Component, Input, OnInit} from '@angular/core';
import {FeedServiceService} from '../../../../../../service/feed-service.service';
import {Router} from '@angular/router';
import {Profile} from '../../../../../../_global/profile';

@Component({
  selector: 'app-feed-prof-progress',
  templateUrl: './feed-prof-progress.component.html',
  styleUrls: ['./feed-prof-progress.component.css']
})
export class FeedProfProgressComponent implements OnInit {
  @Input() employeeId: any;

  profileProgressData: any;
  showProgress = false;

  constructor(private httpservice: FeedServiceService, public router: Router) {
  }

  ngOnInit() {
    this.loadProfileProgress(this.employeeId);
  }


  loadProfileProgress(employeeId) {
    this.httpservice.getProfileProgress(employeeId)
      .subscribe(
        (data: any) => {
          Profile.PROFILE_PROGRESS = data;
          this.profileProgressData = data;
          this.showProgress = true;
        }
      );
  }
}
