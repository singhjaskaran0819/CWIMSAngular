import { Pipe, PipeTransform } from '@angular/core';
import { APPROVE_USER } from 'src/app/common/constants';

@Pipe({
  name: 'approvalStatus'
})
export class ApprovalStatusPipe implements PipeTransform {

  transform(value: any): any {
    for (let key in APPROVE_USER) {

      if (APPROVE_USER[key] == value) {
        return key;
      }
    }
    return "-";
  }

}

