import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { ReceiptComponent } from '../receipt/receipt.component';
import { MODAL_SIZE } from '../../../../common/constants';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  constructor(private modalService: ModalService, private salesService: SalesService) { }

  role;

  ngOnInit(): void {
    this.role = sessionStorage.getItem("roleCode");

  }

  // closeModal() {
  //   this.modalService.closeModal()
  // }

  // goToDetails(data?) {
  //   this.modalService.openModal(ReceiptComponent, { "data": data }, MODAL_SIZE.LARGE)
  // }


}
