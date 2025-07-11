import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-message',
  standalone: false,
  templateUrl: './instructor-message.component.html',
  styleUrl: './instructor-message.component.scss'
})
export class InstructorMessageComponent {
routes=routes;
isSearch=false;
openSearch():void{
  this.isSearch=!this.isSearch
}
}
