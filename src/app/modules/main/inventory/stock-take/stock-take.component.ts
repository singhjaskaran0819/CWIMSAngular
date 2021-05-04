import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MODAL_SIZE, REGEX } from '../../../../common/constants';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SwalService } from 'src/app/common/swal.service';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { EditStockTakeComponent } from '../edit-stock-take/edit-stock-take.component';

@Component({
	selector: 'app-stock-take',
	templateUrl: './stock-take.component.html',
	styleUrls: ['./stock-take.component.scss', '../inventory.component.scss']
})
export class StockTakeComponent implements OnInit {

	warehouseList;
	locationsList;
	data;
	form: FormGroup;
	locations = [];
	warehouseSelected = false;
	productsArray = [];
	productsLength;
	// maxLength = false;
	submitted = false;
	invalidProductIdQuantity = false;
	locationSelected = false;

	stockTakeItemsList = [];
	totalCountOfStockItems;
	productSelectedFlag = false;
	// searchText;

	page = 1;
	skip = 0;
	totalRecords = 10;
	selected_limit = 10;

	subLocations = [];

	default_pagination = {
		limit: 10,
		skip: 0
	}

	manualSubLocationEnter = false;

	searchKeyForStockTakeItems;
	searchStockTake = {
		"searchKey": ""
	}

	productSearchFlag = false;
	alreadyselectedProduct = false;
	count = 0;

	editItemFlag = false;
	id;
	isNewStocktake = false;
	isEdit = false;
	selectedSerial;
	inventoryItemStatus;

	constructor(
		public inventoryService: InventoryService,
		private modalService: ModalService,
		private formBuilder: FormBuilder,
		private router: Router,
		private swal: SwalService,
		private route: ActivatedRoute,
		private toastService: ToastMessageService
	) {
		// this.maxLength = false;
		this.locationSelected = false;

		this.form = formBuilder.group({
			warehouseCode: ['', [Validators.required]],
			locationCode: ['', [Validators.required]],
			subLocation: [''],
			productCode: ['', [Validators.required]],
			description: ['', [Validators.required]],
			stockTakeQuantity: ['', [Validators.required, Validators.pattern(REGEX.NUMER_GREATER_THAN_0)]]
			// products: this.formBuilder.array([this.initalItemsRow()])
		})
	}

	ngOnInit(): void {
		// create new stocktake if it is not an edit route 
		if (this.router.url.includes('stock-take/edit')) {
			this.route.params.subscribe(async res => {
				this.isEdit = true;
				this.isNewStocktake = false;
				this.selectedSerial = res.serial;
				let data = await this.inventoryService.fetchStocktakeBySerial({ serial: res.serial }).toPromise();
				this.form.controls['warehouseCode'].patchValue(data.data.warehouselocation.warehouse.code);
				this.inventoryService.getWarehouseByCode(data.data.warehouselocation.warehouse.code).subscribe(res => {
					this.locations = res.data.warehouselocations;
					this.form.controls['locationCode'].patchValue(data.data.warehouselocation.code);
					this.form.controls['subLocation'].patchValue(data.data.subLocation);
				});
			})
		} else {
			this.isNewStocktake = true;
		}

		this.inventoryService.getWareHouseList().subscribe((res) => {
			this.warehouseList = res.data.list;
		});
		this.searchStockTake.searchKey = this.searchKeyForStockTakeItems
		!this.isNewStocktake && this.getStockTakeItems({ ...this.default_pagination, ...(this.isEdit && { stocktakeSerial: this.selectedSerial }) });
		this.inventoryService.updateStockTakeFlag.subscribe((res) => {
			if (res) {
				!this.isNewStocktake && this.getStockTakeItems({ ...this.default_pagination });
			}
		})
	}

