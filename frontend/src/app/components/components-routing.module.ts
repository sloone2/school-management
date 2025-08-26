import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },

      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'instructor',
        loadChildren: () =>
          import('./instructor/instructor.module').then(
            (m) => m.InstructorModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },
      {
        path: 'index',
        loadChildren: () =>
          import('./home-list/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'index-two',
        loadChildren: () => import('./home-list/home2/home2.module').then(m => m.Home2Module)
      },
      {
        path: 'index-three',
        loadChildren: () => import('./home-list/home3/home3.module').then(m => m.Home3Module)
      },
      {
        path: 'index-four',
        loadChildren: () => import('./home-list/home4/home4.module').then(m => m.Home4Module)
      },
      { path: 'index-five', loadChildren: () => import('./home-list/home5/home5.module').then(m => m.Home5Module) },
      { path: 'index-six', loadChildren: () => import('./home-list/home6/home6.module').then(m => m.Home6Module) },
      { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
