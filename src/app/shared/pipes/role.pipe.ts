import {Pipe, PipeTransform} from '@angular/core';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';

@Pipe({name: 'role'})

export class RolePipe implements PipeTransform {
  transform(value: string) {
    switch (value) {
      case RoleAccount.ADMIN:
        return 'Quản trị viên';
      case RoleAccount.STUDENT:
        return 'Sinh viên';
      case RoleAccount.TEACHER:
        return 'Giảng viên';
      case RoleAccount.MINISTRY:
        return 'Giáo vụ';
      default:
        return 'Người dùng';
    }
  }
}
