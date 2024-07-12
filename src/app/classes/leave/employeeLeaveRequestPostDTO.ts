export class EmployeeLeaveRequestPostDTO {
  constructor(
    public eid: any,
    public leaveTypeNo: string,
    public leaveTime: number,
    public startDate: string,
    public amount: number,
    public leaveManagerId: number,
    public leaveNotifyMemberId: number,
    public reason: string,
    public year: number,
    public leaveTypeID: number,
    public leaveTypeTable: number,
    public requestType?: number
  ) {
  }
}

export class EmployeeAdditionalLeave {
  constructor(
    public requestBy: number,
    public requestTo: number,
    public specialLeaveId: number,
    public fromDate: string,
    public toDate: string,
    public reason: string,
    public leaveCount: number
  ) {
  }
}

export class EmployeeLieuLeave {
  constructor(
    public requestBy: string,
    public requestTo: number,
    public specialLeaveId: number,
    // public utilizedDate: string,
    public fromDate: string,
    public reason: string,
    public toDate: string,
    public leaveCount = 1
  ) {
  }
}


export class EmployeeShortLeave {

  static SHORT_LEAVE_START_TIME = '15:30';
  static SHORT_LEAVE_END_TIME = '17:30';

  constructor(
    public empId: string,
    public requestTo: number,
    public shortLeaveId: number,
    public utilizedDate: string,
    public requestDate: string,
    public requestingStartTime: string,
    public requestingEndTime : string,
    public reason: string,
    public remainingAmount: number
  ) {
  }
}

export class EmployeeShortLeaveHR {

  static SHORT_LEAVE_START_TIME = '15:30';
  static SHORT_LEAVE_END_TIME = '17:30';

  constructor(
    public eid: any,
    public requestTo: any,
    public shortLeaveId: number,
    public utilizedDate: string,
    public requestDate: string,
    public requestingStartTime: string,
    public requestingEndTime: string,
    public reason: string,
    public remainingAmount: number
  ) {
  }
}
export class EmployeeLeaveRequestHR {
  constructor(
    public eid: number,
    public leaveTypeNo: string,
    public leaveTime: number,
    public startDate: string,
    public amount: number,
    public leaveManagerId: any,
    public leaveNotifyMemberId: number,
    public reason: string,
    public year: number,
    public leaveTypeID: number,
    public leaveTypeTable: number,
    public requestType?: number,
  ) {
  }
}

