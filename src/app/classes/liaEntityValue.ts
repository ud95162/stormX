export class LiaEntityValue {
  constructor(
    public value: string,
    public synonyms: LiaEntityValueSynonym[],
    public status?: number,
    public id?: number
  ) {
  }
}


export class LiaEntityValueSynonym {
  constructor(
    public synonym: string,
    public entityValueId?: number,
    public status?: number,
    public id?: number,
  ) {
  }
}

export class EntitySynonym {
  constructor(
    public value: string,
    public synonyms: string[],
    public id?: number
  ) {
  }
}
