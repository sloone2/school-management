import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-home6',
  standalone: false,
  templateUrl: './home6.component.html',
  styleUrl: './home6.component.scss'
})
export class Home6Component {
 public routes = routes;
  selected = '1';
  public base = '';
  public page = '';
  public last = '';
  isSelected:boolean[]=[false];
  constructor(
    private common: CommonService,
    public router: Router,
    private renderer: Renderer2
  ) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    if (this.base == 'home-four') {
      this.renderer.addClass(document.body, 'select-home-four');
    }
  }
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
  leadingSlider5 = {
    infinite: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				autoplay: true,
				arrows: false,
        rtl:true,
				responsive: [
					{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						infinite: true,
						dots: false
					}
					},
					{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
					}
					},
				]
  };
  public homeFiveCourse = {
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
  };
  public testimonialFive = {
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 3000,
    autoplaySpeed: 1800,
    arrows: false,
    rtl:true,
  };
  public blogOption: OwlOptions = {
    margin: 24,
    nav: false,
    loop: true,
    dots: true,
    autoplay: false,
    rtl:true,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
  directPath() {
    this.router.navigate(['/pages/course/course-list']);
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'select-home-four');
  }
  iconSelect(index:number) : void{
    this.isSelected[index]=!this.isSelected[index]
    }
    onSubmit():void{
      this.router.navigate([routes.courseList]);
      }
}
