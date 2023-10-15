import {Pipe, PipeTransform} from '@angular/core';
import { RoleAccount } from 'src/app/Model/enum/roleEnum';
import { ThesisStatus } from 'src/app/Model/enum/thesis-status';

@Pipe({name: 'thesisStatus'})

export class ThesisStatusPipe implements PipeTransform {
  transform(value: string) {
    switch(value) {
      case ThesisStatus.IN_PROGRESS:
        return "Đang tiến hành"
      case ThesisStatus.COMPLETED:
        return "Đã hoàn thành"
      case ThesisStatus.CANCELED:
        return "Từ chối bảo vệ"
      default:
        return "Không xác định"

    }

}}
