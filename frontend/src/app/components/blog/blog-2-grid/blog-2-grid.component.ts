import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-2-grid',
  standalone: false,
  templateUrl: './blog-2-grid.component.html',
  styleUrl: './blog-2-grid.component.scss'
})
export class Blog2GridComponent {
public routes = routes;
}
