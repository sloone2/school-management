import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListRoutingModule } from './students-list-routing.module';
import { StudentsListComponent } from './students-list.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CustomPaginationModule } from 'src/app/shared/service/custom-pagination/custom-pagination.module';


@NgModule({
  declarations: [
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    StudentsListRoutingModule,
    SharedModule,
    CustomPaginationModule
  ]
})
export class StudentsListModule { }
