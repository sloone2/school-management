import { Component } from '@angular/core';
import { instructorProfile, instructorProfileEducation, instructorProfileExperience, instructorProfileCourses, instructorProfileReviews, instructorProfileOverview, instructorProfileContactDetails } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
interface data {
  active?:boolean;
}
@Component({
    selector: 'app-instructor-profile',
    templateUrl: './instructor-profile.component.html',
    styleUrls: ['./instructor-profile.component.scss'],
    standalone: false
})
export class InstructorProfileComponent  {
  public routes = routes;

  toggleClass(data: data) {
    data.active = !data.active;
  }
}
