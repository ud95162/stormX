import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackServiceService } from '../../../../service/appraisal-feedback-services/feedback-service.service';

@Component({
  selector: 'app-profile-feedback-excecutive',
  templateUrl: './profile-feedback-excecutive.component.html',
  styleUrls: ['./profile-feedback-excecutive.component.css']
})
export class ProfileFeedbackExcecutiveComponent implements OnInit {

  loadedCycleData = false;
  cycleStatusData: any[] = [];
  executiveProjectData: any[] = [];
  selectedProject = 'All';
  isLoadingProgressBarData = true;
  showNoDataError = false;

  constructor( private feedbackService: FeedbackServiceService,
               private router: Router) { }

  ngOnInit() {
    this.loadExecutiveProjectList();
  }


  loadExecutiveProjectList(){

    this.feedbackService.getExecutiveProjectList()
        .subscribe((data: any) => {
          if(data.length > 0){
            this.executiveProjectData = data;
            this.selectedProject = this.executiveProjectData[0];
            this.loadFeedBackCycleData(this.selectedProject);
          }
        },error=>{
          console.log(error);
        });
  }

  loadFeedBackCycleData(project:any) {
    this.feedbackService.getExcecutiveViewFeedbackCyclesCompletingStatus(project)
        .subscribe((data: any) => {
            this.cycleStatusData = data;
            this.isLoadingProgressBarData = false
          this.loadedCycleData = true;
        },error=>{
          this.isLoadingProgressBarData = false;
          this.showNoDataError = true;
          console.log(error);
        });
  }

  changeProject(){
    this.loadFeedBackCycleData(this.selectedProject);
  }


}
