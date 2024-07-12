import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MessageRoutingModule} from './message-routing.module';
import {MessageComponent} from './message.component';
import {MessageMainComponent} from './message-main/message-main.component';
import {MessageChileComponent} from './message-main/message-chile/message-chile.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {MessageTestComponent} from './message-main/message-test/message-test.component';
import {MessageRegisterComponent} from './message-main/message-register/message-register.component';
import {MessageTest2Component} from './message-main/message-test2/message-test2.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';
import {MessageTest3Component} from './message-main/message-test3/message-test3.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MessageTest4Component} from './message-main/message-test4/message-test4.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    ImageUploadModule.forRoot(),
    NgbModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MessageComponent, MessageMainComponent, MessageChileComponent, MessageTestComponent, MessageRegisterComponent, MessageTest2Component, MessageTest3Component, MessageTest4Component],
  bootstrap: [MessageComponent]
})
export class MessageModule {
}
