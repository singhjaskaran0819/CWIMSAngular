import { Component, OnInit } from '@angular/core';
import { SwalService } from 'src/app/common/swal.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SalesService } from 'src/app/core/services/sales.service';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.scss']
})
export class ReturnItemComponent implements OnInit {

  constructor(private modalService: ModalService, private swalService: SwalService, private salesService: SalesService) { }

  ngOnInit(): void {

  }

  async confirmReturn() {
    let swal_data = await this.swalService.warningSwal("Confirm return", `Do you want to return the products?`)
    // if (swal_data.value) {
    // var data = {
    //   "id": id,
    //   "type": roleType
    // }
    // this.userService.deleteRole(data).subscribe(res => {
    //   this.getRolesList(this.default_pagination);
    // });
    // }
  }

  goToList() {
    this.salesService.changeReturnItemFlag(false);
  }
}
