import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatModule } from './mat.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ThesisListComponent } from './components/thesis-list/thesis-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemesterPipe } from './pipes/semester.pipe';
import { DataTableComponent } from './components/data-table/data-table.component';
import { RolePipe } from './pipes/role.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { DateToTextPipe } from './pipes/dateToText.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { DomUrlPipe, SanitizedHtmlPipe } from './pipes/domSatinizer.pipe';
import { ThesisStatusPipe } from './pipes/thesis-status.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ThesisCardComponent } from '../pages/ministry/public-thesis/thesis-card/thesis-card.component';
import { ProfileDialogComponent } from './components/dialog/profile-dialog/profile-dialog.component';
import { ChangePasswordComponent } from './components/dialog/change-password/change-password.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ThesisListComponent,
    SemesterPipe,
    DataTableComponent,
    RolePipe,
    DateToTextPipe,
    SanitizedHtmlPipe,
    ThesisStatusPipe,
    DomUrlPipe,
    SafePipe,
    ThesisCardComponent,
    ProfileDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    ClickOutsideDirective,
    ReactiveFormsModule,
    NgxEditorModule
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
    ChangePasswordComponent
  ]
})
export class SharedModule { }
