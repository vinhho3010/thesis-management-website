import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from 'src/app/pages/home/home/home.component';
import { MilestonesComponent } from 'src/app/pages/home/milestones/milestones.component';
import { ClassComponent } from 'src/app/pages/home/class/class.component';
import { StudentListComponent } from 'src/app/pages/home/student-list/student-list.component';
import { ProcessComponent } from 'src/app/pages/home/process/process.component';
import { RegisterTopicComponent } from 'src/app/pages/home/register-topic/register-topic.component';
import { MyThesisComponent } from 'src/app/pages/home/my-thesis/my-thesis.component';
import { RefDocumentsComponent } from 'src/app/pages/home/class/ref-documents/ref-documents.component';
import { ThesisDetailListComponent } from 'src/app/pages/home/thesis-detail-list/thesis-detail-list.component';
import { AuthenticationGuard } from 'src/app/services/guard/authentication.guard';
import { MilestoneStudentsComponent } from 'src/app/pages/home/milestones/milestone-students/milestone-students.component';
import { ProcessDetailComponent } from 'src/app/pages/home/process/process-detail/process-detail.component';
import { AssignedCouncilComponent } from 'src/app/pages/home/assigned-council/assigned-council.component';
import { AssignedDetailComponent } from 'src/app/pages/home/assigned-council/assigned-detail/assigned-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
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
        path: 'milestones/:id',
        component: MilestoneStudentsComponent
      },
      {
        path: 'class',
        component: ClassComponent
      },
      {
        path: 'class/:id',
        component: ClassComponent
      },
      {
        path: 'students',
        component: StudentListComponent
      },
      {
        path: 'students/:id',
        component: StudentListComponent
      },
      {
        path: 'students/thesis-detail/:id',//classId
        component: ThesisDetailListComponent
      },
      {
        path: 'process',
        component: ProcessComponent
      },
      {
        path: 'process/:id',
        component: ProcessDetailComponent
      },
      {
        path: 'register-topic',
        component: RegisterTopicComponent
      },
      {
        path: 'process',
        component: ProcessComponent
      },
      {
        path: 'my-thesis',
        component: MyThesisComponent
      },
      {
        path: 'class/:classId/documents/type/:typeId',
        component: RefDocumentsComponent
      },
      {
        path: 'council-list',
        component: AssignedCouncilComponent
      },
      {
        path: 'council-list/detail/:id',
        component: AssignedDetailComponent
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
