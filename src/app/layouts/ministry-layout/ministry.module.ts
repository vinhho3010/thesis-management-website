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
import { FormsModule } from '@angular/forms';
import { AddCouncilComponent } from 'src/app/pages/ministry/dialog/add-council/add-council.component';
import { CouncilDetailComponent } from 'src/app/pages/ministry/council/council-detail/council-detail.component';
import { AddThesisToCouncilComponent } from 'src/app/pages/ministry/dialog/add-thesis-to-council/add-thesis-to-council.component';


@NgModule({
  declarations: [
    MinistryLayoutComponent,
    ClassListComponent,
    PublicThesisComponent,
    CouncilComponent,
    AddClassComponent,
    ClassDetailComponent,
    AddCouncilComponent,
    CouncilDetailComponent,
    AddThesisToCouncilComponent,
  ],
  imports: [
    CommonModule,
    MinistryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MinistryModule { }
