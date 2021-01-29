import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { ReceiptComponent } from '../../receipt/receipt.component';
import { ReturnItemComponent } from '../../return-item/return-item.component';
import { InitiateDeclarationComponent } from '../../initiate-declaration/initiate-declaration.component';
import { MODAL_SIZE } from '../../../../../common/constants';

@Component({
  selector: 'app-sales-list-operator',
  templateUrl: './sales-list-operator.component.html',
  styleUrls: ['./sales-list-operator.component.scss']
})
export class SalesListOperatorComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }

  returnItemFlag = false;
  constructor(private modalService: ModalService, private salesService: SalesService) { }

  ngOnInit(): void {

    this.salesService.returnItemFlag.subscribe((res) => {
      this.returnItemFlag = res;
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
  }

  //on limit change 
  onLimitChange(event) {
    this.selected_limit = event.target.value;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
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

  ApplySearch() {
    let x = document.getElementById('search_filter')
    x.style.display = 'none';

  }

  returnItem(data?) {
    this.returnItemFlag = true;
  }

  openInitiateDeclaration(data?) {
    this.modalService.openModal(InitiateDeclarationComponent, { "data": data }, MODAL_SIZE.MEDIUM)
  }
}
