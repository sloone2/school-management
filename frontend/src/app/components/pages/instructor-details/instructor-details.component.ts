import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-details',
  standalone: false,
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.scss'
})
export class InstructorDetailsComponent {
routes=routes
courseCarousel={
  infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
				{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					infinite: true,
					dots: false
				}
				},
			]
}
}
