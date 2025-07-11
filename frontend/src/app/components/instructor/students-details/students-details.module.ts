import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsDetailsRoutingModule } from './students-details-routing.module';
import { StudentsDetailsComponent } from './students-details.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    StudentsDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsDetailsRoutingModule,
    SharedModule
  ]
})
export class StudentsDetailsModule { }
