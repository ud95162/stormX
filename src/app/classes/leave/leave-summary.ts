export class LeaveSummary {

}

export class YearLeaveSummary {
  constructor(
    public year: number,
    public summaryList: LeaveTypeSummary[],
  ) {
  }
}

export class LeaveTypeSummary {
  constructor(
    public leaveName: string,
    public leaveTypeId: number,
    public summary: Summary[],
    public noPay?: number,
    public isSpecial?: boolean
  ) {
  }
}


export class Summary {
  constructor(
    public name: string,
    public amount: number
  ) {
  }
}

export class RemainingLeave {
  constructor(
    public leaveTypeID: number,
    public leaveTypeNO: string,
    public leaveTypeCode: string,
    // public leaveName: string,
    public leaveTypeName: string,
    public allocated: number,
    public remaining: number,
    public taken: number,
    public leaveTypeTable: number
  ) {
  }
}

export class LeaveOnLeave {
  static ON_LEAVE_OBJ: any = {
    'preInsert': {
      'monthList': [],
      'projectFilter': [],
      'rangeTypeFilterList': []
    },
    'selectionObj': {}
  };
}

