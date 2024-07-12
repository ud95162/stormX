import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../../../../_global/profile';
import {GeneralOps} from "../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-event-view-sidebar',
  templateUrl: './event-view-sidebar.component.html',
  styleUrls: ['./event-view-sidebar.component.css']
})
export class EventViewSidebarComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  @Input() employeeId;
  callingFrom = 'event';

  constructor() {
  }

  ngOnInit() {
  }

}
