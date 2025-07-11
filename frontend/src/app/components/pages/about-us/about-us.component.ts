import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
	routes=routes
instructorSlider={
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
testimonialSlider={
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
}
