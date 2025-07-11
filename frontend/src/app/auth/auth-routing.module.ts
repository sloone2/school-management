import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
  
    ],
  },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'set-password', loadChildren: () => import('./set-password/set-password.module').then(m => m.SetPasswordModule) },
  { path: 'otp', loadChildren: () => import('./otp/otp.module').then(m => m.OtpModule) },
  { path: 'lock-screen', loadChildren: () => import('./lock-screen/lock-screen.module').then(m => m.LockScreenModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
