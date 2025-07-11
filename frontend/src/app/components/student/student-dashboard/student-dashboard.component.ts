import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrl: './student-dashboard.component.scss',
    standalone: false
})
export class StudentDashboardComponent {
  public routes = routes;
  isSelected:boolean[]=[false];
  iconSelect(index:number) : void{
    this.isSelected[index]=!this.isSelected[index]
    }
}
