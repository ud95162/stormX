import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAttendanceComponent } from './profile-attendance.component';
import { AttendanceLogSummaryComponent } from './attendance-log-summary/attendance-log-summary.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [ProfileAttendanceComponent, AttendanceLogSummaryComponent],
    exports: [
        ProfileAttendanceComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ]
})
export class ProfileAttendanceModule { }
