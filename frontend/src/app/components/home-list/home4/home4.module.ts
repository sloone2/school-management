import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home4RoutingModule } from './home4-routing.module';
import { Home4Component } from './home4.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CountUpModule } from 'ngx-countup';


@NgModule({
  declarations: [
    Home4Component,
    FooterComponent
  ],
  imports: [
    CommonModule,
    Home4RoutingModule,
    FeatherIconModule,
    SharedModule,
    CountUpModule
  ]
})
export class Home4Module { }
