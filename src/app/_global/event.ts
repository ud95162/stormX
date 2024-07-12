/**
 * Created by kavindu on 4/4/2018.
 */
export class Event {
  static CURRENT_EVENT_VENUE: any;
  static VENUE_ID_FOR_CALENDAR: any = 1;
  // static VENUE_NAME_FOR_CALENDAR: any = 'Bay 1 - Hedges Meeting Pod';
  static VENUE_NAME_FOR_CALENDAR: any = ''; // removing initialization due to client venues
  static DEFAULT_WEEK = 0;
  static DEFAULT_YEAR: number;
  static CALENDAR_TYPE = 'Monthly';
  static EVENT_TYPE = ['Meeting', 'Interview', 'Gathering', 'Outing', 'Event'];

  // should be in between 0 and 23
  static EVENT_CARD_GRID_CUBE_MODAL_SAMPLE_ARRAY_START_HOUR = '06:00 AM';
  static EVENT_CARD_GRID_CUBE_MODAL_SAMPLE_ARRAY_END_HOUR = '11:00 PM';

  static setCurrentDateTime() {
    let today = new Date();

    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1; // January is 0!
    let todayYear = today.getFullYear();
    let todayHour = today.getHours();
    let todayMinute = today.getMinutes();

    let roundupDay;
    let roundupMonth;
    let roundupHour;
    let roundupMinute;

    let processedMinute;
    let processedHour;
    let processedNextHour;

    let processedCurrentDate;
    let processedFullDate;
    let processedFullTime;
    let processedFullNextTime;

    let processedTodayCurrent;
    let processedTodayNext;

    if (todayDate < 10) {
      roundupDay = '0' + todayDate;
    } else {
      roundupDay = todayDate;
    }

    if (todayMonth < 10) {
      roundupMonth = '0' + todayMonth;
    } else {
      roundupMonth = todayMonth;
    }

    if (todayHour < 10) {
      roundupHour = '0' + todayHour;
    } else {
      roundupHour = todayHour;
    }

    if (todayMinute < 10) {
      roundupMinute = '0' + todayMinute;
    } else {
      roundupMinute = todayMinute;
    }

    if (roundupMinute <= 30) {
      processedMinute = 30;
      processedHour = roundupHour;
    } else if (roundupMinute <= 59) {
      processedMinute = '00';
      processedHour = (parseInt(roundupHour) + 1).toString();
    }

    if (processedHour < 23) {
      processedNextHour = (parseInt(processedHour) + 1).toString();
    } else {
      processedNextHour = processedHour;
    }

    processedCurrentDate = todayYear + '-' + roundupMonth + '-' + roundupDay;
    processedFullDate = todayYear + '-' + roundupMonth + '-' + roundupDay;
    processedFullTime = processedHour + ':' + processedMinute;
    processedFullNextTime = processedNextHour + ':' + processedMinute;

    processedTodayCurrent = new Date(todayYear, roundupMonth - 1, roundupDay, processedHour, processedMinute, 0o0);
    processedTodayNext = new Date(todayYear, roundupMonth - 1, roundupDay, processedNextHour, processedMinute, 0o0);


    const dateJson = {
      'todayDate': todayDate,
      'todayMonth': todayMonth,
      'todayYear': todayYear,
      'todayHour': todayHour,
      'todayMinute': todayMinute,
      'roundupDay': roundupDay,
      'roundupMonth': roundupMonth,
      'roundupHour': roundupHour,
      'roundupMinute': roundupMinute,
      'processedMinute': processedMinute,
      'processedHour': processedHour,
      'processedNextHour': processedNextHour,
      'processedCurrentDate': processedCurrentDate,
      'processedFullDate': processedFullDate,
      'processedFullTime': processedFullTime,
      'processedFullNextTime': processedFullNextTime,
      'processedTodayCurrent': processedTodayCurrent,
      'processedTodayNext': processedTodayNext,
    };

    return dateJson;
  }

  static changeNextDateTime(currentDateTime) {
    let today = new Date(currentDateTime);

    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1; // January is 0!
    let todayYear = today.getFullYear();
    let todayHour = today.getHours();
    let todayMinute = today.getMinutes();

    let roundupDay;
    let roundupMonth;
    let roundupHour;
    let roundupMinute;

    let processedMinute;
    let processedHour;
    let processedNextHour;

    let processedTodayNext;

    if (todayDate < 10) {
      roundupDay = '0' + todayDate;
    } else {
      roundupDay = todayDate;
    }

    if (todayMonth < 10) {
      roundupMonth = '0' + todayMonth;
    } else {
      roundupMonth = todayMonth;
    }

    if (todayHour < 10) {
      roundupHour = '0' + todayHour;
    } else {
      roundupHour = todayHour;
    }

    if (todayMinute < 10) {
      roundupMinute = '0' + todayMinute;
    } else {
      roundupMinute = todayMinute;
    }

    if (roundupMinute <= 30) {
      processedMinute = 30;
      processedHour = roundupHour;
    } else if (roundupMinute <= 59) {
      processedMinute = '00';
      processedHour = (parseInt(roundupHour) + 1).toString();
    }

    if (processedHour < 23) {
      processedNextHour = (parseInt(processedHour) + 1).toString();
    } else {
      processedNextHour = processedHour;
    }

    processedTodayNext = new Date(todayYear, roundupMonth - 1, roundupDay, processedNextHour, todayMinute, 0o0);

    return processedTodayNext;
  }

  static changeDateFormat(standardDateFormat) {
    let today = new Date(standardDateFormat);

    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1; // January is 0!
    let todayYear = today.getFullYear();
    let todayHour = today.getHours();
    let todayMinute = today.getMinutes();

    let roundupDay;
    let roundupMonth;
    let roundupHour;
    let roundupMinute;

    let processedMinute;
    let processedHour;
    let processedNextHour;

    if (todayDate < 10) {
      roundupDay = '0' + todayDate;
    } else {
      roundupDay = todayDate;
    }

    if (todayMonth < 10) {
      roundupMonth = '0' + todayMonth;
    } else {
      roundupMonth = todayMonth;
    }

    if (todayHour < 10) {
      roundupHour = '0' + todayHour;
    } else {
      roundupHour = todayHour;
    }

    if (todayMinute < 10) {
      roundupMinute = '0' + todayMinute;
    } else {
      roundupMinute = todayMinute;
    }

    if (roundupMinute <= 30) {
      processedMinute = 30;
      processedHour = roundupHour;
    } else if (roundupMinute <= 59) {
      processedMinute = '00';
      processedHour = (parseInt(roundupHour) + 1).toString();
    }

    if (processedHour < 23) {
      processedNextHour = (parseInt(processedHour) + 1).toString();
    } else {
      processedNextHour = processedHour;
    }

    let json = {
      'date': todayYear + '-' + roundupMonth + '-' + roundupDay,
      'time': processedHour + ':' + processedMinute
    };

    return json;
  }

  static convertTime(time) {
    const timeToProcess = new Date('01/01/2019 ' + time);
    let hour = timeToProcess.getHours(), roundUpHour, minute = timeToProcess.getMinutes(), roundUpMinute;

    if (hour < 10) {
      roundUpHour = '0' + hour;
    } else {
      roundUpHour = hour;
    }

    if (minute < 10) {
      roundUpMinute = '0' + minute;
    } else {
      roundUpMinute = minute;
    }

    const timeJson = {
      'ms': timeToProcess.getMilliseconds(),
      'secs': timeToProcess.getSeconds(),
      'mins': roundUpMinute,
      'hrs': roundUpHour
    };

    return timeJson;
  }

}
