import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { REGEX } from '../../../../common/constants';

@Component({
  selector: 'app-edit-stock-take',
  templateUrl: './edit-stock-take.component.html',
  styleUrls: ['./edit-stock-take.component.scss']
})
export class EditStockTakeComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  stockTakeItem;
  id;
  inventoryItemStatus;
  productsArray = [];
  productSelectedFlag = false;
  productSearchFlag = false;

  constructor(public inventoryService: InventoryService, private modalService: ModalService, private formBuilder: FormBuilder, private router: Router, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    this.initForm();
    console.log("stockTakeItem:", this.stockTakeItem)
    this.id = this.stockTakeItem.id;
  }

  initForm() {
    this.form = this.formBuilder.group({
      warehouseCode: [''],
      locationCode: [''],
      subLocation: [''],
      productCode: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stockTakeQuantity: ['', [Validators.required, Validators.pattern(REGEX.NUMER_GREATER_THAN_0)]]
      // products: this.formBuilder.array([this.initalItemsRow()])
    })
    this.form.controls['productCode'].patchValue(this.stockTakeItem.productID);
    this.form.controls['locationCode'].patchValue(this.stockTakeItem.locationCode);
    this.form.controls['description'].patchValue(this.stockTakeItem.description);
    this.form.controls['stockTakeQuantity'].patchValue(this.stockTakeItem.qty);
    this.form.controls['warehouseCode'].patchValue(this.stockTakeItem.warehouseCode);
    this.form.controls['subLocation'].patchValue(this.stockTakeItem.subLocation);
  }

  get controls() {
    return this.form.controls;
  }

  cancel() {
    this.modalService.closeModal();
  }

  // editItem(item) {
  //   console.log(item)
  //   // this.editItemFlag = true;
  //   this.id = item.id;
  //   this.form.controls['productCode'].patchValue(item.productID);
  //   this.form.controls['description'].patchValue(item.description);
  //   this.form.controls['stockTakeQuantity'].patchValue(item.qty);
  //   this.form.controls['warehouseCode'].patchValue(item.warehouseCode);
  //   this.form.controls['subLocation'].patchValue(item.subLocation);

  //   this.inventoryService.getWarehouseByCode(item.warehouseCode).subscribe(res => {
  //     // this.locations = res.data.warehouselocations;
  //     this.form.controls['locationCode'].patchValue(item.locationCode);
  //   });
  //   this.form.controls['warehouseCode'].disable();
  //   this.form.controls['locationCode'].disable();
  // }

  editStockTake() {
    this.submitted = true;
    // console.log(item)
    console.log(this.form.controls)
    console.log(this.form.controls.stockTakeQuantity.invalid)
    console.log(this.form.controls.stockTakeQuantity.errors)

    if (this.form.controls.productCode.invalid || this.form.controls.stockTakeQuantity.invalid || this.form.controls.description.invalid) {
      return;
    } else {
      console.log(this.form.controls.stockTakeQuantity.value)

      var data = {
        "id": this.id,
        "productID": this.form.controls.productCode.value,
        "qty": this.form.controls.stockTakeQuantity.value,
        "description": this.form.controls.description.value,
        "inventoryItemStatus": this.inventoryItemStatus,
        "subLocation": this.form.controls.subLocation.value
      }
      this.inventoryService.editStockTakeItems(data).subscribe((res) => {
        console.log("res", res)
        if (res.statusCode == 200) {
          this.inventoryService.changeUpdateStockTakeFlagValue(true);
          this.form.controls['warehouseCode'].enable();
          this.form.controls['locationCode'].enable();
          this.toastService.showSuccess("Item updated successfully!")
          this.submitted = false;
          this.modalService.closeModal();

          // this.editItemFlag = false;
          // this.getStockTakeItems({ ...this.default_pagination, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) });
          this.form.reset();
          // this.form.controls['productCode'].reset();
          // this.form.controls['stockTakeQuantity'].reset();
          // this.form.controls['description'].reset();
          // this.form.controls['subLocation'].reset();
        }
      })
    }
  }

  checkIfItemNotFound(event) {
    this.inventoryItemStatus = 1;
    this.inventoryService.checkIfProductExist({ "productID": event.target.value }).subscribe((res) => {
      console.log("res", res)
      if (res.statusCode == 200) {
        this.inventoryItemStatus = 0;
      }
    })
  }

  selectedProductId(item) {
    console.log(item)
    console.log(this.form.controls.description.value)
    this.productSelectedFlag = true;
    this.inventoryItemStatus = 1;
    this.form.controls['productCode'].patchValue(item.productID);
    this.form.controls['description'].patchValue(item.description);
    this.productsArray = [];
  }

  searchProductId(event) {
    this.productsArray = [];
    console.log("form.controls.locationCode.value ", this.form.controls.locationCode.value)

    this.productSelectedFlag = false;
    this.form.controls['stockTakeQuantity'].reset();
    this.form.controls['description'].reset();
    console.log(event.target.value)
    var data = {
      "locationCode": this.form.controls.locationCode.value,
      "searchKey": event.target.value
    }
    if (event.target.value == '') {
      this.productSearchFlag = false;
      this.inventoryItemStatus = 1;
      // this.productsArray = [];
      this.form.controls['stockTakeQuantity'].reset();
      this.form.controls['description'].reset();
      return;
    }

    this.productSearchFlag = true;
    this.inventoryService.getProductIdByLocation(data).subscribe(res => {
      // this.locationSelected = true;
      this.productsArray = res.data;
    });
  }

}
