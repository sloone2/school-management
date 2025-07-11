import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-grid',
  standalone: false,
  templateUrl: './instructor-grid.component.html',
  styleUrl: './instructor-grid.component.scss'
})
export class InstructorGridComponent {
  routes=routes
  startValue = 500;
  endValue = 3000;
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value) + '';
    }
  
    return `${value}`;
  }
  formatLabel1(value: number): string {
    if (value >= 5000) {
      return '$'+ Math.round(value / 5000) ;
    }
  
    return `$${value}`;
  }
}
