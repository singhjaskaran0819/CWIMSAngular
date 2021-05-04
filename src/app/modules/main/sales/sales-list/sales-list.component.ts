import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { ReceiptComponent } from '../receipt/receipt.component';
import { MODAL_SIZE } from '../../../../common/constants';
import { InitiateDeclarationComponent } from '../initiate-declaration/initiate-declaration.component';
import { ReturnItemComponent } from '../return-item/return-item.component';
import { SwalService } from 'src/app/common/swal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }
  returnItemFlag = false;
  searchFilter;

  allSales;
  roleType;

  countryOfResidencyData;
  currencyData;
  documentTypeData;
  saleTypeData;
  constructor(private modalService: ModalService, private salesService: SalesService, private swalService: SwalService) { }

  ngOnInit(): void {

    this.roleType = sessionStorage.getItem('roleType');
    this.salesService.returnItemFlag.subscribe((res) => {
      this.returnItemFlag = res;
    })

    this.getFilters();
    this.getSales(this.default_pagination);
  }

  getFilters() {
    this.salesService.getFilters().subscribe((res) => {
      console.log("res: ", res)
      this.countryOfResidencyData = res.data.countryOfResidencyData;
      this.currencyData = res.data.saleCurrencyData;
      this.documentTypeData = res.data.customerIdTypeData;
      this.saleTypeData = res.data.customerSaleTypeData;
    })
  }

  getDate(date) {
    return moment(date).format("LL")
  }

  getSales(query) {
    this.salesService.getSales(query).subscribe((res) => {
      console.log("res: ", res)
      this.allSales = res.data.rows;
      this.totalRecords = res.data.count
    })
  }

  // on page change
  pageChanged(event) {
    this.page = event
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
    this.getSales({ ...this.default_pagination });
  }

  //on limit change 
  onLimitChange(event) {
    this.selected_limit = event.target.value;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
    this.getSales({ ...this.default_pagination });
  }

  goToDetails(data?) {
    this.modalService.openModal(ReceiptComponent, { "saleData": data }, MODAL_SIZE.LARGE)
  }

  returnItem(data?) {
    this.returnItemFlag = true;
    // this.modalService.openModal(ReturnItemComponent, {}, MODAL_SIZE.LARGE)
  }

  goToList() {
    this.returnItemFlag = false;
  }

  filterSales() {
    let x = document.getElementById("search_filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  filterClose() {
    let x = document.getElementById('search_filter')
    x.style.display = 'none';
  }

  async applySearch() {

    await this.getSales({ ...this.default_pagination, ...this.searchFilter });
    let x = document.getElementById('search_filter')
    x.style.display = 'none';
  }

  addSearchFilterKey(key, event) {
    if (event.target.value !== '') {
      this.searchFilter[key] = event.target.value;
    } else {
      delete this.searchFilter[key];
    }
  }

  openInitiateDeclaration(data?) {
    this.modalService.openModal(InitiateDeclarationComponent, { "data": data }, MODAL_SIZE.MEDIUM)
  }

  async deleteSale() {
    // let swal_data = await this.swalService.warningSwal("Delete Role", `Do you want to delete ${roleTitle}?`)
    // if (swal_data.value) {
    //   var data = {
    //     "id": id,
    //     "type": roleType
    //   }
    // this.salesService.deleteSale(data).subscribe(res => {
    //   this.getRolesList(this.default_pagination);
    // });
    // }
  }

  editSale() {

  }

}
