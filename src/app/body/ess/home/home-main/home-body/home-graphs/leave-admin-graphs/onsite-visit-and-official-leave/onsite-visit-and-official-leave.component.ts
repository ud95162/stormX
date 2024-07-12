import {Component, OnInit} from '@angular/core';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';

@Component({
  selector: 'app-onsite-visit-and-official-leave',
  templateUrl: './onsite-visit-and-official-leave.component.html',
  styleUrls: ['./onsite-visit-and-official-leave.component.css']
})
export class OnsiteVisitAndOfficialLeaveComponent implements OnInit {

  officialLeave;
  officialLeaveTotal;
  onSiteTravelLeave;
  onSiteTravelLeaveTotal;
  finalResponse;
  leaveDataLoaded = false;

  constructor(private leaveService: LeaveServiceService) {
  }

  ngOnInit() {
    this.onSiteAndOfficialLeaveObject();
  }

  onSiteAndOfficialLeaveObject() {
    this.leaveService.getOfficialAndOnsiteLeaveUtilizationMonthWise()
      .subscribe(response => {
        console.log(" leave response", response)

        this.finalResponse = response;
        this.officialLeave = this.finalResponse.officialLeave;
        this.onSiteTravelLeave = this.finalResponse.onSiteTravel;
        this.officialLeaveTotal = this.officialLeave.Jan + this.officialLeave.Feb + this.officialLeave.Mar +
          this.officialLeave.Apr + this.officialLeave.May + this.officialLeave.Jun + this.officialLeave.Jul +
          this.officialLeave.Aug + this.officialLeave.Sep + this.officialLeave.Oct + this.officialLeave.Nov + this.officialLeave.Dec;

        this.onSiteTravelLeaveTotal = this.onSiteTravelLeave.Jan + this.onSiteTravelLeave.Feb + this.onSiteTravelLeave.Mar +
          this.onSiteTravelLeave.Apr + this.onSiteTravelLeave.May + this.onSiteTravelLeave.Jun + this.onSiteTravelLeave.Jul +
          this.onSiteTravelLeave.Aug + this.onSiteTravelLeave.Sep + this.onSiteTravelLeave.Oct +
          this.onSiteTravelLeave.Nov + this.onSiteTravelLeave.Dec;

        this.leaveDataLoaded = true;
      });
  }
}
