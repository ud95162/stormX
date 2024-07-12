import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoginServiceService} from '../../../../service/login-service.service';
import {Profile} from '../../../../_global/profile';
import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
import {environment} from '../../../../../environments/environment';
import {GeneralOps} from "../../../../utility/GeneralOps";

@Component({
  selector: 'app-message-main',
  templateUrl: './message-main.component.html',
  styleUrls: ['./message-main.component.css']
})
export class MessageMainComponent implements OnInit {
  checkPermission = new GeneralOps();
componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  employeePermission;

  imageUploadUrl;
  message: string;
  customStyle = {
    selectButton: {
      'background-color': 'transparent',
      'border-radius': '25px',
      'color': '#333333',
      'box-shadow': 'none',
      'margin': '0'
    },
    clearButton: {
      'display': 'none'
    },
    layout: {
      'background-color': 'transparent',
      'color': '#838383',
      'font-size': '10px !important',
      'width': '50%',
      'font-family': 'roboto'
    },
    previewPanel: {}
  };

  messageFromParent = 'message from parent';

  messageFromChild;

  constructor(private httpservice: LoginServiceService, private httpserviceshared: InterCommunicationServiceService,
              public router: Router) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.checkAuthenticated();

    this.imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/feed/upload/' + Profile.EMPLOYEE_ID;

    this.httpserviceshared.currentMessage.subscribe(message => this.message = message);

    this.encryptTxt('hello');
  }

  checkAuthenticated() {
    this.httpservice.checkTokenStatus()
      .subscribe(
        (data: any) => {
          if (data[0].authenticated === false) {
            window.location.replace(environment.LOGIN_URL);
          }
        }
      );
  }

  getTheMessageFromChild($event) {
    this.messageFromChild = $event;
  }

  encryptTxt(e) {
    // const crypted = CryptoKriyo.AES.encrypt(e, Profile.USER_TOKEN);
    // console.log('encrypted - ' + crypted);
    //
    // var bytes = CryptoKriyo.AES.decrypt(crypted.toString(), Profile.USER_TOKEN).toString(CryptoKriyo.enc.Utf8);
    //
    // console.log(bytes);
  }

  uploadFinish(url) {
  }

  getDateAndTime() {
    const dateandtime = (<HTMLInputElement>document.getElementById('newEmployeeDob')).value;
    // console.log(dateandtime);
  }
}
