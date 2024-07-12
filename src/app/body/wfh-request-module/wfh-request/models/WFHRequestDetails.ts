export class UserWFHRequestDetails {
  constructor(
    public id: number,
    public date: string,
    public approvedStatus: number,
    public reason: string,
    public supervisorId: number,
    public supervisorName: string,
    public notifyMemberId: number,
    public notifyMemberName: string
  ) {
  }
}

export class NewWFHRequestPostBody {
  constructor(
    public empProfileId: number,
    public supervisorProfileId: number,
    public notifyMemberProfileId: number,
    public startDate: any,
    public endDate: any,
    public noOfDays: number = 0,
    public reason: string,
    public createdBy: any,
    public userToken: string
  ) {
  }
}

export class AssignedWFHRequestData {
  constructor(
    public requestId: number,
    public requestedDate: any,
    public requestedEmpNo: string,
    public requestedEmpName: string,
    public reason: string,
    public approvedStatus: number,
    public notifyMemberEmpNo: string,
    public notifyMemberEmpName: string
  ) {
  }
}

export class WFHRequestDetails {
  constructor(
    public id: number,
    public empNo: string,
    public firstName: string,
    public lastName: string,
    public fullName: string,
    public designation: string,
    public date: string,
    public reason: string
  ) {
  }
}
