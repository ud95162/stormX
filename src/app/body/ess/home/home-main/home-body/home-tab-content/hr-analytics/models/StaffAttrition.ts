export class CompanyWiseEmployeeSummaryCount {
  constructor(
    public companyName: string,
    public totalEmployeeCount: number,
    public permanentEmployeeCount: number,
    public traineeEmployeeCount: number,
    public contractEmployeeCount: number,
    public extendEmployeeCount: number
  ) {
  }
}
