import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { DECLARATION_STATUS, ROLE_TYPE } from 'src/app/common/constants';
import * as moment from 'moment';
import { SwalService } from 'src/app/common/swal.service';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { MainService } from 'src/app/core/services/main.service';
@Component({
  selector: 'app-goods-received',
  templateUrl: './goods-received.component.html',
  styleUrls: ['./goods-received.component.scss']
})
export class GoodsReceivedComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;

  default_pagination = {
    limit: 10,
    skip: 0
  }

  goodsData;
  filterData;
  searchFilter: any = {
    location: '',
    serial: '',
    status: '',
    number: '',
    year: '',
    dateReceived: ''
  };
  searchFilterClear:boolean = false;
  date;
  date1;
  maxDate;
  roleType;

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: -1
  }
  active_class = "createdAt-1";
  accessPermissions;

  constructor(private router: Router, private declarationService: DeclarationsService, private swal: SwalService, private toastService: ToastMessageService, private mainService: MainService) { }

  ngOnInit(): void {
    this.getGoodsInformation(this.default_pagination);
    this.getFilters();

    this.roleType = sessionStorage.getItem('roleType')
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['declaration'];
    })
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions?.length; i++) {
          if (this.accessPermissions.includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getFilters() {
    this.declarationService.getFilters().subscribe((res) => {
      this.filterData = res.data;
    });
  }

  sorting(sortKey, sortDirection) {
    this.active_class = `${sortKey}${sortDirection}`;
    this.default_sorting = {
      sortKey,
      sortDirection
    }
    var query;
    query = { ...this.default_pagination, ...this.default_sorting }
    this.getGoodsInformation(query)
  }

  getStatus(value) {
    for (let key in DECLARATION_STATUS) {
      if (DECLARATION_STATUS[key] == value) {
        return key;
      }
    }
    return value;
  }

  getGoodsInformation(query) {
    this.declarationService.getGoodsReceived(query).subscribe((res) => {
      this.goodsData = res.data.rows;
      this.totalRecords = res.data.count;
    })
  }

  //Select limit for pagination
  onLimitChange(event) {
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      skip: this.skip,
      limit: this.selected_limit
    };
    this.getGoodsInformation(this.default_pagination);
  }

  // This function call on page change event
  pageChanged(event) {
    this.page = event;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    this.getGoodsInformation(this.default_pagination);
  }

  parseTimeString(timeString) {
    return moment(timeString).format('MMMM Do YYYY, h:mm a')
  }

  navigateToGoodsDetails(item) {
    console.log(item)
    this.declarationService.changeGoodsId(item.id)
    this.declarationService.changeGoodsDetailsValue(true);
  }

  addSearchFilterKey(key, event) {
    if (key == "dateReceived") {
      this.searchFilter[key] = event
    }
    // else if (event.target.value !== '') {
    //   this.searchFilter[key] = event.target.value;
    // } else {
    //   delete this.searchFilter[key];
    // }
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
    if(this.searchFilterClear){
      this.searchFilterClear = false;
      this.applySearch();
    }
  }

  async applySearch() {
    if (this.date) {
      if (Object.keys(this.date).length > 0) {
        this.date1 = `${this.date?.month}/${this.date?.day}/${this.date?.year}`
        this.addSearchFilterKey('dateReceived', this.date1)
      }
    }
    let filter = (<any>Object).fromEntries(Object.entries(this.searchFilter).filter(([key, val]) => val !=""));

    await this.getGoodsInformation({ ...this.default_pagination, ...filter });
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  async deleteDeclaration(index, id) {

    let swal_data = await this.swal.warningSwal('Delete Declaration ', 'Click on confirm button to delete the declaration.');
    if (swal_data.value) {
      this.declarationService.deleteDeclaration({ id }).subscribe((res) => {
        this.toastService.showSuccess("Declaration Deleted!")
        this.getGoodsInformation(this.default_pagination);
      })
    }
  }

  clearFilters() {
    this.date = undefined;
    this.searchFilter = { location: '', year: '', serial: '', number: '', status: '', dateReceived: '' };
    this.searchFilterClear = true;
  }

}
