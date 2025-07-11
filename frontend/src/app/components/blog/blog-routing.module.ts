import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'blog-grid',
        loadChildren: () =>
          import('./blog-grid/blog-grid.module').then((m) => m.BlogGridModule),
      },
      {
        path: 'blog-masonry',
        loadChildren: () =>
          import('./blog-masonry/blog-masonry.module').then(
            (m) => m.BlogMasonryModule
          ),
      },
      { path: 'blog-details-left-sidebar', loadChildren: () => import('./blog-details-left-sidebar/blog-details-left-sidebar.module').then(m => m.BlogDetailsLeftSidebarModule) },
      { path: 'blog-details-right-sidebar', loadChildren: () => import('./blog-details-right-sidebar/blog-details-right-sidebar.module').then(m => m.BlogDetailsRightSidebarModule) },
      { path: 'blog-2-grid', loadChildren: () => import('./blog-2-grid/blog-2-grid.module').then(m => m.Blog2GridModule) },
      { path: 'blog-3-grid', loadChildren: () => import('./blog-3-grid/blog-3-grid.module').then(m => m.Blog3GridModule) },
      { path: 'blog-carousal', loadChildren: () => import('./blog-carousal/blog-carousal.module').then(m => m.BlogCarousalModule) },
      { path: 'blog-left-sidebar', loadChildren: () => import('./blog-left-sidebar/blog-left-sidebar.module').then(m => m.BlogLeftSidebarModule) },
      { path: 'blog-right-sidebar', loadChildren: () => import('./blog-right-sidebar/blog-right-sidebar.module').then(m => m.BlogRightSidebarModule) },
      { path: 'blog-details', loadChildren: () => import('./blog-details/blog-details.module').then(m => m.BlogDetailsModule) },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
