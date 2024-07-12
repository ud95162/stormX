export class RecruitmentAndResignationResponse {
  constructor(
    public monthWiseRecruitmentsAndResignations: MonthWiseRecruitmentsAndResignations[],
    public projectTypeWithRecruitmentsCount: ProjectTypeWithAttritionCount[],
    public projectTypeWithResignationsCount: ProjectTypeWithAttritionCount[],
    public totalRecruitmentCount: number,
    public totalResignationCount: number
  ) {
  }
}

export class MonthWiseRecruitmentsAndResignations {
  constructor(
    public yearMonth: string,
    public recruitmentCount: number,
    public resignationCount: number
  ) {
  }
}

export class ProjectTypeWithAttritionCount {
  constructor(
    public projectType: string,
    public count: number
  ) {
  }
}


export class HeadGrowthAndTurnOverResponse {
  constructor(
    public totalHeadGrowth: any,
    public totalTurnOver: any,
    public projectTypeWiseHeadGrowth: ProjectTypeWithAttritionCount[],
    public projectTypeWiseTurnOver: ProjectTypeWithAttritionCount[],
    public monthWiseHeadGrowthAndTurnOver: MonthWiseCount[]
  ) {
  }
}

export class MonthWiseCount {
  constructor(
    public month: string,
    public headGrowthCount: any,
    public turnOverCount: any
  ) {
  }
}

export class DepartmentWiseData {
  constructor(
    public depName: string,
    public activeCount: number,
    public recruitCount: number,
    public resignCount: number
  ) {
  }
}

export class ResignEmployeesExperienceSummary {
  constructor(
    public belowTwoYears: number,
    public twoToThreeYears: number,
    public threeToFiveYears: number,
    public aboveFiveYears: number,
    public totalResignedCount: number,
    public belowTwoPercent: number = 0.0,
    public twoToThreePercent: number = 0.0,
    public threeToFivePercent: number = 0.0,
    public aboveFivePercent: number = 0.0,
  ) {
  }
}
