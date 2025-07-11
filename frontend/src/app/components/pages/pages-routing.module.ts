import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'pricing-plan',
        loadChildren: () =>
          import('./pricing-plan/pricing-plan.module').then(
            (m) => m.PricingPlanModule
          ),
      },
      {
        path: 'term-condition',
        loadChildren: () =>
          import('./term-condition/term-condition.module').then(
            (m) => m.TermConditionModule
          ),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      { path: 'instructor-details', loadChildren: () => import('./instructor-details/instructor-details.module').then(m => m.InstructorDetailsModule) },
      { path: 'become-an-instructor', loadChildren: () => import('./become-an-expert/become-an-expert.module').then(m => m.BecomeAnExpertModule) },
      { path: 'instructor-grid', loadChildren: () => import('./instructor-grid/instructor-grid.module').then(m => m.InstructorGridModule) },
      { path: 'instructor-list', loadChildren: () => import('./instructor-list/instructor-list.module').then(m => m.InstructorListModule) },
      { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'testimonial', loadChildren: () => import('./testimonial/testimonial.module').then(m => m.TestimonialModule) },
  
    ],
  },

 
  
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
