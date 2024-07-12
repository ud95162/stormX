import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projects'
})
export class ProjectsPipe implements PipeTransform {

  transform(completeResponses: any, searchName: any): any {
    if (!completeResponses || !searchName) {
      return completeResponses;
    }
    if (searchName) {
      const filterByProject: Array<String> = [];
      completeResponses.forEach(response => {
        if (response.projectName && typeof response.projectName === 'string'
          && response.projectName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
          filterByProject.push(response);
        }
      });

      return filterByProject.filter((value, index, self) => self.indexOf(value) === index);
    }
  }


}
