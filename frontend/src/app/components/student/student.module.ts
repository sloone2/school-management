import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentMessageComponent } from './student-message/student-message.component';
import { StudentOrderHistoryComponent } from './student-order-history/student-order-history.component';
import { RouterModule } from '@angular/router';
import { StudentQaComponent } from './student-qa/student-qa.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { StudentReviewsComponent } from './student-reviews/student-reviews.component';
import { StudentReferralComponent } from './student-referral/student-referral.component';
import { StudentTicketsComponent } from './student-tickets/student-tickets.component';
import { StudentCertificateComponent } from './student-certificate/student-certificate.component';
import { CustomPaginationModule } from 'src/app/shared/service/custom-pagination/custom-pagination.module';


@NgModule({
  declarations: [
    StudentComponent,
    StudentDashboardComponent,
    StudentMessageComponent,
    StudentOrderHistoryComponent,
    StudentQaComponent,
    StudentProfileComponent,
    StudentCoursesComponent,
    StudentQuizComponent,
    StudentWishlistComponent,
    StudentReviewsComponent,
    StudentReferralComponent,
    StudentTicketsComponent,
    StudentCertificateComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FeatherIconModule,
    SharedModule,
    RouterModule ,
    CustomPaginationModule
  ]
})
export class StudentModule { }
