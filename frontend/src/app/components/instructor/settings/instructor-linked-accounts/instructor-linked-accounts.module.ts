import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorLinkedAccountsRoutingModule } from './instructor-linked-accounts-routing.module';
import { InstructorLinkedAccountsComponent } from './instructor-linked-accounts.component';


@NgModule({
  declarations: [
    InstructorLinkedAccountsComponent
  ],
  imports: [
    CommonModule,
    InstructorLinkedAccountsRoutingModule
  ]
})
export class InstructorLinkedAccountsModule { }
