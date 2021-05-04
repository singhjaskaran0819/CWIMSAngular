import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  messageData;
  replyForm;
  submitted = false;
  constructor(private modalService: ModalService, private declarationService: DeclarationsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.replyForm = this.formBuilder.group({
      reply: ['', Validators.required]
    });
  }
  get controls() {
    return this.replyForm.controls;
  }

  cancelReply() {
    this.modalService.closeModal();
  }

  sendReply() {

    this.submitted = true;
    if (this.replyForm.invalid) {
      return;
    }
    var data = {
      "id": this.messageData.id,
      "reply": this.replyForm.value.reply
    }
    this.declarationService.replyToMessage(data).subscribe((res) => {
      this.declarationService.changeUpdatedMessage(true);
    })

    this.modalService.closeModal();
  }
}
