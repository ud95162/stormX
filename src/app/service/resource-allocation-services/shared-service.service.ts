import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private status = new BehaviorSubject('');
  currentStatus = this.status.asObservable();

  constructor() {}

  changeStatus(status: string) {
    this.status.next(status);
  }


}