	async createNewStocktake() {
		let res = await this.inventoryService.createNewStockTake({ locationCode: this.form.controls['locationCode'].value }).toPromise();
		this.selectedSerial = res.data;
		this.isNewStocktake = false;
		this.getStockTakeItems({ ...this.default_pagination, stocktakeSerial: this.selectedSerial });
		return true;
	}

	initalItemsRow() {
		return this.formBuilder.group({
			productCode: ['', [Validators.required]],
			stockTakeQuantity: ['', [Validators.required, Validators.pattern(REGEX.NUMBER_GREATER_THAN_0_OR_EQUALTO_ZERO)]]
		})
	}

	get formArray() {
		return this.form.get('products') as FormArray;
	}

	closeModal() {
		this.modalService.closeModal()
	}

	// Select limit for pagination
	onLimitChange(event) {
		this.skip = (this.page - 1) * this.selected_limit;
		this.default_pagination = {
			skip: this.skip,
			limit: this.selected_limit
		};

		var query = { ...this.default_pagination, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
		this.getStockTakeItems(query);
	}

	// This function call on page change event
	pageChanged(event) {
		this.page = event;
		this.skip = (this.page - 1) * this.selected_limit;
		this.default_pagination = {
			limit: this.selected_limit,
			skip: this.skip
		}
		var query = { ...this.default_pagination, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
		this.getStockTakeItems(query);
	}


	productSelected(event) {
		this.count = 0;
		this.alreadyselectedProduct = false;
		// for (var i = 0; i < this.form.controls.products['controls'].length; i++) {
		//   if (this.form.controls.products['controls'][i].value.productId == event.target.value) {
		//     this.count++;
		//     if (this.count > 1) {
		//       this.alreadyselectedProduct = true;
		//       break;
		//     }
		//   }
		// }
	}

	// add new row
	addRow() {
		this.productsLength = this.form.value.products.length;
		// if (this.productsLength >= this.productsArray.length) {
		//   this.maxLength = true;
		// }
		// else if (this.productsLength >= this.productsArray.length && this.productsLength >= 5) {
		//   this.maxLength = true;
		// }
		// else {
		this.formArray.push(this.initalItemsRow())
		// }
	}

	deleteRow(index) {
		const control = <FormArray>this.form.controls['products'];
		control.removeAt(index);
		this.form.value.products.splice(index, 1);
		// if (this.form.value.products.length < 5) {
		//   this.maxLength = false;
		// }
	}

	generateVarianceReport() {
		// this.submitted = true;

		// console.log(this.form.controls.productCode.invalid)
		// console.log(this.form.controls.stockTakeQuantity.invalid)
		// if (this.form.controls.productCode.invalid && this.form.controls.stockTakeQuantity.invalid) {
		//   return;
		// }

		// if (this.form.controls.products.invalid) {
		//   for (var i = 0; i < this.form.controls.products['controls'].length; i++) {
		//     if (this.form.controls.products['controls'][i].status == "INVALID") {
		//       this.invalidProductIdQuantity = true;
		//       break;
		//     }
		//   }
		//   return;
		// }
		this.inventoryService.generateVarianceReport({ stocktakeSerial: this.selectedSerial }).subscribe(res => {
			// this.inventoryService.changeVarianceReportFlagValue(true);
			this.router.navigateByUrl("/main/inventory/variance-report");
			this.modalService.closeModal()
		});
	}

	//on select warehouse
	onSelectWarehouse(event) {
		this.locationSelected = false;
		this.warehouseSelected = true;
		this.productsArray = [];
		// this.searchText = ""
		this.productSelectedFlag = false;
		this.form.controls['locationCode'].patchValue('');
		this.form.controls['productCode'].reset();
		this.form.controls['stockTakeQuantity'].reset();
		this.form.controls['description'].reset();
		this.form.controls['subLocation'].reset();
		this.form.controls['warehouseCode'].patchValue(event.target.value);
		this.inventoryService.getLocationsForStockTake(event.target.value).subscribe(res => {
			this.locations = res.data;
		});
		// resetting the form data
		this.form.controls['productCode'].reset();
		this.form.controls['description'].reset();
		this.form.controls['stockTakeQuantity'].reset();
	}

	//on select location
	async onSelectLocation(event) {
		this.submitted = false;
		this.productsArray = [];
		this.productSelectedFlag = false;
		// this.searchText = ""
		this.form.controls['productCode'].reset();
		this.form.controls['stockTakeQuantity'].reset();
		this.form.controls['description'].reset();
		this.form.controls['subLocation'].reset();
		// var data = { "locationCode": event.target.value }
		// let res = await this.inventoryService.getSubLocations(event.target.value).toPromise();
		// this.subLocations = res.data.subLocations;
		// if (this.subLocations.length > 0) {
		//   this.manualSubLocationEnter = false;
		// }
		// resetting the form data
		this.form.controls['productCode'].reset();
		this.form.controls['description'].reset();
		this.form.controls['stockTakeQuantity'].reset();
	}

	// ##############################################

	goToInventory() {
		// this.inventoryService.changeGoodsDetailsValue(false);
		this.router.navigateByUrl("/main/inventory/list")
	}

	searchProductId(event) {
		this.productsArray = [];
		this.productSelectedFlag = false;
		this.form.controls['stockTakeQuantity'].reset();
		this.form.controls['description'].reset();
		var data = {
			"locationCode": this.form.controls.locationCode.value,
			"searchKey": event.target.value,
			// ...(this.subLocations.length > 0 && { subLocation: this.form.controls['subLocation'].value })
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
			this.locationSelected = true;
			// this.productSearchFlag = false;
			this.productsArray = res.data;
			if (this.productsArray.length == 0) {
				this.checkIfItemNotFound(event.target.value);
			}
		});
	}

	async addStockTakeItems() {
		this.submitted = true;
		if (this.form.controls.productCode.invalid || this.form.controls.stockTakeQuantity.invalid || this.form.controls.description.invalid) {
			return;
		} else {
			if (this.isNewStocktake) {
				await this.createNewStocktake();
			}
			var data = {
				"productID": this.form.controls.productCode.value,
				"qty": this.form.controls.stockTakeQuantity.value,
				"description": this.form.controls.description.value,
				"subLocation": this.form.controls.subLocation.value,
				"stocktakeSerial": this.selectedSerial,
				"inventoryItemStatus": this.inventoryItemStatus,
				"locationCode": this.form.controls.locationCode.value,
				"warehouseCode": this.form.controls.warehouseCode.value
			}
			this.inventoryService.addStockTakeItems(data).subscribe((res) => {
				this.productsArray = [];
				if (res.statusCode == 200) {
					this.submitted = false;
					this.inventoryItemStatus = 1;
					this.productSearchFlag = false;
					this.getStockTakeItems({ ...this.default_pagination, stocktakeSerial: this.selectedSerial, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) });
					this.form.controls['productCode'].reset();
					this.form.controls['stockTakeQuantity'].reset();
					this.form.controls['description'].reset();
					this.form.controls['subLocation'].reset();
				}
			})
		}
	}

