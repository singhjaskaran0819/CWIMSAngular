import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  page = 1;
  totalRecords = 70;
  selected_limit = 10;
  detailId = null;
  constructor() { }

  createSales = false;
  listSales = false;
  ngOnInit(): void {
    if (document.URL.includes("/sales") || document.URL.includes("/sales/salesmain")) {
      this.createSales = true;
      this.listSales = false;
    }
    if (document.URL.includes("/sales/salesmain")) {
      this.createSales = false;
      this.listSales = true;

    }
  }

  // on page change
  pageChanged(event) {
    this.page = event;
  }

  // on limit change
  onLimitChange(event) {
    this.selected_limit = event.target.value;
  }

  // on scrolling
  onScroll() {

  }

  // row detail open
  openDetail(id) {
    if (this.detailId == id) {
      this.detailId = null
    } else {
      this.detailId = id;
    }
  }
}
