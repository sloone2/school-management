import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogLeftSidebarRoutingModule } from './blog-left-sidebar-routing.module';
import { BlogLeftSidebarComponent } from './blog-left-sidebar.component';


@NgModule({
  declarations: [
    BlogLeftSidebarComponent
  ],
  imports: [
    CommonModule,
    BlogLeftSidebarRoutingModule
  ]
})
export class BlogLeftSidebarModule { }
