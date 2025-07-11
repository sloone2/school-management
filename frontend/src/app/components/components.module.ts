import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { AdminHeaderComponent } from '../layouts/admin-header/admin-header.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { SharedModule } from '../shared/module/shared.module';

@NgModule({
  declarations: [
    ComponentsComponent,
    HeaderComponent,
    AdminHeaderComponent,
  ],
  imports: [CommonModule, ComponentsRoutingModule, SharedModule],
})
export class ComponentsModule {}
