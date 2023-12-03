import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TOKEN_KEY, USER_SAVE_KEY } from './services/auth.service';
import { RoleAccount } from './Model/enum/roleEnum';

const isLogin = localStorage.getItem(TOKEN_KEY) ? true : false;
const user = JSON.parse(localStorage.getItem(USER_SAVE_KEY) || '{}');
const role = user.role;
const roleAccount = RoleAccount;

const routes: Routes = [
{
  path: '',
  redirectTo: `${isLogin && role === roleAccount.ADMIN ? 'admin' : isLogin && role === roleAccount.MINISTRY ? 'ministry' : isLogin && (role===roleAccount.STUDENT || role===roleAccount.TEACHER) ? 'home' : 'public'}`,
  pathMatch: 'full'
},
{
  path: 'auth',
  loadChildren: () => import('./layouts/authentication-layout/auth.module').then(m => m.AuthModule),
},
{
  path: '',
  loadChildren: () => import('./layouts/main-layout/main.module').then(m => m.MainModule),
},
{
  path: 'admin',
  loadChildren: () => import('./layouts/admin-layout/admin.module').then(m => m.AdminModule),
},
{
  path: 'ministry',
  loadChildren: () => import('./layouts/ministry-layout/ministry.module').then(m => m.MinistryModule),
},
{
  path: 'public',
  loadChildren: () => import('./layouts/public-layout/public.module').then(m => m.PublicModule),
},
// {
//   path: '**',
//   redirectTo: 'home'
// }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
