import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { InstructorAnnouncementsComponent } from './instructor-announcements/instructor-announcements.component';
import { InstructorManageGroupsComponent } from './instructor-manage-groups/instructor-manage-groups.component';
import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
import { InstructorQuizComponent } from './instructor-quiz/instructor-quiz.component';
import { InstructorTicketsComponent } from './instructor-tickets/instructor-tickets.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorEarningsComponent } from './instructor-earnings/instructor-earnings.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { RouterModule } from '@angular/router';
import { InstructorQuizDetailsComponent } from './instructor-quiz-details/instructor-quiz-details.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CustomPaginationModule } from 'src/app/shared/service/custom-pagination/custom-pagination.module';
@NgModule({
  declarations: [
    InstructorComponent,
    InstructorAnnouncementsComponent,
    InstructorManageGroupsComponent,
    InstructorAssignmentComponent,
    InstructorQuizComponent,
    InstructorTicketsComponent,
    InstructorProfileComponent,
    InstructorEarningsComponent,
    InstructorDashboardComponent,
    InstructorCourseComponent,
    InstructorQuizDetailsComponent,
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FeatherIconModule,
    RouterModule,
    SharedModule,
    CustomPaginationModule,
  ],
})
export class InstructorModule { }
