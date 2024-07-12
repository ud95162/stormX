import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppraisalServiceService} from '../../../../service/employee-self-service-services/appraisal-service.service';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {Event} from '../../../../_global/event';
import {DesignationWiseDeadline} from '../../../../classes/appraisal/appraisal-criteria';
import {FeedbackServiceService} from '../../../../service/appraisal-feedback-services/feedback-service.service';
import {forkJoin} from "rxjs";
import {CONSTANT} from "../../../../utility/Constants";

@Component({
  selector: 'app-profile-appraisal-appraisal-interviews',
  templateUrl: './profile-appraisal-appraisal-interviews.component.html',
  styleUrls: ['./profile-appraisal-appraisal-interviews.component.css']
})
export class ProfileAppraisalAppraisalInterviewsComponent implements OnInit, OnChanges {
  @Input() employeeId;
  @Input() year;

  appraiserNotesObj;
  showAppraiserNotesObj = false;
  latestAppraiserNotesObj;
  showLatestAppraiserNotesObj = false;
  isReadOnly = false;
  // currentYear: number = new Date().getFullYear();
  // nextYear: string = (this.currentYear + 1).toString();
  today = Event.setCurrentDateTime().processedFullDate;
  perm_code = 'Profile';
  appraisalDeadline;
  private appraisalInterviewStatus: any;
  private appraisalYear: any;

  constructor(private appraisalServiceService: AppraisalServiceService, private interCommunicationServiceService:
    InterCommunicationServiceService, private feedbackService: FeedbackServiceService) {
  }

  ngOnInit() {

    const deadlines = this.feedbackService.getLatestAppraisalDeadlines( this.year, this.perm_code);
    const categories = this.appraisalServiceService.getEmployeeCategoryForyear(this.employeeId, this.year);
    const year = this.feedbackService.getLatestAppraisalYear('Profile');
    const interviews = this.feedbackService.checkAppraisalInterviewStatus();
    const deadlineDates = this.feedbackService.getDeadlineForUser(this.year, localStorage.getItem('lsei_'));

    forkJoin([deadlines, categories, year, interviews, deadlineDates]).subscribe( result => {
      this.appraisalYear = result[2];
      this.appraisalInterviewStatus = result[3];
      this.appraisalDeadline = result[4];

      if (this.year !== CONSTANT.APPRAISAL.YEAR_2019) {
        // send year as a query param change call
        this.loadLatestAppraisalNotifications(this.employeeId, this.year);
      } else if (this.year === CONSTANT.APPRAISAL.YEAR_2019) {
        // send year as a query param
        this.loadAppraisalNotifications(this.employeeId);
      }
    });

    // this.feedbackService.getLatestAppraisalDeadlines(this.year, this.perm_code).subscribe((datanew: any) => {
    //   this.appraisalDeadlines = datanew;
    //   this.appraisalServiceService.getEmployeeCategoryForyear(this.employeeId, this.year).subscribe((data2: any) => {
    //     this.employeeCategory = data2.category;
    //     this.feedbackService.checkAppraisalInterviewStatus().subscribe((data3: any) => {
    //       this.appraisalInterviewStatus = data3;
    //       this.feedbackService.getLatestAppraisalYear('Profile').subscribe((data4: any) => {
    //         this.appraisalYear = data4;
    //         if (this.year !== '2019') {
    //           // send year as a query param change call
    //           this.loadLatestAppraisalNotifications(this.employeeId, this.year);
    //         } else if (this.year === '2019') {
    //           // send year as a query param
    //           this.loadAppraisalNotifications(this.employeeId);
    //         }
    //       });
    //     });
    //   });
    // });

  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.year.isFirstChange() && (changes.year.previousValue !== changes.year.currentValue)) {
      console.log('changes');

      // if (this.year === '2020') {
      if (this.year !== '2019') {
        this.loadLatestAppraisalNotifications(this.employeeId, this.year);
      } else if (this.year === '2019') {
        this.loadAppraisalNotifications(this.employeeId);
      }

    }

  }

  increaseTextBoxSize(elementId) {
    setTimeout(function () {
      let element = (<HTMLInputElement>document.getElementById(elementId));
      // element.style.cssText = 'height:auto;';
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }

  openErrorModal(errorCode, errorType, errorMessage) {
    this.interCommunicationServiceService.changeErrorCode(errorCode, errorType, errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }


  loadAppraisalNotifications(employeeId) {
    this.appraisalServiceService.getAppraisalAppraisersNotes(employeeId)
      .subscribe((data: any) => {
          this.appraiserNotesObj = data;
          this.showAppraiserNotesObj = true;
          this.isReadOnly = true;
        }, error => {
          this.showAppraiserNotesObj = false;
        }
      );
  }

  submitAppraiserNotes() {
    this.appraisalServiceService.putAppraisalAppraisersNotes(this.appraiserNotesObj)
      .subscribe((data: any) => {
          this.openErrorModal(1111, 'SUCCESS', 'Form submission successful!');
          this.loadAppraisalNotifications(this.employeeId);
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Form submission failed!');
        }
      );
  }


  loadLatestAppraisalNotifications(employeeId, year) {
    console.log(employeeId)
    this.appraisalServiceService.getLatestAppraisalAppraisersNotes(employeeId, year)
      .subscribe((data: any) => {
          this.latestAppraiserNotesObj = data;
          this.showLatestAppraiserNotesObj = true;
        console.log(this.year === this.appraisalYear.year)
        if (this.year === this.appraisalYear.year) {
          console.log(this.year === this.appraisalYear.year && this.appraisalInterviewStatus.status === 1)
          this.isReadOnly = !(this.year === this.appraisalYear.year && this.appraisalInterviewStatus.status === 1);
        } else {
          this.isReadOnly = true;
        }
        }, error => {
          this.showLatestAppraiserNotesObj = false;
        }
      );
  }

  submitLatestAppraiserNotes() {

    // year changed to selected year
    this.appraisalServiceService.postLatestAppraisalAppraisersNotes(this.latestAppraiserNotesObj, this.employeeId, this.year)
      .subscribe((data: any) => {
          this.openErrorModal(1111, 'SUCCESS', 'Form submission successful!');
          this.loadLatestAppraisalNotifications(this.employeeId, this.year);
        }, error => {
          this.openErrorModal(1112, 'ERROR', 'Form submission failed!');
        }
      );


  }

}
