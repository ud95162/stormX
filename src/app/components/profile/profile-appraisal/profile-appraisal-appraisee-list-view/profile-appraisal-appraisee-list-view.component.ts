import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Profile} from '../../../../_global/profile';
import {Search} from '../../../../_global/search';
import {Router} from '@angular/router';
import {AppraisalServiceService} from '../../../../service/employee-self-service-services/appraisal-service.service';
import {Appraisals} from '../../../../_global/appraisals';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-profile-appraisal-appraisee-list-view',
  templateUrl: './profile-appraisal-appraisee-list-view.component.html',
  styleUrls: ['./profile-appraisal-appraisee-list-view.component.css']
})
export class ProfileAppraisalAppraiseeListViewComponent implements OnInit,OnChanges {
  @Input() employeeId;
  @Input() year;
  appraiseeList = Appraisals.APPRAISEES_LIST;
  showAppraisees = false;

  constructor(private appraisalServiceService: AppraisalServiceService, private interCommunicationServiceService: InterCommunicationServiceService, public router: Router) {
  }

  ngOnInit() {


    // if(this.year === '2020'){
    if(this.year !== '2019'){
      this.loadLatestAppraisees(this.employeeId);
    }else if(this.year === '2019'){
      this.loadPreviouseAppraisees(this.employeeId);
    }

  }


  ngOnChanges(changes: SimpleChanges) {

    if(!changes.year.isFirstChange() && (changes.year.previousValue !== changes.year.currentValue)){

      // if(this.year === '2020'){
      if(this.year !== '2019'){
        this.loadLatestAppraisees(this.employeeId);
      }else if(this.year === '2019'){
        this.loadPreviouseAppraisees(this.employeeId);
      }


    }

  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

  loadPreviouseAppraisees(employeeId) {
    this.appraisalServiceService.getAppraisees(employeeId)
      .subscribe((data: any) => {
          this.appraiseeList = data;
          this.showAppraisees = true;
        }, error => {
          this.showAppraisees = false;
          this.openErrorModal(1112, 'ERROR', 'Request Failed!');
        }
      );
  }


  loadLatestAppraisees(employeeId) {
    // this.appraisalServiceService.getLatestAppraisees(employeeId,'2020')
    this.appraisalServiceService.getLatestAppraisees(employeeId,this.year)
        .subscribe((data: any) => {
            this.appraiseeList = data;
          this.showAppraisees = true;
          }, error => {
            this.showAppraisees = false;
            this.openErrorModal(1112, 'ERROR', 'Request Failed!');
          }
        );
  }



  profileRedirect(employeeId) {
    if (employeeId === Profile.EMPLOYEE_ID) {
      this.router.navigate(['./profile/main']);
    } else {
      Search.SEARCH_EMPLOYEE_ID = employeeId;
      localStorage.setItem('lsei_', employeeId);
      this.router.navigate(['./profile/_search']);
    }
  }
}
