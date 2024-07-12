import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessageComponent} from './message.component';
import {MessageMainComponent} from './message-main/message-main.component';
import {MessageTestComponent} from './message-main/message-test/message-test.component';
import {MessageRegisterComponent} from './message-main/message-register/message-register.component';
import {MessageTest2Component} from './message-main/message-test2/message-test2.component';
import {MessageTest3Component} from './message-main/message-test3/message-test3.component';
import {MessageTest4Component} from './message-main/message-test4/message-test4.component';

const routes: Routes = [{
  path: '', component: MessageComponent,
  children: [{path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MessageMainComponent},
    {path: 'test', component: MessageTestComponent},
    {path: 'register', component: MessageRegisterComponent},
    {path: 'test2', component: MessageTest2Component},
    {path: 'test3', component: MessageTest3Component},
    {path: 'test4', component: MessageTest4Component}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule {
}
