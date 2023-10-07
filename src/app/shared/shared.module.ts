import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatModule } from './mat.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ThesisListComponent } from './components/thesis-list/thesis-list.component';
import { ThesisCardComponent } from './components/thesis-list/thesis-card/thesis-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemesterPipe } from './pipes/semester.pipe';
import { DataTableComponent } from './components/data-table/data-table.component';
import { RolePipe } from './pipes/role.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { DateToTextPipe } from './pipes/dateToText.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizedHtmlPipe } from './pipes/domSatinizer.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ThesisListComponent,
    ThesisCardComponent,
    SemesterPipe,
    DataTableComponent,
    RolePipe,
    DateToTextPipe,
    SanitizedHtmlPipe
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
    ThesisCardComponent,
    ReactiveFormsModule,
    SemesterPipe,
    RolePipe,
    NgxEditorModule,
    DateToTextPipe,
    SanitizedHtmlPipe
  ]
})
export class SharedModule { }
