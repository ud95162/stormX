import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-daily-summary-cards',
  templateUrl: './daily-summary-cards.component.html',
  styleUrls: ['./daily-summary-cards.component.css']
})
export class DailySummaryCardsComponent implements OnInit {

  @Input() dailyPresentCount;
  @Input() dailyPresentPercentage;
  @Input() dailyOfficeCount;
  @Input() dailyOfficePercentage;
  @Input() dailyHomeCount;
  @Input() dailyHomePercentage;
  @Input() dailyLeaveCount;
  @Input() dailyLeavePercentage;
  @Input() dailyAbsentCount;
  @Input() dailyAbsentPercentage;
  @Input() isNotAWorkingDay;
  constructor() { }

  ngOnInit() {
  }

}
