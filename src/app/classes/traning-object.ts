export class TrainingModel {
  constructor(
    public text: string,
    public intent: string,
    public entities: Entity[]
  ) {
  }
}

export class Entity {
  constructor(
    public id: number,
    public status: number,
    public entity: string,
    public value: string,
    public start: number,
    public end: number
  ) {
  }
}

export class Intent {
  constructor(
    public id: number,
    public status: number,
    public intent: string
  ) {
  }
}

export class LiaUntrainedQuery {
  constructor(
    public id: number,
    public query: string,
    public user_id: number,
    public timestamp?: any
  ) {
  }
}

export class SearchTrainingConstants {
  static FORM_TEXT_KEY = 'text';
  static FORM_INTENT_KEY = 'intent';
  static FORM_ENTITIES_KEY = 'entities';
  static FORM_ENTITY_KEY = 'entity';
  static FORM_ENTITY_VALUE_KEY = 'value';
  static FORM_ENTITY_START_KEY = 'start';
  static FORM_ENTITY_END_KEY = 'end';

  static SELECT_OPTION_PLACEHOLDER_VALUE = 'placeholder';
  static SELECT_OPTION_CREATE_NEW_INTENT_VALUE = '-1';
}
