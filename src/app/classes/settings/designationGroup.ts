export class DesignationGroupWise {

  constructor(
    public designationCategory: DesignationCategory,
    public designationCombination: DesignationCombination,
    public designationGroup: DesignationGroup,
    public designationList: DesignationList,
  ) {
  }
}

export class DesignationList {

  constructor(
    public abbreviation: any,
    public adminApproved: any,
    public companyID: any,
    public designationId: any,
    public designationCategoryId: any,
    public designationGroupId: any,
    public designationName: any,
    public status: any,
    public prevCmpId: any,
    public cmpId: any,
  ) {
  }
}

export class DesignationCombination {

  constructor(
    public id: any,
    public companyID: any,
    public buID: any,
    public deptID: any,
    public officeID: any,
    public cadreID: any,
    public subCadreID: any,
    public tenantID: any,
    public status: any,
    public designationId: any,
    public gradeMappingId: any,
  ) {
  }
}

export class DesignationGroup {

  constructor(
    public abbreviation: any,
    public groupId: any,
    public categoryID: any,
    public groupName: any,
    public status: any,
  ) {
  }
}


export class DesignationCategory {

  constructor(
    public categoryID: any,
    public categoryName: any,
    public status: any,
  ) {
  }
}
