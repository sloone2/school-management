import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/service/data/data.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/service/routes/routes';
import { welcomeLogin } from 'src/app/models/model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
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
    this.router.navigate([routes.instructor_dashboard]);
  }
}
