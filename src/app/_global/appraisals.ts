/**
 * Created by kavindu on 1/1/2019.
 */
export class Appraisals {
  static PERFORMANCE_APPRAISAL_FORM: any = {
    'empAppraisalId': 1,
    'appraisalEmployeeHeaderData': {
      'profileImage': '',
      'appraisalHeaderData': [
        [
          {
            'key': 'Employee Number',
            'value': ''
          },
          {
            'key': 'Employee Name',
            'value': ''
          },
          {
            'key': 'Designation',
            'value': ''
          },
          {
            'key': 'Profile_Picture',
            'value': ''
          }
        ],
        [
          {
            'key': 'Department',
            'value': ''
          },
          {
            'key': 'Project',
            'value': ''
          },
          {
            'key': 'Manager',
            'value': ''
          }
        ]
      ]
    },
    'appraisalDataPointGroups': [
      {
        'groupId': 1,
        'groupCommentId': 1,
        'title': '',
        'appraisalQuestions': [
          {
            'questionId': 1,
            'questionMarkId': 1,
            'question': '',
            'value': ''
          }
        ],
        'appraisalComments': {
          'haveComments': true,
          'commentData': {
            'positiveComment': '',
            'negativeComment': '',
            'otherComment': ''
          }
        }
      }
    ],
    'appraiseeComment': '',
    'officialUseOnlyObject': {
      'panelistInfos': [
        {
          'status': 0,
          'id': 1,
          'panelistId': 0,
          'empAppraisalId': 1,
          'panelistInfo': {
            'empId': 0,
            'empNo': '',
            'name': '',
            'image': '',
            'designation': '',
            'email': '',
            'firstName': '',
            'lastName': '',
            'project': null,
            'avgStarRating': 0,
            'profileLevel': null,
            'online': false,
            'active': true
          }
        },
      ],
      'salaryDetails': [
        {
          'key': 'Basic Salary',
          'value': 0
        },
        {
          'key': 'Proposed Increment',
          'value': 0
        },
        {
          'key': 'Gross Salary',
          'value': 0
        },
        {
          'key': 'Promotion Eligibility',
          'value': false
        }
      ]
    },
    'editable': true
  };
  static SELF_APPRAISAL_FORM: any = {
    'evaluationFeedback': {
      'status': 0,
      'id': 1,
      'text': [],
      'year': '',
      'version': '',
      'createdBy': 0,
      'expireDate': ''
    },
    'feedbackList': [
      {
        'status': 0,
        'id': 1,
        'empId': 264,
        'criteriaId': 1,
        'comment': '',
        'title': {
          'status': 0,
          'id': 1,
          'title': '',
          'year': ''
        }
      },
      {
        'status': 0,
        'id': 2,
        'empId': 264,
        'criteriaId': 2,
        'comment': '',
        'title': {
          'status': 0,
          'id': 2,
          'title': '',
          'year': ''
        }
      },
      {
        'status': 0,
        'id': 3,
        'empId': 264,
        'criteriaId': 3,
        'comment': '',
        'title': {
          'status': 0,
          'id': 3,
          'title': '',
          'year': ''
        }
      },
      {
        'status': 0,
        'id': 4,
        'empId': 264,
        'criteriaId': 4,
        'comment': '',
        'title': {
          'status': 0,
          'id': 4,
          'title': '',
          'year': ''
        }
      },
      {
        'status': 0,
        'id': 5,
        'empId': 264,
        'criteriaId': 5,
        'comment': '',
        'title': {
          'status': 0,
          'id': 5,
          'title': '',
          'year': ''
        }
      }
    ],
    'editable': true,
    'submissionStatus': {
      'status': null,
      'id': null,
      'empId': null,
      'saveType': null,
      'finalSubmissionDate': '',
      'lastUpddateTime': null
    }
  };
  static APPRAISEES_LIST: any = [
    {
      'empId': 146,
      'empNo': '',
      'name': '',
      'image': '',
      'designation': '',
      'email': '',
      'firstName': '',
      'lastName': '',
      'project': null,
      'avgStarRating': 0,
      'profileLevel': null,
      'online': false,
      'active': true
    }
  ];
  static CUSTOM_APPRAISAL_PERMISSION: any = {
    'showOverallAppraisal': false,
    'showGivenAppraisal': false,
    'showSelfAppraisal': false,
    'showAppraisees': false,
    'showAppraisalMeetingComments': false
  };

  static YEAR: string = localStorage.getItem('year');
}
