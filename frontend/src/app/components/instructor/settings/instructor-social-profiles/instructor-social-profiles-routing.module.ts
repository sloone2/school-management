import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorSocialProfilesComponent } from './instructor-social-profiles.component';

const routes: Routes = [{ path: '', component: InstructorSocialProfilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorSocialProfilesRoutingModule { }
