import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-course-grid',
  standalone: false,
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.scss'
})
export class CourseGridComponent {
  routes=routes;
  isSelected:boolean[]=[false];
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
  iconSelect(index:number) : void{
    this.isSelected[index]=!this.isSelected[index]
    }
}
