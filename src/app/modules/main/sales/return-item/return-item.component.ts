import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { SalesService } from 'src/app/core/services/sales.service';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.scss']
})
export class ReturnItemComponent implements OnInit {

  constructor(private modalService: ModalService, private salesService: SalesService) { }

  ngOnInit(): void {
  }
  confirmReturn() {

  }

  goToList() {
    this.salesService.changeReturnItemFlag(false);
  }
}
