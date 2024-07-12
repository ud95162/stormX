import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../../_global/profile';
import { Search } from '../../../_global/search';
import { FeedbackServiceService } from '../../../service/appraisal-feedback-services/feedback-service.service';

@Component({
  selector: 'app-profile-feedback',
  templateUrl: './profile-feedback.component.html',
  styleUrls: ['./profile-feedback.component.css']
})
export class ProfileFeedbackComponent implements OnInit {

  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION.Profile;
  @Input() employeeId;
  public empNo: string;
  permissionData:any;
  isLoaded = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private feedbackService: FeedbackServiceService){}

  ngOnInit(){
    this.checkTabPermission();
  }

  checkTabPermission() {


    if (this.router.url === '/profile/_search') {

      this.feedbackService.getFeedBackSubComponentPermission(Search.SEARCH_EMPLOYEE_ID).subscribe((data:any)=>{

        this.permissionData = data;
        this.isLoaded = true;

      },error=>{
        console.log(error);
      });
    } else {

      this.feedbackService.getFeedBackSubComponentPermission(Profile.EMPLOYEE_ID).subscribe((data:any)=>{

        this.permissionData = data;
        this.isLoaded = true;

      },error=>{
        console.log(error);
      });
    }
  }
}
