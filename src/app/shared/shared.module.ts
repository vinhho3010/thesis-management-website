import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatModule } from './mat.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ThesisListComponent } from './components/thesis-list/thesis-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemesterPipe } from './pipes/semester.pipe';
import { RolePipe } from './pipes/role.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { DateToTextPipe } from './pipes/dateToText.pipe';
import { DomUrlPipe, SanitizedHtmlPipe } from './pipes/domSatinizer.pipe';
import { ThesisStatusPipe } from './pipes/thesis-status.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ThesisCardComponent } from '../pages/ministry/public-thesis/thesis-card/thesis-card.component';
import { ProfileDialogComponent } from './components/dialog/profile-dialog/profile-dialog.component';
import { ChangePasswordComponent } from './components/dialog/change-password/change-password.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { ColumnChartComponent } from './components/charts/column-chart/column-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { AddStudentToClassComponent } from '../pages/ministry/dialog/add-student-to-class/add-student-to-class.component';


export const textAppearAnimation = trigger('textAppear', [
  state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
  state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('hidden => visible', animate('500ms ease-in')),
]);

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ThesisListComponent,
    SemesterPipe,
    RolePipe,
    DateToTextPipe,
    SanitizedHtmlPipe,
    ThesisStatusPipe,
    DomUrlPipe,
    SafePipe,
    ThesisCardComponent,
    ProfileDialogComponent,
    ChangePasswordComponent,
    NotificationsComponent,
    PieChartComponent,
    ColumnChartComponent,
    LineChartComponent,
    AddStudentToClassComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    ClickOutsideDirective,
    ReactiveFormsModule,
    NgxEditorModule,
    RouterModule,
    NgChartsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    MatModule,
    ClickOutsideDirective,
    ThesisListComponent,
    ReactiveFormsModule,
    SemesterPipe,
    RolePipe,
    NgxEditorModule,
    DateToTextPipe,
    SanitizedHtmlPipe,
    ThesisStatusPipe,
    DomUrlPipe,
    SafePipe,
    ThesisCardComponent,
    ProfileDialogComponent,
    ChangePasswordComponent,
    NotificationsComponent,
    PieChartComponent,
    ColumnChartComponent,
    LineChartComponent,
    AddStudentToClassComponent
  ]
})
export class SharedModule { }
