import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/shared/service/data/data.service';

import { routes } from 'src/app/shared/service/routes/routes';
import {
  universitiesCompanies,
  category,
  Featured_Courses,
  trending_Courses,
  feature_instructors,
  real_reviews,
  blog,
} from 'src/app/models/model';
import { HomeData } from './components/data';
interface data {
  favourite: boolean;
  active?: boolean;
}
@Component({
    selector: 'app-home4',
    templateUrl: './home4.component.html',
    styleUrls: ['./home4.component.scss'],
    standalone: false
})
export class Home4Component implements OnInit {
public routes = routes;
  selected = '1';
  constructor(
    private DataService: DataService,
    public router: Router,
    public data: HomeData
  ) {
  }
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
  realReviews:OwlOptions = {
    loop:true,
    margin:15,
    dots: false,
    nav:true,
    rtl:true,
    navText: [ '<i class="fa-sharp fa-solid fa-arrow-left-long"></i>', '<i class="fa-sharp fa-solid fa-arrow-right-long"></i>' ], 
    responsive:{
      0:{
        items:1
      },
      500:{
        items:1
      },
      768:{
        items:1
      },
      1000:{
        items:1
      },
      1300:{
        items:1
      }
    }
  };
  public leadGroup: OwlOptions = {
    margin: 24,
    nav : false,
    dots: false,
    loop: true,
    autoplay:false,
    rtl:true,
    autoplaySpeed: 2000,
      responsive: {
          0: {
            items: 2,
      nav : false,
      dots: false,
        },
        768 : {
            items: 3,
      nav : false,
      dots: false,
        },
          1170: {
            items: 6,
      dots: false,
            }
      }
  };
  toggleClass(slide: data) {
    slide.favourite = !slide.favourite;
  }
  directPath() {
    this.router.navigate(['/pages/course/course-list']);
  }
  onSubmit():void{
    this.router.navigate([routes.courseList]);
    }
}
