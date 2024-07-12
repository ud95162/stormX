import {Pipe, PipeTransform} from '@angular/core';
import {Designation} from '../../../../classes/rnr/Designation';
import {DesignationGroup} from '../../../../classes/settings/designationGroup';

export class DesignationCategoryObj {
  constructor(
    public designation: Designation,
    public designationCategory: any,
    public designationGroup: DesignationGroup,
  ) {
  }

}

@Pipe({
  name: 'designationFilterPipe'
})
export class DesignationFilterPipePipe implements PipeTransform {

  transform(completeResponses: any, searchName: any): any {
    if (!completeResponses || !searchName) {
      return completeResponses;
    }
    if (searchName) {
      const filterByDesignation: Array<Designation> = [];
        completeResponses.forEach(response => {
          if (response.designation.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
            filterByDesignation.push(response);
            // console.log('loop', filterByDesignation)
          }
        });
      return filterByDesignation;
    }
  }
}
