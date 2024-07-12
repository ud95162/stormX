export class ProjectSettings {
}

export class ProjectCreateData {
  constructor(
    public projectName: string,
    public projectCode: string,
    public projectJiraCode: string,
    public projectType: number,
    public projectImage: string,
    public projectManagerDetails: ProjectCreateManagementData[],
    public projectOwnerDetails: ProjectCreateManagementData[],
    public projectDirectorDetails: ProjectCreateManagementData[],
    public projectCoordinatorDetails: ProjectCreateManagementData[]
  ) {
  }
}

export class ProjectCreateManagementData {
  constructor(
    public empName: string,
    public empID: number
  ) {
  }
}

export class ProjectEntity {
  constructor(
    public projectID: number,
    public projectName: string,
    public projectCode: string,
    public projectImage: string,
    public projectJiraCode: string,
    public projectType: number,
    public activeStatus: number,
    public projectManagerEntities: ProjectManagementEntity[],
    public projectCoordinatorEntities: ProjectManagementEntity[],
    public projectOwnerEntities: ProjectManagementEntity[],
    public projectDirectorEntities: ProjectManagementEntity[]
  ) {
  }
}

export class ProjectManagementEntity {
  constructor(
    public profileID: number,
    public employeeDetails: EmployeeDetailsEntity
  ) {
  }
}

export class EmployeeDetailsEntity {
  constructor(
    public empProfileID: number,
    public profileImage: string,
    public designation: string,
    public firstName: string,
    public lastName: string
  ) {
  }
}
