import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeclarationsService {
  goodsDetails = new BehaviorSubject(false);
  // goodsDetails = false;
  constructor() { }

  changegoodsDetailsValue(value) {
    this.goodsDetails.next(value);
  }
}
