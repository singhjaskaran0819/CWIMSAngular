import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ROLE_CODE } from '../../../common/constants';
import { SwalService } from 'src/app/common/swal.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails;
  roleCode;
  constructor(private sharedService: SharedService, private authService: AuthService, private swal: SwalService, private router: Router, private userService: UserService) {
    this.sharedService.getAccountUpdates().subscribe(res => {
      this.getUserDetails();
    })
  }

  ngOnInit(): void {
    this.userService.updateProfileFlag.subscribe((res) => {
      if (res) {
        this.getUserDetails();
      }
    })
    this.getUserDetails();
  }

  hamburger_menu() {
    var para = document.getElementById("sidebar_menu");
    para.classList.toggle("hide_menu");
    var para = document.getElementById("main_section");
    para.classList.toggle("full_mode");
    var para = document.getElementById("top_header");
    para.classList.toggle("header_full");

  }
  profilePic;
  getUserDetails() {
    this.sharedService.getHeaderDetails().subscribe((response) => {
      this.userDetails = response.data;
      this.profilePic = this.userDetails?.profilePicture;
      this.roleCode = this.userDetails?.userrole?.id;
      sessionStorage.setItem('warehouseCode', this.userDetails?.warehouse?.code)
      sessionStorage.setItem('roleNature', this.userDetails?.userrole?.nature)
    })
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

  // open my account page 
  openMyAccount() {
    this.router.navigateByUrl('main/my-profile')
  }
}
