import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    standalone: false
})
export class SettingsComponent {
routes=routes
}
