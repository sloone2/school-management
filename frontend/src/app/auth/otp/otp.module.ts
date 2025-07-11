import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputOtpModule } from 'primeng/inputotp';
import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    OtpRoutingModule,
    SharedModule,
    InputOtpModule
  ]
})
export class OtpModule { }
