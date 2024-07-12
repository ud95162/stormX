import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { RatingComponent } from './rating/rating.component';
import { SuggestionComponent } from './suggestion/suggestion.component';


const routes: Routes = [{
  path: '', component: FeedbackComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: FeedbacksComponent},
    {path: 'rating', component: RatingComponent},
    {path: 'suggestion', component: SuggestionComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
