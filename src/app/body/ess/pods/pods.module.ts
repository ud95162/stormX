import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodsRoutingModule } from './pods-routing.module';
import { PodsComponent } from './pods.component';
import { PodsMainComponent } from './pods-main/pods-main.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    PodsComponent,
    PodsMainComponent
  ],
  imports: [
    CommonModule,
    PodsRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class PodsModule { }
