export class EmployeeLeaveDAO {
  constructor(
    public empId?: any,
    public leaveTypeName?: string,
    public startDate?: any,
    public endDate?: any,
    public amount?: any,
    public approvedEmp?: any,
    public comment?: string,
    public leaveTime?: number,
    public acceptStatus?: string,
    public activeStatus?: boolean,
    public createdAt?: string,
    public leaveNo?: any,
    public id?: number,
    public leaveTypeId?: number
  ) {
  }
}

export class LeaveDetail {
  constructor(
    public id: number,
    public leaveRequestNo: any,
    public date?: any,
    public type?: string,
    public amount?: number,
    public status?: string,
    public comment?: string,
    public approvedEmp?: any,
    public createdAt?: string,
    public leaveTypeId?: number,
  ) {
  }
}


export class EmployeeLeaveYearDAO {
  constructor(
    public year: number,
    public employeeLeaves: EmployeeLeaveDAO[]
  ) {
  }
}
