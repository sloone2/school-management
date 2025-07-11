import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorSocialProfilesRoutingModule } from './instructor-social-profiles-routing.module';
import { InstructorSocialProfilesComponent } from './instructor-social-profiles.component';


@NgModule({
  declarations: [
    InstructorSocialProfilesComponent
  ],
  imports: [
    CommonModule,
    InstructorSocialProfilesRoutingModule
  ]
})
export class InstructorSocialProfilesModule { }
