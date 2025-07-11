import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-student-reviews',
    templateUrl: './student-reviews.component.html',
    styleUrl: './student-reviews.component.scss',
    standalone: false
})
export class StudentReviewsComponent {
routes=routes
}
