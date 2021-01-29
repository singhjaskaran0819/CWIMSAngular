import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-access-permission',
  templateUrl: './access-permission.component.html',
  styleUrls: ['./access-permission.component.scss']
})
export class AccessPermissionComponent implements OnInit {

  data;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  cancelAccess() {
    this.modalService.closeModal();
  }
  allowAccess() {
    this.modalService.closeModal();
  }
}
