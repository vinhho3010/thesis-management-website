import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from 'src/app/pages/authentication/register/register.component';



@NgModule({
  declarations: [
    AuthenticationLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
