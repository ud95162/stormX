import { Pipe, PipeTransform } from '@angular/core';
import {ResponseDataObject} from './ObjectModels/response-data-object';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(completeResponses: ResponseDataObject[], searchTermName: string, searchTermEmail: string, searchTermProjectName: string): ResponseDataObject[] {
    if (!completeResponses || (!searchTermName && !searchTermEmail && !searchTermProjectName)) {
      return  completeResponses;
    }

    if (searchTermName) {
      if (searchTermEmail) {
        if (searchTermProjectName) {
          const filterByProject: Array<ResponseDataObject> = [];
          completeResponses.forEach(response => {
            response.projects.forEach(project => {
              if (project.projectName.toLocaleLowerCase().indexOf(searchTermProjectName.toLocaleLowerCase()) !== -1){
                filterByProject.push(response);
              }
            });
          });
          const filterByEmail = filterByProject.filter(completeResponse =>
            completeResponse.email.toLocaleLowerCase().indexOf(searchTermEmail.toLocaleLowerCase()) !== -1);
          return filterByEmail.filter(completeResponse =>
            completeResponse.fullName.toLocaleLowerCase().indexOf(searchTermName.toLocaleLowerCase()) !== -1);
        } else {
          const filterByEmail = completeResponses.filter(completeResponse =>
            completeResponse.email.toLocaleLowerCase().indexOf(searchTermEmail.toLocaleLowerCase()) !== -1);
          return filterByEmail.filter(completeResponse =>
            completeResponse.fullName.toLocaleLowerCase().indexOf(searchTermName.toLocaleLowerCase()) !== -1);
        }
      } else {
        if (searchTermProjectName) {
          const filterByProject: Array<ResponseDataObject> = [];
          completeResponses.forEach(response => {
            response.projects.forEach(project => {
              if (project.projectName.toLocaleLowerCase().indexOf(searchTermProjectName.toLocaleLowerCase()) !== -1){
                filterByProject.push(response);
              }
            });
          });
          return filterByProject.filter(completeResponse =>
            completeResponse.fullName.toLocaleLowerCase().indexOf(searchTermName.toLocaleLowerCase()) !== -1);
        } else {
          return completeResponses.filter(completeResponse =>
            completeResponse.fullName.toLocaleLowerCase().indexOf(searchTermName.toLocaleLowerCase()) !== -1);
        }
      }
    } else {
      if (searchTermEmail) {
        if (searchTermProjectName) {
          const filterByProject: Array<ResponseDataObject> = [];
          completeResponses.forEach(response => {
            response.projects.forEach(project => {
              if (project.projectName.toLocaleLowerCase().indexOf(searchTermProjectName.toLocaleLowerCase()) !== -1){
                filterByProject.push(response);
              }
            });
          });
          return filterByProject.filter(completeResponse =>
            completeResponse.email.toLocaleLowerCase().indexOf(searchTermEmail.toLocaleLowerCase()) !== -1);
        } else {
          return completeResponses.filter(completeResponse =>
            completeResponse.email.toLocaleLowerCase().indexOf(searchTermEmail.toLocaleLowerCase()) !== -1);
        }
      } else {
        if (searchTermProjectName) {
          const responses: Array<ResponseDataObject> = [];
          completeResponses.forEach(response => {
            response.projects.forEach(project => {
              if (project.projectName.toLocaleLowerCase().indexOf(searchTermProjectName.toLocaleLowerCase()) !== -1){
                responses.push(response);
              }
            });
          });
          return  responses;
        } else {
          return null;
        }
      }
    }
  }
}
