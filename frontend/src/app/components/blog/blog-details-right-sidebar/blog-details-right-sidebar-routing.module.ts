import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsRightSidebarComponent } from './blog-details-right-sidebar.component';

const routes: Routes = [{ path: '', component: BlogDetailsRightSidebarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogDetailsRightSidebarRoutingModule { }
