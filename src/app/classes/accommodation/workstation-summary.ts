export class WorkstationSummary {

}

export class SeatBookingSummary {
  constructor(
    public bookingDate: string,
    public empNo: string,
    public reason: string,
    public seatNo: string,
    public timeSlot: string
  ) {
  }
}

export class AccommodationBookingSummary {
  constructor(
    public accommodationBookingStatus: string,
    public bookingDate: string,
    public contactNo: string,
    public empNo: string,
    public reason: string,
    public gender: string
  ) {
  }
}

export class TransportRequestSummary {
  constructor(
    public transportBookingID: any,
    public transportPickUpPointID: any,
    public transportDate: string,
    public transportBookingStatus: string,
    public timeSlot: string,
    public reason: string,
    public empNo: string,
    public contactNo: string
  ) {
  }
}

export class TransportReportOfDrivers {
  constructor(
    public empNo: any,
    public empName: any,
    public contactNo: any,
    public pickUpPointName: any,
    public reason: any
  ) {
  }

}
