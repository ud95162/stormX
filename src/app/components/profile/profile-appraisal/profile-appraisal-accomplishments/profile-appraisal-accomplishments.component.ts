import {Component, Input, OnInit} from '@angular/core';
import {AppraisalServiceService} from '../../../../service/employee-self-service-services/appraisal-service.service';

@Component({
  selector: 'app-profile-appraisal-accomplishments',
  templateUrl: './profile-appraisal-accomplishments.component.html',
  styleUrls: ['./profile-appraisal-accomplishments.component.css']
})
export class ProfileAppraisalAccomplishmentsComponent implements OnInit {

  @Input() year;
  @Input() employeeId;

  selectedCategoryName = 'All Achievements';
  categoryList;
  categoryListLoaded = false;
  displayCategoryList = false;
  selectedCategoryID = 0;
  fromDate;
  toDate;
  employeeAccomplishmentData = [];
  categoryMap = new Map();

  constructor(private  appraisalService: AppraisalServiceService) { }

  ngOnInit() {
    this.getSelectedYearAppraisalPeriod();

    this.getAccomplishmentCategories();
  }

  getSelectedYearAppraisalPeriod() {
    this.appraisalService.getAppraisalPeriodForLatestYear(this.year)
      .subscribe( (data: any) => {
        this.fromDate = data.startDate;
        this.toDate = data.endDate;
        this.getEmployeeAccomplishments();
      });
  }

  getAccomplishmentCategories() {
    this.appraisalService.getAccomplishmentCategories().subscribe(
      (response: any) => {
        this.categoryList = response;
        for (let val of response) {
          this.categoryMap.set(val.categoryID, val.category);
        }
        this.categoryListLoaded = true;
      });
  }

  getAccomplishmentsWhenDateChange() {
    this.getEmployeeAccomplishments();
  }

  getEmployeeAccomplishments() {
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    this.appraisalService.getEmployeeAccomplishments(this.employeeId, this.fromDate, this.toDate, this.selectedCategoryID)
      .subscribe( (response: any) => {
        this.employeeAccomplishmentData = response;
      });

  }

  categoryListDisplay() {
    this.displayCategoryList = !this.displayCategoryList;
  }

  hideList() {
    this.displayCategoryList = false;
  }

  getSelectedCategoryData(categoryID) {
    this.selectedCategoryID = categoryID;
    if (categoryID === 0) {
      this.selectedCategoryName = 'All Achievements';
    } else {
      this.selectedCategoryName = this.categoryMap.get(categoryID);
    }
    this.getEmployeeAccomplishments();
    this.hideList();
  }

  getRelatedCategoryName(categoryID) {
    return this.categoryMap.get(categoryID);
  }

  generateToDateText(toDate, onGoing) {
    let stringTo = null;
    if (toDate == null && !onGoing) {
      return '';
    } else if (toDate != null && !onGoing) {
      stringTo =  toDate;
    } else if (toDate == null && onGoing) {
      stringTo = 'Ongoing';
    } else {
      stringTo = 'Ongoing';
    }
    return 'to '.concat(stringTo);
  }

}
