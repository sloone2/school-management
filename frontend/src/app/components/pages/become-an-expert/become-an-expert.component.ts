import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-become-an-expert',
  standalone: false,
  templateUrl: './become-an-expert.component.html',
  styleUrl: './become-an-expert.component.scss'
})
export class BecomeAnExpertComponent {
routes=routes;
   password: boolean[] = [false]; // Add more as needed
  
   togglePassword(index:number): void {
     this.password[index]= !this.password[index];
   }
}
