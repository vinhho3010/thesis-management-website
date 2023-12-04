import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { ManageAccountComponent } from 'src/app/pages/admin/manage-account/manage-account.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/services/guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component : AdminLayoutComponent,
    children : [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'manage-account',
        component: ManageAccountComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [],
  })
export class AdminRoutingModule { }
