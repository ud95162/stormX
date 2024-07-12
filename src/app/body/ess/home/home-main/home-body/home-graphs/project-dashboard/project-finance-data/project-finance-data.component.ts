import { Component, OnInit } from '@angular/core';
import {Project} from "../../../../../../../../_global/project";
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";

@Component({
  selector: 'app-project-finance-data',
  templateUrl: './project-finance-data.component.html',
  styleUrls: ['./project-finance-data.component.css']
})
export class ProjectFinanceDataComponent implements OnInit {

  revenue;
  cost;
  profit;
  balance;
  x1;
  x2;
  answer;
  financeDataLoaded = false;
  constructor(private httpService: ProjectServiceService) { }

  ngOnInit() {
    this.loadProjectFinanceData();
  }

  loadProjectFinanceData() {
    this.financeDataLoaded = false;
    this.httpService.getProjectRevenueDetail(Project.PROJECT_CODE).subscribe( (response) => {
      this.x1 = response;
      this.httpService.getProjectCostDetail(Project.PROJECT_CODE).subscribe( (response1) => {
        this.x2 = response1;
        this.revenue = this.formatNumber(Math.round(this.x1));
        this.cost = this.formatNumber(Math.round(this.x2));
        this.balance = Math.round(this.x1 - this.x2);
        this.profit = this.formatNumber(this.balance);

        if (this.balance > 0) {
          this.answer = 'Profit';
        }
        // tslint:disable-next-line:one-line
        else {
          this.answer = 'Loss';
        }
      });
    });
    this.financeDataLoaded = true;
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
