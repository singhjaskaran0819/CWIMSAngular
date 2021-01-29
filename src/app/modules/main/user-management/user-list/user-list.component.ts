import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MODAL_SIZE } from 'src/app/common/constants';
import { SwalService } from 'src/app/common/swal.service';
import { MainService } from 'src/app/core/services/main.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import { AddNewUserComponent } from 'src/app/modules/main/user-management/add-new-user/add-new-user.component';

import { AccessPermissionComponent } from '../access-permission/access-permission.component';
import { ApproveUserComponent } from '../approve-user/approve-user.component';
import { BlockUserComponent } from '../block-user/block-user.component';
import { CreateNewRoleComponent } from '../create-new-role/create-new-role.component';
import { ReassignPermissionsComponent } from '../reassign-permissions/reassign-permissions.component';
import { RejectUserComponent } from '../reject-user/reject-user.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  role;

  page = 1;
  skip = 0;
  totalRecords = 0;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }
  userList = [];
  searchFilter: any = {};
  filters;
  // userRole;
  accessPermissions: any = {};
  searchQuery = {};
  constructor(
    private router: Router,
    private modalService: ModalService,
    private userService: UserService,
    private swalService: SwalService,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('roleCode');
    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['user-management'];
    })

    this.userService.updateListFlag.subscribe((res) => {
      if (res) {
        this.getUserList(this.default_pagination);
      }
    })

    this.getUserList(this.default_pagination);
    this.getFilters();

  }

  checkPermission(permission) {
    if (Object.keys(this.accessPermissions).length > 0) {
      for (var i = 0; i < this.accessPermissions['list-of-user']?.length; i++) {
        if (this.accessPermissions['list-of-user'].includes(permission)) {
          return true;
        }
      }
    }
    return false;
  }

  getFilters() {
    this.userService.getUserListingFilters().subscribe((res) => {
      this.filters = res.data;
    })
  }

  getUserList(paginate) {
    this.userService.changeUpdateListFlagValue(false);

    this.userService.getUserList(paginate).subscribe((res) => {
      this.userList = res.data.list;
      this.totalRecords = res.data.totalCount;
    })
  }

  //Open modules
  openModel(component) {

  }

  // for closing the module
  close() {
    this.modalService.closeModal();
  }

  // Open user detail/view
  openDetail(id) {
    this.modalService.openModal(UserDetailComponent, { "userId": id }, MODAL_SIZE.LARGE);
  }

  addUser() {
    this.modalService.openModal(AddNewUserComponent, {}, MODAL_SIZE.MEDIUM)
  }
  // editPermissions() {
  //   this.modalService.openModal(AccessPermissionComponent, {}, MODAL_SIZE.EXTRA_LARGE)
  // }

  reassignPermissions(id?, role?, roleId?) {
    this.modalService.openModal(ReassignPermissionsComponent, { "userid": id, "role": role, "roleId": roleId }, MODAL_SIZE.MEDIUM)
  }

  suspendUser(id, isSuspended) {
    var data = {
      "id": id,
      "isSuspended": isSuspended
    }
    this.modalService.openModal(BlockUserComponent, { "data": data }, MODAL_SIZE.MEDIUM)
  }

  async deleteUser(id?) {
    let swal_data = await this.swalService.warningSwal("Deleting User", "Do you want to delete user?")
    if (swal_data.value) {
      var data = {
        "id": id
      }
      this.userService.deleteUser(data).subscribe(res => {
        this.getUserList(this.default_pagination);
      });
    }
  }

  approveUser(userData) {
    this.modalService.openModal(ApproveUserComponent, { 'userDetails': userData }, MODAL_SIZE.MEDIUM)
  }
  rejectUser(userData) {
    this.modalService.openModal(RejectUserComponent, { 'userDetails': userData }, MODAL_SIZE.MEDIUM)
  }

  // createRole() {
  //   this.modalService.openModal(CreateNewRoleComponent, {}, MODAL_SIZE.EXTRA_LARGE)
  // }
  // on page change
  pageChanged(event) {
    this.page = event
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
    this.getUserList(this.default_pagination);
  }

  //on limit change 
  onLimitChange(event) {
    this.selected_limit = event.target.value;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
    this.getUserList(this.default_pagination);
  }

  filter() {
    let x = document.getElementById("search_filter");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  selectFilterValues(key, event) {
    if (event.target.value !== '') {
      this.searchQuery[key] = event.target.value;
    } else {
      delete this.searchQuery[key];
    }
  }
  //apply search filter
  async applySearch() {
    // await this.getUserList(this.default_pagination);
    var data = { ...this.default_pagination, ...(this.searchQuery && Object.keys(this.searchQuery).length > 0 ? this.searchQuery : {}) }
    this.getUserList(data)
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

  cancelSearch() {
    let x = document.getElementById("search_filter");
    x.style.display = "none";
  }

}
