import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-course-category-2',
  standalone: false,
  templateUrl: './course-category-2.component.html',
  styleUrl: './course-category-2.component.scss'
})
export class CourseCategory2Component {
routes=routes
}