	selectedProductId(item) {
		// debugger;
		this.productSelectedFlag = true;
		this.inventoryItemStatus = 1;
		this.form.controls['productCode'].patchValue(item.productID);
		this.form.controls['description'].patchValue(item.description);
		this.productsArray = [];
	}

	getStockTakeItems(query?) {
		this.inventoryService.getStockTakeItems(query).subscribe((res) => {
			if (res.data.count == 0 && !this.router.url.includes('stock-take/edit')) {
				this.isNewStocktake = true;
			} else {
				this.isNewStocktake = false;
			}
			this.stockTakeItemsList = res.data.rows;
			this.totalCountOfStockItems = res.data.count
			this.totalRecords = res.data.count;
		})
	}

	onSelectSubLocation(event) {
		// if (event.target.value == '0') {
		//   this.manualSubLocationEnter = true;
		//   this.form.controls['subLocation'].patchValue(null);
		// }
		// resetting the form data
		this.form.controls['productCode'].reset();
		this.form.controls['description'].reset();
		this.form.controls['stockTakeQuantity'].reset();
	}

	cancel() {
		this.submitted = false;
		// this.locations = [];
		this.form.controls['subLocation'].reset();
		this.form.controls['productCode'].reset();
		this.form.controls['description'].reset();
		this.form.controls['stockTakeQuantity'].reset();
		this.editItemFlag = false;
	}

