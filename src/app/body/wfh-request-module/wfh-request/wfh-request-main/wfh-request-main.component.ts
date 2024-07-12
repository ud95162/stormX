import { Component, OnInit } from '@angular/core';
import {GeneralOps} from "../../../../utility/GeneralOps";

@Component({
  selector: 'app-wfh-request-main',
  templateUrl: './wfh-request-main.component.html',
  styleUrls: ['./wfh-request-main.component.css']
})
export class WfhRequestMainComponent implements OnInit {

  componentPermission = new GeneralOps();
  activeTabName = 'hrView';
  constructor() { }

  ngOnInit() {
  }

  changeActiveNavTab(tabName: string) {
    this.activeTabName = tabName;
  }
}
