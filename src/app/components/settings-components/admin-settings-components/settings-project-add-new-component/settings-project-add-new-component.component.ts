import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ProjectCreateData, ProjectCreateManagementData, ProjectEntity} from '../models/ProjectSettings';
import {ProjectServiceService} from '../../../../service/project-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalUiServiceService} from '../../../../service/ui-services/modal-ui-service.service';
import {
  InterCommunicationServiceService
} from '../../../../service/support-services/inter-communication-service.service';
import {CONSTANT} from '../../../../utility/Constants';

@Component({
  selector: 'app-settings-project-add-new-component',
  templateUrl: './settings-project-add-new-component.component.html',
  styleUrls: ['./settings-project-add-new-component.component.css']
})
export class SettingsProjectAddNewComponentComponent implements OnInit {
  imageUploaded: boolean;
  image = './assets/new-design-images/upload-bg.png';
  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/project/upload';
  uploadImageSize = environment.POST_IMAGE_SIZE;

  customStyle = {
    selectButton: {
      'background-color': 'transparent',
      'border-radius': '25px',
      'color': '#333333',
      'box-shadow': 'none',
      'margin': '0'
    },
    clearButton: {
      'display': 'none'
    },
    layout: {
      'background-color': 'transparent',
      'color': '#838383',
      'font-size': '10px !important',
      'width': '64px',
      'height': '64px',
      'font-family': 'roboto',
      'border-radius': '3px',
      'border': 'none',
      'background-repeat': 'no-repeat',
      'background-image': 'url(' + this.image + ')',
      'position': 'inherit'
    },
    previewPanel: {
      'display': 'none'
    }
  };
  uploadedProjectImage: any;

  projectTypes = [];
  projectTypesDataLoaded = false;
  newProjectData: ProjectCreateData;

  // confirmation modal fields
  confirmationModalType: any;
  confirmationModalText: any;
  confirmationModalSubText: any;

  constructor(private projectService: ProjectServiceService,
              private modalService: ModalUiServiceService,
              private communicationService: InterCommunicationServiceService) {

    this.newProjectData = new ProjectCreateData('', '', '', 1, '',
      [], [], [], []);
    this.imageUploaded = false;
  }

  ngOnInit() {
    this.getProjectsTypes();
    this.communicationService.onSelectProjectData
      .subscribe((data: any) => {
        if (data.status) {
          this.newProjectData = data.project;
        }
      });
  }

  getProjectsTypes() {
    this.projectService.getProjectsTypes()
      .subscribe( (data: any) => {
        this.projectTypes = data;
        this.projectTypesDataLoaded = true;
      });
  }


  /**
   * Sets project manager data in the system.
   * @param data The data object containing project manager information.
   */
  setProjectManagerData(data: any) {
    if (data !== null) {
      // Check if data.empID already exists in projectManagerDetails
      const empIDExists = this.newProjectData.projectManagerDetails.some(
        (manager) => manager.empID === data.empID
      );

      // If empID does not exist, push the data
      if (!empIDExists) {
        this.newProjectData.projectManagerDetails.push({
          empID: data.empID,
          empName: data.names
        });
      } else {
        // Handle the case where empID already exists (optional)
        console.log(`Employee with ID ${data.empID} already exists in projectManagerDetails.`);
      }
    }
  }

  /**
   * Sets project owner data in the system.
   * @param data The data object containing project owner information.
   */
    setProjectOwnerData(data: any) {
      if (data !== null) {
        // Check if data.empID already exists in projectManagerDetails
        const empIDExists = this.newProjectData.projectOwnerDetails.some(
          (manager) => manager.empID === data.empID
        );

        // If empID does not exist, push the data
        if (!empIDExists) {
          this.newProjectData.projectOwnerDetails.push({
            empID: data.empID,
            empName: data.names
          });
        } else {
          // Handle the case where empID already exists (optional)
          console.log(`Employee with ID ${data.empID} already exists in projectOwnerDetails.`);
        }
      }
    }

