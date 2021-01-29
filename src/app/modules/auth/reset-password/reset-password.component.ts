import { ToastMessageService } from './../../../core/services/toast-message.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX } from '../../../common/constants'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../login/login.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;
  resetPasswordForm;
  notMatching = false;
  token;
  constructor(private router: Router, private toastr: ToastMessageService, private formBuilder: FormBuilder, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.submitted = false;
    this.notMatching = false;

    this.activatedRoute.params.subscribe((params) => {
      this.token = params['id'];

    });
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  get controls() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      if (this.resetPasswordForm.value.newPassword !== this.resetPasswordForm.value.confirmPassword) {
        this.toastr.showError('New password and confirm password should match');
        return;
      }
      var data = {
        "token": this.token,
        "password": this.resetPasswordForm.value.newPassword
      }

      this.authService.resetPassword(data).subscribe((res) => {
        this.router.navigateByUrl('/auth/login');
      })
    }
  }

  signIn() {
    this.router.navigateByUrl('/auth/login');
  }

}
