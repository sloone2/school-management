import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { InstructorChangePasswordComponent } from './instructor-change-password/instructor-change-password.component';
import { InstructorSettingsComponent } from './instructor-settings/instructor-settings.component';
import { InstructorSettingNotificationsComponent } from './instructor-setting-notifications/instructor-setting-notifications.component';
import { InstructorSettingWithdrawComponent } from './instructor-setting-withdraw/instructor-setting-withdraw.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'instructor-change-password',
        component: InstructorChangePasswordComponent,
      },
      {
        path: 'instructor-settings',
        component: InstructorSettingsComponent,
      },
      {
        path: 'instructor-setting-notifications',
        component: InstructorSettingNotificationsComponent,
      },
      {
        path: 'instructor-setting-withdraw',
        component: InstructorSettingWithdrawComponent,
      },
      { path: 'instructor-plans', loadChildren: () => import('./instructor-plans/instructor-plans.module').then(m => m.InstructorPlansModule) },
      { path: 'instructor-social-profiles', loadChildren: () => import('./instructor-social-profiles/instructor-social-profiles.module').then(m => m.InstructorSocialProfilesModule) },
      { path: 'instructor-linked-accounts', loadChildren: () => import('./instructor-linked-accounts/instructor-linked-accounts.module').then(m => m.InstructorLinkedAccountsModule) },
      { path: 'instructor-integrations', loadChildren: () => import('./instructor-integrations/instructor-integrations.module').then(m => m.InstructorIntegrationsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
