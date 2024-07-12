import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  registeredDialog: any;

  constructor() { }

  register(dialog: any) {
    this.registeredDialog = dialog;
  }

  show() {
    return new Promise<void>((resolve, reject) => {
      this.registeredDialog.show();
      this.registeredDialog.onOk.subscribe(() => {
        this.registeredDialog.hide();
        resolve();
      });
    });
  }


}
