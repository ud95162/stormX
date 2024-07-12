/**
 * Created by kavindu on 6/28/2017.
 */

export class Profile {
  // ltk_ - Logged in user token
  // lut_ - logged in user type
  // leid_ - logged in user id
  // ldh_ - load home
  // lun_ - logged in user name
  // luim_ - logged in user image

  static EMPLOYEE_ID: any = localStorage.getItem('leid_');
  static USER_TYPE: any;
  static USER_TOKEN: any;
  static USER_NAME: any;
  static EMPLOYEE_FULL_NAME: any;
  static CHAT_USER_NAME: any;
  static HOME_LOAD: any;
  static LOGGED_IN_IMAGE: any = localStorage.getItem('luim_');
  static WORKING_PROJECT: any;
  static EMPLOYEE_DATA_SET: any = [];
  static PROFILE_PROGRESS: any;
  static EMPLOYEE_NAME_LIST: any;
  static EMPLOYEE_COMPANY: any;
  static EMP_DB_ID: any = localStorage.getItem('emp_db');
  static USER_LOGIN_TYPE: any;
  static NEW_EMPLOYEE_NO: any;
  static EMP_EMAIL: any;

  static EMPLOYEE_APPLICATION_PERMISSION: any;
  static EMP_APPRAISAL_PERMISSION: any;
  static ROSTER_PERMISSION_GROUP_ID: any;
}
