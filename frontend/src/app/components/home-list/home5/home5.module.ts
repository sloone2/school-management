import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home5RoutingModule } from './home5-routing.module';
import { Home5Component } from './home5.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SwiperModule } from 'swiper/angular';
import { CountUpModule } from 'ngx-countup';


@NgModule({
  declarations: [
    Home5Component,
    FooterComponent
  ],
  imports: [
    CommonModule,
    Home5RoutingModule,
    SharedModule,
    FeatherIconModule,
    SwiperModule,
    CountUpModule
  ]
})
export class Home5Module { }
