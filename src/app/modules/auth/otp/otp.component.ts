import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
import { SwalService } from 'src/app/common/swal.service';
import { timer, Subscription } from "rxjs";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss', '../login/login.component.scss']
})
export class OtpComponent implements OnInit {

  otpSent = false;
  otp = "";
  countDown: Subscription;
  counter = 180;
  tick = 1000;

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
    this.authService.otpSent.subscribe((res) => {
      console.log("res: ", res)
      this.otpSent = res;
      if (this.otpSent) {
        this.expirationCounter();
      }
      else {
        this.router.navigateByUrl('/auth/login');
      }
    })
  }

  expirationCounter() {
    // this.countDown: Subscription;
    this.counter = 180;
    // this.tick = 1000;
    console.log(this.counter)
    timer(0, 1000).subscribe(() => {
      if (this.counter != 0) {
        --this.counter
      }
    });
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  verifyOtp() {
    let data = {
      "otp": this.otp,
      // "role": sessionStorage.getItem("roleCode"),
      "email": sessionStorage.getItem("email")
    }

    this.authService.verifyOtp(data).subscribe((res) => {
      if (res) {
        this.swal.successSwal(res.msg);
        // sessionStorage.setItem("isLoggedIn", "true");
        // sessionStorage.setItem("token", res.data);
        // this.authService.loggedIn();
        this.router.navigateByUrl('/auth/login');
      }
    })
  }
  signIn() {
    this.router.navigateByUrl('/auth/login');
  }

  resendOtp() {
    var data = {
      // "role": sessionStorage.getItem("roleCode"),
      "email": sessionStorage.getItem("email")
    }
    this.authService.resendOtp(data).subscribe((res) => {
      if (res) {
        if (res.statusCode == 200) {
          this.authService.changeOtpSent(true);
          // this.countDown.unsubscribe();
          this.swal.successSwal(res.msg);
          this.expirationCounter();
        }
      }
    })
  }

  ngOnDestroy() {
    this.countDown = null;
  }

}
