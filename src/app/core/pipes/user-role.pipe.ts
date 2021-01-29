import { Pipe, PipeTransform } from '@angular/core';
import { ROLE_CODE } from 'src/app/common/constants';
@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: any): any {
    for (let key in ROLE_CODE) {

      if (ROLE_CODE[key] == value) {
        return key;
      }
    }
    return "-";
  }
}
