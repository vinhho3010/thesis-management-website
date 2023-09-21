import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatModule } from './mat.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ThesisListComponent } from './components/thesis-list/thesis-list.component';
import { ThesisCardComponent } from './components/thesis-list/thesis-card/thesis-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SemesterPipe } from './pipes/semester.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ThesisListComponent,
    ThesisCardComponent,
    SemesterPipe
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
    SemesterPipe
  ]
})
export class SharedModule { }
