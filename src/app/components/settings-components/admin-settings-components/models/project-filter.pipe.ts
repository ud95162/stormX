// import { Pipe, PipeTransform } from '@angular/core';
//
// @Pipe({
//   name: 'projectFilterPipe'
// })
// export class ProjectFilterPipe implements PipeTransform {
//
//   transform(completeResponses: any, searchName: any): any {
//     if (!completeResponses || !searchName) {
//       return completeResponses;
//     }
//     if (searchName) {
//       const filterByProject: Array<String> = [];
//       completeResponses.forEach(response => {
//         if (response.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1 ) {
//           filterByProject.push(response);
//           console.log('loop', filterByProject)
//         }
//       });
//       return filterByProject;
//     }
//   }
//
// }
