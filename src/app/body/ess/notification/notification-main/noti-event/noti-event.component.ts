import {Component, OnInit} from '@angular/core';
import {NotificationServiceService} from '../../../../../service/notification-service.service';

@Component({
  selector: 'app-noti-event',
  templateUrl: './noti-event.component.html',
  styleUrls: ['./noti-event.component.css']
})
export class NotiEventComponent implements OnInit {
  dataLoaded = false;
  eventList = [];

  constructor(private httpservice: NotificationServiceService) {
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.httpservice.getEvents()
      .subscribe(
        (data: any) => {
          const eventArray = [];
          for (let key in data) {
            eventArray.push(data[key]);
            this.dataLoaded = true;
          }
          this.eventList = eventArray;
        }
      );
  }
}
