import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value): unknown {
    var date = new Date(value);
    return date.getFullYear() + '/' +
      (date.getMonth() + 1) + '/' +
      date.getDate() + ' ' +
      date.getHours() + ':' +
      date.getMinutes();
  }

}
