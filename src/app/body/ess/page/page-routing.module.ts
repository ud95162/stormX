import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page.component';
import {PageMainComponent} from './page-main/page-main.component';

const routes: Routes = [{
  path: '', component: PageComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main/:pageId', component: PageMainComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}
