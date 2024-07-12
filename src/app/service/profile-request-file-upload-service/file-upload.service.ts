import { Injectable } from '@angular/core';
import {Profile} from '../../_global/profile';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

let httpOptions;
@Injectable({
  providedIn: 'root'
})

// let authorizationHttpOptions ;
export class FileUploadService {
  fileUploadUrl = '/OPD-request/admin-req-OPD/upload-file/' + Profile.EMPLOYEE_ID;
  policyUploadUrl = '/codegen/file/policy/upload';
  eventAttachmentUploadUrl = 'codegen/attachment/event/upload';


  constructor(private http: HttpClient) {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Profile.USER_TOKEN
      }),
      responseType: 'json',
      reportProgress: true
    };
  }

  uploadFile(file:any ,perm_code:string) {
    // this.setHeaders(perm_code);
    return this.http.post(this.fileUploadUrl, file,{
        responseType: 'json',
        reportProgress: true,
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode' : perm_code
        })
      }
    );
  }

  uploadPolicyFile(file: any , perm_code: string) {
    // this.setHeaders(perm_code);
    return this.http.post(this.policyUploadUrl, file, {
        responseType: 'json',
        reportProgress: true,
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode' : perm_code
        })
      }
    );
  }

  uploadEventAttachment(fileName: any, perm_code: string) {
    return this.http.post(this.eventAttachmentUploadUrl, fileName, {
        responseType: 'json',
        reportProgress: true,
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Authorization': Profile.USER_TOKEN,
          'permCode' : perm_code
        })
      }
    );
  }



}
