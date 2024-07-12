import {Component, Input, OnInit} from '@angular/core';
import {CompanyWiseEmployeeSummaryCount} from "../../../models/StaffAttrition";

@Component({
  selector: 'app-company-wise-employee-summary',
  templateUrl: './company-wise-employee-summary.component.html',
  styleUrls: ['./company-wise-employee-summary.component.css']
})
export class CompanyWiseEmployeeSummaryComponent implements OnInit {

  @Input() companySummary: CompanyWiseEmployeeSummaryCount[];
  visibleCards: CompanyWiseEmployeeSummaryCount[];
  remainingCards: CompanyWiseEmployeeSummaryCount[];
  currentIndex = 0;
  constructor() { }

  ngOnInit() {
    this.updateVisibleCards();
  }
  updateVisibleCards() {
    this.visibleCards = this.companySummary.slice(this.currentIndex, this.currentIndex + 4);
  }

  scrollRight() {
    if (this.currentIndex < this.companySummary.length - 4) {
      this.currentIndex++;
      this.updateVisibleCards();
    }
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleCards();
    }
  }

  isLastCardVisible() {
    return this.currentIndex === this.companySummary.length - 4;
  }

  isFirstCardVisible() {
    return this.currentIndex === 0;
  }
}
