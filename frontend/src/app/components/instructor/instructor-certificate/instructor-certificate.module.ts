import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorCertificateRoutingModule } from './instructor-certificate-routing.module';
import { InstructorCertificateComponent } from './instructor-certificate.component';


@NgModule({
  declarations: [
    InstructorCertificateComponent
  ],
  imports: [
    CommonModule,
    InstructorCertificateRoutingModule
  ]
})
export class InstructorCertificateModule { }
