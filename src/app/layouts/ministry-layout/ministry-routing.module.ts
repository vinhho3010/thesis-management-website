import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinistryLayoutComponent } from './ministry-layout/ministry-layout.component';
import { ClassListComponent } from 'src/app/pages/ministry/class-list/class-list.component';
import { PublicThesisComponent } from 'src/app/pages/ministry/public-thesis/public-thesis.component';
import { CouncilComponent } from 'src/app/pages/ministry/council/council.component';

const routes: Routes = [
  {
    path: '',
    component: MinistryLayoutComponent,
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
        path: 'public-thesis',
        component: PublicThesisComponent
      },
      {
        path: 'council',
        component: CouncilComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinistryRoutingModule {

}
