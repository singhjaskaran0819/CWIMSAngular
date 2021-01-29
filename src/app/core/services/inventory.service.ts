import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APIS } from '../../common/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpService) { }
  varianceReportFlag = new BehaviorSubject(false);
  groupItemFlag = new BehaviorSubject(false);

  changeVarianceReportFlagValue(value) {
    this.varianceReportFlag.next(value);
  }

  changeGroupItemFlagValue(value) {
    this.groupItemFlag.next(value);
  }

  getInventoryList(data, warehouseCode?) {

    // if (warehouseCode) {
    //   return this.http.getData(`${APIS.INVENTORY.INVENTORY_LIST}?whs_code=${warehouseCode}`, data);
    // }
    // else {
    return this.http.getData(APIS.INVENTORY.INVENTORY_LIST, data);
    // }
  }

  getInventoryDetailsById(id) {
    return this.http.getData(`${APIS.INVENTORY.FETCH_INVENTORY_BY_ID}?id=${id}`);
  }

  getWareHouseList() {
    return this.http.getData(`${APIS.WAREHOUSE.WAREHOUSE_LIST}`);
  }

  getWarehouseByCode(data) {
    return this.http.getData(`${APIS.WAREHOUSE.FETCH_WAREHOUSE_BY_CODE}?code=${data}`);
  }

  getProductIdByLocation(data) {
    return this.http.getData(`${APIS.INVENTORY.GET_PRODUCT_ID}?locationCode=${data}`);
  }

  getFilterData(data?) {
    return this.http.getData(APIS.INVENTORY.GET_INVENTORY_FILTER_DATA, data)
  }
  generateVarianceReport(data) {
    return this.http.postData(APIS.INVENTORY.GENERATE_VARINCE_REPORT, data);
  }

  getVarinceReports(data) {
    return this.http.getData(APIS.INVENTORY.GET_VARINCE_REPORTS, data);
  }

  updateStock(data) {
    return this.http.putData(APIS.INVENTORY.UPDATE_STOCK, data);
  }

  groupItems(data) {
    return this.http.postData(APIS.INVENTORY.GROUP_ITEMS, data);
  }

  getGroupedItemList(data) {
    return this.http.getData(APIS.INVENTORY.GROUP_ITEMS_LIST, data);
  }

  getGroupedItemListDetails(data) {
    return this.http.getData(`${APIS.INVENTORY.GROUP_ITEMS_LIST}?itemData=true&productCode=${data}`);
  }
}
