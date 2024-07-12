export const CONSTANT = {
    APPRAISAL: {
      YEAR_2019: '2019',
      YEAR_2021_NEW: '2021(New)'
    },
  ERROR_MSG: {
      HEADERS: {
        SUCCESS: 'Success!',
        FAILED: 'Failed!',
        WARNING: 'Warning!'
      },
    ACCOMMODATION: {
      SEAT: {
       SAVE_SUCCESS: 'Seat Booked Successfully!',
      },
      ACCOMMODATION: {
        SAVE_SUCCESS: 'Accommodation Booked Successfully!',
        UPDATE_SUCCESS: 'Accommodation Request Updated Successfully!',
        DELETE_SUCCESS: 'Accommodation Request Deleted Successfully!',
      },
      WORK_STATION: {
        EDIT_SUCCESS: 'Work Station Edit Successfully!',
        SAVE_FAILED: 'Request Failed!'
      },
      TRANSPORT: {
        SAVE_SUCCESS: 'Transport Request Saved Successfully!',
        UPDATE_SUCCESS: 'Transport Request Updated Successfully!',
        DELETE_SUCCESS: 'Transport Request Deleted Successfully!',
        FAILED : 'Request Failed!'
      },
      SETTINGS: {
        ROUTE_SAVE_SUCCESS: 'Route Saved Successfully!',
        ROUTE_UPDATE_SUCCESS: 'Route Updated Successfully!',
        ROUTE_DELETE_SUCCESS: 'Route Deleted Successfully!',
        PICKUP_SAVE_SUCCESS: 'Pickup Location Saved Successfully!',
        PICKUP_UPDATE_SUCCESS: 'Pickup Location Updated Successfully!',
        PICKUP_DELETE_SUCCESS: 'Pickup Location Deleted Successfully!',
        FACILITY_ADMIN_SAVE_SUCCESS: 'Facility Admin Added Successfully!',
        FACILITY_ADMIN_UPDATE_SUCCESS: 'Facility Admin updated Successfully!',
        CUT_OFF_TIME_UPDATE_SUCCESS: 'Cut-off Time Updated Successfully!'
      }
    },
    FACILITY_MANAGEMENT: {
      SETTINGS: {
        FACILITY_SAVE_SUCCESS: 'Facility Added Successfully!',
        FACILITY_ADMIN_SAVE_SUCCESS: 'Facility Admin Added Successfully!',
        FACILITY_ADMIN_UPDATE_SUCCESS: 'Facility Admin Updated Successfully!',
        FACILITY_UPDATE_SUCCESS: 'Facility Updated Successfully!',
        FACILITY_ADMIN_DELETE_SUCCESS: 'Facility Admin Deleted Successfully!',
      }
    },
    PASSWORD_RESET_LDAP_ERROR: 'Password cannot reset for LDAP users',
    LEAVE: {
        LEAVE_COUNT_ZERO: 'Cannot apply 0 as leave count',
      WORKING_DAYS_PRIOR_THAN_10_DAYS: 'Cannot Request Lieu Leave more than 10 days prior to the current date!'
    },
    OPD_CONFIG: {
      DATE_RANGE: 'From Date cannot be greater than To Date',
      EMPTY_FROM_DATE: 'From Date cannot be empty',
      EMPTY_TO_DATE: 'To Date cannot be empty',
      EMPTY_OPD_AMOUNT: 'OPD amount cannot be empty',
    },
    OPD: {
        REQUEST_REASON_FOR_DELETE: 'Please provide a reason for delete request'
    },
    PAGE_CONFIG: {
        PAGE_ID: 'Cannot create page without page user name',
      MILESTONE_DATE_EMPTY: 'Date cannot be empty',
      MILESTONE_CONTENT_EMPTY: 'Description cannot be empty'
    },
    FACE_ATTENDANCE: {
        EMPTY_DATE: 'Date cannot be empty'
    },
    FACILITY_REQ: {
        NO_DOCUMENTS: 'Cannot apply without proper documents',
      NO_MSG_OR_TITLE: 'Please enter facility request message and title'
    },
    POLICIES: {
        EMPTY_NAME: 'Policy name cannot be empty',
      EMPTY_VERSION: 'Policy version cannot be empty',
      EMPTY_FILE_NAME: 'Cannot create policy without file',
      STRING_CONTAINS: 'Policy version cannot contains string values'
    },
    EVENT_CONFIG: {
        EMPTY_VENUE_CAPACITY: 'Venue Capacity contains integer values only',
      EMPTY_VENUE_NAME: 'Venue Name cannot be empty'
    },
    PROJECT: {
        SETTINGS: {
          CREATE_SUCCESS: 'Project Created Successfully!',
          CREATE_FAILED: 'Unable to Create New Project!',
        }
    }
  },
  LEAVE_TYPES: {
      STANDARD: {
        ANNUAL: 'STL1',
        CASUAL: 'STL2',
        MEDICAL: 'STL3'
      },
    SPECIAL: {
        ONSITE: 'SPL1',
        MATERNITY: 'SPL2',
        LIEU: 'SPL3',
        NO_PAY: 'SPL4',
        OFFICIAL: 'SPL5',
        CARRY_FW: 'SPL6',
        ROSTER: 'SPL9'
    }
  },
  LEAVE_NAMES: {
      STANDARD: {
        ANNUAL: 'Annual Leave',
        CASUAL: 'Casual Leave',
        MEDICAL: 'Medical Leave'
      },
    SPECIAL: {
        ONSITE: 'Foreign Visit',
        MATERNITY: 'Maternity Leave',
        LIEU: 'Lieu Leave',
        NO_PAY: 'No Pay Leave',
        OFFICIAL: 'Official Leave',
        CARRY_FW: 'Carry F/W Leave',
        ROSTER: 'Roster Leave'
    }
  },
  LEAVE_TYPE_ID: {
    STANDARD: {
      ANNUAL: 1,
      CASUAL: 2,
      MEDICAL: 3
    },
    SPECIAL: {
      ONSITE: 1,
      MATERNITY: 2,
      LIEU: 3,
      NO_PAY: 4,
      OFFICIAL: 5,
      CARRY_FW: 6
    }
  },
  PROFILE_SUMMARY: {
      OPD: 'opdRequests',
      ISSUE_LETTER: 'letterRequest',
      FACILITY: 'facilityRequest'
  },
  ALERTS: {
      TYPES: {
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
        WARNING: 'WARNING'
      },
    MESSAGE: {
        EMPLOYEE: {
          ADD_EMPLOYEE: {
            EMPLOYEE_CREATE_SUCCESS: 'Employee Profile Created  Successfully!',
            EMPLOYEE_CREATE_FAILED: 'Unable to Create Employee Profile!',
            EMPLOYEE_COMPANY_AUTHORIZATION_CREATE_SUCCESS: 'Company Authorizations Added Successfully!',
            EMPLOYEE_COMPANY_AUTHORIZATION_CREATE_FAILED: 'Company Authorizations Added Failed!',
            EMPLOYEE_COMPANY_AUTHORIZATION_UPDATE_SUCCESS: 'Company Authorizations Updated Successfully!',
            EMPLOYEE_COMPANY_AUTHORIZATION_UPDATE_FAILED: 'Company Authorizations Updated Failed!',
            EMPLOYEE_COMPANY_BASIC_CREATE_SUCCESS: 'Company Basic Details Added Successfully!',
            EMPLOYEE_COMPANY_BASIC_CREATE_FAILED: 'Company Basic Details Added Failed!',
            EMPLOYEE_COMPANY_BASIC_UPDATE_SUCCESS: 'Company Basic Details Updated Successfully!',
            EMPLOYEE_COMPANY_BASIC_UPDATE_FAILED: 'Company Basic Details Updated Failed!',
            EMPLOYEE_COMPANY_PROJECT_CREATE_SUCCESS: 'Company Projects Added Successfully!',
            EMPLOYEE_COMPANY_PROJECT_CREATE_FAILED: 'Company Projects Added Failed!',
            EMPLOYEE_OPD_DETAILS_UPDATE_SUCCESS: 'Employee OPD Details Updated Successfully!',
            EMPLOYEE_OPD_DETAILS_UPDATE_FAILED: 'Employee OPD Details Updated Failed!',
            EMPLOYEE_PERSONAL_BASIC_SUCCESS: 'Personal Information Added Successfully!',
            EMPLOYEE_PERSONAL_BASIC_FAILED: 'Personal Information Added Failed!',
            EMPLOYEE_MEDICAL_DETAILS_SUCCESS: 'Medical Details Added Successfully!',
            EMPLOYEE_MEDICAL_DETAILS_FAILED: 'Medical Details Added Failed!',
            EMPLOYEE_FAMILY_DETAILS_SUCCESS: 'Family Details Added Successfully!',
            EMPLOYEE_FAMILY_DETAILS_FAILED: 'Family Details Added Failed!',
            EMPLOYEE_EMERGENCY_CONTACT_ADDED_SUCCESS: 'Emergency Contact Details Added Successfully!',
            EMPLOYEE_EMERGENCY_CONTACT_ADDED_FAILED: 'Emergency Contact Details Added Failed!',
            EMPLOYEE_CONTACT_ADDED_SUCCESS: 'Contact Details Added Successfully!',
            EMPLOYEE_CONTACT_ADDED_FAILED: 'Contact Details Added Failed!',
            FILL_ALL_FIELDS: 'Please fill all the mandatory fields!',
            ADD_FAMILY_MEMBERS_TO_LIST: 'Please Add one or more family member to list before save!',
            UNIVERSITY_CREATE_SUCCESS: 'New University Created Successfully!',
            UNIVERSITY_CREATE_FAILED: 'Failed to Create a New University!',
            UNI_EDU_ADD_SUCCESS: 'University Education Details Added Successfully!',
            UNI_EDU_ADD_FAILED: 'University Education Details Added Failed!',
            SCHOOL_EDU_ADD_SUCCESS: 'School Education Details Added Successfully!',
            SCHOOL_EDU_ADD_FAILED: 'School Education Details Added Failed!',
            COMPANY_CREATE_SUCCESS: 'New Company Created Successfully!',
            COMPANY_CREATE_FAILED: 'Failed to Create a New Company',
            EMPLOYEE_PREV_WORK_ADDED_SUCCESS: 'Previous Work Details Added Successfully!',
            EMPLOYEE_PREV_WORK_ADDED_FAILED: 'Previous Work Details Added Failed!',
            OTHER_QUALIFICATION_SAVE_SUCCESS: 'Other Qualifications Added Successfully!',
            OTHER_QUALIFICATION_ADD_FAILED: 'Other Qualifications Added Failed!',
            COMPANY_TRANSFER_SUCCESS: 'Company Transfer Action Created Successfully!',
            CONFIRMATION_CHANGE_SUCCESS: 'Confirmation Action Created Successfully!',
            PROJECT_CHANGE_SUCCESS: 'Project Change Action Created Successfully!',
            PROMOTION_SUCCESS: 'Promotion Action Created Successfully!',
            DEPARTMENT_TRANSFER_SUCCESS: 'Department Transfer Action Created Successfully!',
            LEAVING_SUCCESS: 'Leaving Action Created Successfully!',
            SUPERVISOR_CHANGE_SUCCESS: 'Supervisor Change Action Created Successfully!',
            ADD_PROJECT_ALLOCATION_PERCENTAGE_ERROR: 'Projects total allocation percentage must be 100%',
            EMPLOYEE_DOCUMENT_UPLOAD_SUCCESS: 'Employee Document Uploaded Successfully',
            EMPLOYEE_DOCUMENT_UPLOAD_FAILED: 'Employee Document Upload Failed',
            MAXIMUM_FILE_SIZE_EXCEEDED: 'Maximum File Size Exceeded'
          },
          UPDATE_EMPLOYEE: {
            PROJECT_CHANGE_UPDATED: 'Project Change Action Updated!',
            PROMOTION_UPDATED: 'Promotion Action Updated!',
            DEPARTMENT_TRANSFER_UPDATED: 'Department Transfer Action Updated!',
            LEAVING_UPDATED: 'Leaving Action Updated!',
            SUPERVISOR_CHANGE_UPDATED: 'Supervisor Change Action Updated!',
          },
          DELETE_EMPLOYEE: {
            PROJECT_CHANGE_DELETED: 'Project Change Action Deleted!',
            PROMOTION_DELETED: 'Promotion Action Deleted!',
            DEPARTMENT_TRANSFER_DELETED: 'Department Transfer Action Deleted!',
            LEAVING_DELETED: 'Leaving Action Deleted!',
            SUPERVISOR_CHANGE_DELETED: 'Supervisor Change Action Deleted!',
          },
        }
    }
  },

  ACTION_CHANGES: {
    JOIN: 'Hiring Action',
    PROMOTION: 'Promotion Action',
    DESIGNATION: 'Designation Change Action',
    DES_CATEGORY: 'Designation Category Change Action',
    COMPANY: 'Inter Company Transfer Action',
    PROJECT: 'Project Change Action',
    CADRE: 'Cadre Change Action',
    CONFIRMATION_STATUS: 'Confirmation Status Change',
    SUPERVISOR: 'Supervisor Change Action'
  },

  TIME_SLOTS: {
    ALL: '',
    DAY: 'DAY',
    NIGHT: 'NIGHT'
  },
  RESERVATION: {
      ACCOMMODATION_CUT_OFF: '17:00',
    ACCOMMODATION_FRIDAY: 'Friday',
    ACCOMMODATION_SATURDAY: 'Saturday',
    ACCOMMODATION_SUNDAY: 'Sunday',
    STATUS: {
      HR_DECLINED: 'HR_DECLINED',
      ACCEPTED: 'ACCEPTED',
      PENDING: 'PENDING',
      USER_CANCEL: 'USER_CANCEL',
      RE_ACCEPTED: 'RE_ACCEPTED'
    }
  }

};
