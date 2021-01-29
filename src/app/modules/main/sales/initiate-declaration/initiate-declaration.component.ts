import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-initiate-declaration',
  templateUrl: './initiate-declaration.component.html',
  styleUrls: ['./initiate-declaration.component.scss']
})
export class InitiateDeclarationComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }


  cancel() {
    this.modalService.closeModal();
  }

  submit() {
    this.modalService.closeModal();
  }
}
