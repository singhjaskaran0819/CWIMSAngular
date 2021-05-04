import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIS } from '../../common/constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  returnItemFlag = new BehaviorSubject(false);
  salesUploaded = new BehaviorSubject(false);
  // goodsDetails = false;
  constructor(private http: HttpService) { }

  changeReturnItemFlag(value) {
    this.returnItemFlag.next(value);
  }

  changeSalesUploaded(value) {
    this.salesUploaded.next(value);
  }

  uploadFile(data, declarationId) {
    // let url = APIS.DECLARATION.UPLOAD_FILE;
    // url = `${url}?declarationId=${declarationId}`;
    // return this.http.postUploadData(url, data)
  }

  getSales(query?) {
    return this.http.getData(APIS.SALES.SALES, query);
  }

  deleteSale(data?) {
    return this.http.deleteData(APIS.SALES.SALES, data);
  }

  // getSales(data?) {
  //   return this.http.getData(APIS.SALES.SALES, data)
  // }

  saveGeneralInfo(data?) {
    return this.http.postData(APIS.SALES.SALES, data)
  }

  editSales(data?) {
    return this.http.putData(APIS.SALES.SALES, data);
  }

  getDropdownValues() {
    return this.http.getData(APIS.SALES.GET_DROPDOWN_DATA)
  }

  getFilters() {
    return this.http.getData(APIS.SALES.SALES_FILTER)

  }
}
