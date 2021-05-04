import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DECLARATION_STATUS } from 'src/app/common/constants';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.scss']
})
export class RejectComponent implements OnInit {

  declarationId;
  rejectForm;
  submitted = false;
  sadItemId;
  constructor(private modalService: ModalService, private declarationService: DeclarationsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.declarationService.goodsId.subscribe((itemId) => {
      this.sadItemId = itemId;
    })
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

  reject() {
    this.submitted = true;
    if (this.rejectForm.invalid) {
      return;
    }

    var data = {
      "id": this.sadItemId,
      "reason": this.rejectForm.value.rejectionReason,
      "operation": DECLARATION_STATUS.REJECTED  // 1 approve, 2 reject
    }

    this.declarationService.approveRejectRackedItems(data).subscribe((res) => {
      this.declarationService.changeUpdatedMessage(true);
      this.modalService.closeModal();
    })
  }
}
