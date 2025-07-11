import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCarousalComponent } from './blog-carousal.component';

const routes: Routes = [{ path: '', component: BlogCarousalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCarousalRoutingModule { }
