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

  role;
  roleList = [];

  accessPermissions: any = {};

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private swalService: SwalService,
    private mainService: MainService
  ) { }

  ngOnInit(): void {

    this.userService.updateListFlag.subscribe((res) => {
      if (res) {
        this.getRolesList();
      }
    })

    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['user-management'];
    })
    this.getRolesList();
  }

  getRolesList() {
    this.userService.getOrCreateRole().subscribe((res) => {
      this.roleList = res.data;

    })
  }

  checkPermission(permission) {
    if (Object.keys(this.accessPermissions).length > 0) {
      for (var i = 0; i < this.accessPermissions['manage-role']?.length; i++) {
        if (this.accessPermissions['manage-role'].includes(permission)) {
          return true;
        }
      }
    }
    return false;
  }

  createRole() {
    this.modalService.openModal(CreateNewRoleComponent, {}, MODAL_SIZE.EXTRA_LARGE)
  }

  async deleteRole(id?, roleTitle?) {
    let swal_data = await this.swalService.warningSwal("Delete Role", `Do you want to delete ${roleTitle}?`)
    if (swal_data.value) {
      var data = {
        "id": id
      }
      this.userService.deleteRole(data).subscribe(res => {
        this.getRolesList();
      });
    }
  }

  updatePermissions(roleId?, title?) {
    this.modalService.openModal(CreateNewRoleComponent, { "roleId": roleId, "roleName": title }, MODAL_SIZE.LARGE)
  }

  viewPermissions(roleId) {
    this.modalService.openModal(ViewRolePermissionsComponent, { "roleId": roleId }, MODAL_SIZE.LARGE)
  }

  close() {
    this.modalService.closeModal();
  }

}
