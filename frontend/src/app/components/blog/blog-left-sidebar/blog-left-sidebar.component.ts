import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-left-sidebar',
  standalone: false,
  templateUrl: './blog-left-sidebar.component.html',
  styleUrl: './blog-left-sidebar.component.scss'
})
export class BlogLeftSidebarComponent {
public routes = routes;
}
