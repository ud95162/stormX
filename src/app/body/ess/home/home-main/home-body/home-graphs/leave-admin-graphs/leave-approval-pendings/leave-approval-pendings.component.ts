import { Component, OnInit } from '@angular/core';
import {LeaveServiceService} from "../../../../../../../../service/attendance-leave/leave-service.service";

@Component({
  selector: 'app-leave-approval-pendings',
  templateUrl: './leave-approval-pendings.component.html',
  styleUrls: ['./leave-approval-pendings.component.css']
})
export class LeaveApprovalPendingsComponent implements OnInit {

  finalResponse;
  standardLeaveSummary;
  specialLeaveSummary;
  shortLeaveSummary;
  totalAnnualLeave;
  totalCasualLeave;
  totalMedicalLeave;
  totalMaternityLeave;
  totalNoPayLeave;
  totalOnSiteLeave;
  totalLieuLeave;
  totalOfficialLeave;
  totalShortLeave;
  totalLeaveCount;
  pendingLeaveDataLoaded = false;
  leaveDataLoaded = false;
  constructor(private leaveService: LeaveServiceService) { }

  ngOnInit() {
    this.getPendingLeaveObject();
  }
  getPendingLeaveObject() {
    this.leaveService.getAllPendingLeavesMonthWise()
      .subscribe( data => {
        this.finalResponse = data;
        this.standardLeaveSummary = this.finalResponse.pendingStandardLeaveSummaries;
        this.specialLeaveSummary = this.finalResponse.pendingSpecialLeaveSummaries;
        this.shortLeaveSummary = this.finalResponse.pendingShortLeaveSummaries;
        this.pendingLeaveDataLoaded = true;

        if (this.pendingLeaveDataLoaded) {
          this.totalAnnualLeave = this.standardLeaveSummary.Jan.annual + this.standardLeaveSummary.Feb.annual +
            this.standardLeaveSummary.Mar.annual + this.standardLeaveSummary.Apr.annual + this.standardLeaveSummary.May.annual +
            this.standardLeaveSummary.Jun.annual + this.standardLeaveSummary.Jul.annual + this.standardLeaveSummary.Aug.annual +
            this.standardLeaveSummary.Sep.annual + this.standardLeaveSummary.Oct.annual + this.standardLeaveSummary.Nov.annual +
            this.standardLeaveSummary.Dec.annual;

          this.totalCasualLeave = this.standardLeaveSummary.Jan.casual + this.standardLeaveSummary.Feb.casual +
            this.standardLeaveSummary.Mar.casual + this.standardLeaveSummary.Apr.casual + this.standardLeaveSummary.May.casual +
            this.standardLeaveSummary.Jun.casual + this.standardLeaveSummary.Jul.casual + this.standardLeaveSummary.Aug.casual +
            this.standardLeaveSummary.Sep.casual + this.standardLeaveSummary.Oct.casual + this.standardLeaveSummary.Nov.casual +
            this.standardLeaveSummary.Dec.casual;

          this.totalMedicalLeave = this.standardLeaveSummary.Jan.medical + this.standardLeaveSummary.Feb.medical +
            this.standardLeaveSummary.Mar.medical + this.standardLeaveSummary.Apr.medical + this.standardLeaveSummary.May.medical +
            this.standardLeaveSummary.Jun.medical + this.standardLeaveSummary.Jul.medical + this.standardLeaveSummary.Aug.medical +
            this.standardLeaveSummary.Sep.medical + this.standardLeaveSummary.Oct.medical + this.standardLeaveSummary.Nov.medical +
            this.standardLeaveSummary.Dec.medical;

          this.totalMaternityLeave = this.specialLeaveSummary.Jan.maternity + this.specialLeaveSummary.Feb.maternity +
            this.specialLeaveSummary.Mar.maternity + this.specialLeaveSummary.Apr.maternity + this.specialLeaveSummary.May.maternity +
            this.specialLeaveSummary.Jun.maternity + this.specialLeaveSummary.Jul.maternity + this.specialLeaveSummary.Aug.maternity +
            this.specialLeaveSummary.Sep.maternity + this.specialLeaveSummary.Oct.maternity + this.specialLeaveSummary.Nov.maternity +
            this.specialLeaveSummary.Dec.maternity;

          this.totalLieuLeave = this.specialLeaveSummary.Jan.lieu + this.specialLeaveSummary.Feb.lieu +
            this.specialLeaveSummary.Mar.lieu + this.specialLeaveSummary.Apr.lieu + this.specialLeaveSummary.May.lieu +
            this.specialLeaveSummary.Jun.lieu + this.specialLeaveSummary.Jul.lieu + this.specialLeaveSummary.Aug.lieu +
            this.specialLeaveSummary.Sep.lieu + this.specialLeaveSummary.Oct.lieu + this.specialLeaveSummary.Nov.lieu +
            this.specialLeaveSummary.Dec.lieu;

          this.totalNoPayLeave = this.specialLeaveSummary.Jan.noPay + this.specialLeaveSummary.Feb.noPay +
            this.specialLeaveSummary.Mar.noPay + this.specialLeaveSummary.Apr.noPay + this.specialLeaveSummary.May.noPay +
            this.specialLeaveSummary.Jun.noPay + this.specialLeaveSummary.Jul.noPay + this.specialLeaveSummary.Aug.noPay +
            this.specialLeaveSummary.Sep.noPay + this.specialLeaveSummary.Oct.noPay + this.specialLeaveSummary.Nov.noPay +
            this.specialLeaveSummary.Dec.noPay;

          this.totalOfficialLeave = this.specialLeaveSummary.Jan.official + this.specialLeaveSummary.Feb.official +
            this.specialLeaveSummary.Mar.official + this.specialLeaveSummary.Apr.official + this.specialLeaveSummary.May.official +
            this.specialLeaveSummary.Jun.official + this.specialLeaveSummary.Jul.official + this.specialLeaveSummary.Aug.official +
            this.specialLeaveSummary.Sep.official + this.specialLeaveSummary.Oct.official + this.specialLeaveSummary.Nov.official +
            this.specialLeaveSummary.Dec.official;

          this.totalOnSiteLeave = this.specialLeaveSummary.Jan.onSite + this.specialLeaveSummary.Feb.onSite +
            this.specialLeaveSummary.Mar.onSite + this.specialLeaveSummary.Apr.onSite + this.specialLeaveSummary.May.onSite +
            this.specialLeaveSummary.Jun.onSite + this.specialLeaveSummary.Jul.onSite + this.specialLeaveSummary.Aug.onSite +
            this.specialLeaveSummary.Sep.onSite + this.specialLeaveSummary.Oct.onSite + this.specialLeaveSummary.Nov.onSite +
            this.specialLeaveSummary.Dec.onSite;

          this.totalShortLeave = this.shortLeaveSummary.Jan.shortLeave + this.shortLeaveSummary.Feb.shortLeave +
            this.shortLeaveSummary.Mar.shortLeave + this.shortLeaveSummary.Apr.shortLeave + this.shortLeaveSummary.May.shortLeave +
            this.shortLeaveSummary.Jun.shortLeave + this.shortLeaveSummary.Jul.shortLeave + this.shortLeaveSummary.Aug.shortLeave +
            this.shortLeaveSummary.Sep.shortLeave + this.shortLeaveSummary.Oct.shortLeave + this.shortLeaveSummary.Nov.shortLeave +
            this.shortLeaveSummary.Dec.shortLeave;

          this.totalLeaveCount = this.totalCasualLeave + this.totalMedicalLeave + this.totalAnnualLeave + this.totalMaternityLeave +
            this.totalOfficialLeave + this.totalNoPayLeave + this.totalLieuLeave + this.totalOnSiteLeave + this.totalShortLeave;

          this.leaveDataLoaded = true;
        }

      });
  }

}
