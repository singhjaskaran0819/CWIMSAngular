import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { InventoryDetailsComponent } from '../inventory-details/inventory-details.component';
import { MODAL_SIZE } from '../../../../common/constants';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwalService } from 'src/app/common/swal.service';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-grouped-items-list',
  templateUrl: './grouped-items-list.component.html',
  styleUrls: ['./grouped-items-list.component.scss']
})
export class GroupedItemsListComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;
  filterData;
  searchFilter = {};
  default_pagination = {
    limit: 10,
    skip: 0
  }
  groupedItemList = [];

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: 1
  }
  active_class = "createdAt1";
  allSelect = false;
  checkedList = [];
  masterSelected: boolean;
  accessPermissions;

  constructor(private inventoryService: InventoryService, private modalService: ModalService, private swalService: SwalService, private mainService: MainService) { }

  ngOnInit(): void {
    this.inventoryService.changeGroupItemFlagValue(false);
    this.inventoryService.changeVarianceReportFlagValue(false);

    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['inventory'];
    })
    this.getGroupedItemList(this.default_pagination);
    this.getFilters();
    this.inventoryService.changeGroupItemFlagValue(true);
  }

  getFilters() {
    var data = {
      "groupedItemsFlag": true
    }
    this.inventoryService.getFilterData(data).subscribe((res) => {
      this.filterData = res.data;
    })
  }

  sorting(sortKey, sortDirection) {
    this.active_class = `${sortKey}${sortDirection}`;
    this.default_sorting = {
      sortKey,
      sortDirection
    }
    var query;
    query = { ...this.default_pagination, ...this.default_sorting }
    this.getGroupedItemList(query)
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions['grouped-items']?.length; i++) {
          if (this.accessPermissions['grouped-items'].includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getGroupedItemList(query) {

    this.groupedItemList= [];
    this.inventoryService.getGroupedItemList(query).subscribe((res) => {
      // this.groupedItemList = res.data.list;
      this.totalRecords = res.data?.totalCount;

      if(res.data.list.length>0){
        for (var i = 0; i < res.data.list.length; i++) {
          this.groupedItemList.push(res.data.list[i])
          this.groupedItemList[i].isSelected = false;
        }
      }
    })
  }

  // Select limit for pagination
  onLimitChange(event) {
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      skip: this.skip,
      limit: this.selected_limit
    };
    this.getGroupedItemList(this.default_pagination);
  }

  // This function call on page change event
  pageChanged(event) {
    this.page = event;
    this.skip = (this.page - 1) * this.selected_limit; 0
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    this.getGroupedItemList(this.default_pagination);
  }

  openFullDetailsModal(data) {
    this.modalService.openModal(InventoryDetailsComponent, { "data": data }, MODAL_SIZE.MEDIUM);
  }

  addSearchFilterKey(key, event) {
    if (event.target.value !== '') {
      this.searchFilter[key] = event.target.value;
    } else {
      delete this.searchFilter[key];
    }
  }

  filter() {
    let x = document.getElementById("search_filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  cancelSearch() {
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  async applySearch() {
    await this.getGroupedItemList({ ...this.default_pagination, ...this.searchFilter });
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  // *********************************

  async ungroupItems(productCode) {

    let swal_data = await this.swalService.warningSwal("Ungroup", "Do you want to ungroup?")
    if (swal_data.value) {    
      this.inventoryService.ungroupItems({ productCode }).subscribe((res) => {
        if(res){
          this.getGroupedItemList(this.default_pagination);
          this.getFilters();
        }
      })
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.groupedItemList.length; i++) {
      // if (!this.groupedItemList[i].isUpdated) {
      this.groupedItemList[i].isSelected = this.masterSelected;
      // }
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.groupedItemList.every(function (item: any) {
      return item.isSelected == true;
    })
    console.log("this.masterSelected:", this.masterSelected)
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];

    for (var i = 0; i < this.groupedItemList.length; i++) {
      if (this.groupedItemList[i].isSelected) {
        this.checkedList.push(this.groupedItemList[i]);
      }
    }
    console.log("this.checkedList: ", this.checkedList)
  }
}
