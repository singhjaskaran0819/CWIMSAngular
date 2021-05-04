import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DECLARATION_STATUS, REGEX } from 'src/app/common/constants';
import { SwalService } from 'src/app/common/swal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.scss', '../login/login.component.scss']
})
export class PendingApprovalComponent implements OnInit {

  pendingApprovalForm;
  submitted = false;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private swal: SwalService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.pendingApprovalForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]]
    });
  }
  get controls() {
    return this.pendingApprovalForm.controls;
  }

  close() {
    this.modalService.closeModal();
  }

  generateOtp() {
    this.submitted = true;
    sessionStorage.setItem('email', this.pendingApprovalForm.value.email,)
    if (this.pendingApprovalForm.invalid) {
      return;
    }
    var data = {
      "email": sessionStorage.getItem("email")
    }
    this.authService.resendOtp(data).subscribe((res) => {
      if (res) {
        if (res.statusCode == 200) {
          this.swal.successSwal(res.msg);
          // this.modalService.closeModal();
          this.router.navigateByUrl('/auth/otp');
        }
      }
    })
  }

}

