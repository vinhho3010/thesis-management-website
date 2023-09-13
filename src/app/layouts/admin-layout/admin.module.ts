import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageAccountComponent } from 'src/app/pages/admin/manage-account/manage-account.component';
import { TableAccountComponent } from 'src/app/pages/admin/manage-account/table-account/table-account.component';
import { AddAccountDialogComponent } from 'src/app/pages/admin/dialog/add-account-dialog/add-account-dialog.component';
import { AddFileAccountComponent } from 'src/app/pages/admin/dialog/add-file-account/add-file-account.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    ManageAccountComponent,
    TableAccountComponent,
    AddAccountDialogComponent,
    AddFileAccountComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
