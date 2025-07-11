import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-course-category',
  standalone: false,
  templateUrl: './course-category.component.html',
  styleUrl: './course-category.component.scss'
})
export class CourseCategoryComponent {
routes =routes
}
