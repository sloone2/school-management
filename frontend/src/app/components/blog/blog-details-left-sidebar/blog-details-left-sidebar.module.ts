import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogDetailsLeftSidebarRoutingModule } from './blog-details-left-sidebar-routing.module';
import { BlogDetailsLeftSidebarComponent } from './blog-details-left-sidebar.component';


@NgModule({
  declarations: [
    BlogDetailsLeftSidebarComponent
  ],
  imports: [
    CommonModule,
    BlogDetailsLeftSidebarRoutingModule
  ]
})
export class BlogDetailsLeftSidebarModule { }
