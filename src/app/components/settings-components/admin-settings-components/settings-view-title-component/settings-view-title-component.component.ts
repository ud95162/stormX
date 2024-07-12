import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-view-title-component',
  templateUrl: './settings-view-title-component.component.html',
  styleUrls: ['./settings-view-title-component.component.css']
})
export class SettingsViewTitleComponentComponent implements OnInit {
  @Input() settingsViewHeaderText;
  @Input() settingsViewDescriptionText;


  constructor() {
  }

  ngOnInit() {
  }

}
