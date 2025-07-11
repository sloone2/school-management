import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorCertificateComponent } from './instructor-certificate.component';

const routes: Routes = [{ path: '', component: InstructorCertificateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorCertificateRoutingModule { }
