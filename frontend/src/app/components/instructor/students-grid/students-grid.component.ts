import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-students-grid',
  standalone: false,
  templateUrl: './students-grid.component.html',
  styleUrl: './students-grid.component.scss'
})
export class StudentsGridComponent {
routes =routes
}
