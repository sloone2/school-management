import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { FooterTopContainerComponent } from 'src/app/layouts/footer/footer-top-container/footer-top-container.component';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    FooterTopContainerComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    SwiperModule,
      ],

})
export class HomeModule { }
