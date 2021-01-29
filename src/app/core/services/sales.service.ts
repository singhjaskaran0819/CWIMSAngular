import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  returnItemFlag = new BehaviorSubject(false);
  // goodsDetails = false;
  constructor() { }

  changeReturnItemFlag(value) {
    this.returnItemFlag.next(value);
  }
}
