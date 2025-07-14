import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
import { InstructorAnnouncementsComponent } from './instructor-announcements/instructor-announcements.component';
import { InstructorManageGroupsComponent } from './instructor-manage-groups/instructor-manage-groups.component';
import { InstructorQuizComponent } from './instructor-quiz/instructor-quiz.component';
import { InstructorTicketsComponent } from './instructor-tickets/instructor-tickets.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorEarningsComponent } from './instructor-earnings/instructor-earnings.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorQuizDetailsComponent } from './instructor-quiz-details/instructor-quiz-details.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        path: 'instructor-course',
        component: InstructorCourseComponent,
      },
      {
        path: 'instructor-dashboard',
        component: InstructorDashboardComponent,
      },
      {
        path: 'instructor-earnings',
        component: InstructorEarningsComponent,
      },
      {
        path: 'instructor-profile',
        component: InstructorProfileComponent,
      },
      {
        path: 'instructor-tickets',
        component: InstructorTicketsComponent,
      },
      {
        path: 'instructor-announcements',
        component: InstructorAnnouncementsComponent,
      },
      {
        path: 'instructor-manage-groups',
        component: InstructorManageGroupsComponent,
      },
      {
        path: 'instructor-assignment',
        component: InstructorAssignmentComponent,
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'instructor-quiz',
        component: InstructorQuizComponent,
      },
      {
        path: 'instructor-quiz-details',
        component: InstructorQuizDetailsComponent,
      },
      { path: 'instructor-quiz-results', loadChildren: () => import('./instructor-quiz-results/instructor-quiz-results.module').then(m => m.InstructorQuizResultsModule) },
      { path: 'students-list', loadChildren: () => import('./students-list/students-list.module').then(m => m.StudentsListModule) },
      { path: 'students-grid', loadChildren: () => import('./students-grid/students-grid.module').then(m => m.StudentsGridModule) },
      { path: 'instructor-payouts', loadChildren: () => import('./instructor-payouts/instructor-payouts.module').then(m => m.InstructorPayoutsModule) },
      { path: 'instructor-quiz-questions', loadChildren: () => import('./instructor-quiz-questions/instructor-quiz-questions.module').then(m => m.InstructorQuizQuestionsModule) },
      { path: 'instructor-certificate', loadChildren: () => import('./instructor-certificate/instructor-certificate.module').then(m => m.InstructorCertificateModule) },
      { path: 'instructor-statements', loadChildren: () => import('./instructor-statements/instructor-statements.module').then(m => m.InstructorStatementsModule) },
      { path: 'instructor-message', loadChildren: () => import('./instructor-message/instructor-message.module').then(m => m.InstructorMessageModule) },
      { path: 'instructor-course-grid', loadChildren: () => import('./instructor-course-grid/instructor-course-grid.module').then(m => m.InstructorCourseGridModule) },
    ],
  },
  { path: 'students-details', loadChildren: () => import('./students-details/students-details.module').then(m => m.StudentsDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
