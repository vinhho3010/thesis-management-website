import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }     from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './layouts/authentication-layout/auth.module';
import { MainModule } from './layouts/main-layout/main.module';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MinistryLayoutComponent } from './layouts/ministry-layout/ministry-layout/ministry-layout.component';
import { ClassListComponent } from './pages/ministry/class-list/class-list.component';
import { PublicThesisComponent } from './pages/ministry/public-thesis/public-thesis.component';
import { CouncilComponent } from './pages/ministry/council/council.component';
import { ThesisCardComponent } from './pages/ministry/public-thesis/thesis-card/thesis-card.component';
import { AddClassComponent } from './pages/ministry/dialog/add-class/add-class.component';



@NgModule({
  declarations: [
    AppComponent,
    MinistryLayoutComponent,
    ClassListComponent,
    PublicThesisComponent,
    CouncilComponent,
    ThesisCardComponent,
    AddClassComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AuthModule,
    MainModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    HttpClientModule,
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        maxHeight: "95vh",
        panelClass: 'custom-dialog',
      } as MatDialogConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry){
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
