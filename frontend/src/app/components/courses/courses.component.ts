import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
routes=routes;
base = '';
page = '';
last = '';
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
