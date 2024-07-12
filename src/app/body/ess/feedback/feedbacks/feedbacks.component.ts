import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';
import { StarRatingServiceService } from '../star-rating-service.service';
import {environment} from '../../../../../environments/environment';
import {Profile} from "../../../../_global/profile";
const BASE_URL = environment.API_PATH;
const WAR = environment.FEEDBACK_API_WAR;
@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  q4starCount = 0;
  name: string;
  email: string;
  tele: string;
  feedback: string;
  indexCompleted = false;
  questions: any = [];
  services: any = [];
  selected = 'option2';
  service: any;
  // API_SERVER = 'https://api.vitaz.dev/';
  // API_SERVER="http://localhost:8081/feedback/";
  // API_SERVER="http://119.235.9.12:7070/feedback/feedback/";
  API_SERVER = `${BASE_URL}/${WAR}/feedback/`;
  loading = false;
  overallRating = new StarRatingServiceService();
  @ViewChild('stepper', { static: false }) stepper!: MatStepper;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
    })
  };

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {

  }
  getServices(){
    this.httpClient.get(this.API_SERVER + 'feedbackservices', this.httpOptions).subscribe(
      res => {
        this.services = res;
        console.log(res);
      });

  }
  getQuestions(){

    this.httpClient.get(this.API_SERVER + 'feedbackquiz', this.httpOptions).subscribe(
      res => {
        console.log(res);
        // tslint:disable-next-line:forin
        for (const quiz in res) {
          const a = new StarRatingServiceService();
          // asas:this.starRating;
          this.questions.push({'quiz': res[quiz], 'rating': a});
        }
        console.log(this.questions);
      });

  }
  submitFeedback() {
    this.loading = true;
    // tslint:disable-next-line:one-line
    if (!this.name || this.name == ' '){
      this.name = 'Anonymous';
    }
    if (!this.email || this.email == ' '){
      this.email = 'Anonymous';
    }
    if (!this.tele) {
      this.tele = 'Not Provided';
    }
    if (!this.feedback) {
      this.feedback = 'Not Provided';
    }
    const body = {'userName': this.name, 'email': this.email, 'telephone': this.tele, 'feedback': this.feedback, 'overall_rating': this.overallRating.getRatingNo(), 'service_id': this.service};
    this.overallRating.setRating(0);
    this.httpClient.post(this.API_SERVER + 'feedbacks', body, this.httpOptions).subscribe(
      res => {
        // tslint:disable-next-line:no-shadowed-variable
        const body = [];
        for (const quiz in this.questions){
          body.push({'quiz_id': this.questions[quiz].quiz.id, 'rating': this.questions[quiz].rating.getRatingNo(), 'service_id': this.service});
          this.questions[quiz].rating.setRating(0);
        }

        this.httpClient.post(this.API_SERVER + 'feedbackrating', body, this.httpOptions).subscribe(
          res => {
            console.log(res);
            this.name = ' ';
            this.email = ' ';
            this.tele = '';
            this.feedback = '';
            this.loading = false;
            this.service = null;
            this.stepper.selectedIndex = 0;
            this._snackBar.open('Feedback saved successfully!', '', {
              duration: 3500,
            });
          });
      }
    );
  }


  ngOnInit(): void {
    this.getServices();
    this.getQuestions();
  }
}
