import {Component, Input, OnInit} from '@angular/core';
import {FeedServiceService} from '../../../../service/feed-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tagged-photos',
  templateUrl: './tagged-photos.component.html',
  styleUrls: ['./tagged-photos.component.css']
})
export class TaggedPhotosComponent implements OnInit {
  @Input() employeeId;

  showContainer = false;
  dataLoaded = false;
  imageLoading = true;
  imageList = [];

  constructor(private httpservice: FeedServiceService, public router: Router) {
  }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.imageLoading = true;
    this.httpservice.getTaggedImages(this.employeeId)
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.showContainer = false;
          } else {
            this.imageList = data;
            this.dataLoaded = true;
            this.showContainer = true;
          }
          this.imageLoading = false;
        }
      );
  }

}
