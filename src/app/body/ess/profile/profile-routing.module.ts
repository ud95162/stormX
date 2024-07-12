import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileMainComponent} from './profile-main/profile-main.component';
import {ProfileComponent} from './profile.component';
import {ProfileSearchComponent} from './profile-main/profile-search/profile-search.component';
import {ProfileLogsComponent} from './profile-main/profile-logs/profile-logs.component';

const routes: Routes = [{
  path: '', component: ProfileComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: ProfileMainComponent},
    {path: 'main/logs', component: ProfileLogsComponent},
    {path: '_search', component: ProfileSearchComponent},
    {path: '_search_/:empNo/:username', component: ProfileSearchComponent}
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
