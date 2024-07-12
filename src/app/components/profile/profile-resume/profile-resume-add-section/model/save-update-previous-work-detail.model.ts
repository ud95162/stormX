export class SaveUpdatePreviousWorkDetail {
  constructor(public id: number,
              public previousDesignation: string,
              public previousCompany: string,
              public fromDate: string,
              public toDate: string
  ) {
  }
}
