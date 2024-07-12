import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import {FormGroup} from '@angular/forms';

const BASE_URL = environment.API_PATH;
const WAR = environment.WAR;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http : HttpClient) { }

  uploadFile(uploadForm: FormGroup): Observable<HttpEvent<{}>> {
    // tslint:disable-next-line:indent
		const formdata: FormData = new FormData();
    formdata.append('file', uploadForm.get('file').value);
    const req = new HttpRequest('POST', BASE_URL + '/' + WAR + '/upload', formdata, {
      // tslint:disable-next-line:indent
      reportProgress: true,
      responseType: 'text'
      // tslint:disable-next-line:indent
    });
		return this.http.request(req);
   }
}
