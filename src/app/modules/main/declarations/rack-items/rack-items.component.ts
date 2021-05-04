import { Component, OnInit } from '@angular/core';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { MainService } from 'src/app/core/services/main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';
@Component({
  selector: 'app-rack-items',
  templateUrl: './rack-items.component.html',
  styleUrls: ['./rack-items.component.scss']
})
export class RackItemsComponent implements OnInit {

  sadItem;
  submitted = false;
  rackItemsForm;
  rackedItemsArray = [];
  enableApply = false;
  customValueFlag = false;
  customValueFlag1 = false;
  quantityGreater = false;
  remainingQuantity;
  remainingcustomValue;
  // totalRackedItemsQuantity = 0;
  totalCustomValueOfRackedItems = 0;
  isRacked;
  declarationItem;

  constructor(private declarationService: DeclarationsService, private modalService: ModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log("this.sadItem: ", this.sadItem)

    this.remainingQuantity = this.sadItem.qty;
    this.remainingcustomValue = this.sadItem.customsValue;
    console.log("this.remainingcustomValue: ", this.remainingcustomValue)
    console.log("this.remainingQuantity: ", this.remainingQuantity)
    console.log("this.declarationItem: ", this.declarationItem)

    this.rackedItemsArray = [];
    this.initForm();

    if (this.sadItem.isLiquor) {
      this.rackItemsForm.get('supplementaryValue').setValidators([Validators.required]);
      this.rackItemsForm.get('supplementaryValue').updateValueAndValidity();
    }
    if (this.isRacked) {
      this.enableApply = true;
      // this.initForm();
      this.remainingcustomValue = this.sadItem.customsValue;
      console.log("this.remainingcustomValue: ", this.remainingcustomValue)
      this.rackItemsForm.patchValue({ description: this.sadItem.description })
      this.rackItemsForm.patchValue({ quantity: this.sadItem.qty })
      // this.sadItem.subLocation && this.rackItemsForm.patchValue({ subLocation: this.sadItem.subLocation })
      this.rackItemsForm.patchValue({ customsValue: this.sadItem.customsValue })
      this.rackItemsForm.patchValue({ productCode: this.sadItem.productID })
      this.rackItemsForm.patchValue({ weight: this.sadItem.weight })
    }
  }

