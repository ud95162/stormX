import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  SettingsViewTitleComponentComponent
} from './settings-view-title-component/settings-view-title-component.component';
import {
  SettingsDesignationsDefineCategoryCardComponent
} from './settings-designations-define-category-card/settings-designations-define-category-card.component';
import {
  SettingsPageRequestsListComponentComponent
} from './settings-page-requests-list-component/settings-page-requests-list-component.component';
import {
  SettingsPageRequestsProcessedComponentComponent
} from './settings-page-requests-processed-component/settings-page-requests-processed-component.component';
import {
  SettingsPrivacySetPrivacyUserComponentComponent
} from './settings-privacy-set-privacy-user-component/settings-privacy-set-privacy-user-component.component';
import {
  SettingsPrivacySetListComponentComponent
} from './settings-privacy-set-list-component/settings-privacy-set-list-component.component';
import {
  SettingsPrivacyUserGroupsComponentComponent
} from './settings-privacy-user-groups-component/settings-privacy-user-groups-component.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {
  SettingsDesignationsCategoryListComponentComponent
} from './settings-designations-category-list-component/settings-designations-category-list-component.component';
import {
  SettingsQuickLinksListComponentComponent
} from './settings-quick-links-list-component/settings-quick-links-list-component.component';
import {
  SettingsQuickLinksAddComponentComponent
} from './settings-quick-links-add-component/settings-quick-links-add-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponentsModule} from '../../alert-components/alert-components.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ToolsComponentsModule} from '../../tools-components/tools-components.module';
import {
  SettingsSystemConfigCompanyWorkingComponent
} from './settings-system-config-company-working/settings-system-config-company-working.component';
import {
  SettingsSystemConfigEventsComponent
} from './settings-system-config-events/settings-system-config-events.component';
import {DesignationFilterPipePipe} from './models/designation-filter-pipe.pipe';
import {PageFilterPipePipe} from './models/page-filter-pipe.pipe';
import {QuicklinkFilterPipePipe} from './models/quicklink-filter-pipe.pipe';
import {PermissionGroupFilterPipePipe} from './models/permission-group-filter-pipe.pipe';
import {
  SettingsOpdDesignationComponentComponent
} from './settings-opd-designation-component/settings-opd-designation-component.component';
import {SettingsOpdComponentComponent} from './settings-opd-component/settings-opd-component.component';
import {
  SettingsOpdWithMaritalComponentComponent
} from './settings-opd-with-marital-component/settings-opd-with-marital-component.component';
import {
  SettingsUserPasswordResetComponentComponent
} from './settings-user-password-reset-component/settings-user-password-reset-component.component';
import {SettingsGradeDefineCardComponent} from './settings-grade-define-card/settings-grade-define-card.component';
import {SettingsGradeListComponent} from './settings-grade-list/settings-grade-list.component';
import {
  SettingsAttendanceExceptionsComponent
} from './settings-attendance-exceptions/settings-attendance-exceptions.component';
import {
  SettingsNewDesignationPageComponent
} from './settings-new-designation-page/settings-new-designation-page.component';
import {
  SettingsAttendanceDevicesStatusComponent
} from './settings-attendance-devices-status/settings-attendance-devices-status.component';
import {
  SettingsResourceAllocationUsersComponent
} from './settings-resource-allocation-users/settings-resource-allocation-users.component';
import {
  ResourceAllocationModule
} from '../../../body/new-resource-allocation-module/resource-allocation/resource-allocation.module';
import {
  SettingsProjectAddNewComponentComponent
} from './settings-project-add-new-component/settings-project-add-new-component.component';
import {
  SettingsProjectCardListComponentComponent
} from './settings-project-card-list-component/settings-project-card-list-component.component';
// import {ProjectFilterPipe} from './models/project-filter.pipe';
import {CommonComponentsModule} from '../../../body/common-components/common-components.module';
import {ConfirmationComponentsModule} from '../../../new-design/confirmation-components/confirmation-components.module';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { MonitorInconsistentRecordsComponent } from './monitor-inconsistent-records/monitor-inconsistent-records.component';
// import {
//   SettingsDefaultPermissionListComponentComponent
// } from "./settings-default-permission-list-component/settings-default-permission-list-component.component";
// import {
//   SettingsExistingPermissionGroupComponentComponent
// } from "./settings-existing-permission-group-component/settings-existing-permission-group-component.component";


