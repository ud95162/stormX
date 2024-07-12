import { Component, OnInit } from '@angular/core';
import {LeaveServiceService} from '../../../../../../../../service/attendance-leave/leave-service.service';

@Component({
  selector: 'app-no-pay-leaves',
  templateUrl: './no-pay-leaves.component.html',
  styleUrls: ['./no-pay-leaves.component.css']
})
export class NoPayLeavesComponent implements OnInit {

  noPayLeaveResponse;
  noPayTotalCount;
  noPayDataLoaded = false;
  constructor(private leaveServiceService: LeaveServiceService) { }

  ngOnInit() {
    this.noPayLeaveObj();
  }
  noPayLeaveObj() {
    this.leaveServiceService.getNoPayLeaveUtilizationMonthWise()
      .subscribe(response => {
        this.noPayLeaveResponse = response;
        this.noPayTotalCount = this.noPayLeaveResponse.Jan + this.noPayLeaveResponse.Feb + this.noPayLeaveResponse.Mar +
          this.noPayLeaveResponse.Apr + this.noPayLeaveResponse.May + this.noPayLeaveResponse.Jun +
          this.noPayLeaveResponse.Jul + this.noPayLeaveResponse.Aug + this.noPayLeaveResponse.Sep +
          this.noPayLeaveResponse.Oct + this.noPayLeaveResponse.Nov + this.noPayLeaveResponse.Dec;

        this.noPayDataLoaded = true;
      });
  }
}
