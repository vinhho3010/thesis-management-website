import { Component, OnInit } from '@angular/core';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { AuthService } from 'src/app/services/auth.service';
import { routesInfoTeacher, routesInfoStudent, RouteInfo } from 'src/app/shared/components/sidebar/sidebar-data';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  routesInfo: RouteInfo[];
  constructor(private authService: AuthService) {
    this.routesInfo = this.authService.getUser()?.role.includes(RoleAccount.TEACHER) ? routesInfoTeacher : routesInfoStudent;
   }

}
