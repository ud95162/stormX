export class VenueDetails {
 constructor(
   public id: number,
   public name: string,
   public capacity: number,
   public facilities: Facility[]
 ) {}
}

export class Facility {
  constructor(
    public type: string,
    public image: string
  ) {}
}

export class EventDetails {
  constructor(
    public eventName: string,
    public organizer: string,
    public date: any,
    public startTime: string,
    public endTime: string,
    public remainingTime: any
  ) {
  }
}
