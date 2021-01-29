import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX, ROLE_CODE } from '../../../common/constants';
import { HttpClient } from '@angular/common/http';
import { SwalService } from 'src/app/common/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../login/login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router, private swal: SwalService, private httpClient: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) { }

  submitted = false;

  siteKey = environment.siteKey;

  ngOnInit(): void {
    this.submitted = false;
    this.initForm();
  }

  public forgotPasswordForm: FormGroup;

  initForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.EMAIL)])],
      recaptcha: ['', Validators.required]
    });
  }

  get controls() {
    return this.forgotPasswordForm.controls;
  }

  signIn() {
    this.router.navigateByUrl('/auth/login');
  }

  async forgotPassword() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    } else {
      var data = {
        "email": this.forgotPasswordForm.value.email
      }
      this.authService.forgotPassword(data).subscribe(async res => {
        await this.swal.successSwal(res.msg);
      })
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
