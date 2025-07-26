import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CustomPaginationModule } from 'src/app/shared/service/custom-pagination/custom-pagination.module';
@NgModule({
  declarations: [
    AdminComponent,
    ManageGroupsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FeatherIconModule,
    RouterModule,
    SharedModule,
    CustomPaginationModule,
  ],
})
export class AdminModule { }
