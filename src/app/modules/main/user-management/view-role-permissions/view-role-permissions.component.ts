import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/core/services/main.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-role-permissions',
  templateUrl: './view-role-permissions.component.html',
  styleUrls: ['./view-role-permissions.component.scss']
})
export class ViewRolePermissionsComponent implements OnInit {

  accessPermissions;
  roleId;
  arr = [];
  permissionObj = {};
  modules;
  subModules;
  constructor(private mainService: MainService, private userService: UserService, private modalService: ModalService) { }

  ngOnInit(): void {
    var data = {
      "id": this.roleId
    }
    this.userService.getPermissionsByRole(data).subscribe((res) => {
      this.accessPermissions = res.data.permissions;
      let temp = [];
      Object.keys(this.accessPermissions).forEach((item, i) => {
        if (_.isArray(this.accessPermissions[item])) {
          let obj = {
            key: item,
            value: this.accessPermissions[item]
          }
          temp.push(obj)
        } else if (_.isPlainObject(this.accessPermissions[item])) {
          let innerarr = [];
          Object.keys(this.accessPermissions[item]).forEach((item1, j) => {
            innerarr = [...innerarr, ...this.accessPermissions[item][item1]]
          })
          let obj = {
            key: item,
            value: innerarr
          }
          temp.push(obj)
        }
      });

      temp = temp.map(item => {
        if (_.isArray(item.value)) {
          return item;
        } else if (_.isPlainObject(item.value)) {
          let innerArr = [];
          Object.keys(item.value).forEach((item1, j) => {
            innerArr.push(item.value[item1])
          })
          return {
            key: item.key,
            value: innerArr
          };
        }
      })
      this.accessPermissions = temp;
    })
  }

  childItems = [];
  checkIfSubChild(value) {
    this.childItems = [];
    for (var key in value) {
      if (value[key].length > 0) {
        this.childItems.push(value[key])
      }
    }
    return this.childItems;
  }

  close() {
    this.modalService.closeModal();
  }

}
