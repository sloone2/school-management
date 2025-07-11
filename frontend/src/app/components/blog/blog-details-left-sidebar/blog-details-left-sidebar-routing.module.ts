import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsLeftSidebarComponent } from './blog-details-left-sidebar.component';

const routes: Routes = [{ path: '', component: BlogDetailsLeftSidebarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogDetailsLeftSidebarRoutingModule { }
