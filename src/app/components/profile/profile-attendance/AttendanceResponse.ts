export class AttendanceResponse {
  static response =
    [
      {
        "calendarDate": "2024-05-20",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": "00:00",
        "faceWorkHrs": "00:00",
        "faceInTime": "14:00",
        "faceOutTime": null,
        "fingerInTime": "11:17",
        "fingerOutTime": "19:55",
        "fingerOfficeHrs": "08:37",
        "fingerWorkHrs": "06:24",
        "firstInSystem": "Finger",
        "firstInTime": "11:17",
        "lastOutSystem": "Finger",
        "lastOutTime": "19:55",
        "maxOfficeHrs": "08:38",
        "maxWorkHrs": "08:00",
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "14:00",
            "betweenTimeHrs": "14:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": null,
            "endTime": "23:59",
            "betweenTimeHrs": null,
            "startDevice": null,
            "endDevice": null
          }
        ],
        "fingerttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "11:17",
            "betweenTimeHrs": "11:17",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:17",
            "endTime": "12:50",
            "betweenTimeHrs": "01:32",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "12:50",
            "endTime": "13:17",
            "betweenTimeHrs": "00:27",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:17",
            "endTime": "13:17",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:17",
            "endTime": "13:59",
            "betweenTimeHrs": "00:42",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "13:59",
            "endTime": "15:37",
            "betweenTimeHrs": "01:37",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:37",
            "endTime": "15:37",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:37",
            "endTime": "15:42",
            "betweenTimeHrs": "00:05",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:42",
            "endTime": "15:42",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:42",
            "endTime": "18:01",
            "betweenTimeHrs": "02:18",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "18:01",
            "endTime": "18:01",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "18:01",
            "endTime": "18:02",
            "betweenTimeHrs": "00:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "18:02",
            "endTime": "18:02",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "18:02",
            "endTime": "19:55",
            "betweenTimeHrs": "01:52",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "19:55",
            "endTime": "19:55",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "19:55",
            "endTime": "23:59",
            "betweenTimeHrs": "04:03",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "11:17",
            "betweenTimeHrs": "11:17",
            "startDevice": null,
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:17",
            "endTime": "12:50",
            "betweenTimeHrs": "01:32",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "12:50",
            "endTime": "13:17",
            "betweenTimeHrs": "00:27",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:17",
            "endTime": "13:59",
            "betweenTimeHrs": "00:42",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "13:59",
            "endTime": "14:00",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "face"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "14:00",
            "endTime": "15:37",
            "betweenTimeHrs": "01:36",
            "startDevice": "face",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:37",
            "endTime": "15:42",
            "betweenTimeHrs": "00:05",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:42",
            "endTime": "18:01",
            "betweenTimeHrs": "02:18",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "18:01",
            "endTime": "18:02",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "18:02",
            "endTime": "19:55",
            "betweenTimeHrs": "01:52",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "19:55",
            "endTime": "23:59",
            "betweenTimeHrs": "04:03",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "absentForDay": false
      },
      {
        "calendarDate": "2024-05-21",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": "00:00",
        "faceWorkHrs": "00:00",
        "faceInTime": "11:55",
        "faceOutTime": null,
        "fingerInTime": "11:17",
        "fingerOutTime": "20:33",
        "fingerOfficeHrs": "09:16",
        "fingerWorkHrs": "07:39",
        "firstInSystem": "Finger",
        "firstInTime": "11:17",
        "lastOutSystem": "Finger",
        "lastOutTime": "20:33",
        "maxOfficeHrs": "09:16",
        "maxWorkHrs": "08:19",
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "11:55",
            "betweenTimeHrs": "11:55",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": null,
            "endTime": "23:59",
            "betweenTimeHrs": null,
            "startDevice": null,
            "endDevice": null
          }
        ],
        "fingerttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "11:17",
            "betweenTimeHrs": "11:17",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:17",
            "endTime": "11:54",
            "betweenTimeHrs": "00:37",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "11:54",
            "endTime": "12:35",
            "betweenTimeHrs": "00:41",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "12:35",
            "endTime": "13:23",
            "betweenTimeHrs": "00:47",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:23",
            "endTime": "15:46",
            "betweenTimeHrs": "02:22",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:46",
            "endTime": "15:46",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:46",
            "endTime": "15:48",
            "betweenTimeHrs": "00:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:48",
            "endTime": "17:56",
            "betweenTimeHrs": "02:08",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "17:56",
            "endTime": "17:59",
            "betweenTimeHrs": "00:02",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "17:59",
            "endTime": "19:01",
            "betweenTimeHrs": "01:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "19:01",
            "endTime": "19:02",
            "betweenTimeHrs": "00:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "19:02",
            "endTime": "20:33",
            "betweenTimeHrs": "01:31",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "20:33",
            "endTime": "23:59",
            "betweenTimeHrs": "03:25",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "11:17",
            "betweenTimeHrs": "11:17",
            "startDevice": null,
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:17",
            "endTime": "11:54",
            "betweenTimeHrs": "00:37",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "11:54",
            "endTime": "11:55",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "face"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:55",
            "endTime": "12:35",
            "betweenTimeHrs": "00:40",
            "startDevice": "face",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "12:35",
            "endTime": "13:23",
            "betweenTimeHrs": "00:47",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:23",
            "endTime": "15:46",
            "betweenTimeHrs": "02:22",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:46",
            "endTime": "15:46",
            "betweenTimeHrs": "00:00",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:46",
            "endTime": "15:48",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:48",
            "endTime": "17:56",
            "betweenTimeHrs": "02:08",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "17:56",
            "endTime": "17:59",
            "betweenTimeHrs": "00:02",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "17:59",
            "endTime": "19:01",
            "betweenTimeHrs": "01:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "19:01",
            "endTime": "19:02",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "19:02",
            "endTime": "20:33",
            "betweenTimeHrs": "01:31",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "20:33",
            "endTime": "23:59",
            "betweenTimeHrs": "03:25",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "absentForDay": false
      },
      {
        "calendarDate": "2024-05-22",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": "00:00",
        "faceWorkHrs": "00:00",
        "faceInTime": "20:06",
        "faceOutTime": "20:06",
        "fingerInTime": "09:38",
        "fingerOutTime": "20:05",
        "fingerOfficeHrs": "10:26",
        "fingerWorkHrs": "09:34",
        "firstInSystem": "Finger",
        "firstInTime": "09:38",
        "lastOutSystem": "Face",
        "lastOutTime": "20:06",
        "maxOfficeHrs": "10:28",
        "maxWorkHrs": "09:34",
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "20:06",
            "betweenTimeHrs": "20:06",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "20:06",
            "endTime": "20:06",
            "betweenTimeHrs": "00:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "20:06",
            "endTime": "23:59",
            "betweenTimeHrs": "03:52",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "fingerttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "09:38",
            "betweenTimeHrs": "09:38",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "09:38",
            "endTime": "13:39",
            "betweenTimeHrs": "04:00",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "13:39",
            "endTime": "14:04",
            "betweenTimeHrs": "00:25",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "14:04",
            "endTime": "15:11",
            "betweenTimeHrs": "01:07",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:11",
            "endTime": "15:37",
            "betweenTimeHrs": "00:26",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:37",
            "endTime": "20:05",
            "betweenTimeHrs": "04:27",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "20:05",
            "endTime": "23:59",
            "betweenTimeHrs": "03:53",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "09:38",
            "betweenTimeHrs": "09:38",
            "startDevice": null,
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "09:38",
            "endTime": "13:39",
            "betweenTimeHrs": "04:00",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "13:39",
            "endTime": "14:04",
            "betweenTimeHrs": "00:25",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "14:04",
            "endTime": "15:11",
            "betweenTimeHrs": "01:07",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:11",
            "endTime": "15:37",
            "betweenTimeHrs": "00:26",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:37",
            "endTime": "20:05",
            "betweenTimeHrs": "04:27",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "20:05",
            "endTime": "20:06",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "face"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "20:06",
            "endTime": "20:06",
            "betweenTimeHrs": "00:00",
            "startDevice": "face",
            "endDevice": "face"
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "20:06",
            "endTime": "23:59",
            "betweenTimeHrs": "03:52",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "absentForDay": false
      },
      {
        "calendarDate": "2024-05-27",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": null,
        "faceWorkHrs": null,
        "faceInTime": null,
        "faceOutTime": null,
        "fingerInTime": null,
        "fingerOutTime": null,
        "fingerOfficeHrs": null,
        "fingerWorkHrs": null,
        "firstInSystem": null,
        "firstInTime": null,
        "lastOutSystem": null,
        "lastOutTime": null,
        "maxOfficeHrs": null,
        "maxWorkHrs": null,
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": null,
        "fingerttendanceLogs": null,
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": null,
        "absentForDay": true
      },
      {
        "calendarDate": "2024-05-28",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": null,
        "faceWorkHrs": null,
        "faceInTime": null,
        "faceOutTime": null,
        "fingerInTime": null,
        "fingerOutTime": null,
        "fingerOfficeHrs": null,
        "fingerWorkHrs": null,
        "firstInSystem": null,
        "firstInTime": null,
        "lastOutSystem": null,
        "lastOutTime": null,
        "maxOfficeHrs": null,
        "maxWorkHrs": null,
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": null,
        "fingerttendanceLogs": null,
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": null,
        "absentForDay": true
      },
      {
        "calendarDate": "2024-05-29",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": null,
        "faceWorkHrs": null,
        "faceInTime": null,
        "faceOutTime": null,
        "fingerInTime": null,
        "fingerOutTime": null,
        "fingerOfficeHrs": null,
        "fingerWorkHrs": null,
        "firstInSystem": null,
        "firstInTime": null,
        "lastOutSystem": null,
        "lastOutTime": null,
        "maxOfficeHrs": null,
        "maxWorkHrs": null,
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": null,
        "fingerttendanceLogs": null,
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": null,
        "absentForDay": true
      },
      {
        "calendarDate": "2024-05-30",
        "wwtWorkHrs": null,
        "wwtInTime": null,
        "wwtOutTime": null,
        "faceOfficeHrs": null,
        "faceWorkHrs": null,
        "faceInTime": null,
        "faceOutTime": null,
        "fingerInTime": "09:33",
        "fingerOutTime": "18:41",
        "fingerOfficeHrs": "09:07",
        "fingerWorkHrs": "08:32",
        "firstInSystem": "Finger",
        "firstInTime": "09:33",
        "lastOutSystem": "Finger",
        "lastOutTime": "18:41",
        "maxOfficeHrs": "09:08",
        "maxWorkHrs": "08:32",
        "leaveCount": 0.0,
        "leaveTime": null,
        "faceAttendanceLogs": null,
        "fingerttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "09:33",
            "betweenTimeHrs": "09:33",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "09:33",
            "endTime": "10:30",
            "betweenTimeHrs": "00:57",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "10:30",
            "endTime": "10:32",
            "betweenTimeHrs": "00:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "10:32",
            "endTime": "11:33",
            "betweenTimeHrs": "01:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "11:33",
            "endTime": "11:35",
            "betweenTimeHrs": "00:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:35",
            "endTime": "12:43",
            "betweenTimeHrs": "01:08",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "12:43",
            "endTime": "13:11",
            "betweenTimeHrs": "00:28",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:11",
            "endTime": "14:48",
            "betweenTimeHrs": "01:36",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "14:48",
            "endTime": "15:40",
            "betweenTimeHrs": "00:51",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:40",
            "endTime": "15:41",
            "betweenTimeHrs": "00:01",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:41",
            "endTime": "18:41",
            "betweenTimeHrs": "02:59",
            "startDevice": null,
            "endDevice": null
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "18:41",
            "endTime": "23:59",
            "betweenTimeHrs": "05:17",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "maxOfficeHrsSystem": null,
        "overallAttendanceLogs": [
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "00:00",
            "endTime": "09:33",
            "betweenTimeHrs": "09:33",
            "startDevice": null,
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "09:33",
            "endTime": "10:30",
            "betweenTimeHrs": "00:57",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "10:30",
            "endTime": "10:32",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "10:32",
            "endTime": "11:33",
            "betweenTimeHrs": "01:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "11:33",
            "endTime": "11:35",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "11:35",
            "endTime": "12:43",
            "betweenTimeHrs": "01:08",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "12:43",
            "endTime": "13:11",
            "betweenTimeHrs": "00:28",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "13:11",
            "endTime": "14:48",
            "betweenTimeHrs": "01:36",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "14:48",
            "endTime": "15:40",
            "betweenTimeHrs": "00:51",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "OUT",
            "startTime": "15:40",
            "endTime": "15:41",
            "betweenTimeHrs": "00:01",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "IN",
            "startTime": "15:41",
            "endTime": "18:41",
            "betweenTimeHrs": "02:59",
            "startDevice": "finger",
            "endDevice": "finger"
          },
          {
            "employeeOfficeAttendanceState": "AWAY",
            "startTime": "18:41",
            "endTime": "23:59",
            "betweenTimeHrs": "05:17",
            "startDevice": null,
            "endDevice": null
          }
        ],
        "absentForDay": false
      }
    ]
}
