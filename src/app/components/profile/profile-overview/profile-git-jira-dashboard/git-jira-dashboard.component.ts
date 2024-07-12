import {Component, HostListener, OnInit} from '@angular/core';
import {ProfileUserServiceService} from 'app/service/profile-user-service.service';
import {Profile} from "../../../../_global/profile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-git-jira-dashboard',
  templateUrl: './git-jira-dashboard.component.html',
  styleUrls: ['./git-jira-dashboard.component.css']
})
export class GitJiraDashboardComponent implements OnInit {

  componentPermission = [];
  clientPermission: any;

   avgCommits = 0;
   avgJira = 0;
   avgIssues = 0;
   avgAdditions = 0;
   avgDeletions = 0;

   avgResolved = 0;
   avgOpen = 0;
   avgVerified = 0;
   avgClosed = 0;

   totalCommits = 0;
   totalJira = 0;
   totalIssues = 0;
   totalAdditions = 0;
   totalDeletions = 0;

   totalResolved = 0;
   totalOpen = 0;
   totalVerified = 0;
   totalClosed = 0;

  // for hover effect
  isCommits = false;
  isIssue = false;

  constructor(
     private profileService: ProfileUserServiceService,
     public router: Router,
  ) {

    if (this.router.url.includes('_search')) {
      // this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION.OtherProfile;
      for (const val of Profile.EMPLOYEE_APPLICATION_PERMISSION) {
        if (val.includes('Other')) {
          this.componentPermission.push(val.slice(5));
        }
      }
    } else {
        this.componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
    }

    // try {
    //   // tslint:disable-next-line:max-line-length
    //   this.clientPermission = this.componentPermission.subComponentPermissions.ProfileBody.subComponentPermissions.Overview.subComponentPermissions.OverviewClient.subComponentPermissions;
    // } catch (e) {
    //   console.log(e);
    // }
  }

  ngOnInit() {
  }

  updateGitJiraData(value) {
    // get git data
    this.profileService.getProfileGitData(value['emp_no'], value['data']['year'],
      value['data']['month_no'], value['data']['day'], value['data']['range'])
      .subscribe((data: any) => {
        try {
          this.totalAdditions = data['gitTotal']['additions'];
          this.totalDeletions = data['gitTotal']['deletions'];
          this.avgAdditions = data['gitAvg']['additions'];
          this.avgDeletions = data['gitAvg']['deletions'];

          this.totalCommits = this.totalAdditions + this.totalDeletions;
          this.avgCommits = this.avgAdditions + this.avgDeletions;
        }
          // tslint:disable-next-line:one-line
        catch (e) {
          this.totalAdditions = 0;
          this.totalDeletions = 0;
          this.avgAdditions = 0;
          this.avgDeletions = 0;
          this.totalCommits = 0;
          this.avgCommits = 0;
        }
      });

    // get jira data
    this.profileService.getProfileJiraData(value['emp_no'], value['data']['year'],
      value['data']['month_no'], value['data']['day'], value['data']['range'])
      .subscribe((data: any) => {

        try {
          this.totalJira = data['jiraTotal']['jiraHrs'];
          this.totalResolved = data['jiraTotal']['resolved'];
          this.totalVerified = data['jiraTotal']['verified'];
          this.totalClosed = data['jiraTotal']['closed'];
          this.totalOpen = data['jiraTotal']['open'];

          this.avgJira = data['jiraAvg']['jiraHrs'];
          this.avgResolved = data['jiraAvg']['resolved'];
          this.avgVerified = data['jiraAvg']['verified'];
          this.avgClosed = data['jiraAvg']['closed'];
          this.avgOpen = data['jiraAvg']['open'];

          this.totalIssues = this.totalResolved + this.totalVerified + this.totalClosed + this.totalOpen;
          this.avgIssues = this.avgResolved + this.avgVerified + this.avgClosed + this.avgOpen;

        }
          // tslint:disable-next-line:one-line
        catch (e) {
          //  console.log(e);
          // for no data found situations set data = 0
          this.totalJira = 0;
          this.totalResolved = 0;
          this.totalVerified = 0;
          this.totalClosed = 0;
          this.totalOpen = 0;
          this.totalIssues = 0;
          this.avgJira = 0;
          this.avgResolved = 0;
          this.avgVerified = 0;
          this.avgClosed = 0;
          this.avgOpen = 0;
          this.avgIssues = 0;
        }
      });
  }


  //  for mouse hover effect
  mouseEnter(value: string) {
    if (value === 'commits') {
      this.isCommits = true;
    }
    // tslint:disable-next-line:one-line
    else if (value === 'issues') {
      this.isIssue = true;
    }
  }

  mouseLeave(value: string) {
    if (value === 'commits') {
      this.isCommits = false;
      // this.isCommits = true;
    }
    // tslint:disable-next-line:one-line
    else if (value === 'issues') {
      this.isIssue = false;
      // this.isIssue = true;
    }
  }

  // for fixed hover release when touch other place in mobile view
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (this.isCommits === true) {
      this.isCommits = false;
    }
    if (this.isIssue === true) {
      this.isIssue = false;
    }
  }
}
