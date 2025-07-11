import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Blog3GridRoutingModule } from './blog-3-grid-routing.module';
import { Blog3GridComponent } from './blog-3-grid.component';


@NgModule({
  declarations: [
    Blog3GridComponent
  ],
  imports: [
    CommonModule,
    Blog3GridRoutingModule
  ]
})
export class Blog3GridModule { }
