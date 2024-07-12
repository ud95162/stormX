export class PriorityItem {
  constructor(
    public priorityName: string,
    public isChild: boolean,
    public parentName: string
  ) {
  }
}
