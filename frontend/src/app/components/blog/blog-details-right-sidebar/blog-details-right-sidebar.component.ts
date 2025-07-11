import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-details-right-sidebar',
  standalone: false,
  templateUrl: './blog-details-right-sidebar.component.html',
  styleUrl: './blog-details-right-sidebar.component.scss'
})
export class BlogDetailsRightSidebarComponent {
public routes = routes;
}
