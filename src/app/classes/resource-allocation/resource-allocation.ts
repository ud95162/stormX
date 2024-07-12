export class ResourceAllocation {

  constructor(
    public requestId: any,
    public projectId: any,
    public designationId: any,
    public requestType: any,
    public replacement: any,
    public noOfEmployees: any,
    public requestedAllocation: any,
    public requestedEffectiveDate: any,
    public requestedEndDate: any,
    public allocatedEffectiveDate: any,
    public allocatedEndDate: any,
    public cadreId: any,
    public companyId: any,
    public businessUnitId: any,
    public departmentId: any,
    public subCadreId: any,
    public priority: any,
    public status: any,
    public manHours: any,
    public budget: any,
    public teamId: any,
    public requestedEmpProfileId: any,
    public approvedEmpProfileId: any,
    public assignedEmpProfileId: any,
    public allocatedBy: any,
    public assignedBy: any,
    public allocatedEmpProfileId: any,
    public remarks: any,
    public resourceRequestSkills: ResourceRequestSkills[],
    public resourceRequestExperienceAreas: ResourceRequestExperienceAreas[],
    public resourceAllocationComments: ResourceRequestComments[],
  ) {
  }
}


export class ResourceAllocationExtras {

  constructor(
    public requestId: any,
    public assignedEmpProfileId: any,
    public requestedEmpProfileId: any,
    public requestedAllocation: any,
    public requestedEffectiveDate: any,
    public requestedEndDate: any,
    public priority: any,
    public status: any,
    public companyName: any,
    public cadreName: any,
    public empNo: any,
    public requestedEmp: any,
    public approvedEmp: any,
    public assignedEmp: any,
    public allocatedEmp: any,
    public projectName: any,
    public designationName: any,
  ) {
  }
}

export class ResourceRequestExperienceAreas {
  constructor(
    public id: any,
    public experienceArea: any
  ) {
  }
}

export class ResourceRequestSkills {
  constructor(
    public id: any,
    public skillId: any,
    public skillName: any,
    public orderNo: any
  ) {
  }
}

export class ResourceRequestComments {
  constructor(
    public id: any,
    public action: any,
    public comment: any,
    public actionOwner: any,
  ) {
  }
}

export class ResourceRequestHistories {
  constructor(
    public id: any,
    public requestId: any,
    public empProfileId: any,
    public actionType: any,
    public comments: any,
    public oldValue: any,
    public newValue: any,
    public actionDateTim: any
  ) {
  }
}


export class ResourceRequestDetails {
  constructor(
    public resource: ResourceAllocation,
    public designation: any,
    public project: any,
    public projectId: any,
    public cadre: any,
    public company: any,
    public businessUnit: any,
    public department: any,
    public subCadre: any,
    public approvedEmp: any,
    public approvedEmpDesignation: any,
    public requestedEmp: any,
    public requestedEmpDesignation: any,
    public assignedEmp: any,
    public assignedEmpDesignation: any,
    public allocatedEmp: any,
    public allocatedEmpDesignation: any,
    public userType: String[],
    public userEmpProfileId: any,
    public userEmpNo: any,
    public buId: any,
    public deptId: any,
    public cmpId: any,
    public officeId: any,
    public cadreId: any,
    public subCadreId: any,
    public skillData: any,
    public expData: any,
    public action: any
  ) {
  }
}

export class EmployeeAllocations {
  constructor(
    public empProfileId: any,
    public firstName: any,
    public lastName: any,
    public designation: any,
    public designationId: any,
    public cadre: any,
    public cadreId: any,
    public company: any,
    public companyId: any,
    public totalPercentage: any,
    public employeeProjects: EmployeeProjects[],
  ) {
  }
}

export class EmployeeProjects {
  constructor(
    public projectId: any,
    public projectName: any,
    public allocId: any,
    public effectiveFrom: any,
    public effectiveTo: any,
    public actionOwner: any,
    public action: any,
    public teamId: any,
    public empProfileId: any,
    public allocationPercentage: any,
  ) {
  }
}

export class EmployeeDetails {
  constructor(
    public employeeAllocation: EmployeeAllocations,
    public empNo: any,
    public buID: any,
    public buName: any,
    public depID: any,
    public departmentName: any,
    public email: any,
    public empName: any,
    public gender: any,
    public mobileNumber: any,
    public officeID: any,
    public officeName: any,
    public profileImage: any,
    public subCadreID: any,
    public subCadreName: any,
  ) {
  }
}