@NgModule({
  imports: [
    CommonModule,
    ImageUploadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AlertComponentsModule,
    DragDropModule,
    ToolsComponentsModule,
    ResourceAllocationModule,
    CommonComponentsModule,
    ConfirmationComponentsModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [
    SettingsViewTitleComponentComponent,
    SettingsDesignationsDefineCategoryCardComponent,
    SettingsPageRequestsListComponentComponent,
    SettingsPageRequestsProcessedComponentComponent,
    SettingsPrivacySetPrivacyUserComponentComponent,
    SettingsPrivacySetListComponentComponent,
    SettingsPrivacyUserGroupsComponentComponent,
    SettingsProjectAddNewComponentComponent,
    SettingsProjectCardListComponentComponent,
    SettingsDesignationsCategoryListComponentComponent,
    SettingsQuickLinksListComponentComponent,
    SettingsQuickLinksAddComponentComponent,
    // SettingsAdvancedSearchTrainingComponentComponent,
    // SettingsAdvancedSearchSynonymsComponentComponent,
    // SettingsDefaultPermissionListComponentComponent,
    // SettingsExistingPermissionGroupComponentComponent,
    // SettingsPermissionUserGroupsLayoutComponentComponent,
    // SettingsPermissionUserGroupCardComponentComponent,
    // SettingsUserGroupsLayoutComponentComponent,
    SettingsSystemConfigCompanyWorkingComponent,
    SettingsSystemConfigEventsComponent,
    DesignationFilterPipePipe,
    PageFilterPipePipe,
    QuicklinkFilterPipePipe,
    // UserGroupFilterPipePipe,
    // ProjectFilterPipe,
    PermissionGroupFilterPipePipe,
    SettingsOpdDesignationComponentComponent,
    SettingsOpdComponentComponent,
    SettingsOpdWithMaritalComponentComponent,
    SettingsUserPasswordResetComponentComponent,
    SettingsGradeDefineCardComponent,
    SettingsGradeListComponent,
    SettingsAttendanceExceptionsComponent,
    SettingsNewDesignationPageComponent,
    SettingsAttendanceDevicesStatusComponent,
    SettingsResourceAllocationUsersComponent,
    MonitorInconsistentRecordsComponent
  ],
    exports: [
        SettingsViewTitleComponentComponent,
        SettingsDesignationsDefineCategoryCardComponent,
        SettingsPageRequestsListComponentComponent,
        SettingsPageRequestsProcessedComponentComponent,
        SettingsPrivacySetPrivacyUserComponentComponent,
        SettingsPrivacySetListComponentComponent,
        SettingsPrivacyUserGroupsComponentComponent,
        SettingsProjectAddNewComponentComponent,
        SettingsProjectCardListComponentComponent,
        SettingsDesignationsCategoryListComponentComponent,
        SettingsQuickLinksListComponentComponent,
        SettingsQuickLinksAddComponentComponent,
        // SettingsAdvancedSearchTrainingComponentComponent,
        // SettingsAdvancedSearchSynonymsComponentComponent,
        // SettingsDefaultPermissionListComponentComponent,
        // SettingsExistingPermissionGroupComponentComponent,
        // SettingsPermissionUserGroupsLayoutComponentComponent,
        // SettingsPermissionUserGroupCardComponentComponent,
        // SettingsUserGroupsLayoutComponentComponent,
        SettingsSystemConfigCompanyWorkingComponent,
        SettingsSystemConfigEventsComponent,
        SettingsUserPasswordResetComponentComponent,
        SettingsOpdDesignationComponentComponent,
        SettingsOpdComponentComponent,
        SettingsGradeDefineCardComponent,
        SettingsGradeListComponent,
        SettingsAttendanceExceptionsComponent,
        SettingsNewDesignationPageComponent,
        SettingsAttendanceDevicesStatusComponent,
        SettingsResourceAllocationUsersComponent,
        MonitorInconsistentRecordsComponent
    ]
})
export class AdminSettingsComponentsModule {
}
