import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpResponse, HttpErrorResponse, HttpClient} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpEvent } from '@angular/common/http';
import { tap, finalize, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable({
  providedIn: 'root'
})
export class RequestTimestampService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var startTime = (new Date()).getTime();
    //var newReq = req.clone({ headers: req.headers.set('startTime', startTime.toString()) });

    return next.handle(req).pipe(
      map(
        (event) => {
          if (event instanceof HttpResponse) {
            var endTime = (new Date()).getTime();
            event = event.clone({ headers: event.headers.set('endTime', endTime.toString()) });
            event = event.clone({ headers: event.headers.set('startTime', startTime.toString()) });
            var diff = endTime - startTime;
            this.http
              .post(`${BASE_URL}/${WAR}/log/data`, {
                startTime: startTime,
                endTime: endTime,
                differance:diff,
                eventname: event.url.toString()
              })
              .subscribe();
            console.log(event.url + " succeded in " + diff + " milli seconds");
          }
          return event;
        }), tap(event => { },
        error => {
          if (error instanceof HttpErrorResponse) {
            var endTime = (new Date()).getTime();
            var diff = endTime - startTime;

            console.log(error.url + " failed in " + diff + " milli seconds");
          }

        }

      )
    )
      ;
  }
  constructor(private http:HttpClient) { }
}
