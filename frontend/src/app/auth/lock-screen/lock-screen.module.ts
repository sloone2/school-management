import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockScreenRoutingModule } from './lock-screen-routing.module';
import { LockScreenComponent } from './lock-screen.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    LockScreenComponent
  ],
  imports: [
    CommonModule,
    LockScreenRoutingModule,
    SharedModule
  ]
})
export class LockScreenModule { }
