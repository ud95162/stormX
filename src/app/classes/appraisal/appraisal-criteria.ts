export class AppraisalCriteria {
  constructor(
    public empNo: string,
    public name: string,
    public experienceInTechnicalWriting: string[],
    public experienceInCgProducts: string[],
    public AppliesKnowledge: string[],
    public onTimeDelivery: string[],
    public qualityOfProducts: string[],
    public impact1: string[],
    public impact2: string[],
    public impact3: string[],
    public leadership1: string[],
    public leadership2: string[],
  ) {

  }
}


export class DesignationWiseDeadline {
  constructor(
    public id: number,
    public designation: string,
    public deadLineDate: string,
    public year: string
  ) {
  }
}
