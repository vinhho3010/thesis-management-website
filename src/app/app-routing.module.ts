import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  loadChildren: () => import('./layouts/authentication-layout/auth.module').then(m => m.AuthModule),
},
{
  path: 'home',
  loadChildren: () => import('./layouts/main-layout/main.module').then(m => m.MainModule),
},
{
  path: 'admin',
  loadChildren: () => import('./layouts/admin-layout/admin.module').then(m => m.AdminModule),
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
