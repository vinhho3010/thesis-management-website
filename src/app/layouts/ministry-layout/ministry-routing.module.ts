import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinistryLayoutComponent } from './ministry-layout/ministry-layout.component';
import { ClassListComponent } from 'src/app/pages/ministry/class-list/class-list.component';
import { PublicThesisComponent } from 'src/app/pages/ministry/public-thesis/public-thesis.component';
import { CouncilComponent } from 'src/app/pages/ministry/council/council.component';
import { ClassDetailComponent } from 'src/app/pages/ministry/class-list/class-detail/class-detail.component';
import { AuthenticationGuard } from 'src/app/services/guard/authentication.guard';
import { CouncilDetailComponent } from 'src/app/pages/ministry/council/council-detail/council-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MinistryLayoutComponent,
    canActivate: [AuthenticationGuard],
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
