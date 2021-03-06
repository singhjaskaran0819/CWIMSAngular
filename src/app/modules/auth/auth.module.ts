import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { LoaderService } from '../../core/services/loader.service';
import { OtpComponent } from './otp/otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { EditInformationComponent } from './edit-information/edit-information.component';
import { PendingApprovalComponent } from './pending-approval/pending-approval.component';
// import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { FormatTimePipe } from '../../core/pipes/format-time.pipe';

import { otpGuard } from '../../core/guards/auth-guard';

const route: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'otp', canActivate: [otpGuard], component: OtpComponent },
  { path: 're-ge-veri', component: PendingApprovalComponent },
  { path: 'edit/:userId', component: EditInformationComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OtpComponent,
    SignUpComponent,
    EditInformationComponent,
    PendingApprovalComponent,
    FormatTimePipe
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    NgxCaptchaModule,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    RouterModule.forChild(route)
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
    otpGuard
    // LoaderService,
    // ToastMessageService
  ]
})
export class AuthModule { }
