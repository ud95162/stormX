import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'projectsAttendance'
})
export class ProjectsAttendancePipe implements PipeTransform {

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
        } else {
          if (response.currentAttendanceResponse.absentAttendances !== undefined) {
            response.currentAttendanceResponse.absentAttendances.forEach(absent => {
              if (absent.empName && absent.empName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
                filterByProject.push(response);
              }
            });
          }
          if (response.currentAttendanceResponse.homeAttendances !== undefined) {
            response.currentAttendanceResponse.homeAttendances.forEach(home => {
              if (home.empName && home.empName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
                filterByProject.push(response);
              }
            });
          }
          if (response.currentAttendanceResponse.leaveAttendances !== undefined) {
            response.currentAttendanceResponse.leaveAttendances.forEach(leave => {
              if (leave.empName && leave.empName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
                filterByProject.push(response);
              }
            });
          }
          if (response.currentAttendanceResponse.officeAttendances !== undefined) {
            response.currentAttendanceResponse.officeAttendances.forEach(office => {
              if (office.empName && office.empName.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) !== -1) {
                filterByProject.push(response);
              }
            });
          }
        }
      });

      return filterByProject.filter((value, index, self) => self.indexOf(value) === index);
    }
  }

}
