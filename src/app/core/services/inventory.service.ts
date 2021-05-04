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
  varianceReportRejectionFlag = new BehaviorSubject(false);
  updateStockTakeFlag = new BehaviorSubject(false);

  changeVarianceReportFlagValue(value) {
    this.varianceReportFlag.next(value);
  }

  changeGroupItemFlagValue(value) {
    this.groupItemFlag.next(value);
  }

  changeVarianceReportRejectionFlagValue(value) {
    this.varianceReportRejectionFlag.next(value);
  }

  changeUpdateStockTakeFlagValue(value) {
    this.updateStockTakeFlag.next(value);
  }

  getSubLocations(code) {
    let url = APIS.INVENTORY.FETCH_SUBLOCATIONS;
    url = url.replace(':code', code);
    return this.http.getData(url);
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
    return this.http.getData(`/v1/inventory/fetch-by-id?productID=${id}`);
  }

  createNewStockTake(data) {
    return this.http.postData(APIS.INVENTORY.CREATE_NEW_STOCK_TAKE, data);
  }

  editNewStockTake(data) {
    return this.http.putData(APIS.INVENTORY.EDIT_STOCK_TAKE, data);
  }

  fetchStocktakeBySerial(data) {
    return this.http.getData(APIS.INVENTORY.FETCH_STOCK_TAKE, data);
  }

  getWareHouseList() {
    return this.http.getData(`${APIS.WAREHOUSE.WAREHOUSE_LIST}`);
  }

  getWarehouseByCode(data) {
    return this.http.getData(`${APIS.WAREHOUSE.FETCH_WAREHOUSE_BY_CODE}?code=${data}`);
  }


  getLocationsForStockTake(data) {
    return this.http.getData(`${APIS.WAREHOUSE.FETCH_WAREHOUSE_BY_CODE}?code=${data}&isStockTakeProcess=true`);
  }

  getProductIdByLocation(data) {
    return this.http.getData(`${APIS.INVENTORY.GET_PRODUCT_ID}`, data);
  }

  getFilterData(data?) {
    return this.http.getData(APIS.INVENTORY.GET_INVENTORY_FILTER_DATA, data)
  }
  generateVarianceReport(data?) {
    return this.http.postData(APIS.INVENTORY.GENERATE_VARINCE_REPORT, data);
  }

  getVarinceReports(data) {
    return this.http.getData(APIS.INVENTORY.GET_VARINCE_REPORTS, data);
  }

  updateStock(data, queryParams?) {
    return this.http.putData(APIS.INVENTORY.UPDATE_STOCK, data, queryParams);
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

  ungroupItems(data) {
    return this.http.postData(APIS.INVENTORY.UNGROUP_ITEMS, data);
  }

  addStockTakeItems(data) {
    return this.http.postData(APIS.INVENTORY.ADD_STOCK_TAKE_ITEMS, data);
  }

  editStockTakeItems(data) {
    return this.http.putData(APIS.INVENTORY.EDIT_STOCK_TAKE_ITEM, data);
  }

  deleteStockTakeItems(data) {
    return this.http.deleteData(APIS.INVENTORY.DELETE_STOCK_TAKE_ITEM, data);
  }

  getStockTakeItems(data?) {
    return this.http.getData(APIS.INVENTORY.GET_STOCK_TAKE_ITEMS, data);
  }

  approveRejectVarianceReport(data?) {
    return this.http.putData(APIS.INVENTORY.APPROVE_REJECT_VARIANCE_REPORT, data);
  }

  checkIfProductExist(data?) {
    return this.http.getData(APIS.INVENTORY.CHECK_IF_PRODUCT_EXIST, data);
  }

  getStockTakeList(data?) {
    return this.http.getData(APIS.INVENTORY.GET_STOCK_TAKE_LIST, data);
  }
}
