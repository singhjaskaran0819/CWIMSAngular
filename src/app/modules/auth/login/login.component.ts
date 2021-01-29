import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
// import { LoaderService } from '../../../core/services/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX, ROLE_CODE } from '../../../common/constants';
import { ToastMessageService } from '../../../core/services/toast-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastService: ToastMessageService) { }

  passwordType = 'password';
  loginForm;
  submitted = false;

  siteKey = environment.siteKey;

  ngOnInit(): void {
    this.submitted = false;
    this.initForm();

  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      password: ['', [Validators.required]],
      recaptcha: ['', Validators.required]

    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  forgotPassword() {
    this.router.navigateByUrl('/auth/forgot-password');
  }


  signIn() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      let data = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
      this.authService.loginPost(data).subscribe((res) => {
        sessionStorage.setItem("token", res.data.accessToken);
        sessionStorage.setItem("roleCode", res.data.role);
        sessionStorage.setItem("roleTitle", res.data.roleTitle);
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("email", this.loginForm.value.email)
        this.router.navigateByUrl('/main');

      })
    }
  }

  goToSignUp() {
    this.router.navigateByUrl('/auth/sign-up');
  }

  togglePassword() {
    if (this.passwordType == 'text') {
      this.passwordType = 'password';
    } else if (this.passwordType == 'password') {
      this.passwordType = 'text';
    }
  }

  handleSuccessRecaptcha(event) {
    var data = {
      "recaptcha": event
    }

    this.authService.validateCaptcha(data).subscribe((res) => {
    })
  }

}



