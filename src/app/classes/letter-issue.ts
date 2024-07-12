export class Templates { // class declaration of template -> contains the format
  private _type: number;
  private _template: string;
  private _fields: string [];
  private _col = new Map();


  constructor(type: number, template: string, fields: string[]) {
    this._type = type;
    this._template = template;
    this._fields = fields;
  }

  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }

  get template(): string {
    return this._template;
  }

  set template(value: string) {
    this._template = value;
  }


  get fields(): string[] {
    return this._fields;
  }

  set fields(value: string[]) {
    this._fields = value;
  }

  get col(): Map<any, any> {
    return this._col;
  }

  set col(value: Map<any, any>) {
    this._col = value;
  }
}

export class TemplatFields { // class to store the changing fields
  private _type: number;
  private _fieldsArray: string [];
  private _col = new Map();


  constructor(type: number, fieldsArray: string[]) {
    this._type = type;
    this._fieldsArray = fieldsArray;
  }


  get col(): Map<any, any> {
    return this._col;
  }

  set col(value: Map<any, any>) {
    this._col = value;
  }

  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }

  get fieldsArray(): string[] {
    return this._fieldsArray;
  }

  set fieldsArray(value: string[]) {
    this._fieldsArray = value;
  }
}

// export class displayLetter {
//   private _type: number;
//   private _letterName: string;
//
//
//   constructor(type: number, letterName: string) {
//     this._type = type;
//     this._letterName = letterName;
//   }
//
//
//   get type(): number {
//     return this._type;
//   }
//
//   set type(value: number) {
//     this._type = value;
//   }
//
//   get letterName(): string {
//     return this._letterName;
//   }
//
//   set letterName(value: string) {
//     this._letterName = value;
//   }
// }
