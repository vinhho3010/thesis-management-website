import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageAccountComponent } from 'src/app/pages/admin/manage-account/manage-account.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
