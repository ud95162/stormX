export class JiraEstimatesDataObject {
  constructor(
    public id: any,
    public assigneeEmail: string,
    public projectName: string,
    public issuesKey: string,
    public updatedDate: string,
    public estimatedTime: number,
    public totalTimeSpend: number,
    public estimatedTimeView: string,
    public totalTimeSpendView: string
  ) {}
}
