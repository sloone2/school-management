import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorMessageRoutingModule } from './instructor-message-routing.module';
import { InstructorMessageComponent } from './instructor-message.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorMessageComponent
  ],
  imports: [
    CommonModule,
    InstructorMessageRoutingModule,
    SharedModule
  ]
})
export class InstructorMessageModule { }
