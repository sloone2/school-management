import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { welcomeLogin } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
@Component({
  selector: 'app-otp',
  standalone: false,
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  routes=routes;
  value : any
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
       this.router.navigate([routes.instructor_dashboard]);
     }
}
