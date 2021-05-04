import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { InventoryService } from 'src/app/core/services/inventory.service'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { APIS } from 'src/app/common/constants';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss', '../inventory.component.scss']
})
export class InventoryDetailsComponent implements OnInit {

  data;
  groupItemsFlag;
  constructor(private modalService: ModalService, public inventoryService: InventoryService, private http: HttpClient) { }

  details;
  groupItemDetails;
  ngOnInit(): void {

    this.inventoryService.groupItemFlag.subscribe((res) => {
      this.groupItemsFlag = res;
    })

    if (this.groupItemsFlag) {
      this.inventoryService.getGroupedItemListDetails(this.data.productCode).subscribe((res) => {
        this.groupItemDetails = res.data;
      })
    }
    else {
      this.inventoryService.getInventoryDetailsById(this.data).subscribe(res => {
        this.details = res.data;
      });
    }
  }

  closeModal() {
    this.modalService.closeModal()
  }
}
