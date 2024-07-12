import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLandingComponent } from './search-main/search-landing/search-landing.component';
import { SearchMainComponent } from './search-main/search-main.component';
import { SearchComponent } from './search.component';

const routes: Routes = [{
  path: '', component: SearchComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: SearchMainComponent},
    {path: '_landing', component: SearchLandingComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
