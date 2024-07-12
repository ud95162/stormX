import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";

@Injectable({
  providedIn: 'root'
})
export class OpdManagementEventEmitterService {
  invokeHeaderComponentFunction = new EventEmitter();
  subsVar: Subscription;
  constructor() { }

  onStatusChange() {
    this.invokeHeaderComponentFunction.emit();
  }
}
