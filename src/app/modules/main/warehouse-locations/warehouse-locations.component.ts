import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-warehouse-locations',
  templateUrl: './warehouse-locations.component.html',
  styleUrls: ['./warehouse-locations.component.scss']
})
export class WarehouseLocationsComponent implements OnInit {

  filters;
  filterQuery;

  role;
  city = "";
  country = "";
  postalCode = "";
  location_city = "";
  location_country = "";
  location_postalCode = "";
  locationCode = "";
  roleNature;
  searchFilterQuery: any = {};

  warehouseList = [];
  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;
  selectedWarehouseId = null;
  default_pagination = {
    limit: 10,
    skip: 0
  }
  warehouseLocations = [];
  warehouseLocationCount = 0;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {
    idField: 'code',
    textField: 'name',
    singleSelection: true,
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    allowSearchFilter: true,
    noDataAvailablePlaceholderText: 'No warehouse found',
    closeDropDownOnSelection: true
  };

  // warehouse location infinite scrolling pagination
  inf_scroll_pagination = {
    limit: 10,
    skip: 0
  }

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: 1
  }
  active_class = "createdAt1";
  showWarehouseLocations = false;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('roleCode');
    if (this.role == '3' || this.role == '4') {

      var warehouseCode = sessionStorage.getItem('warehouseCode');
      this.roleNature = sessionStorage.getItem('roleNature');

      this.mainService.getWarehouseLocationForOperator(warehouseCode).subscribe(res => {
        this.warehouseLocations = res.data.warehouselocations;
        this.totalRecords = this.warehouseLocations.length;
      })

      this.filterQuery = { warehouseCode: warehouseCode };
      this.getWarehouseLocationFilters(this.filterQuery)
    } else {
      this.getWarehouseList(this.default_pagination);
      this.getFilters({});
    }

    /**ToggleClass */

    // $(".accordin_row").click(function () {
    //   $(this).toggleClass('nnn');
    // });
  }

  sorting(sortKey, sortDirection) {
    this.active_class = `${sortKey}${sortDirection}`;
    this.default_sorting = {
      sortKey,
      sortDirection
    }

    var query;
    query = { ...this.default_pagination, ...this.default_sorting }
    this.getWarehouseList(query)
  }

  // Get warehouse list 
  async getWarehouseList(query) {
    let data = await this.mainService.getWarehouse(query).toPromise();
    this.warehouseList = data.data.list;

    // if filters already applied for warehouse locations then set warehouse location data
    if (this.location_city !== "" || this.location_country !== "" || this.location_postalCode !== "") {
      this.warehouseLocations = this.warehouseList ? this.warehouseList[0].warehouselocations : [];
    }

    this.totalRecords = this.warehouseList.length;
  }

  getFilters(query) {
    this.mainService.getFilters(query).subscribe(res => {
      this.filters = res.data;
      this.dropdownList = this.filters.warehouseData.map(item => {
        return { code: item.code, name: item.name }
      })
    })
  }

  selectFilter(key, event) {
    if (event.target.value !== "") {
      if (key === 'locationCode') {
        if (event.target.value === "")
          this.locationCode = "";
        this.searchFilterQuery = {
          locationCode: event.target.value
        }
      } else {
        this.searchFilterQuery[key] = event.target.value;
      }
    } else {
      delete this.searchFilterQuery[key];
    }
  }

  selectWarehouseLocationFilter(key, event) {
    if (event.target.value !== "") {
      this.searchFilterQuery[key] = event.target.value;
    } else {
      delete this.searchFilterQuery[key];
    }
  }

  getWarehouseLocationFilters(query) {
    this.mainService.getWarehouseLocationFilters(query).subscribe(res => {
      this.filters = res.data;
    })
  }

  // Search warehouse
  async searchWarehouse() {
    let query = {
      ...this.default_pagination,
      ...(this.searchFilterQuery && Object.keys(this.searchFilterQuery).length > 0 ? this.searchFilterQuery : {}),
      ...(this.filterQuery && this.filterQuery)
    }
    this.getWarehouseList(query);
    let x = document.getElementById('search_filter')
    x.style.display = 'none';

    this.selectedWarehouseId = null;
  }

  OnFiterClick() {
    let x = document.getElementById("search_filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  // Select limit for pagination
  onLimitChange(event) {
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      skip: this.skip,
      limit: this.selected_limit
    };
    this.getWarehouseList(this.default_pagination);
  }

  // This function call on page change event
  pageChanged(event) {
    this.page = event;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    this.getWarehouseList(this.default_pagination);
  }

  selectedIndex;
  // Show detail
  showDetail(code, index) {
    this.selectedIndex = index;
    this.showWarehouseLocations = false;
    if (this.location_city !== "" || this.location_country !== "" || this.location_postalCode !== "") {
      this.selectedWarehouseId = this.filterQuery.warehouseCode;
      return true;
    }
    if (code == this.selectedWarehouseId) {
      this.selectedWarehouseId = null;
    } else {
      this.selectedWarehouseId = code;
    }
    this.warehouseLocationCount = 0;
    this.warehouseLocations = [];
    if (this.searchFilterQuery.locationCode) {

      this.getWarehouseLocation(null, this.searchFilterQuery.locationCode, null);
    } else {

      this.getWarehouseLocation(this.selectedWarehouseId, null, this.inf_scroll_pagination);
    }
  }

  // on infinite Scrolling 
  onScroll() {
    this.getWarehouseLocation(this.selectedWarehouseId, null, { limit: this.inf_scroll_pagination.limit, skip: (this.inf_scroll_pagination.limit + this.inf_scroll_pagination.skip) });
  }

  getWarehouseLocation(warehouseCode, locationCode, pagination) {
    if (warehouseCode) {
      let obj = {
        infinteScroll: true,
        code: warehouseCode,
        ...pagination
      }
      this.mainService.getWarehouseLocations(obj).subscribe(res => {
        this.warehouseLocationCount = this.warehouseLocations.length;
        this.showWarehouseLocations = true;
        if (this.warehouseLocationCount < res.data.count) {
          this.warehouseLocations = [...this.warehouseLocations, ...res.data.rows];
          this.warehouseLocationCount = this.warehouseLocationCount + res.data.rows.length;
        }
      })
    }
    else if (locationCode) {
      this.mainService.getWarehouseLocationByCode({ code: locationCode }).subscribe(res => {
        this.warehouseLocations = [res.data];
      })
    }
  }

  /**
   * Multi-select drop-down
   */
  onItemSelect(item: any) {
    this.filterQuery = { warehouseCode: item.code };
    this.searchFilterQuery = {};
    this.locationCode = '';
    this.city = "";
    this.country = "";
    this.postalCode = "";
    this.location_city = "";
    this.location_country = "";
    this.location_postalCode = "";
    this.locationCode = "";
    this.getWarehouseLocationFilters(this.filterQuery);
  }

  onDeSelect(code: any) {
    this.filterQuery = {}
    this.getFilters(this.filterQuery);
    this.searchFilterQuery = {};
    this.locationCode = '';
    this.city = "";
    this.country = "";
    this.postalCode = "";
    this.location_city = "";
    this.location_country = "";
    this.location_postalCode = "";
    this.locationCode = "";
  }
}
