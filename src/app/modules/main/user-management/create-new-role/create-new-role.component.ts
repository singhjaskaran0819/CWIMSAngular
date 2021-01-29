import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { UserService } from 'src/app/core/services/user.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-create-new-role',
  templateUrl: './create-new-role.component.html',
  styleUrls: ['./create-new-role.component.scss']
})
export class CreateNewRoleComponent implements OnInit {

  roleName = "";
  submitted = false;
  noAccessPermissionSelected = false;
  accessPermissionFlag = 0;
  accessPermissions = {};
  roleId;
  racking = false;
  editGroupItems = false;
  groupItems = false;
  deleteInventory = false;
  stockTake = false;
  approveRejectUser = false;
  deleteUser = false;
  suspendUser = false;
  // permissions = {
  //   'dashboard': [],
  //   'declaration': [],
  //   'inventory': {
  //     'list': [],
  //     'grouped-item': []
  //   },
  //   'warehouse': [],
  //   'sale': {
  //     'create-new-sale': [],
  //     'list-sale': []
  //   },
  //   'user-management': {
  //     'list-of-user': []
  //   },
  //   'standard-report': [],
  //   'appointment': []
  // }

  // permissionsObject = {
  //   'dashboard': [],
  //   'declaration': [],
  //   'inventory': {
  //     'list': [],
  //     'grouped-item': [],
  //     'variance-report': []
  //   },
  //   'warehouse': [],
  //   'sale': {
  //     'create-new-sale': [],
  //     'list-sale': []
  //   },
  //   'standard-report': [],
  //   'risk-management': {
  //     'risk-criteria': {
  //       'risk-criteria': [],
  //       'list-of-criteria': []
  //     },
  //     'target-list': {
  //       'target-list': []
  //     },
  //     'risk-report': []
  //   },
  //   'user-management': {
  //     'list-of-user': [
  //       'create-new-role',
  //       'create-new-user'
  //     ]
  //   },
  //   'appointment': []
  // }


  permissions = {}
  constructor(private modalService: ModalService, private userService: UserService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    if (this.roleId != undefined) {
      // this.getRolePermissions();
      var data = {
        "id": this.roleId
      }
      this.userService.getPermissionsByRole(data).subscribe((res) => {
        this.accessPermissions = res.data.permissions;
        this.permissions = this.accessPermissions;
      })
    }
  }

  async getRolePermissions() {
    var data = {
      "id": this.roleId
    }
    await this.userService.getPermissionsByRole(data).subscribe((res) => {
      this.accessPermissions = res.data.permissions;
    })
  }

  checkIfExits(module, value, sub_module?) {
    // if (Object.keys(this.accessPermissions).length > 0) {
    if (_.isPlainObject(this.accessPermissions[module])) {
      if (sub_module != "undefined" && _.isArray(this.accessPermissions[module][sub_module])) {
        if (this.accessPermissions[module][sub_module].includes(value)) {
          return true;
        }
      }
      else if (_.isArray(this.accessPermissions[module])) {
        if (this.accessPermissions[module].includes(value)) {
          return true;
        }
      }
    } else if (_.isArray(this.accessPermissions[module])) {
      if (this.accessPermissions[module].includes(value)) {
        return true;
      }
    }
    return false;
    // }
    // return false;
  }

  cancel() {
    this.modalService.closeModal();
  }

  accessPermission(module, permission, event, sub_module?) {
    var flag = 0;
    var update = false;
    if (event.target.checked) {
      if (Object.keys(this.permissions).length > 0) {
        for (let key in this.permissions) {
          flag++;
          var childFlag = 0;
          if (key == module) {
            if (Object.keys(this.permissions[key]).length > 0 && sub_module != undefined) {
              for (let key1 in this.permissions[key]) {
                childFlag++;
                if (key1 == sub_module) {
                  this.permissions[module][key1].push(permission);
                  update = true;
                  break;
                }
                if (!update && childFlag == Object.keys(this.permissions[key]).length && sub_module != undefined) {
                  var arr: any = [];
                  var obj: any = {};
                  arr.push(permission);
                  obj = {
                    [sub_module]: arr
                  }
                  this.permissions[module] = Object.assign(obj, this.permissions[module])
                  update = true;
                  break;
                }
              }
            }
            else {
              this.permissions[module].push(permission);
              break;
            }
          }
          if (!update && flag == Object.keys(this.permissions).length) {
            if (sub_module != undefined) {
              var arr: any = [];
              var obj: any = {};
              arr.push(permission);
              obj = {
                [sub_module]: arr
              }
              this.permissions[module] = Object.assign(obj, this.permissions[module])
              update = true;
              break;
            }
            else {
              var arr: any = [];
              arr.push(permission);
              this.permissions[module] = arr;
              break;
            }
          }
        }
      } else {
        if (Object.keys(this.permissions).length == 0) {
          if (sub_module != undefined) {
            var arr: any = [];
            var obj: any = {};
            arr.push(permission);
            obj = {
              [sub_module]: arr
            }
            this.permissions[module] = obj;
          }
          else {
            var arr: any = [];
            arr.push(permission);
            this.permissions[module] = arr;
          }
        }
      }
    }
    else {
      for (let key in this.permissions) {
        if (key == module) {
          if (Object.keys(this.permissions[key]).length > 0 && sub_module != undefined) {
            for (let key1 in this.permissions[key]) {
              if (key1 == sub_module) {
                for (let i = 0; i < this.permissions[key][key1].length; i++) {
                  if (this.permissions[key][key1][i] == permission) {
                    this.permissions[key][key1].splice(i, 1);
                    if (this.permissions[key][key1].length == 0) {
                      delete this.permissions[key][key1];
                    }
                    if (Object.keys(this.permissions[key]).length == 0) {
                      delete this.permissions[key];
                    }
                    break;
                  }
                }
              }
            }
          }
          else {
            for (let i = 0; i < this.permissions[key].length; i++) {
              if (this.permissions[key][i] == permission) {
                this.permissions[key].splice(i, 1);
                if (Object.keys(this.permissions[key]).length == 0) {
                  delete this.permissions[key];
                }
                break;
              }
            }
          }
        }
      }
    }
  }

  createRole() {
    this.submitted = true
    this.accessPermissionFlag = 0;
    if (this.submitted && this.roleName == "") {
      return;
    }

    if (Object.keys(this.permissions).length == 0) {
      this.noAccessPermissionSelected = true;
      return;
    }

    var data = {
      "title": this.roleName,
      "permissions": this.permissions
    }

    this.userService.getOrCreateRole(data).subscribe((res) => {
      this.toastService.showSuccess("Role created successfully!")
      this.userService.changeUpdateListFlagValue(true);
      this.modalService.closeModal();
    })
  }

  updateRole() {
    this.submitted = true
    this.accessPermissionFlag = 0;
    if (this.submitted && this.roleName == "") {
      return;
    }

    if (Object.keys(this.permissions).length == 0) {
      this.noAccessPermissionSelected = true;
      return;
    }

    var data = {
      "id": this.roleId,
      "title": this.roleName,
      "permissions": this.permissions
    }

    this.userService.updateRole(data).subscribe((res) => {
      this.toastService.showSuccess("Role updated successfully!")
      this.userService.changeUpdateListFlagValue(true);
      this.modalService.closeModal();
    })
  }
}
