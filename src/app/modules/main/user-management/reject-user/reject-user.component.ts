import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { APPROVE_USER, MODAL_SIZE } from 'src/app/common/constants';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-reject-user',
  templateUrl: './reject-user.component.html',
  styleUrls: ['./reject-user.component.scss']
})
export class RejectUserComponent implements OnInit {

  userDetails;
  type;
  rejectForm;
  submitted = false;

  constructor(private modalService: ModalService, private userService: UserService, private formBuilder: FormBuilder, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.rejectForm = this.formBuilder.group({
      rejectionReason: ['', Validators.required]
    });
  }
  get controls() {
    return this.rejectForm.controls;
  }

  cancel() {
    this.modalService.closeModal();
  }

  rejectUser() {
    this.submitted = true;
    if (this.rejectForm.invalid) {
      return;
    }

    if (this.type) {
      this.userDetails.rejectionReason = this.rejectForm.value.rejectionReason;
      console.log(" this.userDetails: ", this.userDetails)
      this.inventoryService.approveRejectVarianceReport(this.userDetails).subscribe((res) => {
        console.log(res);
        this.inventoryService.changeVarianceReportRejectionFlagValue(true);
        this.modalService.closeModal();
      })
    } else {
      var data = {
        "email": this.userDetails.email,
        "status": APPROVE_USER.Rejected,
        "rejectionReason": this.rejectForm.value.rejectionReason
      }

      this.userService.approveRejectUser(data).subscribe((res) => {
        this.userService.changeUpdateListFlagValue(true);
        this.modalService.closeModal();
      })
    }
  }

}