	async deleteItem(item) {
		let swal_data = await this.swal.warningSwal('Delete Item ', 'Click on confirm to delete the item.');
		if (swal_data.value) {
			var data = {
				"productID": item.productID
			}
			this.inventoryService.deleteStockTakeItems(data).subscribe((res) => {
				this.getStockTakeItems({ ...this.default_pagination, stocktakeSerial: this.selectedSerial, ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) });
			})
		}
	}

	// editItem(item) {
	//   console.log(item)
	//   this.editItemFlag = true;
	//   this.id = item.id;
	//   this.form.controls['productCode'].patchValue(item.productID);
	//   this.form.controls['description'].patchValue(item.description);
	//   this.form.controls['stockTakeQuantity'].patchValue(item.qty);
	//   this.form.controls['warehouseCode'].patchValue(item.warehouseCode);
	//   this.form.controls['subLocation'].patchValue(item.subLocation);

	//   this.inventoryService.getWarehouseByCode(item.warehouseCode).subscribe(res => {
	//     this.locations = res.data.warehouselocations;
	//     this.form.controls['locationCode'].patchValue(item.locationCode);
	//   });
	//   this.form.controls['warehouseCode'].disable();
	//   this.form.controls['locationCode'].disable();
	// }

	editItem(item) {
		this.modalService.openModal(EditStockTakeComponent, { "stockTakeItem": item }, MODAL_SIZE.MEDIUM)
	}

	checkIfItemNotFound(productID) {
		this.inventoryItemStatus = 1;
		this.productSelectedFlag = true;
		this.inventoryService.checkIfProductExist({ productID }).subscribe((res) => {
			if (res.statusCode == 200) {
				this.inventoryItemStatus = 0;
			}
			if (res.statusCode == 400) {
				this.inventoryItemStatus = 1;
			}
		})
	}

	updateStockTakeItem() {
		this.submitted = true;
		if (this.form.controls.productCode.invalid || this.form.controls.stockTakeQuantity.invalid || this.form.controls.description.invalid) {
			return;
		} else {
			var data = {
				"id": this.id,
				"productID": this.form.controls.productCode.value,
				"qty": this.form.controls.stockTakeQuantity.value,
				"description": this.form.controls.description.value,
			}
			this.inventoryService.editStockTakeItems(data).subscribe((res) => {
				if (res.statusCode == 200) {
					this.form.controls['warehouseCode'].enable();
					this.form.controls['locationCode'].enable();
					this.toastService.showSuccess("Item updated successfully!")
					this.submitted = false;
					this.editItemFlag = false;
					this.getStockTakeItems({ ...this.default_pagination, ...(this.isEdit && { stocktakeSerial: this.selectedSerial }), ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) });
					this.form.controls['productCode'].reset();
					this.form.controls['stockTakeQuantity'].reset();
					this.form.controls['description'].reset();
					this.form.controls['subLocation'].reset();
				}
			})
		}
	}

	searchStockTakeItems(event) {
		this.default_pagination = {
			limit: 10,
			skip: 0
		};
		this.searchStockTake.searchKey = event.target.value;
		var query = { ...this.default_pagination, ...(this.isEdit && { stocktakeSerial: this.selectedSerial }), ...((this.searchStockTake.searchKey && this.searchStockTake.searchKey != '') && this.searchStockTake) }
		this.getStockTakeItems(query);
	}

}
