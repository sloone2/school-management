import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin-groups',
        component: ManageGroupsComponent,
      },
      {
        path: 'instructor-dashboard',
        component: ManageGroupsComponent,
      }],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
