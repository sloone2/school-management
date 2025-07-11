import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeAnExpertRoutingModule } from './become-an-expert-routing.module';
import { BecomeAnExpertComponent } from './become-an-expert.component';


@NgModule({
  declarations: [
    BecomeAnExpertComponent
  ],
  imports: [
    CommonModule,
    BecomeAnExpertRoutingModule
  ]
})
export class BecomeAnExpertModule { }
