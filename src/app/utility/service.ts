import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class Service {
  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get('timeline/course/course.json'); // records in this case
  }
}
