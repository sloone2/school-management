import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { DataService } from 'src/app/shared/service/data/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/service/routes/routes';
import { forgotPassword, welcomeLogin } from 'src/app/models/model';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent {
 public routes = routes;
   public welcomeLogin: welcomeLogin[] = [];
   password: boolean = false; // Add more as needed
  
   togglePassword(): void {
     this.password= !this.password;
   }
   public authSlider ={
     dots: true,
         infinite: false,
         speed: 300,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         rtl:true,
         responsive: [
           {
           breakpoint: 1300,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
             infinite: true,
             dots: true
           }
           },
           {
           breakpoint: 768,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
           }
         ]
   }
 
   constructor(private DataService: DataService, public router: Router) {
     this.welcomeLogin = this.DataService.welcomeLogin;
   }
 
   directIndex() {
     this.router.navigate([routes.setPassword]);
   }
}
