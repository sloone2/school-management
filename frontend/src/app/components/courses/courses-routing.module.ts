import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '',
     component: CoursesComponent,
     children:[
      { path: 'course-grid', loadChildren: () => import('./course-grid/course-grid.module').then(m => m.CourseGridModule) },
      { path: 'course-list', loadChildren: () => import('./course-list/course-list.module').then(m => m.CourseListModule) }, 
      { path: 'course-category', loadChildren: () => import('./course-category/course-category.module').then(m => m.CourseCategoryModule) },
      { path: 'course-category-2', loadChildren: () => import('./course-category-2/course-category-2.module').then(m => m.CourseCategory2Module) },
      { path: 'course-category-3', loadChildren: () => import('./course-category-3/course-category-3.module').then(m => m.CourseCategory3Module) },
      { path: 'course-resume', loadChildren: () => import('./course-resume/course-resume.module').then(m => m.CourseResumeModule) },
      { path: 'course-watch', loadChildren: () => import('./course-watch/course-watch.module').then(m => m.CourseWatchModule) },
      { path: 'cart', loadChildren: () => import('./course-cart/course-cart.module').then(m => m.CourseCartModule) },
      { path: 'checkout', loadChildren: () => import('./course-checkout/course-checkout.module').then(m => m.CourseCheckoutModule) },
      { path: 'add-course', loadChildren: () => import('./add-course/add-course.module').then(m => m.AddCourseModule) },
      { path: 'course-details', loadChildren: () => import('./course-details/course-details.module').then(m => m.CourseDetailsModule) },
      { path: 'course-details-2', loadChildren: () => import('./course-details-2/course-details-2.module').then(m => m.CourseDetails2Module) },
     ]
     },
  { path: 'add-course', loadChildren: () => import('./add-course/add-course.module').then(m => m.AddCourseModule) },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
