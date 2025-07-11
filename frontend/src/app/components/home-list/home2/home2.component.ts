import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/shared/service/data/data.service';
import { HomeData } from './components/data';
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
interface data {
  favourite: boolean;
  active?: boolean;
}
@Component({
    selector: 'app-home2',
    templateUrl: './home2.component.html',
    styleUrls: ['./home2.component.scss'],
    standalone: false
})
export class Home2Component implements OnInit {
  public routes = routes;
  selected = '1';

  constructor(
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
  categoryCarousel: OwlOptions = {
    loop:true,
    margin:16,
    nav:false,
    dots:true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    rtl:true,
    responsive:{
      0:{
        items:1
      },
      576:{
        items:2
      },
      768:{
        items:3
      },
      992:{
        items:5
      },
      1200:{
        items:6
      },
      1400:{
        items:6
      }
    }
  };
  instructorCarousel: OwlOptions = {
    loop: true,
				margin: 24,
				nav: false,
				dots: true,
				autoplay: true,
				autoplayTimeout: 2500,
				autoplayHoverPause: true,
				smartSpeed: 1000,
        rtl:true,
				responsive:{
					0:{
						items:1
					},
					576:{
						items:1
					},
					768:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:4
					},
					1400:{
						items:4
					}
				}
  };
  brandCarousel: OwlOptions = {
    loop:true,
			margin:24,
			nav: false,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			smartSpeed: 1000,
      rtl:true,
			responsive:{
				0:{
					items:2
				},
				576:{
					items:3
				},
				768:{
					items:4
				},
				992:{
					items:4
				},
				1200:{
					items:6
				},
				1400:{
					items:6
				}
			}
  };
    public courseSlider ={
      dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false,
          rtl:true,
          responsive: [
            {
            breakpoint: 1300,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
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
  toggleClass(slide: data) {
    slide.favourite = !slide.favourite;
  }
  directPath() {
    this.router.navigate(['/pages/course/course-list']);
  }
  
}
