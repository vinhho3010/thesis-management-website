import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from 'src/app/pages/home/student-list/student-list.component';
import { ManageAccountComponent } from 'src/app/pages/admin/manage-account/manage-account.component';

const routes: Routes = [
  {
    path: '',
    component : AdminLayoutComponent,
    children : [
      {
        path: '',
        redirectTo: 'manage-account',
        pathMatch: 'full'
      },
      {
        path: 'manage-account',
        component: ManageAccountComponent
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
