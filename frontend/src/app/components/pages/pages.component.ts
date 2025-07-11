import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    standalone: false
})
export class PagesComponent  {
  last = '';
public routes = routes
page='';
base='';

  constructor(
      private common: CommonService,
    ) {
      this.common.base.subscribe((res: string) => {
        this.base = res;
      });
      this.common.page.subscribe((res: string) => {
        this.page = res;
      });
      this.common.last.subscribe((res: string) => {
        this.last = res;
      });
  
    }
}
