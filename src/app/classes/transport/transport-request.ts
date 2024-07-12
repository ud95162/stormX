export class TransportRequest {
  constructor(
    public empId: number,
    public name: string,
    public projectName: string,
    public projectId: number,
    public supervisorName: string,
    public pmId: number,
    public requestedTime: string,
    public destination: string,
    public routeName: string,
    public destinationAreaId: number,
    public reason: string,
    public inTime: string,
    public totalTime: string,
    public mobileNo: any,
    public returnTrip: any,
    public pickUpPoint: string
  ) {

  }
}


export const VALIDATION_MESSAGE = {
  TRANSPORT_REQUEST: {
    INVALID_FORM: `form invalid`,
    NULL_NAME: `Please mention the name`,
    NULL_DESTINATION: `Please mention the destination`,
    NULL_PROJECT: `You haven't select a project!`,
    NULL_DEPARTURE_TIME: `Please set the departure time`,
    WRONG_DEPARTURE_TIME: `Please set a correct time`,
    NULL_SUPERVISOR: `You haven't select a supervisor!`,
    NULL_REASON: `Please give some reason...!`,
    NULL_ROUTE: `You haven't select a route!`,
    TIME_ERROR: `Total Office Hrs should be equal or greater than 13`,
    WRONG_SUPERVISOR: `Please set a valid supervisor name`,
    WRONG_PROJECT: `please set a valid project`,
    NULL_PICKUP_POINT: 'Please mention the Pickup Location'

  },
  DEFINE_TRANSPORT_TYPE: {}
};

export const INFO_MESSAGE = {
  TRANSPORT_REQUEST: {
    SAVE_SUCCESS: `Transport Request Applied Successfully`
  }
};


