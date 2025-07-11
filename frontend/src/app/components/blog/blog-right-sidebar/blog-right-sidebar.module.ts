import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRightSidebarRoutingModule } from './blog-right-sidebar-routing.module';
import { BlogRightSidebarComponent } from './blog-right-sidebar.component';


@NgModule({
  declarations: [
    BlogRightSidebarComponent
  ],
  imports: [
    CommonModule,
    BlogRightSidebarRoutingModule
  ]
})
export class BlogRightSidebarModule { }
