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
import { AuthenticationGuard, BothStudentTeacherGuard, StudentGuard, TeacherGuard } from 'src/app/services/guard/authentication.guard';
import { MilestoneStudentsComponent } from 'src/app/pages/home/milestones/milestone-students/milestone-students.component';
import { ProcessDetailComponent } from 'src/app/pages/home/process/process-detail/process-detail.component';
import { AssignedCouncilComponent } from 'src/app/pages/home/assigned-council/assigned-council.component';
import { AssignedDetailComponent } from 'src/app/pages/home/assigned-council/assigned-detail/assigned-detail.component';
import { ChatComponent } from 'src/app/pages/home/chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [BothStudentTeacherGuard]
      },
      {
        path: 'milestones',
        component: MilestonesComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'milestones/:id',
        component: MilestoneStudentsComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'class',
        component: ClassComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'class/:id',
        component: ClassComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'students',
        component: StudentListComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'students/:id',
        component: StudentListComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'students/thesis-detail/:id',//classId
        component: ThesisDetailListComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'process',
        component: ProcessComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'process/:id',
        component: ProcessDetailComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'register-topic',
        component: RegisterTopicComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'my-thesis',
        component: MyThesisComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'class/:classId/documents/type/:typeId',
        component: RefDocumentsComponent,
        canActivate: [BothStudentTeacherGuard]
      },
      {
        path: 'council-list',
        component: AssignedCouncilComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'council-list/detail/:id',
        component: AssignedDetailComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [BothStudentTeacherGuard]
      }

    ]
  },
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
