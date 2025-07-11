import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCarousalRoutingModule } from './blog-carousal-routing.module';
import { BlogCarousalComponent } from './blog-carousal.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    BlogCarousalComponent
  ],
  imports: [
    CommonModule,
    BlogCarousalRoutingModule,
    SharedModule
  ]
})
export class BlogCarousalModule { }
