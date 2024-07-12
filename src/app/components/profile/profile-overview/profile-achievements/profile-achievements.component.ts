import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-profile-achievements',
  templateUrl: './profile-achievements.component.html',
  styleUrls: ['./profile-achievements.component.css']
})
export class ProfileAchievementsComponent implements OnInit {

  @Output() profileBodyEventEmitter = new EventEmitter();

  achievements = [];

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
