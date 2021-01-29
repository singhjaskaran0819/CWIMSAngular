import { Pipe, PipeTransform } from '@angular/core';
import { USER_POSITIONS, ROLE_CODE } from 'src/app/common/constants';

@Pipe({
  name: 'userPosition'
})
export class UserPositionPipe implements PipeTransform {

  transform(positionCode: any, roleCode: any): any {
    var role;
    var positions;
    for (let key in ROLE_CODE) {
      if (ROLE_CODE[key] == roleCode) {
        role = key;
        break;
      }
    }
    if (role) {
      positions = USER_POSITIONS[role];
      for (let key in positions) {
        if (positions[key] == positionCode) {
          return key;
        }
      }
    }
    return "-";
  }

}
