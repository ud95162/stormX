import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-rec-res-growth-turn-summary',
  templateUrl: './rec-res-growth-turn-summary.component.html',
  styleUrls: ['./rec-res-growth-turn-summary.component.css']
})
export class RecResGrowthTurnSummaryComponent implements OnChanges {

  @Input() recruitmentCount;
  @Input() resignationCount;
  @Input() headGrowthCount;
  @Input() turnOverCount;
  constructor() { }

  ngOnChanges() {
  }

}
