import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-student-qa',
    templateUrl: './student-qa.component.html',
    styleUrl: './student-qa.component.scss',
    standalone: false
})
export class StudentQaComponent {
  public routes = routes;
  current:number=1

  next(): void {
    if(this.current<6){
    this.current+=1;
    }
  }
  previous():void{
    if(this.current>1){
      this.current-=1
    }
  }
}
