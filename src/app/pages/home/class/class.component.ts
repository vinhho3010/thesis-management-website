import { Component } from '@angular/core';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent {
hasClassInfo = this.authService.getClassInfo() ? true : false;
isTeacher = this.authService.getRole() === RoleAccount.TEACHER ? true : false;

  constructor(private authService: AuthService) {}
}
