import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-right-sidebar',
  standalone: false,
  templateUrl: './blog-right-sidebar.component.html',
  styleUrl: './blog-right-sidebar.component.scss'
})
export class BlogRightSidebarComponent {
public routes = routes;
}
