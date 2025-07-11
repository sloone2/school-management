import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorStatementsRoutingModule } from './instructor-statements-routing.module';
import { InstructorStatementsComponent } from './instructor-statements.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorStatementsComponent
  ],
  imports: [
    CommonModule,
    InstructorStatementsRoutingModule,
    SharedModule
  ]
})
export class InstructorStatementsModule { }
