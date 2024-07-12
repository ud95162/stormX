import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quicklinkFilterPipe'
})
export class QuicklinkFilterPipePipe implements PipeTransform {

  transform(completeResponses: any, searchName: any): any {
    if (!completeResponses || !searchName) {
      return completeResponses;
    }
    if (searchName) {
      const filterByLinkNameOrCategory: Array<String> = [];
      completeResponses.forEach(response => {
        if (response.categoryName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1 ||
          response.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
          filterByLinkNameOrCategory.push(response);
        }
      });
      return filterByLinkNameOrCategory;
    }
  }

}
