import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/shared/service/data/data.service';
import * as AOS from 'aos';
import { routes } from 'src/app/shared/service/routes/routes';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import SwiperCore, {
	SwiperOptions,
	EffectCards,
	Mousewheel
  } from 'swiper';
  SwiperCore.use([EffectCards, Mousewheel]);
interface data {
  active?: boolean;
  class?:string;
}
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public routes = routes;
  isSelected:boolean[]=[false];
  constructor(private DataService: DataService, public router: Router) {
  }
  config: SwiperOptions = {
    effect: 'cards',
    loop: false,
    grabCursor: true,
    slidesPerView: 'auto',
  };
  public bannercard=[
    {
      img:"course-22.jpg",
      img1:"assets/img/icons/course-01.svg",
      img2:"user-50.jpg",
      name:"David Benitz",
      department:"Productivity",
      description:"The Complete Business and Management Course",
      rating:"5.0 (210 Reviews)",
      price:"$168",
	  fav:0
    },
    {
      img:"course-25.jpg",
      img1:"assets/img/featured-courses/Clip-path-group.svg",
      img2:"user-20.jpg",
      name:"Edith Dorsey",
      department:"Lifestyles",
      description:"Build Creative Arts & media Course Completed",
      rating:"4.9 (178 Reviews)",
      price:"$190",
	  fav:6
    },
    {
      img:"course-24.jpg",
      img1:"assets/img/featured-courses/react.svg",
      img2:"user-23.jpg",
      name:"Calvin Johnsen",
      department:"Development",
      description:"Learn & Create ReactJS Tech Fundamentals Apps",
      rating:"5.0 (154 Reviews)",
      price:"$147",
	  fav:7
    },
  ]

  public slideConfig ={
    lazyLoad: 'ondemand',
				slidesToShow: 7,
				slidesToScroll: 1,
				autoplay: true,
				speed: 3000,
				autoplaySpeed: 1800,
				arrows: false,
				rtl:true,
				responsive: [
					{
						breakpoint: 1400,
						settings: {
						slidesToShow: 6,
						infinite: true,
						dots: false
						}
					},
					{
						breakpoint: 1200,
						settings: {
						slidesToShow: 5,
						}
					},
					{
						breakpoint: 992,
						settings: {
						slidesToShow: 3,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
						}
						}
				]
   }
  public topCourseSlider={
    infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  rtl:true,
  responsive: [
    {
    breakpoint: 992,
    settings: {
      slidesToShow: 2,
      infinite: true,
      dots: false
    }
    },
    {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
    }
    },
  ]
  }
public featureCourseSlider2 ={
  dots: false,
				infinite: true,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 1,
				rtl:true,
				responsive: [
				  {
					breakpoint: 1300,
					settings: {
					  slidesToShow: 3,
					  slidesToScroll: 1,
					  infinite: true,
					  dots: true
					}
				  },
				  {
					breakpoint: 992,
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
				  }
				]
}
public brandSlide={
  dots: false,
				infinite: true,
				speed: 2000,
				slidesToShow: 6,
				slidesToScroll: 1,
				autoplay: true,
				arrows: false,
				rtl:true,
				responsive: [
				  {
					breakpoint: 1300,
					settings: {
					  slidesToShow: 5,
					  slidesToScroll: 1,
					  infinite: true,
					  dots: true
					}
				  },
				  {
					breakpoint: 992,
					settings: {
					  slidesToShow: 4,
					  slidesToScroll: 1,
					  infinite: true,
					  dots: true
					}
				  },
				  {
					breakpoint: 768,
					settings: {
					  slidesToShow: 2,
					  slidesToScroll: 1
					}
				  }
				]
}
public instructorSlider={
  infinite: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				rtl:true,
				responsive: [
					{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: false
					}
					},
					{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
					},
					{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScrol:1
          }
        }
        ]
}
public testimonialSlider={
  infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				rtl:true,
				responsive: [
					{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						infinite: true,
						dots: false
					}
					},
					{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
					},
				]
}
  settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
  private lightGallery!: LightGallery;
  private needRefresh = false;
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;

  };
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
