import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import * as moment from 'moment';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  saleData;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    console.log("this.saleData : ", this.saleData)
  }

  getDate(date) {
    return moment(date).format("LL")
  }

  closeModal() {
    this.modalService.closeModal()
  }
}
