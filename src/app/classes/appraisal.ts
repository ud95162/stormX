export class Appraisal {
  constructor(
    public questionId: number,
    public question: string,
    public description: string
  ) {
  }
}

export class CycleSetting {

  constructor(
    public cycleName: string,
    public cycleDescription: string,
    public startDate: string,
    public endDate: string,
    public questionObjList: Appraisal[]
  ) {

  }
}

export const VALIDATION_MESSAGE = {
  CYCLE_SETTING: {
    INVALID_FORM: `form invalid`,
    NULL_NAME: `Please mention the name`,
    NULL_DESCRIPTION: `Please mention the description`,
    NULL_START_DATE: `Please add start date`,
    NULL_END_DATE: `Please add end date`,
    NULL_QUESTIONLIST:`please add at least one question`,
    NULL_ANSWER:`Please answer all the questions`
  }
};


export class FeedBackAnswer {
  constructor(
    public questionAnswerId: number,
    public questionId: number,
    public question: string,
    public questionDescription: string,
    public answeredTime: null,
    public answer: string
  ) {
  }
}


export class AnswerObj {
  constructor(
    public questionId: number,
    public answer: string
  ) {
  }
}


export class EmployeeFeedback {
  followerInfo: Follower;
  feedBackCycles: FeedbackCycle[];
}

export class Follower {
  empId: string;
  name: string;
  designation: string;
  image?: string;
}

export class FeedbackCycle {
  id: number;
  cycleName: string;
  cycleDescription: string;
  startDate?: string;
  endDate?: string;
  questionObjList: QuestionAnswer[];
  timestamp: string;
}

export class QuestionAnswer {
  questionAnswerId: number;
  questionId: number;
  question: string;
  questionDescription: string;
  answeredTime: AnsweredTime;
  answer: string;
}

export class AnsweredTime {
  date: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
  milisecond: number;
}
