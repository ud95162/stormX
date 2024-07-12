import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeSummary'
})
export class EmployeeSummaryPipe implements PipeTransform {

  transform(array: any[], chunkSize: number): any[] {
    if (!array) {
      return [];
    }

    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

}