  /**
   * Sets project director data in the system.
   * @param data The data object containing project director information.
   */
    setProjectDirectorData(data: any) {
      if (data !== null) {
        // Check if data.empID already exists in projectDirectorDetails
        const empIDExists = this.newProjectData.projectDirectorDetails.some(
          (manager) => manager.empID === data.empID
        );

        // If empID does not exist, push the data
        if (!empIDExists) {
          this.newProjectData.projectDirectorDetails.push({
            empID: data.empID,
            empName: data.names
          });
        } else {
          // Handle the case where empID already exists (optional)
          console.log(`Employee with ID ${data.empID} already exists in projectDirectorDetails.`);
        }
      }
    }

  /**
   * Sets project coordinator data in the system.
   * @param data The data object containing project coordinator information.
   */
    setProjectCoordinatorData(data: any) {
      if (data !== null) {
        // Check if data.empID already exists in projectCoordinatorDetails
        const empIDExists = this.newProjectData.projectCoordinatorDetails.some(
          (manager) => manager.empID === data.empID
        );

        // If empID does not exist, push the data
        if (!empIDExists) {
          this.newProjectData.projectCoordinatorDetails.push({
            empID: data.empID,
            empName: data.names
          });
        } else {
          // Handle the case where empID already exists (optional)
          console.log(`Employee with ID ${data.empID} already exists in projectCoordinatorDetails.`);
        }
      }
    }

  projectImageUploadFinish(url) {
    this.uploadedProjectImage = url.serverResponse.response.body[0];
    this.newProjectData.projectImage = this.uploadedProjectImage;
    this.imageUploaded = true;
  }

  /**
   * Removes an employee from the specified section of the project management data.
   * @param employee The employee object to be removed.
   * @param section The section from which the employee is to be removed ('PM', 'VP', 'PC', 'Director').
   */
  removeEmployeeFromList(employee: ProjectCreateManagementData, section: string) {
    switch (section) {
      case 'PM':
        const pmIndex = this.newProjectData.projectManagerDetails.indexOf(employee);
        if (pmIndex > -1) {
          this.newProjectData.projectManagerDetails.splice(pmIndex, 1);
        }
        break;
      case 'VP':
        const vpIndex = this.newProjectData.projectOwnerDetails.indexOf(employee);
        if (vpIndex > -1) {
          this.newProjectData.projectOwnerDetails.splice(vpIndex, 1);
        }
        break;
      case 'PC':
        const pcIndex = this.newProjectData.projectCoordinatorDetails.indexOf(employee);
        if (pcIndex > -1) {
          this.newProjectData.projectCoordinatorDetails.splice(pcIndex, 1);
        }
        break;
      case 'Director':
        const dirIndex = this.newProjectData.projectDirectorDetails.indexOf(employee);
        if (dirIndex > -1) {
          this.newProjectData.projectDirectorDetails.splice(dirIndex, 1);
        }
        break;
    }
  }

  /**
   * Creates a new project if form validation passes.
   * If successful, updates the active project list and sets success message.
   * If unsuccessful, sets error message accordingly.
   */
  createNewProject() {
    if ( this.formValidation() ) {
      this.projectService.createNewProject(this.newProjectData)
        .subscribe((data: ProjectEntity) => {
          const json = {status: true, project: data};
          this.communicationService.updateActiveProjectList(json);
          this.setErrorMsg( CONSTANT.ALERTS.TYPES.SUCCESS, CONSTANT.ERROR_MSG.HEADERS.SUCCESS, CONSTANT.ERROR_MSG.PROJECT.SETTINGS.CREATE_SUCCESS);
        }, (error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.setErrorMsg( CONSTANT.ALERTS.TYPES.SUCCESS, CONSTANT.ERROR_MSG.HEADERS.SUCCESS, CONSTANT.ERROR_MSG.PROJECT.SETTINGS.CREATE_FAILED);
          }
        });
    }
  }

  formValidation() {
    return this.newProjectData.projectName !== '' && this.newProjectData.projectCode !== '' && this.newProjectData.projectJiraCode !== '';
  }

  showModal(modalID) {
    this.modalService.showModal(modalID);
  }

  setErrorMsg(modalType, headerText, subText) {
    this.confirmationModalType = modalType;
    this.confirmationModalText = headerText;
    this.confirmationModalSubText = subText;
    this.modalService.showModal('commonErrorModal');
  }
}
