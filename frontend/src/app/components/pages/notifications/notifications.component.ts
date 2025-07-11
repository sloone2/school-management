import { Component } from '@angular/core';
import { notificationsToday, notificationsYesterday } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';


@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    standalone: false
})
export class NotificationsComponent {
  public routes = routes;
  public notificationsToday : notificationsToday[] = [];
  public notificationsYesterday : notificationsYesterday[] = [];



  }


