import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileReviewComponent} from './profile-review.component';
import {ReviewsModule} from '../../reviews/reviews.module';
import {ProfileReviewPostModalComponent} from './profile-review-post-modal/profile-review-post-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReviewsModule,
    FormsModule
  ],
  declarations: [ProfileReviewComponent, ProfileReviewPostModalComponent],
  exports: [ProfileReviewComponent, ProfileReviewPostModalComponent]
})
export class ProfileReviewModule {
}
