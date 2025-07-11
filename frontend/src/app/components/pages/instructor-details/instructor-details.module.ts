import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorDetailsRoutingModule } from './instructor-details-routing.module';
import { InstructorDetailsComponent } from './instructor-details.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorDetailsComponent
  ],
  imports: [
    CommonModule,
    InstructorDetailsRoutingModule,
    SharedModule
  ]
})
export class InstructorDetailsModule { }
