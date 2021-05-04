import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { REGEX, ROLE_CODE } from '../../../../common/constants';
import { ToastMessageService } from '../../../../core/services/toast-message.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.component.html',
  styleUrls: ['./group-items.component.scss']
})
export class GroupItemsComponent implements OnInit {

  data;
  items;
  groupItemsForm;
  quantity;
  selectedProducts = [];
  submitted = false;
  invalidForm = false;
  emptyQuantity = false;
  locationCode;
  quantityLess = false;
  quantityLessThanZero = false;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private inventoryService: InventoryService, private router: Router) { }

  ngOnInit(): void {
    this.locationCode = this.data[0]?.locationCode;
    this.items = [...this.data];
    this.initForm();

    this.selectedProducts = [];
    console.log(this.items)
    for (var i = 0; i < this.items.length; i++) {
      this.selectedProducts.push({
        "productId": this.items[i].productID.trim(),
        "quantity": ''
      });
    }
    console.log(this.selectedProducts)
  }

  initForm() {
    this.groupItemsForm = this.formBuilder.group({
      productCode: ['', [Validators.required]],
      description: ['', [Validators.required]],
      groupQty: ['', [Validators.required, Validators.pattern(REGEX.NUMER_GREATER_THAN_0)]]
      // products: this.formBuilder.array([this.quantityForm()])
    });
  }
  get controls() {
    // console.log(this.groupItemsForm.controls)
    return this.groupItemsForm.controls;
  }

  cancelGrouping() {
    this.modalService.closeModal();
  }

  quantityOfItemsChanged() {
    this.emptyQuantity = false;
    for (var i = 0; i < this.selectedProducts.length; i++) {
      if (this.selectedProducts[i].quantity == "" || this.selectedProducts[i].quantity == null || this.selectedProducts[i].quantity == undefined) {
        this.emptyQuantity = true;
        return;
      }
    }
  }

  applyGrouping() {
    console.log(this.groupItemsForm)
    console.log(this.groupItemsForm.value.groupQty)
    this.submitted = true;
    this.quantityLess = false;
    this.quantityLessThanZero = false;
    this.emptyQuantity = false;
    if (this.groupItemsForm.invalid) {
      this.invalidForm = true;
      for (var i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i].quantity === "" || this.selectedProducts[i].quantity === null || this.selectedProducts[i].quantity === undefined) {
          this.emptyQuantity = true;
          return;
        }
      }
      return;
    }
    for (var i = 0; i < this.selectedProducts.length; i++) {
      console.log(i)
      console.log(this.selectedProducts[i].quantity)
      if (this.selectedProducts[i].quantity === "" || this.selectedProducts[i].quantity === null || this.selectedProducts[i].quantity === undefined) {
        this.emptyQuantity = true;
        return;
      }
    }

    for (var i = 0; i < this.selectedProducts.length; i++) {
      console.log(this.selectedProducts[i])
      let selectedValue = _.find(this.data, { productID: this.selectedProducts[i].productId })
      console.log(this.selectedProducts[i].quantity < 0)
      if (this.selectedProducts[i].quantity < 0 || this.selectedProducts[i].quantity == 0) {
        this.quantityLessThanZero = true;
        return;
      }

      if ((selectedValue.remainingQuantity - this.selectedProducts[i].quantity) < 0) {
        this.quantityLess = true;
        return;
      }
    }

    var data = {
      "productCode": this.groupItemsForm.value.productCode.trim(),
      "locationCode": this.locationCode,
      "description": this.groupItemsForm.value.description.trim(),
      "groupQty": this.groupItemsForm.value.groupQty,
      "products": this.selectedProducts
    }

    this.inventoryService.groupItems(data).subscribe((res) => {
      this.modalService.closeModal();
      this.router.navigateByUrl("/main/inventory/grouped-items");
    })
  }

}
