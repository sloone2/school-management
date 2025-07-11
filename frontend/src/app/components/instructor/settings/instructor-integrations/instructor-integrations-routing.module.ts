import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorIntegrationsComponent } from './instructor-integrations.component';

const routes: Routes = [{ path: '', component: InstructorIntegrationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorIntegrationsRoutingModule { }
