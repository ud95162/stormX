import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from '../../../../../service/login-service.service';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-message-register',
  templateUrl: './message-register.component.html',
  styleUrls: ['./message-register.component.css']
})
export class MessageRegisterComponent implements OnInit {

  uploadImageSize = environment.POST_IMAGE_SIZE;

  showUploader = true;
  showImage = false;

  userimage = 'assets/image/avatar.png';

  imageUploadUrl = environment.IMAGE_BASE_PATH + 'file/demo/profile/upload';
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
      'width': '100%',
      'font-family': 'roboto'
    },
    previewPanel: {
      'display': 'none'
    }
  };

  constructor(private httpservice: LoginServiceService) {
  }

  ngOnInit() {
  }


  deleteUploadedImage() {
    this.userimage = 'assets/image/avatar.png';
    this.showUploader = true;
    this.showImage = false;
  }

  uploadFinish(url) {
    const uploadedImage = url.serverResponse.response.body[0];
    this.userimage = uploadedImage;
    this.showUploader = false;
    this.showImage = true;
  }

  saveuser() {
    const userName = (<HTMLInputElement>document.getElementById('userName')).value;
    const userEmail = (<HTMLInputElement>document.getElementById('userEmail')).value;
    const userOrganization = (<HTMLInputElement>document.getElementById('userOrganization')).value;

    const json = {
      'email': userEmail,
      'image': this.userimage,
      'name': userName,
      'organization': userOrganization,
    };

    this.httpservice.savedemovisitor(json)
      .subscribe(
        (data: any) => {
          window.location.reload();
        }
      );

  }

}
