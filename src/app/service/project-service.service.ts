import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Profile} from '../_global/profile';
import {ProjectCreateData} from "../components/settings-components/admin-settings-components/models/ProjectSettings";

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;

@Injectable()
export class ProjectServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  Profile.USER_TOKEN
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getProjectPreLoadData(projectCode: string) {
    return this.http.get(`/project-dashboard/project/pre-load-data/${projectCode}`);
  }

  appointingProjectLeaveManager(payload: any) {
    return this.http.post(`/project-dashboard/project/leave/manager/save`, payload, this.httpOptions);
  }

  getProject(project_name: string) {
    return this.http.get(`/project-dashboard/project/distribution/${project_name}`);
  }
  getProjectMemberDetail(projectCode: string) {
    return this.http.get(`/project-dashboard/project/members/${projectCode}`);
  }

  getIndividualProjectMemberDetail(payload: any) {
    return this.http.post(`/project-dashboard/project/members`, payload, this.httpOptions);
  }

  getProjectHeadDetail(projectCode: string) {
    return this.http.get(`project-dashboard/project/project-header/` + projectCode, this.httpOptions);
  }

  getProjectDashboardDesignationGraph(projectCode: string) {
    return this.http.get(`/project-dashboard/project/dashboard/designation?projectCode=${projectCode}`);
  }

  getMembersDetails(project_name: string, date: string) {
    return this.http.get('/project-dashboard/details/members/' + project_name + '/' + date , this.httpOptions);
  }

  getTeamDetails(project_name: string) {
    return this.http.get('/project-dashboard/details/sub-teams/' + project_name , this.httpOptions);
  }

  getProjectTrainee(project_name: string, date: string) {
    return this.http.get('project-dashboard/details/members-trainee/' + project_name + '/' + date, this.httpOptions);
  }

  getProjectHeadDetails(project_name: string) {
    return this.http.get(`/project-dashboard/details/project/` + project_name, this.httpOptions);
  }

  getProjectScheduledWorksDetail(project_name: string) {
    return this.http.get('/project-dashboard/details/project-schedule/' + project_name, this.httpOptions);
  }

  getSubTeamGotTasksDetail(project_name: string) {
    return this.http.get('/project-dashboard/details/sub-team-got-tasks/' + project_name , this.httpOptions);
  }

  getSubTeamCompletedTasksDetail(project_name: string) {
    return this.http.get('/project-dashboard/details/sub-team-completed-tasks/' + project_name , this.httpOptions);
  }

  getSubTeamFailedTasksDetail(project_name: string) {
    return this.http.get('/project-dashboard/details/sub-team-failed-tasks/' + project_name , this.httpOptions);
  }

  getProjectCostDetail(projectCode: string) {
    return this.http.get('/project-dashboard/details/project-overall-cost/' + projectCode , this.httpOptions);
  }

  getProjectRevenueDetail(projectCode: string) {
    return this.http.get('/project-dashboard/details/project-overall-revenue/' + projectCode , this.httpOptions);
  }

  getProjectManagerDetail(project_name: string) {
    return this.http.get('/project-dashboard/details/project-manager/' + project_name , this.httpOptions);
  }
  getProjectPerformance(projectCode: string , count: string) {
    return this.http.get('/project-dashboard/details/project-overall-performance/' + projectCode + '/' + count , this.httpOptions);
  }

  getGitlabAdditionsAndDeletionsOfProject(projectCode: string , date: string ) {
    return this.http.get('/project-dashboard/details/project-git-additions-and-deletions/' + projectCode + '/' + date , this.httpOptions);
  }
  getDesignationCountsOfProject(project_name: string, date: string) {
    return this.http.get('/project-dashboard/details/project-designation-count/' + project_name + '/' + date , this.httpOptions);
  }
  getSubTeamsTasksDetails(project_name: string) {
    return this.http.get('/project-dashboard/details/team-whole-tasks/' + project_name , this.httpOptions);
  }
  getWholeProjectImage() {
    return this.http.get('/project-dashboard/project/distribution' , this.httpOptions);
  }
  getProjectComparison(count: string, month: String) {
    return this.http.get('project-dashboard/comparison/project-comparison/' + count + '/' + month , this.httpOptions );
  }
  getProjectName() {
    return this.http.get('/project-dashboard/project/distribution', this.httpOptions);
  }
  getProjectsCostForComparison() {
    return this.http.get('/project-dashboard/comparison/cost-comparison' , this.httpOptions);
  }
  getProjectsRevenuesForComparison() {
    return this.http.get('/project-dashboard/comparison/revenue-comparison' , this.httpOptions);
  }

  getProjectWiseSelectedMembersCount(year: string, month: string) {
    return this.http.get('/project-dashboard/resource-map/project-wise-members-count/' + year + '/' + month , this.httpOptions);
  }
  getProjectJiraForResourceMap(year: string, month: string) {
    return this.http.get('/project-dashboard/resource-map/project-wise-jira-performance/' + year + '/' + month , this.httpOptions);
  }
  getProjectJiraComparison(count: string, month: string) {
    return this.http.get('project-dashboard/comparison/project-comparison-jira/' + count + '/' + month , this.httpOptions );
  }
  getSelectedProjectMembersAsPMDEVQA(project_name: string) {
    return this.http.get('/project-dashboard/details/project-designations-as-PM-DEV-QA/' + project_name , this.httpOptions);
  }
  getProjectGitLabForResourceMap(year: string, month: string) {
    return this.http.get('/project-dashboard/resource-map/project-wise-performance/' + year + '/' + month , this.httpOptions);
  }
  getWholeProjects() {
    return this.http.get('/project-dashboard/project/distribution' , this.httpOptions);
  }
  getDetailsAboutJiraIssuesOfProject(projectCode: string, task: string, date: string) {
    return this.http.get('/project-dashboard/details/project-jira-issues-details/' + projectCode + '/' + task + '/' + date , this.httpOptions);
  }
  getProjectTimeLogs(projectCode: string , date: string) {
    return this.http.get('/project-dashboard/details/project-timelogs/' + projectCode + '/' + date , this.httpOptions);
  }
  getProjectMembersTotalIssues(projectCode: string, date: String) {
    return this.http.get('/project-dashboard/details/project-members-issues/' + projectCode + '/' + date , this.httpOptions);
  }
  getSelectedMemberJiraIssueDetails(empId: string, count: string, projectCode: string) {
    return this.http.get('/project-dashboard/details/project-selected-member-issue-details/' + empId + '/' + count + '/' + projectCode , this.httpOptions);
  }
  getProjectDetails() {
    return this.http.get('/project-dashboard/project/project-details' , this.httpOptions);
  }
  getProjectMembersTimeLogs(projectCode: string, date: string) {
    return this.http.get('/project-dashboard/details/project-member-wise-time-log/' + projectCode + '/' + date , this.httpOptions);
  }
  getProjectMembersGitLabAdditionsAndDeletions(projectCode: string, date: string) {
    return this.http.get('/project-dashboard/details/project-members-additions-deletions/' + projectCode + '/' + date , this.httpOptions);
  }
  getProjectOwner(projectCode: string) {
    return this.http.get('/project-dashboard/details/project-owner/' + projectCode , this.httpOptions);
  }
  getWholePMsOfCompany() {
    return this.http.get('/project-dashboard/project-create-edit/whole-project-managers' , this.httpOptions);
  }
  getWholeProjectOwnersOfCompany() {
    return this.http.get('/project-dashboard/project-create-edit/whole-project-owners' , this.httpOptions);
  }
  createProject(payload: any) {
    return this.http.post(`project-dashboard/project-create-edit/add`, payload, this.httpOptions);
  }
  getProjectsRevenuesForResourceMap(year: string, month: string) {
    return this.http.get('/project-dashboard/resource-map/project-wise-revenue/' + year + '/' + month , this.httpOptions);
  }
  getProjectsCostsForResourceMap(year: string, month: string) {
    return this.http.get('/project-dashboard/resource-map/project-wise-cost-and-revenue/' + year + '/' + month , this.httpOptions);
  }
  getProjectWiseCostAndRevenueDistribution(year: string, month: string) {
    return this.http.get
    ('/project-dashboard/resource-map/project-wise-cost-and-revenue-distribution/' + year + '/' + month , this.httpOptions);
  }
  getProjectsCostAndRevenueUptoLastMonthYear(value: string) {
    return this.http.get
    ('/project-dashboard/resource-map/projects-cost-revenue-distribution-upto-last-month-year/' + value, this.httpOptions);
  }

  getCostRevenueDetailedForProject(project: string) {
    return this.http.get
    ('/project-dashboard/resource-map/cost-revenue-view-for-project/' + project, this.httpOptions);
  }
  getFinanceDateForDifferentCriterias(postBody: any) {
    return this.http.post('/project-dashboard/finance-data/cost-revenue-view-for-all-criteria' , postBody, this.httpOptions);
  }
  getProjectNamesForFinance() {
    return this.http.get('/project-dashboard/finance-data/get-projects', this.httpOptions);
  }
  getSelectedProjectMembers(projectCode: string) {
    return this.http.get('/project-dashboard/details/selected-project-members/' + projectCode, this.httpOptions);
  }



  // -----------------------------------------------project settings endpoints---------------------------------------------------

  getProjectsTypes() {
    return this.http.get('/project-dashboard/project/types', this.httpOptions);
  }

  getAllActiveProjects() {
    return this.http.get('/project-dashboard/project/all', this.httpOptions);
  }

  createNewProject(payload: ProjectCreateData) {
    return this.http.post('/project-dashboard/project/create', payload, this.httpOptions);
  }

}
