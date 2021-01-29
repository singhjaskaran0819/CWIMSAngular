import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
import { SwalService } from 'src/app/common/swal.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss', '../login/login.component.scss']
})
export class OtpComponent implements OnInit {

  otp = "";

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(private router: Router, private authService: AuthService, private swal: SwalService) { }

  ngOnInit(): void {
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  verifyOtp() {
    let data = {
      "otp": this.otp,
      "role": sessionStorage.getItem("roleCode"),
      "email": sessionStorage.getItem("email")
    }

    this.authService.verifyOtp(data).subscribe((res) => {
      if (res) {
        this.swal.successSwal(res.msg);

        this.router.navigateByUrl('/auth/login');

      }
    })
  }
  signIn() {
    this.router.navigateByUrl('/auth/login');
  }

  resendOtp() {
    var data = {
      "role": sessionStorage.getItem("roleCode"),
      "email": sessionStorage.getItem("email")
    }
    this.authService.resendOtp(data).subscribe((res) => {
      if (res) {
        if (res.statusCode == 200) {
          alert("otp sent!")
        }
      }
    })
  }

}
