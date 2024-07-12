import { Component, OnInit } from '@angular/core';
import {GeneralOps} from "../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-tab-attendance',
  templateUrl: './home-tab-attendance.component.html',
  styleUrls: ['./home-tab-attendance.component.css']
})
export class HomeTabAttendanceComponent implements OnInit {

  componentPermission = new GeneralOps();
  activeTab = 'projects';
  constructor() { }

  ngOnInit() {
  }

  changeActiveTab(tabName) {
    this.activeTab = tabName;
  }
}
