import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-details-left-sidebar',
  standalone: false,
  templateUrl: './blog-details-left-sidebar.component.html',
  styleUrl: './blog-details-left-sidebar.component.scss'
})
export class BlogDetailsLeftSidebarComponent {
public routes = routes;
}
