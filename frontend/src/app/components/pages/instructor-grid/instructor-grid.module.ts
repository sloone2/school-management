import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorGridRoutingModule } from './instructor-grid-routing.module';
import { InstructorGridComponent } from './instructor-grid.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorGridComponent
  ],
  imports: [
    CommonModule,
    InstructorGridRoutingModule,
    SharedModule
  ]
})
export class InstructorGridModule { }
