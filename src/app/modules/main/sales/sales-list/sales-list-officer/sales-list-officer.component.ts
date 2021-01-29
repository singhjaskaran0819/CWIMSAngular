import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { ReceiptComponent } from '../../receipt/receipt.component';
import { MODAL_SIZE } from '../../../../../common/constants';
import { InitiateDeclarationComponent } from '../../initiate-declaration/initiate-declaration.component';
@Component({
  selector: 'app-sales-list-officer',
  templateUrl: './sales-list-officer.component.html',
  styleUrls: ['./sales-list-officer.component.scss']
})
export class SalesListOfficerComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }

  constructor(private modalService: ModalService, private salesService: SalesService) { }

  ngOnInit(): void {
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

  goToDetails(data?) {
    this.modalService.openModal(ReceiptComponent, { "data": data }, MODAL_SIZE.LARGE)
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

  openInitiateDeclaration(data?) {
    this.modalService.openModal(InitiateDeclarationComponent, { "data": data }, MODAL_SIZE.MEDIUM)
  }
}
