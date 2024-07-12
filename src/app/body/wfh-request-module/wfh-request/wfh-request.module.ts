import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WfhRequestRoutingModule } from './wfh-request-routing.module';
import { WfhRequestComponent } from './wfh-request.component';
import { WfhRequestMainComponent } from './wfh-request-main/wfh-request-main.component';
import { WfhRequestUserViewComponent } from './wfh-request-main/wfh-request-user-view/wfh-request-user-view.component';
import {FormsModule} from "@angular/forms";
import {ConfirmationComponentsModule} from "../../../new-design/confirmation-components/confirmation-components.module";
import { WfhRequestAdminViewComponent } from './wfh-request-main/wfh-request-admin-view/wfh-request-admin-view.component';
import { WfhRequestHrViewComponent } from './wfh-request-main/wfh-request-hr-view/wfh-request-hr-view.component';
import {CommonComponentsModule} from "../../common-components/common-components.module";

@NgModule({
  declarations: [WfhRequestComponent, WfhRequestMainComponent, WfhRequestUserViewComponent, WfhRequestAdminViewComponent, WfhRequestHrViewComponent],
    imports: [
        CommonModule,
        WfhRequestRoutingModule,
        FormsModule,
        ConfirmationComponentsModule,
        CommonComponentsModule
    ]
})
export class WfhRequestModule { }
