import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../../_global/profile';
import {ProfileUserServiceService} from '../../../../../service/profile-user-service.service';
import {AddPreviousWorkDetailPreloadData} from '../model/add-previous-work-detail-preload-data.model';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SaveUpdatePreviousWorkDetail} from '../model/save-update-previous-work-detail.model';
//added
import {InterCommunicationServiceService} from '../../../../../service/support-services/inter-communication-service.service';

@Component({
  selector: 'app-add-previous-work-detail',
  templateUrl: './add-previous-work-detail.component.html',
  styleUrls: ['./add-previous-work-detail.component.css']
})
export class AddPreviousWorkDetailComponent implements OnInit {

  loadingOverlayView = false;
  showSuccessAlert = false;
  showFailedAlert = false;

  addPreviousWorkDetailPreloadData: AddPreviousWorkDetailPreloadData;
  previousCompaniesList: string[];
  previousJobRoleList: string[];

  previousJobRole: string;
  previousWorkCompany: string;
  fromDate: string;
  toDate: string;

   //added
   errorCode;
   errorType;
   errorMessage;

  constructor(private httpservice: ProfileUserServiceService, private interCommunicationServiceService: InterCommunicationServiceService) {
  }

  ngOnInit() {
    this.httpservice.loadAddPreviousWorkDetailPreloadData().subscribe(
      (data: any) => {
        this.addPreviousWorkDetailPreloadData = data;
        this.previousCompaniesList = this.addPreviousWorkDetailPreloadData.previousCompaniesList;
        this.previousJobRoleList = this.addPreviousWorkDetailPreloadData.previousJobRoleList;
      }
    );
  }

  filterPreviousJobRoles = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.previousJobRoleList.filter(v => v != null && v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  filterPreviousCompanies = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.previousCompaniesList.filter(v => v != null && v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  savePreviousWorkDetail() {
    this.loadingOverlayView = true;

   if (this.dis()) {
      alert('Please fill the required fields');
      this.loadingOverlayView = false;
    } else {

      const saveUpdatePreviousWorkDetail: SaveUpdatePreviousWorkDetail = new SaveUpdatePreviousWorkDetail(
        0, this.previousJobRole, this.previousWorkCompany, this.fromDate, this.toDate
      );

      this.httpservice.savePreviousWorkingDetail(saveUpdatePreviousWorkDetail)
        .subscribe(
          (data: any) => {
            if (data.httpStatusCode === 200) {
              this.loadingOverlayView = false;
              this.showSuccessAlert = true;
              this.previousJobRole = null;
              this.previousWorkCompany = null;
              this.fromDate = null;
              this.toDate = null;
              this.openErrorModal(100, 'SUCCESS', '');
            } else if (data.httpStatusCode === 500) {
              this.showFailedAlert = true;
            }
          }
        );
        this.httpservice.callMyMethod("Niroshan");
    }
  }

  hi() {

  }

  warningClose() {
    this.showSuccessAlert = false;
    this.showFailedAlert = false;
  }

  //added
   dis(){

    if (this.previousJobRole === '' || this.previousJobRole == null ||
    this.previousWorkCompany === '' || this.previousWorkCompany == null ||
    this.fromDate === '' || this.fromDate == null ||
    this.toDate === '' || this.toDate == null)

    {
    return true;
    }
    else{
      return false;
    }

  }
  ////added
  openErrorModal(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
    (<HTMLInputElement>document.getElementById('modalTrigger')).click();
  }

}
