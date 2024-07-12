import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationServiceService} from '../../../../../../service/notification-service.service';

@Component({
  selector: 'app-feed-notification',
  templateUrl: './feed-notification.component.html',
  styleUrls: ['./feed-notification.component.css']
})
export class FeedNotificationComponent implements OnInit {
  feedNotificationArray = [];
  showList = false;

  constructor(private httpservice: NotificationServiceService, public router: Router) {
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.httpservice.getFeedNotifications()
      .subscribe(
        (data: any) => {
          if (data.length > 0) {
            this.feedNotificationArray = data;
            this.showList = true;
          }
        }
      );
  }

  feedNotificationRedirect() {
    this.router.navigate(['./notification/main']);
  }
}
