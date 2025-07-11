import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsGridRoutingModule } from './students-grid-routing.module';
import { StudentsGridComponent } from './students-grid.component';


@NgModule({
  declarations: [
    StudentsGridComponent
  ],
  imports: [
    CommonModule,
    StudentsGridRoutingModule
  ]
})
export class StudentsGridModule { }
