import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileSummaryComponent} from './profile-summary.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ProfileRequestsModule} from "../profile-requests/profile-requests.module";

@NgModule({
  declarations: [ProfileSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProfileRequestsModule
  ],
  exports: [ProfileSummaryComponent]
})
export class ProfileSummaryModule { }
