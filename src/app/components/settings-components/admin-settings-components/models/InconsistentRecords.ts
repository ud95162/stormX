export class InconsistentRecords {
  constructor(
    public id: number,
    public recordType: string,
    public recordText: string,
    public status: any,
    public addedDateTime: string,
    public selected: any
  ) {
  }
}
