import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../../../environments/environment';
import {Profile} from "../../../../_global/profile";
const BASE_URL = environment.API_PATH;
const WAR = environment.FEEDBACK_API_WAR;
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  API_SERVER = `${BASE_URL}/${WAR}/suggestions/`;
  // API_SERVER="http://119.235.9.12:7070/feedback/suggestions/";
  // API_SERVER = 'https://api.vitaz.dev/';
  // API_SERVER="http://localhost:8081/suggestions/";
  topic: any;
  description: any;
  name: any;
  service: any;
  services: any;
  panelOpenState: any;
  ongoing_service: any;
  approvedList: any = [];
  suggestions: any = [];
  loading = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
    })
  };

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getApproved();
    this.getServices();
    // this.onServiceChange();

  }

  getServices() {
    this.httpClient.get(this.API_SERVER + 'suggestions_services', this.httpOptions).subscribe(
      res => {
        this.services = res;
        this.service = this.services[0]['id'];
        this.ongoing_service = this.services[0]['id'];
        this.onServiceChange();
      });
  }

  onServiceChange() {
    this.suggestions = [];
    if (this.approvedList.length < 1) {
      this.getApproved();
    } else {
      for (let i in this.approvedList) {
        // console.log(this.approvedList[i].service.id);
        if (this.approvedList[i].service.id == this.ongoing_service) {
          this.suggestions.push(this.approvedList[i]);
        }
      }
    }

  }

  onTabChanged() {
    this.getApproved();
    this.onServiceChange();

  }
  getApproved(){
    this.httpClient.get(this.API_SERVER + 'usersuggestions', this.httpOptions).subscribe(
      res => {
        this.approvedList = res;
        // console.log(111111111111111111111111111);
        // console.log(res);
      });
  }

  upvote(event, id, sug) {
    event.stopPropagation();
    // console.log(11);
    const body = {'suggestions_id': id, 'upvote': 1};
    sug.upvote += 1;
    this.httpClient.post(this.API_SERVER + 'suggestions_upvote', body, this.httpOptions).subscribe(
      res => {
        sug.upvote = res;
      }
    );
  }

  downvote(event, id, sug) {
    event.stopPropagation();
    // console.log(22);
    sug.upvote -= 1;
    const body = {'suggestions_id': id, 'upvote': -1};
    this.httpClient.post(this.API_SERVER + 'suggestions_upvote', body, this.httpOptions).subscribe(
      res => {
        sug.upvote = res;
      }
    );
  }

  addSuggestions() {
    this.loading = true;
    const body = {
      'topic': this.topic,
      'description': this.description,
      'name': this.name,
      'service_id': this.service,
      'status': 0,
      'dashboard': 0
    };
    this.httpClient.post(this.API_SERVER + 'suggestions', body, this.httpOptions).subscribe(
      res => {
        this.topic = '';
        this.description = '';
        this.name = '';
        this.loading = false;
        this.service = this.services[0]['id'];
        this._snackBar.open('Suggestion saved successfully!', '', {
          duration: 3500,
        });

      }
    );

  }
}
