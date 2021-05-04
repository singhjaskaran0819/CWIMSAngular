import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APIS } from '../../common/constants';
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);
  otpSent = new BehaviorSubject(false);

  constructor(private httpService: HttpService, private router: Router) {
  }

  loggedIn() {
    this.isLoggedIn.next(true);
  }

  notLoggedIn() {
    this.isLoggedIn.next(false);
  }

  changeOtpSent(value) {
    this.otpSent.next(value);
  }

  getWarehouseDetails() {
    return this.httpService.getData(APIS.AUTH.WAREHOUSE_LIST);
  }

  getPermissions() {
    return this.httpService.getData(APIS.USER.GET_PERMISSIONS);
  }
  getRoles() {
    return this.httpService.getData(APIS.AUTH.GET_ROLES);
  }

  uploadImage(data) {
    return this.httpService.postData(APIS.IMAGE.PROFILE_PIC, data);
  }

  signUp(data, queryParams?) {
    return this.httpService.postData(APIS.AUTH.SIGN_UP, data, queryParams);
  }

  validateCaptcha(data) {
    return this.httpService.postData(APIS.AUTH.VALIDATE_CAPTCHA, data);
  }

  loginPost(data) {
    return this.httpService.postData(APIS.AUTH.LOGIN, data);
  }

  forgotPassword(data) {
    return this.httpService.postData(APIS.AUTH.FORGOT_PASSWORD, data);
  }

  resetPassword(data) {
    return this.httpService.putData(APIS.AUTH.RESET_PASSWORD, data);
  }

  verifyOtp(data) {
    return this.httpService.postData(APIS.AUTH.VERIFY_OTP, data);
  }

  resendOtp(data) {
    return this.httpService.postData(APIS.AUTH.RESEND_OTP, data);
  }

  logout(data?) {
    return this.httpService.getData(APIS.AUTH.LOGOUT, data);
  }

  getOtp(data?) {
    return this.httpService.getData(APIS.AUTH.GET_OTP, data);
  }
}
