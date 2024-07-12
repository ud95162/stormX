import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarRatingServiceService {
  stars: any = ['star_outline', 'star_outline', 'star_outline', 'star_outline', 'star_outline'];
  ratingNo = 0;
  constructor() { }
  getRating(pos) {
    return this.stars[pos];
  }
  getRatingNo() {
    return this.ratingNo;
  }

  setRating(pos) {
    this.ratingNo = pos;
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < pos) {
        this.stars.push('star');
      } else {
        this.stars.push('star_outline');
      }
    }
  }
}
