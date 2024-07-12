import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profile} from '../../../../../../../_global/profile';
import {GeneralOps} from "../../../../../../../utility/GeneralOps";

@Component({
  selector: 'app-home-tab-leave-admin-graphs',
  templateUrl: './home-tab-leave-admin-graphs.component.html',
  styleUrls: ['./home-tab-leave-admin-graphs.component.css']
})
export class HomeTabLeaveAdminGraphsComponent implements OnInit {

  checkPermission = new GeneralOps();
  componentPermission = Profile.EMPLOYEE_APPLICATION_PERMISSION;

  totalLeaveCountClicked = false;
  eligibleLeaveClicked = false;
  additionalLeaveClicked = false;
  shortLeaveClicked = false;
  avgLeaveUtilizationClicked = false;
  approvalPendingClicked = false;
  noPayClicked = false;
  onSiteAndOfficeClicked = false;
  utilizedVsRoleClicked = false;
  typeVsDesignationClicked = false;
  utilizedLeaveProjectClicked = false;

  total_leave_class = 'c-page-nav__item';
  eligible_leave_class = 'c-page-nav__item';
  additional_leave_class = 'c-page-nav__item';
  short_leave_class = 'c-page-nav__item';
  avg_leave_util_class = 'c-page-nav__item';
  approval_pending_class = 'c-page-nav__item';
  no_pay_class = 'c-page-nav__item';
  onSite_official_class = 'c-page-nav__item';
  util_vs_role_class = 'c-page-nav__item';
  type_vs_des_class = 'c-page-nav__item';
  util_project_class = 'c-page-nav__item';

  constructor(public router: Router) {}

  ngOnInit() {
    this.totalLeaveCountClicked = true;
    this.total_leave_class = 'c-page-nav__item is-selected';

  }

  returnToHomePage() {
      this.router.navigate(['./home/main']);
  }

  changeActiveTab(type: string) {
    if (type === 'Total Leave Count') {
      this.totalLeaveCountClicked = true;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item is-selected';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Eligible Leave') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = true;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item is-selected';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Additional Leave') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = true;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item is-selected';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Short Leave') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = true;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item is-selected';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Avg Leave') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = true;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item is-selected';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Pending Leave') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = true;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item is-selected';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'No Pay') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = true;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item is-selected';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'OnSite Official') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = true;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item is-selected';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Utilized Vs Role') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = true;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item is-selected';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Type Vs Des') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = true;
      this.utilizedLeaveProjectClicked = false;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item is-selected';
      this.util_project_class = 'c-page-nav__item';
    }
    if (type === 'Leave Project') {
      this.totalLeaveCountClicked = false;
      this.eligibleLeaveClicked = false;
      this.additionalLeaveClicked = false;
      this.shortLeaveClicked = false;
      this.avgLeaveUtilizationClicked = false;
      this.approvalPendingClicked = false;
      this.noPayClicked = false;
      this.onSiteAndOfficeClicked = false;
      this.utilizedVsRoleClicked = false;
      this.typeVsDesignationClicked = false;
      this.utilizedLeaveProjectClicked = true;

      this.total_leave_class = 'c-page-nav__item';
      this.eligible_leave_class = 'c-page-nav__item';
      this.additional_leave_class = 'c-page-nav__item';
      this.short_leave_class = 'c-page-nav__item';
      this.avg_leave_util_class = 'c-page-nav__item';
      this.approval_pending_class = 'c-page-nav__item';
      this.no_pay_class = 'c-page-nav__item';
      this.onSite_official_class = 'c-page-nav__item';
      this.util_vs_role_class = 'c-page-nav__item';
      this.type_vs_des_class = 'c-page-nav__item';
      this.util_project_class = 'c-page-nav__item is-selected';
    }

  }
}
