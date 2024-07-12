import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import {DateNFOption, RowInfo} from 'xlsx';
import * as XLSX from 'xlsx';
import * as xlsx from "xlsx";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const PDF_TYPE = 'application/pdf'
const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  constructor() {
  }

  public  exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log(json)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportJsonAsExcelFile(json: any[], excelFileName: string): void {
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(json);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, excelFileName.concat(EXCEL_EXTENSION));
  }



  public exportMultipleDataSetAsExcelFile(jsonArray: any[], excelFileName: string): void {

    let workBookObj ={
      Sheets:{},
      SheetNames:[]
    }

    for (let i = 0; i < jsonArray.length; i++) {

      workBookObj.Sheets[jsonArray[i].designation] = XLSX.utils.aoa_to_sheet(jsonArray[i].data);
      workBookObj.SheetNames.push(jsonArray[i].designation);

    }

    const workbook: XLSX.WorkBook = workBookObj;
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  exportMultipleDataSetAsExcelFileForMeetingComments(jsonArray: any[], excelFileName: string) {
    let workBookObj ={
      Sheets:{},
      SheetNames:[]
    };

    for (let i = 0; i < jsonArray.length; i++) {

      workBookObj.Sheets[jsonArray[i].year] = XLSX.utils.aoa_to_sheet(jsonArray[i].data);
      workBookObj.SheetNames.push(jsonArray[i].year);

    }

    const workbook: XLSX.WorkBook = workBookObj;
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportMultipleDataSetAsExcelFileForTable(table: any, excelFileName: string) {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(table, {raw: true});
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, excelFileName.concat(EXCEL_EXTENSION));
  }
}
