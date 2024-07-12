import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeedMainComponent} from './feed-main/feed-main.component';
import {FeedComponent} from './feed.component';
import {FeedPostIndividualComponent} from './feed-main/feed-post-individual/feed-post-individual.component';

const routes: Routes = [{
  path: '', component: FeedComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: FeedMainComponent},
    {path: 'post/:id', component: FeedPostIndividualComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {
}
