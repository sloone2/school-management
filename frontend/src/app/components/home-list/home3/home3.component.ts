import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/shared/service/data/data.service';
import * as AOS from 'aos';
import { routes } from 'src/app/shared/service/routes/routes';
import {
  topCategories,
  trendingCourses,
  featuredInstructor,
  latestBlogs,
  featuredCourses,
  career,
  universitiesCompanies,
  testimonial,
} from 'src/app/models/model';
interface data {
  active?: boolean;
}
@Component({
    selector: 'app-home3',
    templateUrl: './home3.component.html',
    styleUrls: ['./home3.component.scss'],
    standalone: false
})
export class Home3Component implements OnInit {
  public routes = routes;

  isSelected:boolean[]=[false];
  selected = '1';
  public topCategoriesOwlOptions = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    rtl:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
      }
      ]
  };
  public trendingcrouse = {
    dots: true,
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
        rtl:true,
				responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 2,
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
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
  };
  public instructorCrouse = {
    dots: true,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
        arrows: false,
        rtl:true,
				responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 2,
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
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
  };
  public brandCarousel: OwlOptions = {
			margin: 24,
			nav : false,
			dots: false,
			loop: true,
			autoplay:false,
			autoplaySpeed: 2000,
      rtl:true,
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
  public testimonials = {
    lazyLoad: 'ondemand',
    infinite: true,
    rtl:true,
  };
  public brandSlide2 = {
    lazyLoad: 'ondemand',
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    speed: 3000,
    autoplaySpeed: 1800,
    arrows: false,
    rtl:true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
        slidesToShow: 5,
        slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 1
        }
      }
      ]
  };
  public slideConfig = {
    lazyLoad: 'ondemand',
    infinite: true,
    rtl:true,
  };

  constructor(private DataService: DataService, public router: Router) {

  }

  ngOnInit() {
    AOS.init({ duration: 1200, once: true });
  }
  toggleClass(slide: data) {
    slide.active = !slide.active;
  }
  directPath() {
    this.router.navigate(['/pages/course/course-list']);
  }
  iconSelect(index:number) : void{
    this.isSelected[index]=!this.isSelected[index]
    }
    onSubmit():void{
      this.router.navigate([routes.courseList]);
      }
}
