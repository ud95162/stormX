import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-message-chile',
  templateUrl: './message-chile.component.html',
  styleUrls: ['./message-chile.component.css']
})
export class MessageChileComponent implements OnInit {
  message: string;

  @Input() checkInputMessage: string;

  messageToCheckOutput: string = 'message to check output';
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private httpserviceshared: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.httpserviceshared.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    const searchKey = (<HTMLInputElement>document.getElementById('usr')).value;

    this.httpserviceshared.changeMessage(searchKey);
  }

  sendMessageToParent() {
    this.messageEvent.emit(this.messageToCheckOutput);
  }
}
