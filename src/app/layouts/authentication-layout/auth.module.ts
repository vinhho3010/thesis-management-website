import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from 'src/app/pages/authentication/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatModule } from 'src/app/shared/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthenticationLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
