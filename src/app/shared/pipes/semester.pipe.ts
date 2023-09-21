import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'semester'})

export class SemesterPipe implements PipeTransform {
  transform(value: string) {
    const semester = value.split('/')[0];
    const schoolYear = value.split('/')[1];
    return `${semester}/${schoolYear}`;
  }
}
