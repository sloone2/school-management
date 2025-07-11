import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SetPasswordComponent } from './set-password.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    SetPasswordComponent
  ],
  imports: [
    CommonModule,
    SetPasswordRoutingModule,
    SharedModule
  ]
})
export class SetPasswordModule { }
