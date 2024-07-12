import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageFilterPipe'
})
export class PageFilterPipePipe implements PipeTransform {

  transform(completeResponses: any, searchName: any): any {
    if (!completeResponses || !searchName) {
      return completeResponses;
    }
    if (searchName) {
      const filterByPage: Array<String> = [];
      completeResponses.forEach(response => {
        if (response.pageName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1 ||
          response.creatorInfo.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
          filterByPage.push(response);
          // console.log('loop', filterByDesignation)
        }
      });
      return filterByPage;
    }
  }

}
