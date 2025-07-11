import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-course-checkout',
  standalone: false,
  templateUrl: './course-checkout.component.html',
  styleUrl: './course-checkout.component.scss'
})
export class CourseCheckoutComponent {
routes=routes
}