  initForm() {
    this.rackItemsForm = this.formBuilder.group({
      productCode: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(REGEX.NUMER_GREATER_THAN_0)]],
      customsValue: ['', [Validators.required, Validators.pattern(REGEX.NUMER_GREATER_THAN_0)]],
      weight: ['', Validators.required],
      // subLocation: [''],
      supplementaryValue: ['']
    });
  }
  get controls() {
    return this.rackItemsForm.controls;
  }

  cancel() {
    this.modalService.closeModal()
  }

  nextOrApply() {

    console.log("this.sadItem", this.sadItem)
    console.log("this.rackItemsForm.value", this.rackItemsForm.value)

    if (!this.isRacked) {
      this.submitted = true;
      if (this.rackItemsForm.invalid) {
        return;
      }
      if (!this.customValueFlag && ((Number(this.rackItemsForm.value.customsValue)) == Number(this.remainingcustomValue)) && (this.remainingQuantity - Number(this.rackItemsForm.value.quantity)) > 0) {
        this.customValueFlag = false;
        this.customValueFlag1 = true;
        return;
      }
      if (this.customValueFlag || this.quantityGreater || this.customValueFlag1) {
        return;
      }

      var data = {
        "productID": this.rackItemsForm.value.productCode,
        "description": this.rackItemsForm.value.description,
        "qty": Number(this.rackItemsForm.value.quantity),
        // ...(this.rackItemsForm.value.subLocation && { "subLocation": this.rackItemsForm.value.subLocation }),
        "weight": Number(this.rackItemsForm.value.weight),
        "customsValue": Number(this.rackItemsForm.value.customsValue)
      }

      if (this.rackItemsForm.value.supplementaryValue != "" && this.sadItem.isLiquor) {
        data["supplementryValue"] = Number(this.rackItemsForm.value.supplementaryValue)
      }

      this.rackedItemsArray.push(data);
      this.remainingQuantity = this.remainingQuantity - Number(this.rackItemsForm.value.quantity)
      this.remainingcustomValue = this.remainingcustomValue - Number(this.rackItemsForm.value.customsValue)
      this.totalCustomValueOfRackedItems = this.totalCustomValueOfRackedItems + Number(this.rackItemsForm.value.customsValue)
      this.submitted = false;
      if (!this.enableApply) {
        this.rackItemsForm.reset();
      }

      if (this.enableApply && !this.customValueFlag && !this.quantityGreater && !this.customValueFlag1) {
        var data2 = {
          "items": this.rackedItemsArray
        }
        this.declarationService.rackItems(data2, { "sadItemId": this.sadItem.id }).subscribe((res) => {
          if (res.statusCode == 200) {
            this.declarationService.changeItemsRacked(true);
            this.rackItemsForm.reset();
            this.modalService.closeModal();
            return;
          }
          if (res.statusCode != 200) {
            console.log("in rack")
            if (this.rackedItemsArray.length == 1) {
              this.rackedItemsArray = [];
              this.rackItemsForm.reset();
            }
          }
        }, err => {
          this.rackedItemsArray = [];
          this.rackItemsForm.reset();
        })
      }
    }
    else {
      this.submitted = true;
      if (this.rackItemsForm.invalid) {
        return;
      }
      if (!this.customValueFlag && ((Number(this.rackItemsForm.value.customsValue)) == (Number(this.remainingcustomValue) + this.declarationItem.remainingCustomValue)) && (this.remainingQuantity - Number(this.rackItemsForm.value.quantity)) > 0) {
        this.customValueFlag = false;
        this.customValueFlag1 = true;
        return;
      }
      if (this.customValueFlag || this.quantityGreater || this.customValueFlag1) {
        return;
      }

      var data1 = {
        "id": this.sadItem.id,
        "productID": this.rackItemsForm.value.productCode,
        "description": this.rackItemsForm.value.description,
        "qty": Number(this.rackItemsForm.value.quantity),
        // ...(this.rackItemsForm.value.subLocation && { "subLocation": this.rackItemsForm.value.subLocation }),
        "customsValue": Number(this.rackItemsForm.value.customsValue)
      }

      if (this.rackItemsForm.value.supplementaryValue != "" && this.sadItem.isLiquor) {
        data1["supplementryValue"] = Number(this.rackItemsForm.value.supplementaryValue)
      }
      this.declarationService.modifyRackedItems(data1).subscribe((res) => {
        if (res.statusCode == 200) {
          this.declarationService.changeItemsRacked(true)
          this.modalService.closeModal();
        }
      })
    }
  }

  quantityChange(event) {
    this.quantityGreater = false;
    this.enableApply = false;
    if (!this.isRacked) {
      if (event.target.value < this.remainingQuantity) {
        this.enableApply = false;
      }
      else if (event.target.value == this.remainingQuantity) {
        this.enableApply = true;
      }
      else if (event.target.value > this.remainingQuantity) {
        this.quantityGreater = true;
      }
    }
    if (this.isRacked) {
      this.enableApply = true;
      // if (event.target.value < this.remainingQuantity) {
      //   this.enableApply = false;
      // }
      // else if (event.target.value == this.remainingQuantity) {
      //   this.enableApply = true;
      // }

      if ((Number(event.target.value) > (this.declarationItem.quantity) + this.remainingQuantity)) {
        this.quantityGreater = true;
      }
    }
  }

  customValueChanged(event) {

    this.customValueFlag = false;
    this.customValueFlag1 = false;
    if (!this.isRacked) {
      if (event.target.value > this.remainingcustomValue) {
        this.customValueFlag = true;
        this.customValueFlag1 = false;
      }
    }
    if (this.isRacked) {
      this.enableApply = true;
      console.log("(this.remainingcustomValue + this.declarationItem.remainingCustomValue): ", (this.remainingcustomValue + this.declarationItem.remainingCustomValue))
      if (Number(event.target.value) > (this.remainingcustomValue + this.declarationItem.remainingCustomValue)) {
        this.customValueFlag = true;
        this.customValueFlag1 = false;
      }
    }
    // else if (event.target.value == this.remainingcustomValue ) {
    //   this.customValueFlag = false;
    //   this.customValueFlag1 = false;
    // }
    // else if (event.target.value == this.remainingcustomValue && this.totalRackedItemsQuantity < this.sadItem.quantity) {
    //   this.customValueFlag = false;
    //   this.customValueFlag1 = true;
    // }

    // if (event.target.value > this.customValue) {
    //   this.customValueFlag = true;
    // }
    // else {
    //   this.customValueFlag = false;
    // }

  }

}
