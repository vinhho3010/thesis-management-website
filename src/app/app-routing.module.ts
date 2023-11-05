import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  redirectTo: 'home',
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
