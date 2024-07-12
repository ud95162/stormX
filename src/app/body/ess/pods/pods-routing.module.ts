import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PodsComponent} from "./pods.component";
import {PodsMainComponent} from "./pods-main/pods-main.component";

const routes: Routes = [{
  path: '', component: PodsComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: PodsMainComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodsRoutingModule { }
