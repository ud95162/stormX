import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectMembers'
})
export class ProjectMembersPipe implements PipeTransform {

  transform(completeResponses: any, searchName: any): any {
    if (!completeResponses || !searchName) {
      return completeResponses;
    }
    if (searchName) {
      const filterByEmployee: Array<String> = [];
      completeResponses.forEach(response => {
        if (response.empName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1 ||
          response.empNo.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
          filterByEmployee.push(response);
        }
      });
      return filterByEmployee;
    }
  }
}
