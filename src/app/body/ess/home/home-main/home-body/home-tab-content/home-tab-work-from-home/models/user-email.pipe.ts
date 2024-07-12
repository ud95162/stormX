import { Pipe, PipeTransform } from '@angular/core';
import {ResponseDataObject} from './ObjectModels/response-data-object';

@Pipe({
  name: 'userEmailFilter'
})
export class UserEmailPipe implements PipeTransform {

  transform(responses: ResponseDataObject[], selectedEmail: string): ResponseDataObject[]{
    if (selectedEmail === undefined) {
      return responses;
    }

    return responses.filter(response =>
      response.email.toLowerCase().indexOf(selectedEmail.toLowerCase()) !== -1);
  }

}
