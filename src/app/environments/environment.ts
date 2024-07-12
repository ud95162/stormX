// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//   production: false,
//   API_PATH: 'http://192.168.1.13:8080',
//   API_WAR: 'codegen',
//   LOGIN_URL: 'http://192.168.1.13:8080/codegen',
//   SOCKET_BASE_URL: 'ws://192.168.1.13:8080/codegen',
//   IMAGE_BASE_PATH: 'http://192.168.1.13:8080/codegen/',
//   PROFILE_IMAGE_SIZE: 2097152,
//   POST_IMAGE_SIZE: 10485760
// };

// export const environment = {
//   production: false,
//   API_PATH: 'http://192.168.4.74:8080',
//   API_WAR: 'codegen',
//   LOGIN_URL: 'http://192.168.4.74:8080/codegen',
//   SOCKET_BASE_URL: 'ws://192.168.4.74:8080/codegen',
//   IMAGE_BASE_PATH: 'http://192.168.4.74:8080/codegen/',
//   PROFILE_IMAGE_SIZE: 2097152,
//   POST_IMAGE_SIZE: 10485760
// };

export const environment = {
  production: false,
  // API_PATH: 'http://119.235.9.12:7070',
  // API_PATH: 'http://localhost:8081/',
  API_PATH: '',
  API_WAR: 'codegen',
  HEAD_COUNT_DB_WAR: 'head-count-db',
  WAR : 'rnr',
  // LOGIN_URL: 'http://119.235.9.12:7070/codegen',
  LOGIN_URL: '/codegen',
  SOCKET_BASE_URL: 'ws://192.168.3.117:8080/greeting',
  // IMAGE_BASE_PATH: 'http://119.235.9.12:7070/codegen/',
  IMAGE_BASE_PATH: '/codegen/',
  EMPLOYEE_IMAGE_PATH: '/employee-service/',
  PROFILE_IMAGE_SIZE: 5242880,
  POST_IMAGE_SIZE: 10485760,
  PULSE_API: 'http://pulse.codegen.net/Pulse2/api/codegen/kriyo',
  // PULSE_API: 'http://172.16.3.40:8080/api/codegen/kriyo',
  // PULSE_API: '/codegen/kriyo',
  PULSE_USER: 'kriyo',
  PULSE_PASS: 'kriyo@123',
  OVERVIEW_WAR: 'overview',
  KPI_WAR: 'kpi',
  KG_WAR: 'knowledge-graph',
  // RESOURCE_ALLOCATION_WAR :'kriyo-resource-allocation',
  RESOURCE_ALLOCATION_WAR : '',
  // KG_IMPL_PYTHON_API: 'http://192.168.4.215:8090/',
  KG_IMPL_PYTHON_API: 'https://knowledge-extraction.kriyo.net//',
  // WEB_TRACKER_API: 'https://www.webwork-tracker.com',
  WEB_TRACKER_API_WAR: 'kriyo-work-from-home',
  FEEDBACK_API_WAR: 'feedback',
  RECRUITMENT_NEW_WAR: 'recruitment-new',
  HIRING_WAR: 'hiring',
  DUTY_ROSTER_REDIRECT_URL: 'http://localhost:5000/'

};

// export const environment = {
//   production: false,
//   API_PATH: 'http://192.168.1.14:8080',
//   API_WAR: 'codegen',
//   LOGIN_URL: 'http://192.168.1.14:8080/codegen',
//   IMAGE_BASE_PATH: 'http://192.168.1.14:8080/codegen/',
//   PROFILE_IMAGE_SIZE: 2097152,
//   POST_IMAGE_SIZE: 10485760
// };

// export const environment = {
//   production: false,
//   API_PATH: 'http://192.168.1.13:8080',
//   API_WAR: 'codegen',
//   LOGIN_URL: 'http://192.168.1.13:8080/codegen',
//   IMAGE_BASE_PATH: 'http://192.168.1.13:8080/codegen/',
//
// Departure Avg  SOCKET_BASE_URL: 'ws://192.168.1.13:8080/codegen',
//   PROFILE_IMAGE_SIZE: 2097152,
//   POST_IMAGE_SIZE: 10485760,
//
//   PULSE_LOCAL_API: 'http://172.16.3.40:8080/api/codegen/kriyo',
//   // PULSE_API: 'http://pulse.codegen.net/Pulse2/api/codegen/kriyo',
//   PULSE_API: 'http://172.16.3.40:8080/api/codegen/kriyo',
//   PULSE_USER: 'kriyo',
//   PULSE_PASS: 'kriyo@123'
// };
