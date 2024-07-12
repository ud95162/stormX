import {Profile} from '../_global/profile';
import {CONSTANT} from "./Constants";
import {DatePipe} from "@angular/common";

export class GeneralOps {

  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;
  leaveTypeMap = new Map();
  leaveTypeIdMap = new Map();
  monthMap = new Map();
  monthNoMap = new Map();
  yearList = [];

  checkUserHavePermissionForSection(permCode) {
    return !!this.componentPermission.includes(permCode);
  }

  getLeaveTypeFromLeaveName() {
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.STANDARD.ANNUAL, CONSTANT.LEAVE_TYPES.STANDARD.ANNUAL);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.STANDARD.CASUAL, CONSTANT.LEAVE_TYPES.STANDARD.CASUAL);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.STANDARD.MEDICAL, CONSTANT.LEAVE_TYPES.STANDARD.MEDICAL);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.ONSITE, CONSTANT.LEAVE_TYPES.SPECIAL.ONSITE);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.MATERNITY, CONSTANT.LEAVE_TYPES.SPECIAL.MATERNITY);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.LIEU, CONSTANT.LEAVE_TYPES.SPECIAL.LIEU);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.NO_PAY, CONSTANT.LEAVE_TYPES.SPECIAL.NO_PAY);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.OFFICIAL, CONSTANT.LEAVE_TYPES.SPECIAL.OFFICIAL);
    this.leaveTypeMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.CARRY_FW, CONSTANT.LEAVE_TYPES.SPECIAL.CARRY_FW);
  }

  getLeaveTypeIDFromLeaveName() {
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.STANDARD.ANNUAL, CONSTANT.LEAVE_TYPE_ID.STANDARD.ANNUAL);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.STANDARD.CASUAL, CONSTANT.LEAVE_TYPE_ID.STANDARD.CASUAL);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.STANDARD.MEDICAL, CONSTANT.LEAVE_TYPE_ID.STANDARD.MEDICAL);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.ONSITE, CONSTANT.LEAVE_TYPE_ID.SPECIAL.ONSITE);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.MATERNITY, CONSTANT.LEAVE_TYPE_ID.SPECIAL.MATERNITY);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.LIEU, CONSTANT.LEAVE_TYPE_ID.SPECIAL.LIEU);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.NO_PAY, CONSTANT.LEAVE_TYPE_ID.SPECIAL.NO_PAY);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.OFFICIAL, CONSTANT.LEAVE_TYPE_ID.SPECIAL.OFFICIAL);
    this.leaveTypeIdMap.set(CONSTANT.LEAVE_NAMES.SPECIAL.CARRY_FW, CONSTANT.LEAVE_TYPE_ID.SPECIAL.CARRY_FW);
  }


  getFirstDateOfYear(year) {
    return (year + '-01-01');
  }
  getLastDateOfYear(year) {
    return (year + '-12-31');
  }

  getYearList(startFrom, difference) {
    this.yearList = [];
    const startYear = startFrom - difference;
    for (let i = startFrom; i >= startYear; i--) {
      this.yearList.push(i);
    }
    return this.yearList;
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  isEmptyMap(obj) {
    return Object.keys(obj).length === 0;
  }

  roundFloatToNearestHalf(num) {
    return Math.round(num * 2) / 2;
  }

  getMonthNameFromNo() {
    this.monthMap.set( '01', 'January');
    this.monthMap.set( '02', 'February');
    this.monthMap.set( '03', 'March');
    this.monthMap.set( '04', 'April');
    this.monthMap.set( '05', 'May');
    this.monthMap.set( '06', 'June');
    this.monthMap.set( '07', 'July');
    this.monthMap.set( '08', 'August');
    this.monthMap.set( '09', 'September');
    this.monthMap.set( '10', 'October');
    this.monthMap.set( '11', 'November');
    this.monthMap.set( '12', 'December');
  }

  getMonthNoFromName() {
    this.monthNoMap.set('January', '01');
    this.monthNoMap.set('February', '02');
    this.monthNoMap.set('March', '03');
    this.monthNoMap.set('April', '04');
    this.monthNoMap.set('May', '05');
    this.monthNoMap.set('June', '06');
    this.monthNoMap.set('July', '07');
    this.monthNoMap.set('August', '08');
    this.monthNoMap.set('September', '09');
    this.monthNoMap.set('October', '10');
    this.monthNoMap.set('November', '11');
    this.monthNoMap.set('December', '12');
  }

  getNumberOfMonthsBetweenTwoDates(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  getActionTypeForEmployeeService(id) {
    switch (id) {
      case 1: return CONSTANT.ACTION_CHANGES.JOIN;
      case 2: return CONSTANT.ACTION_CHANGES.PROMOTION;
      case 3: return CONSTANT.ACTION_CHANGES.DESIGNATION;
      case 4: return CONSTANT.ACTION_CHANGES.DES_CATEGORY;
      case 5: return CONSTANT.ACTION_CHANGES.COMPANY;
      case 6: return CONSTANT.ACTION_CHANGES.PROJECT;
      case 7: return CONSTANT.ACTION_CHANGES.CADRE;
      case 8: return CONSTANT.ACTION_CHANGES.CONFIRMATION_STATUS;
      case 9: return CONSTANT.ACTION_CHANGES.SUPERVISOR;
    }
  }

  getCurrentDayAsString(): string {
    const datePipe = new DatePipe('en-US');
    const currentDate = new Date();
    return datePipe.transform(currentDate, 'EEEE');
  }

  getApproveStatusNameFromId(id: number) {
    switch (id) {
      case 1: return 'Pending';
      case 2: return 'Approved';
      case 3: return 'Rejected';
    }
  }

  getMonthEndDate(year: number, monthName: string): number {
    const monthIndex = new Date(monthName + ' 1, 2000').getMonth();
    const month = monthIndex + 1; // JavaScript months are 0-based

    // Get the next month's first day and subtract one day to get the current month's last day
    const monthEndDate = new Date(year, month, 0);
    return monthEndDate.getDate();
  }



  setCurrentWeekStartAndEndDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    const endDate = new Date(today);

    // Calculate the start date of the current week (Monday as the first day of the week)
    startDate.setDate(today.getDate() - (dayOfWeek - 1));

    // Calculate the end date of the current week (Sunday as the last day of the week)
    endDate.setDate(today.getDate() + (7 - dayOfWeek));

    return {startDate: startDate.toISOString().slice(0, 10), lastDate: endDate.toISOString().slice(0, 10)};

  }

  setLastWeekStartAndEndDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const lastWeekStartDate = new Date(today);
    const lastWeekEndDate = new Date(today);

    // Calculate the start date of the last week
    lastWeekStartDate.setDate(today.getDate() - (dayOfWeek - 1) - 7);

    // Calculate the end date of the last week
    lastWeekEndDate.setDate(today.getDate() - dayOfWeek - 1);

    return {startDate: lastWeekStartDate.toISOString().slice(0, 10), lastDate: lastWeekEndDate.toISOString().slice(0, 10)};
  }

  setCurrentMonthStartAndEndDates() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return {startDate: firstDayOfMonth.toISOString().slice(0, 10), lastDate: lastDayOfMonth.toISOString().slice(0, 10)};
  }

}
