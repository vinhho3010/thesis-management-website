import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinistryRoutingModule } from './ministry-routing.module';
import { ClassDetailComponent } from 'src/app/pages/ministry/class-list/class-detail/class-detail.component';
import { ClassListComponent } from 'src/app/pages/ministry/class-list/class-list.component';
import { CouncilComponent } from 'src/app/pages/ministry/council/council.component';
import { AddClassComponent } from 'src/app/pages/ministry/dialog/add-class/add-class.component';
import { PublicThesisComponent } from 'src/app/pages/ministry/public-thesis/public-thesis.component';
import { MinistryLayoutComponent } from './ministry-layout/ministry-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThesisCardComponent } from 'src/app/pages/ministry/public-thesis/thesis-card/thesis-card.component';


@NgModule({
  declarations: [
    MinistryLayoutComponent,
    ClassListComponent,
    PublicThesisComponent,
    CouncilComponent,
    AddClassComponent,
    ClassDetailComponent,
    ThesisCardComponent,
  ],
  imports: [
    CommonModule,
    MinistryRoutingModule,
    SharedModule
  ]
})
export class MinistryModule { }
