import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APIS } from '../../common/constants';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(
    private http: HttpService
  ) { }
  accessPermissions = new BehaviorSubject({});
  //Get list warehouse
  getWarehouse(data) {
    return this.http.getData(APIS.WAREHOUSE.WAREHOUSE_LIST, data);
  }

  getWarehouseLocationFilters(data) {
    return this.http.getData(APIS.WAREHOUSE.WAREHOUSE_LOCATION_FILTERS, data);
  }

  getWarehouseLocations(query) {
    return this.http.getData(APIS.WAREHOUSE.FETCH_WAREHOUSE_BY_CODE, query)
  }

  getWarehouseLocationForOperator(warehouseCode) {
    return this.http.getData(`${APIS.WAREHOUSE.FETCH_WAREHOUSE_BY_CODE}?code=${warehouseCode}`)
  }

  getWarehouseLocationByCode(query) {
    return this.http.getData(APIS.WAREHOUSE.FETCH_LOCATION_BY_CODE, query)
  }

  getFilters(query) {
    return this.http.getData(APIS.WAREHOUSE.FILTERS, query)
  }

  setAssignedPermissions(data?) {
    this.accessPermissions.next(data);
  }

}
