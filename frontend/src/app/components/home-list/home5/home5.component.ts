import {
	Component,
	OnDestroy,
	OnInit,
	Renderer2,
	ViewEncapsulation,
  } from '@angular/core';
  import SwiperCore, {
	SwiperOptions,
	EffectCoverflow,
	Pagination,
	Navigation,
	Scrollbar,
  } from 'swiper';
  import * as AOS from 'aos';
  import { Router } from '@angular/router';
  import { routes } from 'src/app/shared/service/routes/routes';
  import { OwlOptions } from 'ngx-owl-carousel-o';
  import {
	counter,
	favourite,
	swiper,
	tab1,
	tab2,
	tab3,
	tab4,
	tab5,
	tab6,
	tab7,
	trending_course,
  } from 'src/app/models/model';
  import { CommonService } from 'src/app/shared/service/common/common.service';
import { HomeData } from './components/data';
  SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar]);
  interface data {
	active?: boolean;
  }

@Component({
  selector: 'app-home5',
  standalone: false,
  templateUrl: './home5.component.html',
  styleUrl: './home5.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class Home5Component implements OnInit, OnDestroy {

selected = '1';

  public swiper: swiper[] = [];
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';

  constructor(
	private common: CommonService,
	public router: Router,
	private data: HomeData,
	private renderer: Renderer2
  ) {

	this.swiper = this.data.swiper;
	this.common.base.subscribe((base: string) => {
	  this.base = base;
	});
	this.common.page.subscribe((page: string) => {
	  this.page = page;
	});
	this.common.last.subscribe((last: string) => {
	  this.last = last;
	});
	if (this.base == 'home-three') {
	  this.renderer.addClass(document.body, 'select-home-three');
	}
  }
  ngOnInit(): void {
	AOS.init({
	  duration: 1200,
	  once: true,
	});
  }
  public favouriteCarousel = {
	dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 5,
			slidesToScroll: 5,
			arrows: false,
			rtl:true,
			responsive: [
				{
				  breakpoint: 1399,
				  settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					infinite: true,
					dots: true
				  }
				},
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
  };
  public trendingcrouses = {
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
		breakpoint: 992,
		settings: {
		  slidesToShow: 2,
		  slidesToScroll: 2
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
  };
  public brandoption2: OwlOptions = {
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
  config1: SwiperOptions = {
	effect: "coverflow",
	loop: false,
	grabCursor: true,
	centeredSlidesBounds:true,
	centeredSlides: true,
	slidesPerView: "auto",
	initialSlide: 2,
	navigation: {
		prevEl: '.slide-prev-btn',
		nextEl: '.slide-next-btn',
	},
	coverflowEffect: {
	rotate: 0,
	stretch: 0,
	depth: 100,
	modifier: 10,
	slideShadows: true
	},
	pagination: {
	el: ".swiper-pagination",
	clickable: true
	}
  }
  directPath() {
	this.router.navigate(['/pages/course/course-list']);
  }
  toggleClass(slide: data) {
	slide.active = !slide.active;
  }
  ngOnDestroy(): void {
	this.renderer.removeClass(document.body, 'select-home-three');
  }
  config: SwiperOptions = {
	effect: 'coverflow',
	direction: 'horizontal',
	loop: false,
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	initialSlide: 2,
	// spaceBetween: 100,
	speed: 400,
	navigation: {
	  prevEl: '.slide-prev-btn',
	  nextEl: '.slide-next-btn',
	},
	pagination: {
	  clickable: true,
	  el: '.swiper-pagination',
	},
	// scrollbar: { draggable: true },
	coverflowEffect: {
	  rotate: 0,
	  stretch: 0,
	  depth: 100,
	  modifier: 10,
	  slideShadows: true,
	  
	},
  };
  onSubmit():void{
	this.router.navigate([routes.courseList]);
  }
}
