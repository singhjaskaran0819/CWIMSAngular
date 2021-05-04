import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MODAL_SIZE } from 'src/app/common/constants';
import { SwalService } from 'src/app/common/swal.service';
import { MainService } from 'src/app/core/services/main.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import { CreateNewRoleComponent } from '../create-new-role/create-new-role.component';
import { ViewRolePermissionsComponent } from '../view-role-permissions/view-role-permissions.component';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {

  page = 1;
  skip = 0;
  totalRecords = 0;
  selected_limit = 10;
  default_pagination = {
    limit: 10,
    skip: 0
  }
  // searchFilter: any = {};
  filters;
  // searchQuery = {};

  role;
  roleList = [];
  roleTypeName;
  // userRole;
  accessPermissions: any = {};

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: 1
  }

  active_class = "createdAt1"

  constructor(
    // private router: Router,
    private modalService: ModalService,
    private userService: UserService,
    private swalService: SwalService,
    private mainService: MainService
  ) { }

  ngOnInit(): void {

    this.userService.updateListFlag.subscribe((res) => {
      if (res) {
        this.getRolesList(this.default_pagination);
      }
    })

    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['user-management'];
    })
    this.getRolesList(this.default_pagination);
    // this.getFilters();
  }

  getRolesList(pagination) {
    this.userService.getRolesBasedOnType(pagination).subscribe((res) => {
      this.roleList = res.data.rows;
      this.totalRecords = res.data.count;
    })
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions['manage-role']?.length; i++) {
          if (this.accessPermissions['manage-role'].includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  sorting(sortKey, sortDirection) {
    this.active_class = `${sortKey}${sortDirection}`;
    this.default_sorting = {
      sortKey,
      sortDirection
    }

    var query;  
      query = { ...this.default_pagination, ...this.default_sorting }
    this.getRolesList(query)
  }

  createRole() {
    this.modalService.openModal(CreateNewRoleComponent, {}, MODAL_SIZE.EXTRA_LARGE)
  }

  async deleteRole(id?, roleTitle?, roleType?) {
    let swal_data = await this.swalService.warningSwal("Delete Role", `Do you want to delete ${roleTitle}?`)
    if (swal_data.value) {
      var data = {
        "id": id,
        "type": roleType
      }
      this.userService.deleteRole(data).subscribe(res => {
        this.getRolesList(this.default_pagination);
      });
    }
  }

  updatePermissions(roleId?, title?, roleType?) {
    this.modalService.openModal(CreateNewRoleComponent, { "roleId": roleId, "roleName": title, "roleCode": roleType }, MODAL_SIZE.LARGE)
  }

  viewPermissions(roleId) {
    this.modalService.openModal(ViewRolePermissionsComponent, { "roleId": roleId }, MODAL_SIZE.LARGE)
  }

  close() {
    this.modalService.closeModal();
  }

  pageChanged(event) {
    this.page = event
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
    this.getRolesList(this.default_pagination);
  }

  //on limit change 
  onLimitChange(event) {
    this.selected_limit = event.target.value;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    };
    this.getRolesList(this.default_pagination);
  }

}
