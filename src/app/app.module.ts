import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { firebaseConfig } from 'src/environments/environment';

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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './shared/utilities/customPaginator';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
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
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxEditorModule
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
    { provide: MatPaginatorIntl, useValue: new CustomMatPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry){
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
