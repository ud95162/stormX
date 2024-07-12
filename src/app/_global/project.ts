export class Project {
  static PROJECT_NAME: any = localStorage.getItem('projectName');
  static PROJECT_CODE: any = localStorage.getItem('projectCode');
  static PROJECT_COUNT: any = localStorage.getItem('employeeCount');
  static SETTINGS: any = localStorage.getItem('settings');
  static PROJECT_IMAGE: any = localStorage.getItem('projectImage');
  id: number;
  image: string;
  name: string;
}
