import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { ThesisListComponent } from 'src/app/shared/components/thesis-list/thesis-list.component';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
      },
      {
        path: 'thesis-list',
        component: ThesisListComponent
      },
      {
        path: 'landing',
        component: LandingComponent
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
export class PublicRoutingModule { }
