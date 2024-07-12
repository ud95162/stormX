import { EventEmitter, Injectable } from '@angular/core';
import { CommonAttendance } from '../classes/common/common-attendance';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  public onChangeProject: EventEmitter<CommonAttendance> = new EventEmitter<CommonAttendance>();
  public onChangeCompany: EventEmitter<CommonAttendance> = new EventEmitter<CommonAttendance>();

  public setValuesToProjectSelector(clicked: boolean) {
    this.onChangeProject.emit({isClicked:clicked});
  }

  public setValuesToCompanySelector(clicked: boolean) {
    this.onChangeCompany.emit({isClicked:clicked});
  }

}
