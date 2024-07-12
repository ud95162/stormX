import { Component, OnInit } from '@angular/core';
import { StarRatingServiceService } from '../star-rating-service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';
import {environment} from '../../../../../environments/environment';
import {Profile} from "../../../../_global/profile";
const BASE_URL = environment.API_PATH;
const WAR = environment.FEEDBACK_API_WAR;
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  q4starCount= 0;
  name: string;
  email: string;
  tele: string;
  feedback: string;
  indexCompleted= false;
  questions: any= [];
  services: any= [];
  selected = 'option2';
  service: any;
  loading = false;
  subService: any;
  subServices: any= {};
  subServicesList: any;
  API_SERVER = `${BASE_URL}/${WAR}/rating/`;
  // API_SERVER="http://119.235.9.12:7070/feedback/rating/";
  // API_SERVER= 'https://api.vitaz.dev/';
  // API_SERVER="http://localhost:8081/rating/";
  overallRating= new StarRatingServiceService();

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getServices();
  }
  getServices(){

    this.httpClient.get(this.API_SERVER + 'rating_services').subscribe(
      res => {
        for (const i in res){
          console.log(i);
          this.subServices[res[i]['id']] = res[i]['subServices'];
        }
        this.services = res;
        this.service = this.services[0].id;
        this.updateQuestions();
        console.log(res);
      });

  }
  updateQuestions(){
    this.subServicesList = this.subServices[this.service];
    // tslint:disable-next-line:one-line
    if (this.subServicesList.length > 0){
      this.subService = this.subServicesList[0]['id'];
    }
    this.updateSubService();
  }

  updateSubService(){
    if (this.subService != undefined){
      this.questions = [];
      this.httpClient.get(this.API_SERVER + 'ratingquiz/' + this.service + '/' + this.subService).subscribe(
        res => {
          for (const i in res){
            const a = new StarRatingServiceService();
            this.questions.push({'quiz': res[i], 'rating': a});
          }
        }
      );
    }
  }

  submitRating(){
    this.loading = true;
    const body = [];
    for (const quiz in this.questions){
      body.push({'quiz_id': this.questions[quiz].quiz.id, 'rating': this.questions[quiz].rating.getRatingNo(), 'service_id': this.service, 'sub_service_id': this.subService});
      this.questions[quiz].rating.setRating(0);
    }

    this.httpClient.post(this.API_SERVER + 'ratingquizanswer', body).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.service = this.services[0].id;
        this.updateQuestions();
        this._snackBar.open('Rating submitted successfully!', '', {
          duration: 3500,
        });
        this.loading = false;
      });
  }
}
