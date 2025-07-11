import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-student-courses',
    templateUrl: './student-courses.component.html',
    styleUrl: './student-courses.component.scss',
    standalone: false
})
export class StudentCoursesComponent {
  public routes = routes;
  isSelected:boolean[]=[false];
  iconSelect(index:number) : void{
    this.isSelected[index]=!this.isSelected[index]
    }
}
