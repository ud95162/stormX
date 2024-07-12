import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageRoutingModule} from './page-routing.module';
import {PageComponent} from './page.component';
import {PageMainComponent} from './page-main/page-main.component';
import {PageViewComponent} from './page-main/page-view/page-view.component';
import {PostsModule} from '../../../components/posts/posts.module';
import {PageComponentsModule} from '../../../components/page-components/page-components.module';
import {AlertComponentsModule} from '../../../components/alert-components/alert-components.module';

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    PostsModule,
    PageComponentsModule,
    AlertComponentsModule
  ],
  declarations: [PageComponent, PageMainComponent, PageViewComponent]
})
export class PageModule {
}
