export const VALIDATION_MESSAGE = {
  LEAVE_REQUEST: {
    INVALID_FORM: `form invalid`,
    ZERO_LEAVE_APPLY: `leave amount should be one or more`,
    COMING_WORKING_DATE: `Date must be a coming working day!`,
    NULL_SUPERVISOR: `You haven't select a supervisor!`,
    NULL_REASON: `Please give some reason...!`,
    NULL_LEAVE_TYPE: 'Please select leave type',
    HALF_DAY_LIMIT: `You are applying only half day leave..! If you want more leave please select Full Day!`,
    NULL_LIEU_LEAVE: `You haven't select a Lieu Leave Date!`,
    YEAR_CROSS: 'Leaves are Applicable Only for Selected Year',
    SHORT_LEAVE_MORE_THAN_TWO_HOURS: 'Short Leave request time cannot be greater than two hours!',
    CARRY_FW_LEAVE_DEADLINE_PASSED: 'Cannot take Carry F/W Leaves. Deadline already passed'
  },
  DEFINE_LEAVE_TYPE: {
    MATERNITY: 'maternityLeave'
  }
};

export const INFO_MESSAGE = {
  LEAVE_REQUEST: {
    SAVE_SUCCESS: `Leave Request Applied Successfully`,
    UNSUCCESS_MSG: `Leave Request Failed`
  }
};

export const REQUEST_TYPE = {
  FORM_USER_REQUEST: 101,
  FROM_MISSING_ATTENDANCE: 102
};


export const APPRAISAL_INFO_MESSAGE = {
  APPRAISAL_SAVE: {
    SAVE_SUCCESS: `Appraisal Data Saved Successfully`
  }
};

export const CANCEL_MESSAGE = {
  LEAVE_CANCEL: {
    SAVE_SUCCESS: `Leave Cancelled Successfully`,
    UNSUCCESS_MSG: `Leave Cancel Failed. `,
  }
};
