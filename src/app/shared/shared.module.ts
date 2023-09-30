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

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ThesisListComponent,
    ThesisCardComponent,
    SemesterPipe,
    DataTableComponent,
    RolePipe
  ],
  imports: [
    CommonModule,
    MatModule,
    ClickOutsideDirective,
    ReactiveFormsModule,
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
    RolePipe
  ]
})
export class SharedModule { }
