import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-instructor-setting-notifications',
    templateUrl: './instructor-setting-notifications.component.html',
    styleUrl: './instructor-setting-notifications.component.scss',
    standalone: false
})
export class InstructorSettingNotificationsComponent {
  public routes = routes;
}
