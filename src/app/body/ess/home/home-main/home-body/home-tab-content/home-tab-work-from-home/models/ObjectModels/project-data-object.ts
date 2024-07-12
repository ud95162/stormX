import {TaskDataObject} from '../task-data-object';

export class ProjectDataObject {
  constructor(
    public projectId: any,
    public projectName: any,
    public projectWorkTime: any,
    public tasks: Array<TaskDataObject>
  ) {
  }
}
