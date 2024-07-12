import {Pipe, PipeTransform} from '@angular/core';

export class Education {
  constructor(
    public id: any,
    public name: String
  ) {
  }

}

@Pipe({
  name: 'educationFilterPipe'
})

export class EducationFilterPipePipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any {

    // console.log('searchTerm ', searchTerm);
    return searchTerm ? items.filter(item => item.name.indexOf(searchTerm) !== -1) : items;


  }
}
