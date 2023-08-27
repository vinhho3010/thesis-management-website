import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { RegisterComponent } from 'src/app/pages/authentication/register/register.component';
import { ThesisListComponent } from 'src/app/shared/components/thesis-list/thesis-list.component';


const routes: Routes = [
{
  path: '',
  component: AuthenticationLayoutComponent,
  children: [
    {
      path: '',
      redirectTo : 'login',
      pathMatch  : 'full',
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'public',
      component: ThesisListComponent
    }
  ]
}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule { }
