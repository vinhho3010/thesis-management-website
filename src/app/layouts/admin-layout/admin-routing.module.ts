import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { ManageAccountComponent } from 'src/app/pages/admin/manage-account/manage-account.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';

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
        component: ManageAccountComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
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
