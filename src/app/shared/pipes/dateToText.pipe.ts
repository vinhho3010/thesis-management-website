import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToText'
})
export class DateToTextPipe implements PipeTransform {

  transform(value: any): string {
    const now = new Date();
    const date = new Date(value);
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) {
      return 'Vừa xong';
    } else if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else if (days === 1) {
      return 'hôm qua';
    } else if (days < 7) {
      return `${days} ngày trước`;
    } else if (weeks === 1) {
      return '1 tuần trước';
    } else {
      return `${weeks} tuần trước`;
    }
  }

}
