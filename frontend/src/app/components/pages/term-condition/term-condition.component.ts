import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-term-condition',
    templateUrl: './term-condition.component.html',
    styleUrls: ['./term-condition.component.scss'],
    standalone: false
})
export class TermConditionComponent  {
  public routes = routes;

 

}
