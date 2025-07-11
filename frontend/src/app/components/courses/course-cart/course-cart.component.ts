import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-course-cart',
  standalone: false,
  templateUrl: './course-cart.component.html',
  styleUrl: './course-cart.component.scss'
})
export class CourseCartComponent {
routes=routes;
}
