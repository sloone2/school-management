import { Component, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { SidebarService } from 'src/app/shared/service/sidebar/sidebar.service';

@Component({
    selector: 'app-student-message',
    templateUrl: './student-message.component.html',
    styleUrl: './student-message.component.scss',
    standalone: false
})
export class StudentMessageComponent {
  public routes = routes;
  isSearch=false;
  openSearch():void{
    this.isSearch=!this.isSearch
  }
}
