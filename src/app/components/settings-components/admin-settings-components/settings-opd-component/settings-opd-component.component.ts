import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-opd-component',
  templateUrl: './settings-opd-component.component.html',
  styleUrls: ['./settings-opd-component.component.css']
})
export class SettingsOpdComponentComponent implements OnInit {

  section = 'MaritalOPD';
  constructor() { }

  ngOnInit() {
  }

  changeSection(section) {
    this.section = section;
  }

}
