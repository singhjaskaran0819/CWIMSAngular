import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stock-take-list',
    templateUrl: './stock-take-list.component.html',
    styleUrls: ['./stock-take-list.component.scss']
})
export class StockTakeListComponent implements OnInit {

    stockTakeList: any = [];
    totalRecords: Number = 10;
    pagination = {
        limit: 10,
        skip: 0
    }
    query_filters = {};
    filters: any = {};
    page = 1;
    skip = 0;
    selected_limit = 10;
    searchStockTake = {
        "searchKey": ""
    }
    default_sort = {
        sortKey: 'createdAt',
        sortDirection: -1,
    }

    filter_locationData = '';
    filter_year = '';

    filterQuery;

    active_class = "createdAt-1"

    constructor(private inventoryService: InventoryService, private router: Router) { }

    ngOnInit(): void {
        this.getStockTakeList({ ...this.pagination });
        this.getFilters()
    }

    getStockTakeList(query?) {
        this.inventoryService.getStockTakeList(query).subscribe((res) => {
            this.stockTakeList = res.data.rows;
            this.totalRecords = res.data.count;
        })
    }

    editStocktake(serial) {
        this.router.navigateByUrl(`/main/inventory/stock-take/edit/${serial}`);
    }

    permanentCloseStocktake(serial) {
        this.inventoryService.editNewStockTake({ serial, status: 3 }).subscribe(res => {
            var query = { ...this.query_filters, ...this.pagination, ...this.default_sort, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
            this.getStockTakeList(query);
        })
    }

    async showFilter() {
        // await this.getFilters();
        let x = document.getElementById("search_filter");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    addStock() {
        this.router.navigateByUrl('/main/inventory/stock-take');
    }

    onSelectFilter(key, event) {
    }

    cancelSearch() {
        let x = document.getElementById("search_filter");
        x.style.display = "none";

        if (this.filter_locationData == "" && this.filter_year == "") {
            var query = { ...this.pagination, ...this.default_sort, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
            this.getStockTakeList(query);
        }
    }

    clearFilters() {
        this.filter_locationData = "";
        this.filter_year = "";
        this.query_filters = {};
    }

    applyFilters() {
        this.cancelSearch();
        let filters = {
            ...(this.filter_locationData && { locationCode: this.filter_locationData }),
            ...(this.filter_year && { year: this.filter_year })
        }
        this.query_filters = filters;
        var query = { ...this.query_filters, ...this.pagination, ...this.default_sort, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
        this.getStockTakeList(query);
    }

    getFilters() {
        this.inventoryService.getFilterData({ stockTake: true }).subscribe(res => {
            this.filters = res.data;
        });
    }

    sorting(sortKey, sortDirection) {
        this.default_sort = {
            sortKey,
            sortDirection
        }
        this.active_class = `${sortKey}${sortDirection}`;
        var query = { ...this.query_filters, ...this.pagination, ...this.default_sort, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
        this.getStockTakeList(query);
    }

    pageChanged(event) {
        this.page = event;
        this.skip = (this.page - 1) * this.selected_limit;
        this.pagination = {
            limit: this.selected_limit,
            skip: this.skip
        }
        var query = { ...this.query_filters, ...this.pagination, ...this.default_sort, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
        this.getStockTakeList(query);
    }

    onLimitChange(event) {
        this.skip = (this.page - 1) * this.selected_limit;
        this.pagination = {
            skip: this.skip,
            limit: this.selected_limit
        };
        var query = { ...this.query_filters, ...this.pagination, ...this.default_sort, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
        this.getStockTakeList(query);
    }

    generateVarianceReport(serial) {
        this.inventoryService.generateVarianceReport({ stocktakeSerial: serial }).subscribe((res) => {
            this.router.navigateByUrl(`/main/inventory/variance-report`);
        });
    }
}