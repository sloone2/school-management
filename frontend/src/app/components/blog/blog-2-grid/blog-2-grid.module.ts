import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Blog2GridRoutingModule } from './blog-2-grid-routing.module';
import { Blog2GridComponent } from './blog-2-grid.component';


@NgModule({
  declarations: [
    Blog2GridComponent
  ],
  imports: [
    CommonModule,
    Blog2GridRoutingModule
  ]
})
export class Blog2GridModule { }
