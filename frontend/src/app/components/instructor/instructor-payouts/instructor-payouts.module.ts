import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorPayoutsRoutingModule } from './instructor-payouts-routing.module';
import { InstructorPayoutsComponent } from './instructor-payouts.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CustomPaginationModule } from 'src/app/shared/service/custom-pagination/custom-pagination.module';


@NgModule({
  declarations: [
    InstructorPayoutsComponent
  ],
  imports: [
    CommonModule,
    InstructorPayoutsRoutingModule,
    SharedModule,
    CustomPaginationModule
  ]
})
export class InstructorPayoutsModule { }
