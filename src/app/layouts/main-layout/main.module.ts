import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/pages/home/home/home.component';
import { ClassBoardComponent } from 'src/app/pages/home/class/class-board/class-board.component';
import { ClassComponent } from 'src/app/pages/home/class/class.component';
import { RefDocumentsComponent } from 'src/app/pages/home/class/ref-documents/ref-documents.component';
import { MilestonesComponent } from 'src/app/pages/home/milestones/milestones.component';
import { ActiveStudentListComponent } from 'src/app/pages/home/student-list/active-student-list/active-student-list.component';
import { PendingStudentListComponent } from 'src/app/pages/home/student-list/pending-student-list/pending-student-list.component';
import { StudentListComponent } from 'src/app/pages/home/student-list/student-list.component';
import { ClassOverviewComponent } from 'src/app/pages/home/class/class-overview/class-overview.component';
import { MilestoneCardComponent } from 'src/app/pages/home/milestones/milestone-card/milestone-card.component';
import { ProcessComponent } from 'src/app/pages/home/process/process.component';
import { RegisterTopicComponent } from 'src/app/pages/home/register-topic/register-topic.component';
import { MyThesisComponent } from 'src/app/pages/home/my-thesis/my-thesis.component';
import { RegisterTopicDialogComponent } from 'src/app/pages/home/dialog/register-topic/register-topic.component';
import { RefDocTypesComponent } from 'src/app/pages/home/class/ref-doc-types/ref-doc-types.component';
import { EditTypeNameComponent } from 'src/app/pages/home/dialog/edit-type-name/edit-type-name.component';
import { PendingCardComponent } from 'src/app/pages/home/register-topic/pending-card/pending-card.component';
import { ThesisDetailListComponent } from 'src/app/pages/home/thesis-detail-list/thesis-detail-list.component';
import { AddDocComponent } from 'src/app/pages/home/dialog/add-doc/add-doc.component';
import { AddDocTypeComponent } from 'src/app/pages/home/dialog/add-doc-type/add-doc-type.component';
import { AddMilestoneComponent } from 'src/app/pages/home/dialog/add-milestone/add-milestone.component';
import { MilestoneDetailComponent } from 'src/app/pages/home/milestones/milestone-detail/milestone-detail.component';
import { MilestoneDocsComponent } from 'src/app/pages/home/milestones/milestone-detail/milestone-docs/milestone-docs.component';
import { MilestoneStudentsComponent } from 'src/app/pages/home/milestones/milestone-detail/milestone-students/milestone-students.component';
import { ProcessDetailComponent } from 'src/app/pages/home/process/process-detail/process-detail.component';




@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    ClassComponent,
    MilestonesComponent,
    StudentListComponent,
    ClassBoardComponent,
    RefDocumentsComponent,
    ActiveStudentListComponent,
    PendingStudentListComponent,
    ClassOverviewComponent,
    MilestoneCardComponent,
    ProcessComponent,
    RegisterTopicComponent,
    MyThesisComponent,
    RegisterTopicDialogComponent,
    RefDocTypesComponent,
    EditTypeNameComponent,
    PendingCardComponent,
    AddDocComponent,
    AddDocTypeComponent,
    ThesisDetailListComponent,
    AddMilestoneComponent,
    MilestoneDetailComponent,
    MilestoneStudentsComponent,
    MilestoneDocsComponent,
    ProcessDetailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
