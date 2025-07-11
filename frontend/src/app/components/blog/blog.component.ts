import { Component } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { routes } from 'src/app/shared/service/routes/routes';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: false,
})
export class BlogComponent {
  routes = routes;
  page = '';
  constructor(private common: CommonService) {
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
  }
}
