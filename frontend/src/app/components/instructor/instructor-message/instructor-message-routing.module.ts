import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorMessageComponent } from './instructor-message.component';

const routes: Routes = [{ path: '', component: InstructorMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorMessageRoutingModule { }
