export class LeaveTypeDAO {
  constructor(
    public leaveName: string,
    public leavesTable: LeaveEffectiveTimeCadreDAO[],
    public activeStatus: boolean,
    public id?: number
  ) {
  }
}

export class LeaveEffectiveTimeCadreDAO {
  constructor(
    public effectiveTimeId: number,
    public effectiveTime: string,
    public leaveCadreDAOs: LeaveCadreDAO[],
    public leaveTypeId: number,
    public id?: number
  ) {
  }
}

export class LeaveCadreDAO {
  constructor(
    public cadreId: number,
    public noOfLeaves?: number,
    public id?: number
  ) {
  }
}

export class LeaveEffectiveTime {
  constructor(
    public timePeriod: string,
    public id?: number
  ) {
  }
}

export class Cadre {
  constructor(
    public name: string,
    public id?: number
  ) {
  }
}

export class LeaveTypePreInsert {
  constructor(
    public leaveName: string,
    public cadreDAOList: Cadre[],
    public leaveEffectiveTimeList: LeaveEffectiveTime[],
    public nextId: number
  ) {
  }
}
