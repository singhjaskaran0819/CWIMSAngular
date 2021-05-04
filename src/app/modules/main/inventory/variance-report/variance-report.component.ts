import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MODAL_SIZE, VARIANCE_REPORT_STATUSES } from 'src/app/common/constants';
import { SwalService } from 'src/app/common/swal.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { MainService } from 'src/app/core/services/main.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RejectUserComponent } from '../../user-management/reject-user/reject-user.component';
import { InventoryDetailsComponent } from '../inventory-details/inventory-details.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-variance-report',
  templateUrl: './variance-report.component.html',
  styleUrls: ['./variance-report.component.scss']
})
export class VarianceReportComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 70;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }
  reports = [];
  updatedReports = [];
  allSelect = false;
  checkedList = [];
  isSameStocktakeSerial: Boolean = false;
  masterSelected: boolean;
  searchFilter: any = { locationCode: '', status: '', difference: '' };
  searchFilterClear:boolean = false;
  dataForFilter = [];
  filterData;
  accessPermissions;

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: -1
  }
  active_class = "createdAt-1"
  roleCode;
  roleType;

  constructor(private modalService: ModalService, private inventoryService: InventoryService, private mainService: MainService, private router: Router, private swal: SwalService) { }

  // varianceReportFlag = false;
  ngOnInit(): void {
    this.masterSelected = false;
    this.roleCode = sessionStorage.getItem('roleCode')
    this.roleType = sessionStorage.getItem('roleType')

    this.inventoryService.changeGroupItemFlagValue(false);
    this.inventoryService.changeVarianceReportFlagValue(false);
    this.inventoryService.changeVarianceReportRejectionFlagValue(false);

    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['inventory'];
    })
    this.getFilters();
    this.getReports({ ...this.default_pagination, ...this.default_sorting });
    this.inventoryService.varianceReportRejectionFlag.subscribe((res) => {
      console.log(res)
      if (res) {
        console.log(res)
        this.checkedList = [];
        let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));
        var query = { ...this.default_pagination, ...this.default_sorting, ...filter }
        this.getReports(query)
      }
    })
  }

  getFilters() {
    var data = {
      "varianceReports": true
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
    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));
    query = { ...this.default_pagination, ...this.default_sorting, ...filter }
    this.getReports(query)
  }

  getReports(query) {
    this.reports = [];
    this.inventoryService.getVarinceReports(query).subscribe(res => {
      // this.reports = res.data.list;
      this.totalRecords = res.data.totalCount;
      console.log(res)
      for (var i = 0; i < res.data.list.length; i++) {
        this.reports.push(res.data.list[i])
        this.reports[i].isSelected = false;
        this.reports[i].statusValue = _.invert(VARIANCE_REPORT_STATUSES)[this.reports[i].status]
      }
    })
    console.log("reports: ", this.reports)
    this.inventoryService.changeVarianceReportRejectionFlagValue(false);
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions['variance-report']?.length; i++) {
          if (this.accessPermissions['variance-report'].includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  fullDetails(data?) {
    this.modalService.openModal(InventoryDetailsComponent, { "data": data }, MODAL_SIZE.MEDIUM)
  }

  filter() {
    let x = document.getElementById("search_filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
      if(this.searchFilterClear){
        this.searchFilterClear = false;
        this.applySearch();
      }
    }
  }

  cancelSearch() {
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  addSearchFilterKey(key, event) {
    // if (event.target.value !== '') {
    //   this.searchFilter[key] = event.target.value;
    // } else {
    //   delete this.searchFilter[key];
    // }
  }

  async applySearch() {
    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));
    await this.getReports({ ...this.default_pagination, ...filter });
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  //On page change
  pageChanged(event) {
    this.page = event;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));
    this.getReports({ ...this.default_pagination, ...this.default_sorting, ...filter });
  }

  // on limit change
  onLimitChange(event) {
    this.selected_limit = event.target.value;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));
    this.getReports({ ...this.default_pagination, ...this.default_sorting, ...filter });
  }
  // All records selected
  // allSelected(event) {
  //   if (event.target.checked == true) {
  //     this.updatedReports = [];
  //     this.allSelect = true;
  //     this.reports.forEach(item => {
  //       if (!item.isUpdated) {
  //         this.updatedReports.push(item);
  //       }
  //     })
  //   } else {
  //     this.allSelect = false;
  //     this.updatedReports = [];
  //   }
  //   console.log(" this.updatedReports:", this.updatedReports)
  // }
  // // on select one 
  // onSelected(index, data) {
  //   console.log("data: ", data)
  //   console.log("this.updatedReports1", this.updatedReports)
  //   this.updatedReports.push(data);
  //   console.log("index", index)
  //   // if (event.target.checked == true) {
  //   //   this.updatedReports.push(data);
  //   // } else {
  //   //   let remove;
  //   //   remove = this.updatedReports.indexOf(data.id);
  //   //   this.updatedReports.splice(remove, 1);
  //   // }
  //   console.log("this.updatedReports2", this.updatedReports)

  // }

  checkUncheckAll() {
    for (var i = 0; i < this.reports.length; i++) {
      if (!this.reports[i].isUpdated) {
        this.reports[i].isSelected = this.masterSelected;
      }
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.reports.every(function (item: any) {
      return item.isSelected == true && item.isUpdate == false;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];

    for (var i = 0; i < this.reports.length; i++) {
      if (this.reports[i].isSelected && !this.reports[i].isUpdated) {
        this.checkedList.push(this.reports[i]);
      }
    }
    this.isSameStocktakeSerial = this.checkedList.every(item => item.stocktakeSerial == this.checkedList[0].stocktakeSerial);
    console.log("this.checkedList: ", this.checkedList)
  }

  // Submition of updates
  updateSubmit(value?) {

    console.log("this.checkedList: ", this.checkedList)
    let arr = this.checkedList.map(item => {
      return {
        "productID": item.productID
      }
    })

    this.inventoryService.updateStock({ "products": arr }, { "operation": value }).subscribe(res => {
      this.checkedList = [];
      this.getReports({
        limit: 10,
        skip: 0
      });
    })
  }

  csvLink;
  export() {
    // createCSV
    this.inventoryService.getVarinceReports({ ...this.default_pagination, "createCSV": true }).subscribe(res => {
      // this.reports = res.data.list;
      console.log(res)
      console.log(res.data.csvDownloadLink)
      this.csvLink = res.data.csvDownloadLink
      window.open(this.csvLink);
    })
  }

  async approveReport() {
    let swal_data = await this.swal.approveRejectVarianceReportSwal('Click on Approve button to approve the selected variance report items.', 'Approve Variance Report');
    console.log(swal_data)
    console.log(swal_data.dismiss)
    console.log(swal_data.value)
    var ids = [];
    for (var i = 0; i < this.checkedList.length; i++) {
      ids.push(this.checkedList[i].id);
      console.log("ids: ", ids)
    }
    var data;
    if (swal_data.value) {
      data = {
        "ids": ids,
        "operation": 1
      }
      console.log(data)
      this.inventoryService.approveRejectVarianceReport(data).subscribe((res) => {
        console.log(res);
        this.checkedList = [];
        let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));
        this.getReports({ ...this.default_pagination, ...this.default_sorting, ...filter });
      })
    }
  }

  rejectReport() {

    var ids = [];
    for (var i = 0; i < this.checkedList.length; i++) {
      ids.push(this.checkedList[i].id);
      console.log("ids: ", ids)
    }
    var data;

    data = {
      "ids": ids,
      // "rejectionReason": "string",
      "operation": 2
    }
    this.modalService.openModal(RejectUserComponent, { 'userDetails': data, "type": "varianceReport" }, MODAL_SIZE.MEDIUM)
  }

  // async approveRejectReport() {
  //   let swal_data = await this.swal.approveRejectVarianceReportSwal('Either click on Approve button to approve the variance report or click on Reject button to reject the variance report.', 'Approve/ Reject Variance Report');
  //   console.log(swal_data)
  //   console.log(swal_data.dismiss)
  //   console.log(swal_data.value)
  //   var ids = [];
  //   for (var i = 0; i < this.checkedList.length; i++) {
  //     ids.push(this.checkedList[i].id);
  //     console.log("ids: ", ids)
  //   }
  //   var data;
  //   if (swal_data.value) {
  //     data = {
  //       "ids": ids,
  //       "operation": 1
  //     }
  //     console.log(data)
  //     this.inventoryService.approveRejectVarianceReport(data).subscribe((res) => {
  //       console.log(res);
  //       this.getReports({ ...this.default_pagination, ...this.default_sorting, ...this.searchFilter });
  //     })
  //   }
  //   else {
  //     if (swal_data?.dismiss == 'cancel') {
  //       data = {
  //         "ids": ids,
  //         // "rejectionReason": "string",
  //         "operation": 2
  //       }
  //       this.modalService.openModal(RejectUserComponent, { 'userDetails': data, "type": "varianceReport" }, MODAL_SIZE.MEDIUM)
  //     }
  //   }
  // }

  goToInventory() {
    // this.inventoryService.changeGoodsDetailsValue(false);
    this.router.navigateByUrl("/main/inventory/list")
  }

  openMenu(value) {
    let x = document.getElementById("drop" + value);
    x.style.display = "none";
  }
  clearFilters() {
    this.searchFilter = { locationCode: '', status: '', difference: '' };
    this.searchFilterClear = true;
  }

}
