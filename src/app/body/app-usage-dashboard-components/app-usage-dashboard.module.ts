import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUsageDashboardComponent } from './app-usage-dashboard/app-usage-dashboard.component';
import {AppUsageDashboardRoutingModule} from './app-usage-dashboard-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppUsageDashboardComponent],
  imports: [
    CommonModule,
    AppUsageDashboardRoutingModule,
    FormsModule
  ]
})
export class AppUsageDashboardModule { }
