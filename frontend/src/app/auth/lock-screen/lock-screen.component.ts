import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-lock-screen',
  standalone: false,
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss'
})
export class LockScreenComponent {
routes=routes
password: boolean[] = [false]; // Add more as needed
  
togglePassword(index:number): void {
  this.password[index]= !this.password[index];
}
constructor(
  private router:Router
){}
directIndex() {
  this.router.navigate([routes.instructor_dashboard]);
}
}
