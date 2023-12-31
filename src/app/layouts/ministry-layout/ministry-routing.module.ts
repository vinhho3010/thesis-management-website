import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinistryLayoutComponent } from './ministry-layout/ministry-layout.component';
import { ClassListComponent } from 'src/app/pages/ministry/class-list/class-list.component';
import { PublicThesisComponent } from 'src/app/pages/ministry/public-thesis/public-thesis.component';
import { CouncilComponent } from 'src/app/pages/ministry/council/council.component';
import { ClassDetailComponent } from 'src/app/pages/ministry/class-list/class-detail/class-detail.component';
import { AuthenticationGuard, MinistryGuard } from 'src/app/services/guard/authentication.guard';
import { CouncilDetailComponent } from 'src/app/pages/ministry/council/council-detail/council-detail.component';
import { ThesisDetailListComponent } from 'src/app/pages/home/thesis-detail-list/thesis-detail-list.component';

const routes: Routes = [
  {
    path: '',
    component: MinistryLayoutComponent,
    canActivate: [AuthenticationGuard, MinistryGuard],
    children: [
      {
        path: '',
        redirectTo: 'class-list',
        pathMatch: 'full'
      },
      {
        path: 'class-list',
        component: ClassListComponent
      },
      {
        path: 'class-list/:id',
        component: ClassDetailComponent
      },
      {
        path: 'class-list/:id/students',
        component: ThesisDetailListComponent
      },
      {
        path: 'public-thesis',
        component: PublicThesisComponent
      },
      {
        path: 'council',
        component: CouncilComponent
      },
      {
        path: 'council/:id',
        component: CouncilDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'class-list'
  }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinistryRoutingModule {

}
