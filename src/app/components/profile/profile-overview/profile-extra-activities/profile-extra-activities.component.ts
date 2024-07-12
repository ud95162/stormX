import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-extra-activities',
  templateUrl: './profile-extra-activities.component.html',
  styleUrls: ['./profile-extra-activities.component.css']
})
export class ProfileExtraActivitiesComponent implements OnInit {

  @Output() profileBodyEventEmitter = new EventEmitter();

  extra = [];

  constructor() { }

  ngOnInit() {
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
