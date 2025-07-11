import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home6RoutingModule } from './home6-routing.module';
import { Home6Component } from './home6.component';
import { FooterComponent } from './components/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CountUpModule } from 'ngx-countup';


@NgModule({
  declarations: [
      Home6Component,
      FooterComponent
    ],
  imports: [
    CommonModule,
    Home6RoutingModule,
    SlickCarouselModule,
    FeatherIconModule,
    SharedModule,
    CountUpModule
  ]
})
export class Home6Module { }
