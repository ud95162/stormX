import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../../../../../../../../service/project-service.service";
import {AmChartService} from "../../../../../../../../service/am-chart-service/am-chart.service";
import {Project} from "../../../../../../../../_global/project";

@Component({
  selector: 'app-project-designation-category',
  templateUrl: './project-designation-category.component.html',
  styleUrls: ['./project-designation-category.component.css']
})
export class ProjectDesignationCategoryComponent implements OnInit {

  dataLoaded = false;
  constructor(private httpService: ProjectServiceService,
              private amChartService: AmChartService) { }

  ngOnInit() {
    this.getHeadDesignationCount();
  }

  getHeadDesignationCount() {
    this.dataLoaded = false;
    const chartLabels = ['DEV', 'QA', 'Management'];
    this.httpService.getSelectedProjectMembersAsPMDEVQA(Project.PROJECT_CODE).subscribe( (response) => {
      if ( response[0] !== null && response[1] !== null && response[2] !== null) {
        this.dataLoaded = true;
        const chart = this.amChartService.createDnutWithRadialGradient('projectMainDesCat',  'des', 'value',  ['#FAECBA', '#0099EA', '#BAC5FA']);
        for (let key in response) {
          chart.data.push({'des': chartLabels[key], 'value': response[key]});
        }
      } else {
        this.dataLoaded = false;
      }
    });
  }

}
