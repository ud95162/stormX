import {ProjectDataObject} from './project-data-object';
import {JiraEstimatesDataObject} from './jira-estimates-data-object';

export class ResponseDataObject {
  constructor(
    public fullName: any,
    public email: any,
    public date: any,
    public projects: Array<ProjectDataObject>,
    public totalWorkTime: any,
    public totalWorkTimeDisplayView: any,
    public jiraIssueCount: any,
    public jiraEstimatesData: Array<JiraEstimatesDataObject>,
    public gitAdditions: number,
    public gitDeletions: number,
    public  gitTotal: number,
    public avgActionsPerMinute: any,
    public level: any,
    public keyBoardActions: any,
    public mouseActions: any,
    public wwtActivity: any
  ) {
  }
}
