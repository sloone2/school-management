import { Component } from '@angular/core';
import { studentProfileEducation, studentProfileExperience, studentProfileCourses, studentProfileReviews, studentProfileContactDetails } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.scss'],
    standalone: false
})
export class StudentProfileComponent  {
  public studentProfileEducation: studentProfileEducation[] = [];
  public studentProfileExperience: studentProfileExperience[] = [];
  public studentProfileCourses: studentProfileCourses [] = [];
  public studentProfileReviews: studentProfileReviews[] = [];
  public routes = routes;
  public studentProfileContactDetails: studentProfileContactDetails [] = [];




}
