import {Component, OnInit} from '@angular/core';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {ProjectEntity} from '../models/ProjectSettings';
import {ProjectServiceService} from '../../../../service/project-service.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-settings-project-card-list-component',
  templateUrl: './settings-project-card-list-component.component.html',
  styleUrls: ['./settings-project-card-list-component.component.css']
})
export class SettingsProjectCardListComponentComponent implements OnInit {

  allProjectsData: ProjectEntity[];
  allProjectsDataLoaded = false;
  icon_direction = 'down';
  constructor(private projectService: ProjectServiceService,
              private communicationService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.communicationService.onUpdateActiveProjectList
      .subscribe((data: any) => {
        if (data.status) {
          this.allProjectsData.push(data.project);
        }
      });
    this.getAllProjectsData();
  }

  /**
   * Retrieves data of all active projects from the project service.
   * Upon successful retrieval, updates 'allProjectsData' and sets 'allProjectsDataLoaded' to true.
   * Handles error responses by setting 'allProjectsDataLoaded' based on HTTP status.
   */
  getAllProjectsData() {
    this.projectService.getAllActiveProjects()
      .subscribe((data: ProjectEntity[]) => {
        this.allProjectsData = data;
        this.allProjectsDataLoaded = true;
      }, (error: HttpErrorResponse) => {
        this.allProjectsDataLoaded = error.status === 200;
      });
  }

  editProject(project: ProjectEntity) {
    this.scrollToTop();
    this.communicationService.setSelectedProjectData({status: true, project: project});
  }

  /**
   * Scrolls the window to the top of the page gradually.
   */
  scrollToTop(){
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 300); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 0.5);
  }

  /**
   * Toggles the display of a project based on its index.
   * @param i The index of the project.
   */
  onClickShowHideProject(i: number) {
    if ((<HTMLInputElement>document.getElementById('project_' + i)).style.display === '') {
      (<HTMLInputElement>document.getElementById('project_' + i)).setAttribute('style', 'display:none');
      (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-down');
      this.icon_direction = 'down';
    } else {
      (<HTMLInputElement>document.getElementById('project_' + i)).setAttribute('style', '');
      (<HTMLInputElement>document.getElementById('icon_direction_' + i)).setAttribute('xlink:href', '#pointer-up');
      this.icon_direction = 'up';

    }
  }
}
