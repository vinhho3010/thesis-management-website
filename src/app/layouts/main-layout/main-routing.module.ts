import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from 'src/app/pages/home/home/home.component';
import { MilestonesComponent } from 'src/app/pages/home/milestones/milestones.component';
import { ClassComponent } from 'src/app/pages/home/class/class.component';
import { TopicComponent } from 'src/app/pages/home/topic/topic.component';
import { StudentListComponent } from 'src/app/pages/home/student-list/student-list.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'milestones',
        component: MilestonesComponent
      },
      {
        path: 'class',
        component: ClassComponent
      },
      {
        path: 'topics',
        component: TopicComponent
      },
      {
        path: 'students',
        component: StudentListComponent
      }

    ]
  },
  {
    path: '**',
    redirectTo: 'home'

  }
  ]

  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [],
  })
export class MainRoutingModule { }
