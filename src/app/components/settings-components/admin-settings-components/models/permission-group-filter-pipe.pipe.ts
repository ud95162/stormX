import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissionGroupFilterPipe'
})
export class PermissionGroupFilterPipePipe implements PipeTransform {

  transform(completeResponses: any, searchName: any): any {
    if (!completeResponses || !searchName) {
      return completeResponses;
    }
    if (searchName) {
      const filterByPermissionGroup: Array<String> = [];
      completeResponses.forEach(response => {
        if (response.permissionGroup.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
          filterByPermissionGroup.push(response);
          // console.log('loop', filterByDesignation)
        }
      });
      return filterByPermissionGroup;
    }
  }

}
