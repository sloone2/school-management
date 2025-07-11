import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogDetailsRightSidebarRoutingModule } from './blog-details-right-sidebar-routing.module';
import { BlogDetailsRightSidebarComponent } from './blog-details-right-sidebar.component';


@NgModule({
  declarations: [
    BlogDetailsRightSidebarComponent
  ],
  imports: [
    CommonModule,
    BlogDetailsRightSidebarRoutingModule
  ]
})
export class BlogDetailsRightSidebarModule { }
