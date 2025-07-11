import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-course-grid',
  standalone: false,
  templateUrl: './instructor-course-grid.component.html',
  styleUrl: './instructor-course-grid.component.scss'
})
export class InstructorCourseGridComponent {
routes=routes
}
