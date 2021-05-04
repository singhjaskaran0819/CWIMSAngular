import { Component, OnInit } from '@angular/core';
import { MODAL_SIZE, REGEX, saleType } from 'src/app/common/constants';
import { ModalService } from 'src/app/core/services/modal.service';
import { UploadSaleComponent } from '../upload-sale/upload-sale.component';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { SalesService } from 'src/app/core/services/sales.service';
import * as countriesNames from "countries-names"
import * as _ from 'lodash';

@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
  styleUrls: ['./create-sales.component.scss']
})
export class CreateSalesComponent implements OnInit {

  generalSaleInfoForm;
  formSubmitted = false;
  productsInfoForm;
  generalInfoFormSubmitted = false;
  productsInfoFormSubmitted = false;

  productsArray = [];
  productsTabSelected = false;
  generalInfoTabSelected = true;

  currencyDropdown;
  departurePortDropdown;
  documentTypeDropdown;
  saleTypeDropdown;
  nationalityDropdown;

  minDate;
  allCountries;

  receiptNumberFlag = false;
  accessPermissions = {};

  dutyFreeSale = false;
  dutyFreeOrForex = false;
  warehouseTransferOrChangeLocation = false;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private toastService: ToastMessageService, private salesService: SalesService) { }

  ngOnInit(): void {
    this.allCountries = countriesNames.all();
    this.initGeneralInfoForm();
    this.initProductsInfoForm();
    this.getDropdownData();

    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

  }

  initGeneralInfoForm() {
    this.generalSaleInfoForm = this.formBuilder.group({
      receiptNumber: ['', [Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)]],
      receiptDate: ['', Validators.required],
      saleType: ['', Validators.required],
      currency: ['', Validators.required],
      totalSaleValue: ['', Validators.required],
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
      // documentType: ['', Validators.required],
      // documentNumber: ['', Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)],
      // documentCountryIssue: ['', Validators.required],
      documentType: [''],
      documentNumber: [''],
      documentCountryIssue: [''],
      customerNationality: ['', Validators.required],
      residingCountry: ['', Validators.required],
      // transportId: ['', Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)],
      // vesselName: ['', Validators.required],
      // departureDate: ['', Validators.required],
      // departurePort: ['', Validators.required]
      transportId: [''],
      vesselName: [''],
      departureDate: [''],
      departurePort: ['']
    })
  }

  get controls() {
    return this.generalSaleInfoForm.controls;
  }

  get controls1() {
    return this.productsInfoForm.controls;
  }

  initProductsInfoForm() {
    this.productsInfoForm = this.formBuilder.group({
      products: this.formBuilder.array([this.initalItemsRow()])
    })
    // this.productsInfoForm = this.formBuilder.group({
    //   productId: ['', Validators.required],
    //   description: ['', Validators.required],
    //   quantity: ['', Validators.required],
    //   saleValue: ['', Validators.required]
    // })
  }

  initalItemsRow() {
    return this.formBuilder.group({
      productID: ['', Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)],
      description: ['', Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)],
      quantity: ['', Validators.required],
      saleValue: ['', Validators.required]
    })
  }

  get formArray() {
    return this.productsInfoForm.get('products') as FormArray;
  }

  getDropdownData() {
    this.salesService.getDropdownValues().subscribe((res) => {
      console.log("res: ", res)
      this.currencyDropdown = res.data.saleCurrencyData;
      // this.departurePortDropdown = res.data.departurePortData;
      this.documentTypeDropdown = res.data.customerIdTypeData;
      this.saleTypeDropdown = res.data.customerSaleTypeData;
      this.nationalityDropdown = res.data.nationalitiesData;
      this.departurePortDropdown = res.data.departurePortsData;
    })
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions['list']?.length; i++) {
          if (this.accessPermissions['list'].includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  next() {
    this.generalInfoFormSubmitted = true;
    console.log(this.generalSaleInfoForm)
    console.log(this.generalSaleInfoForm.invalid)

    if (this.generalSaleInfoForm.invalid) {
      return;
    }
    this.productsTabSelected = true;
    this.generalInfoTabSelected = false;
  }

  previous() {
    this.formSubmitted = false;
    this.productsTabSelected = false;
    this.generalInfoTabSelected = true;
  }

  addItem() {
    this.formArray.push(this.initalItemsRow())
  }

  tabChanged(tab?) {
    if (tab == 'products') {
      this.productsTabSelected = true;
      this.generalInfoTabSelected = false;
    }
    else {
      this.productsTabSelected = false;
      this.generalInfoTabSelected = true;
    }
  }

  deleteRow(index) {

    const control = <FormArray>this.productsInfoForm.controls['products'];
    control.removeAt(index);
    this.productsInfoForm.value.products.splice(index, 1);
    // if (this.productsInfoForm.value.products.length < 5) {
    //   this.maxLength = false;
    // }
  }

  uploadSales() {
    this.modalService.openModal(UploadSaleComponent, {}, MODAL_SIZE.MEDIUM)
  }

  saleTypeChange(event) {
    console.log(event)
    console.log(event.target.value)
    for (var key in saleType) {
      //   if (saleType.DUTY_FREE == event.target.value ) {  
      //  this.dutyFreeSale= true;
      //  this.dutyFreeOrForex= false;
      //  this.warehouseTransferOrChangeLocation = false;
      //  this.generalSaleInfoForm.get('documentType').clearValidators();
      //  this.generalSaleInfoForm.get('documentType').updateValueAndValidity();
      //  this.generalSaleInfoForm.get('documentNumber').clearValidators();
      //  this.generalSaleInfoForm.get('documentNumber').updateValueAndValidity();
      //  this.generalSaleInfoForm.get('documentCountryIssue').clearValidators();
      //  this.generalSaleInfoForm.get('documentCountryIssue').updateValueAndValidity();

      //  this.generalSaleInfoForm.get('transportId').setValidators([Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)]);
      //  this.generalSaleInfoForm.get('transportId').updateValueAndValidity();
      //  this.generalSaleInfoForm.get('vesselName').setValidators([Validators.required]);
      //  this.generalSaleInfoForm.get('vesselName').updateValueAndValidity();
      //  this.generalSaleInfoForm.get('departureDate').setValidators([Validators.required]);
      //  this.generalSaleInfoForm.get('departureDate').updateValueAndValidity();
      //  this.generalSaleInfoForm.get('departurePort').setValidators([Validators.required]);
      //  this.generalSaleInfoForm.get('departurePort').updateValueAndValidity();
      //   }

      if (saleType.DIPLOMAT == event.target.value || saleType.DUTY_FREE == event.target.value || saleType.DUTY_FREE_FOREX == event.target.value) {
        this.dutyFreeOrForex = true;
        if (saleType.DUTY_FREE == event.target.value) {
          this.generalSaleInfoForm.get('transportId').setValidators([Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)]);
          this.generalSaleInfoForm.get('transportId').updateValueAndValidity();
          this.generalSaleInfoForm.get('vesselName').setValidators([Validators.required]);
          this.generalSaleInfoForm.get('vesselName').updateValueAndValidity();
          this.generalSaleInfoForm.get('departureDate').setValidators([Validators.required]);
          this.generalSaleInfoForm.get('departureDate').updateValueAndValidity();
          this.generalSaleInfoForm.get('departurePort').setValidators([Validators.required]);
          this.generalSaleInfoForm.get('departurePort').updateValueAndValidity();

        }
        else {
          this.generalSaleInfoForm.get('transportId').clearValidators();
          this.generalSaleInfoForm.get('transportId').updateValueAndValidity();
          this.generalSaleInfoForm.get('vesselName').clearValidators();
          this.generalSaleInfoForm.get('vesselName').updateValueAndValidity();
          this.generalSaleInfoForm.get('departureDate').clearValidators();
          this.generalSaleInfoForm.get('departureDate').updateValueAndValidity();
          this.generalSaleInfoForm.get('departurePort').clearValidators();
          this.generalSaleInfoForm.get('departurePort').updateValueAndValidity();
        }
        this.generalSaleInfoForm.get('documentType').setValidators([Validators.required]);
        this.generalSaleInfoForm.get('documentType').updateValueAndValidity();
        this.generalSaleInfoForm.get('documentNumber').setValidators([Validators.required, Validators.pattern(REGEX.ALPHA_NUMERIC)]);
        this.generalSaleInfoForm.get('documentNumber').updateValueAndValidity();
        this.generalSaleInfoForm.get('documentCountryIssue').setValidators([Validators.required]);
        this.generalSaleInfoForm.get('documentCountryIssue').updateValueAndValidity();
      }

      if (saleType.WAREHOUSE_TRANSFER == event.target.value || saleType.CHANGE_LOCATION == event.target.value) {
        this.warehouseTransferOrChangeLocation = false;
        this.dutyFreeOrForex = false;
        this.dutyFreeSale = false;
        this.generalSaleInfoForm.get('documentType').clearValidators();
        this.generalSaleInfoForm.get('documentType').updateValueAndValidity();
        this.generalSaleInfoForm.get('documentNumber').clearValidators();
        this.generalSaleInfoForm.get('documentNumber').updateValueAndValidity();
        this.generalSaleInfoForm.get('documentCountryIssue').clearValidators();
        this.generalSaleInfoForm.get('documentCountryIssue').updateValueAndValidity();
        this.generalSaleInfoForm.get('transportId').clearValidators();
        this.generalSaleInfoForm.get('transportId').updateValueAndValidity();
        this.generalSaleInfoForm.get('vesselName').clearValidators();
        this.generalSaleInfoForm.get('vesselName').updateValueAndValidity();
        this.generalSaleInfoForm.get('departureDate').clearValidators();
        this.generalSaleInfoForm.get('departureDate').updateValueAndValidity();
        this.generalSaleInfoForm.get('departurePort').clearValidators();
        this.generalSaleInfoForm.get('departurePort').updateValueAndValidity();
      }
    }
  }

  // submitGeneralInfo() {
  //   this.generalInfoFormSubmitted = true;

  //   if (this.generalSaleInfoForm.invalid) {
  //     return;
  //   }

  //   var data = {
  //     "receiptNumber": this.generalSaleInfoForm.value.receiptNumber,
  //     "receiptDate": this.generalSaleInfoForm.value.receiptDate,
  //     "saleType": this.generalSaleInfoForm.value.saleType,
  //     "currency": this.generalSaleInfoForm.value.currency,
  //     "totalSaleValue": this.generalSaleInfoForm.value.totalSaleValue,
  //     "customerName": this.generalSaleInfoForm.value.customerName,
  //     "customerAddress": this.generalSaleInfoForm.value.customerAddress,
  //     "documentType": this.generalSaleInfoForm.value.documentType,
  //     "documentNumber": this.generalSaleInfoForm.value.documentNumber,
  //     "documentCountryIssue": this.generalSaleInfoForm.value.documentCountryIssue,
  //     "customerNationality": this.generalSaleInfoForm.value.customerNationality,
  //     "countryOfResidency": this.generalSaleInfoForm.value.residingCountry,
  //     "transportId": this.generalSaleInfoForm.value.transportId,
  //     "vesselName": this.generalSaleInfoForm.value.vesselName,
  //     "departureDate": this.generalSaleInfoForm.value.departureDate,
  //     "departurePort": this.generalSaleInfoForm.value.departurePort
  //   }

  //   this.salesService.saveGeneralInfo(data).subscribe((res) => {
  //     console.log("res: ", res)
  //   })
  // }

  // saveGeneralInfo() {

  //   console.log(this.generalSaleInfoForm)
  //   console.log(this.generalSaleInfoForm.controls.receiptNumber.invalid)
  //   if (this.generalSaleInfoForm.controls.receiptNumber.invalid) {
  //     this.receiptNumberFlag = true;
  //     return;
  //   }

  //   var data = {
  //     // "isDraft": true,
  //     "receiptNumber": this.generalSaleInfoForm.value.receiptNumber,
  //     "receiptDate": this.generalSaleInfoForm.value.receiptDate,
  //     "saleType": this.generalSaleInfoForm.value.saleType,
  //     "currency": this.generalSaleInfoForm.value.currency,
  //     "totalSaleValue": this.generalSaleInfoForm.value.totalSaleValue,
  //     "customerName": this.generalSaleInfoForm.value.customerName,
  //     "customerAddress": this.generalSaleInfoForm.value.customerAddress,
  //     "documentType": this.generalSaleInfoForm.value.documentType,
  //     "documentNumber": this.generalSaleInfoForm.value.documentNumber,
  //     "documentCountryIssue": this.generalSaleInfoForm.value.documentCountryIssue,
  //     "customerNationality": this.generalSaleInfoForm.value.customerNationality,
  //     "countryOfResidency": this.generalSaleInfoForm.value.residingCountry,
  //     "transportId": this.generalSaleInfoForm.value.transportId,
  //     "vesselName": this.generalSaleInfoForm.value.vesselName,
  //     "departureDate": this.generalSaleInfoForm.value.departureDate,
  //     "departurePort": this.generalSaleInfoForm.value.departurePort,
  //     "products": [
  //       {
  //         "productID": "string",
  //         "description": "string",
  //         "qty": 0,
  //         "saleValue": 0
  //       }
  //     ]
  //   }

  //   Object.keys(data).forEach(item => {
  //     if (data[item] === "" || !data[item]) {
  //       delete data[item]
  //     }
  //   })

  //   this.salesService.saveGeneralInfo(data).subscribe((res) => {
  //     if (res) {
  //       this.toastService.showSuccess("New sale information saved successfully!")
  //     }
  //     console.log("res: ", res)
  //   })
  // }

  submitSaleProducts() {
    this.productsInfoFormSubmitted = true;
    console.log(this.productsInfoForm.controls['products'])
    console.log(this.productsInfoForm.value)

    console.log(this.productsInfoForm.controls['products'].invalid)

    if (this.productsInfoForm.controls['products'].invalid) {
      return;
    }
    var data = {
      // "isDraft": true,
      "receiptNumber": this.generalSaleInfoForm.value.receiptNumber,
      "receiptDate": this.generalSaleInfoForm.value.receiptDate,
      "saleType": this.generalSaleInfoForm.value.saleType,
      "currency": this.generalSaleInfoForm.value.currency,
      "totalSaleValue": this.generalSaleInfoForm.value.totalSaleValue,
      "customerName": this.generalSaleInfoForm.value.customerName,
      "customerAddress": this.generalSaleInfoForm.value.customerAddress,
      "documentType": this.generalSaleInfoForm.value.documentType,
      "documentNumber": this.generalSaleInfoForm.value.documentNumber,
      "documentCountryIssue": this.generalSaleInfoForm.value.documentCountryIssue,
      "customerNationality": this.generalSaleInfoForm.value.customerNationality,
      "countryOfResidency": this.generalSaleInfoForm.value.residingCountry,
      "transportId": this.generalSaleInfoForm.value.transportId,
      "vesselName": this.generalSaleInfoForm.value.vesselName,
      "departureDate": this.generalSaleInfoForm.value.departureDate,
      "departurePort": this.generalSaleInfoForm.value.departurePort,
      "products": this.productsInfoForm.value
    }

    console.log("Data: ", data)

    this.salesService.saveGeneralInfo(data).subscribe((res) => {
      if (res) {
        this.productsInfoFormSubmitted = false;
        this.generalInfoFormSubmitted = false;
        this.toastService.showSuccess("New sale information saved successfully!")
        this.generalSaleInfoForm.reset();
        this.productsInfoForm.reset();
      }
      console.log("res: ", res)
    })
  }

}
