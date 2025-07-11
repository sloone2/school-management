import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-students-details',
  standalone: false,
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.scss'
})
export class StudentsDetailsComponent {
routes=routes 
public courseCarousel={
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
