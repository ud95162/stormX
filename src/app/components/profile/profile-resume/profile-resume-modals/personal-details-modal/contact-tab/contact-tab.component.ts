import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileUserServiceService} from '../../../../../../service/profile-user-service.service';
import {InterCommunicationServiceService} from '../../../../../../service/support-services/inter-communication-service.service';
import {Profile} from '../../../../../../_global/profile';

@Component({
    selector: 'app-contact-tab',
    templateUrl: './contact-tab.component.html',
    styleUrls: ['./contact-tab.component.css']
})
export class ContactTabComponent implements OnInit {

    @Input() contactDetails: any;
    @Input() employeeNo: any;
    @Output() success = new EventEmitter<string>();

    showEdit = false;

    dataLoaded = false;
    cntID;

    //added
    errorCode;
    errorType;
    errorMessage;

    constructor(private profileUserServiceService: ProfileUserServiceService,
                private interCommunicationServiceService: InterCommunicationServiceService) {
    }

    ngOnInit() {
        this.getEmployeeContactDataOnload();
    }

    getEmployeeContactDataOnload() {
        this.dataLoaded = this.contactDetails.length !== 0;
        this.showEdit = this.employeeNo === Profile.EMPLOYEE_ID;
    }

    loadEmpContactData() {
        this.profileUserServiceService.loadEmpData(Profile.EMPLOYEE_ID)
            .subscribe(
                (data: any) => {
                    this.contactDetails = data[0].personalInformation.contact_details;
                    if (this.contactDetails.length === 0) {
                        this.dataLoaded = false;
                    } else {
                        this.dataLoaded = true;
                    }
                }
            );
    }

    onContactEdit() {
        const jsonPost = {
            'contact_id': this.contactDetails.contact_id,
            'address': this.contactDetails.address,
            'city': this.contactDetails.city,
            'other_address': this.contactDetails.other_address,
            'mobile': this.contactDetails.mobile,
            'home_mobile': this.contactDetails.home_mobile,
            'personal_email': this.contactDetails.personal_email,
            'skype': this.contactDetails.skype,
            'facebook': this.contactDetails.facebook,
            'twitter': this.contactDetails.twitter,
            'linkedin': this.contactDetails.linkedin,
            'personal_web_site': this.contactDetails.personal_web_site,
            'livingSituation': this.contactDetails.livingSituation,
            'modeOfTravel': this.contactDetails.modeOfTravel,
            'extension': this.contactDetails.extension,
            'emp_no': Profile.EMPLOYEE_ID,
            'work_email': this.contactDetails.work_email
        };

        // if (this.contactDetails.mobile.match('^\\d{10}$') &&
        //     this.contactDetails.home_mobile.match('^\\d{10}$') &&
        // this.contactDetails.personal_email.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        // ) {

            this.profileUserServiceService.editContactDetails(jsonPost)
                .subscribe(
                    (data: any) => {
                        if (data.httpStatusCode === 200) {
                            this.openErrorModal(101, 'SUCCESS', '');
                            this.loadEmpContactData();
                            this.success.emit('complete');
                        }
                    }
                );
        // }else{
        //   this.openErrorModal(101, 'Validation Error', 'Validation Error');
        // }
    }

    // added
    openErrorModal(errorCode, errorType, errorMessage) {
        this.errorCode = errorCode;
        this.errorType = errorType;
        this.errorMessage = errorMessage;
        this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
        (<HTMLInputElement>document.getElementById('modalTrigger')).click();
    }


}
