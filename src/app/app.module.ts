import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }     from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './shared/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './layouts/authentication-layout/auth.module';
import { MainModule } from './layouts/main-layout/main.module';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ClassComponent } from './pages/home/class/class.component';
import { MilestonesComponent } from './pages/home/milestones/milestones.component';
import { TopicComponent } from './pages/home/topic/topic.component';
import { StudentListComponent } from './pages/home/student-list/student-list.component';
import { ClassBoardComponent } from './pages/home/class/class-board/class-board.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassComponent,
    MilestonesComponent,
    TopicComponent,
    StudentListComponent,
    ClassBoardComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AuthModule,
    MainModule,
  ],
  providers: [
    HttpClientModule,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry){
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
