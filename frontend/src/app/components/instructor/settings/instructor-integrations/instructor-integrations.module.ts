import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorIntegrationsRoutingModule } from './instructor-integrations-routing.module';
import { InstructorIntegrationsComponent } from './instructor-integrations.component';


@NgModule({
  declarations: [
    InstructorIntegrationsComponent
  ],
  imports: [
    CommonModule,
    InstructorIntegrationsRoutingModule
  ]
})
export class InstructorIntegrationsModule { }
