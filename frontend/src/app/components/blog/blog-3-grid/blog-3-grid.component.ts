import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-3-grid',
  standalone: false,
  templateUrl: './blog-3-grid.component.html',
  styleUrl: './blog-3-grid.component.scss'
})
export class Blog3GridComponent {
public routes = routes;
}
