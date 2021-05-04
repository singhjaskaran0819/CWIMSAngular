import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/core/services/main.service';
import { InventoryService } from 'src/app/core/services/inventory.service'
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { MODAL_SIZE } from '../../../common/constants';
import { ModalService } from 'src/app/core/services/modal.service';
import { GroupItemsComponent } from './group-items/group-items.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 0;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }
  searchFilter: any = {
    locationCode: '',
    year: '',
    serial: '',
    number: '',
    tariffCode: '',
  };
  searchFilterClear:boolean = false;
  dataForFilter;
  // fullDetailsData;
  warehouseList;
  inventoryList = [];
  warehouseCode;
  checkedList = []
  masterSelected: boolean;
  groupItemsDisable: boolean = true;
  accessPermissions = {};
  roleCode;
  search = "";

  searchInventory = {
    "searchKey": this.search
  }

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: -1
  }
  active_class = "createdAt-1"

  constructor(private mainService: MainService, private modalService: ModalService, private inventoryService: InventoryService, private router: Router) { }

  ngOnInit(): void {
    this.inventoryService.changeGroupItemFlagValue(false);
    this.inventoryService.changeVarianceReportFlagValue(false);
    this.roleCode = sessionStorage.getItem('roleCode')
    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['inventory'];
    })

    var query;
    this.inventoryList = [];
    this.masterSelected = false;
    this.warehouseCode = sessionStorage.getItem('warehouseCode')
    if (this.roleCode == '3' || this.roleCode == '4') {
      query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), }
    }
    else {
      query = { ...this.default_pagination }
    }
    this.getInventoryList(query);
    // this.getInventoryList(this.default_pagination, this.warehouseCode);
    this.inventoryService.getFilterData().subscribe(res => {
      this.dataForFilter = res.data;
    })
    this.inventoryService.changeGroupItemFlagValue(false);
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions['list']?.length; i++) {
          if (this.accessPermissions['list'].includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  sorting(sortKey, sortDirection) {
    this.active_class = `${sortKey}${sortDirection}`;
    this.default_sorting = {
      sortKey,
      sortDirection
    }

    var query;
    if (this.roleCode == '3' || this.roleCode == '4') {
      query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), ...this.default_sorting, ...this.searchInventory, ...this.searchFilter }
    }
    else {
      query = { ...this.default_pagination, ...this.default_sorting, ...this.searchInventory, ...this.searchFilter }
    }
    this.getInventoryList(query)
  }

  // Select limit for pagination
  onLimitChange(event) {
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      skip: this.skip,
      limit: this.selected_limit
    };
    var query
    if (this.roleCode == '3' || this.roleCode == '4') {
      query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), ...this.default_sorting, ...this.searchInventory }
    }
    else {
      query = { ...this.default_pagination, ...this.default_sorting, ...this.searchInventory }
    }

    // var query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), ...this.searchInventory }
    this.getInventoryList(query);

    // this.getInventoryList(this.default_pagination, this.warehouseCode);
  }

  // This function call on page change event
  pageChanged(event) {
    this.page = event;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    // var query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), ...this.searchInventory }
    // this.getInventoryList(this.default_pagination, this.warehouseCode);
    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));

    var query
    if (this.roleCode == '3' || this.roleCode == '4') {
      query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), ...this.default_sorting, ...this.searchInventory, ...filter }
    }
    else {
      query = { ...this.default_pagination, ...this.default_sorting, ...this.searchInventory, ...filter }
    }
    this.getInventoryList(query);
  }

  getInventoryList(query) {
    this.inventoryList = [];
    this.inventoryService.getInventoryList(query).subscribe((res) => {

      for (var i = 0; i < res.data.list.length; i++) {
        this.inventoryList.push(res.data.list[i])
        this.inventoryList[i].isSelected = false;
      }
      this.totalRecords = res.data.totalCount;
    })
  }

  openFullDetailsModal(id?) {

    this.modalService.openModal(InventoryDetailsComponent, { "data": id }, MODAL_SIZE.MEDIUM)
  }

  openStockTakeModal(data?) {
    // this.modalService.openModal(StockTakeComponent, { "data": data }, MODAL_SIZE.MEDIUM)
    this.router.navigate(['main/inventory/stock-take-list']);
  }

  filter() {
    let x = document.getElementById("search_filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    if(this.searchFilterClear){
      this.searchFilterClear = false;
      this.applySearch();
    }
  }

  cancelSearch() {
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  async applySearch() {
    console.log(this.search)
    console.log(this.searchInventory)

    this.searchInventory.searchKey = this.search;

    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));

    var query
    if (this.roleCode == '3' || this.roleCode == '4') {
      query = { ...this.default_pagination, ...({ "whs_code": this.warehouseCode }), ...this.default_sorting, ...this.searchInventory, ...filter }
    }
    else {
      query = { ...this.default_pagination, ...this.default_sorting, ...this.searchInventory, ...filter }
    }

    await this.getInventoryList(query);
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  groupItems(data?) {
    if (this.checkedList.length > 0) {
      this.modalService.openModal(GroupItemsComponent, { "data": this.checkedList }, MODAL_SIZE.MEDIUM)
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.inventoryList.length; i++) {
      this.inventoryList[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    var count = 0;
    for (var i = 0; i < this.inventoryList.length; i++) {
      if (this.inventoryList[i].isSelected) {
        count++;
        if (count == 5) {
          this.groupItemsDisable = true;
          return;
        }
      }
    }

    this.masterSelected = this.inventoryList.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.groupItemsDisable = false;
    this.checkedList = [];

    for (var i = 0; i < this.inventoryList.length; i++) {
      if (this.checkedList.length > 5) {
        this.groupItemsDisable = true;
        return;
      }
      else if (this.inventoryList[i].isSelected)
        this.checkedList.push(this.inventoryList[i]);
      if (this.checkedList.length > 1) {
        for (var j = 0; j < this.checkedList.length - 1; j++) {
          if (this.checkedList[j].locationCode != this.checkedList[j + 1].locationCode) {
            this.groupItemsDisable = true;
            break;
          }
        }
      }
    }
  }

  checkVarianceReport() {
    this.router.navigate(['main/inventory/variance-report']);
  }

  clearFilters() {
    this.search = "";
    this.searchFilter = { locationCode: '', year: '', serial: '', number: '', tariffCode: '' };
    this.searchFilterClear = true
  }

}
