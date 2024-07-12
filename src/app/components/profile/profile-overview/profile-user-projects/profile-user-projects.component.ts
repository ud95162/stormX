import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-user-projects',
  templateUrl: './profile-user-projects.component.html',
  styleUrls: ['./profile-user-projects.component.css']
})
export class ProfileUserProjectsComponent implements OnInit {

  @Output() profileBodyEventEmitter = new EventEmitter();

  projects = [
  ];


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
