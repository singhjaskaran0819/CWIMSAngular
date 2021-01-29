import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SIDEBAR_ITEMS } from './../../../common/sidebar';
import { ROLE_CODE } from './../../../common/constants';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from 'src/app/core/services/auth.service';
import { SwalService } from 'src/app/common/swal.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { MainService } from 'src/app/core/services/main.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sidebar;
  sidebarItems = [];
  permissions;
  constructor(private router: Router, private authService: AuthService, private swal: SwalService, private sharedService: SharedService, private mainService: MainService) { }

  ngOnInit(): void {
    // if (sessionStorage.getItem("roleCode") == "0") {
    //   this.sidebarItems = _.cloneDeep(SIDEBAR_ITEMS['API CONSUMER']);
    // }
    // if (sessionStorage.getItem("roleCode") == "1") {
    //   this.sidebarItems = _.cloneDeep(SIDEBAR_ITEMS.OPERATOR);
    // }
    // if (sessionStorage.getItem("roleCode") == "2") {
    // this.sidebarItems = _.cloneDeep(SIDEBAR_ITEMS);
    // }

    if (sessionStorage.getItem('token')) {
      this.authService.getPermissions().subscribe((res) => {
        this.permissions = res.data.permissions;
        this.mainService.setAssignedPermissions(this.permissions)
        this.sidebarItems = _.cloneDeep(SIDEBAR_ITEMS);
        for (var key in this.permissions) {
          for (var i = 0; i < this.sidebarItems.length; i++) {
            if (key.toLowerCase() == this.sidebarItems[i].htmlName.toLowerCase()) {
              this.sidebarItems[i].accessAllowed = true;
              if (Object.keys(this.permissions[key])?.length > 0 && this.sidebarItems[i]?.children?.length > 0) {
                for (var key1 in this.permissions[key]) {
                  for (var j = 0; j < this.sidebarItems[i].children.length; j++) {
                    if (this.sidebarItems[i].children[j].htmlName?.toLowerCase() == key1.toLowerCase()) {
                      this.sidebarItems[i].children[j].accessAllowed = true;
                      break;
                    }
                  }
                }
              }
              break;
            }
          }
        }
      })
    }
  }

  isActive(link) {
    return this.router.isActive(link, true)
  }

  cwimsLogoClick() {
    this.router.navigateByUrl('/main/declarations');
  }

  hide_menu() {
    var para = document.getElementById("sidebar_menu");
    para.classList.toggle("hide_menu");
    var para = document.getElementById("main_section");
    para.classList.toggle("full_mode");
    var para = document.getElementById("top_header");
    para.classList.toggle("header_full");
  }

  async logout() {
    let swal_data = await this.swal.logoutSwal();
    if (swal_data.value) {
      this.authService.logout().subscribe(res => {
        sessionStorage.clear();
        this.router.navigateByUrl("auth");
      });
    }
  }

  itemClicked(event) {
    if (event.target.outerText.toLowerCase() == "sales") {
      this.router.navigateByUrl("main/sales/salesmain");
    }
  }

}
