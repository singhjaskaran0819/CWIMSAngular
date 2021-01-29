import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngModal: NgbModal) { }

  modal;
  openModal(component: any, data?: any, size?: any) {
    this.modal = this.ngModal.open(component, {
      size: size ? size : 'md',
      centered: true,
      backdrop: 'static'
    });
    if (data) {
      Object.keys(data).forEach(key => {
        this.modal.componentInstance[key] = data[key];
      });
    }
  }

  closeModal(value?) {
    this.modal.close();
  }

}
