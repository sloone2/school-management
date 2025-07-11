import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorPlansRoutingModule } from './instructor-plans-routing.module';
import { InstructorPlansComponent } from './instructor-plans.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorPlansComponent
  ],
  imports: [
    CommonModule,
    InstructorPlansRoutingModule,
    SharedModule
  ]
})
export class InstructorPlansModule { }
