import { Component, OnInit } from '@angular/core';
import { MODAL_SIZE, DECLARATION_STATUS } from 'src/app/common/constants';
import { DeclarationsService } from 'src/app/core/services/declarations.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { RejectComponent } from '../reject/reject.component';
import { ReplyComponent } from '../reply/reply.component';
import { RackItemsComponent } from '../rack-items/rack-items.component';
import { MainService } from 'src/app/core/services/main.service';
import { UploadItemsComponent } from '../upload-items/upload-items.component';
import { SwalService } from 'src/app/common/swal.service';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import * as moment from 'moment';
import { ChatService } from 'src/app/core/services/chat.service';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit {

  selectedItemId = null;
  // items = [1];
  selectAll = false;
  details;
  sadItemList;
  rackedItems = [];

  warehouseCode;
  warehouseName;
  companyCode;
  companyName;
  office;
  year;
  serial;
  assessmentNumber;
  accessPermissions;
  statusCode;

  page = 1;
  skip = 0;
  totalRecords = 10;
  selected_limit = 10;

  default_pagination = {
    limit: 10,
    skip: 0
  }

  inf_scroll_pagination = {
    limit: 3,
    skip: 0
  }

  sadItemId;
  messagesTabSelected = false;
  messageList = [];
  roleType;

  default_sorting = {
    sortKey: 'createdAt',
    sortDirection: 1
  }
  active_class = "createdAt1"

  itemsRackedFlag = false;
  isAllSadItemsRacked = false;
  // newMessage;
  // messageList1 = [];

  constructor(
    private declarationService: DeclarationsService,
    private modalService: ModalService,
    private mainService: MainService,
    private swal: SwalService,
    private toastService: ToastMessageService,
    private chatService: ChatService
  ) { }

  // sendMessage() {
  //   this.chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

  ngOnInit(): void {

    // this.chatService.getMessages().subscribe((message: string) => {
    //   this.messageList1.push(message);
    //   console.log("this.ms: ", this.messageList1)
    // });

    this.itemsRackedFlag = false;

    this.roleType = sessionStorage.getItem('roleType')
    this.declarationService.areItemsRacked.subscribe((areItemsRacked) => {
      if (areItemsRacked) {
        this.getSadItemsById({ "id": this.sadItemId, ...(this.default_pagination) });
        this.getDeclarationDetailsById(this.sadItemId);
      }
    })

    this.declarationService.messagesUpdated.subscribe((messageListUpdate) => {
      if (messageListUpdate) {
        this.getMessages({ "id": this.sadItemId, ...(this.default_pagination) });
        this.getDeclarationDetailsById(this.sadItemId);
      }
    })

    this.declarationService.sadItemsUploaded.subscribe((uploadedItems) => {
      if (uploadedItems) {
        this.getSadItemsById({ "id": this.sadItemId, ...(this.default_pagination) });
      }
    })

    this.mainService.accessPermissions.subscribe((res) => {
      this.accessPermissions = res['declaration'];
    })

    this.declarationService.goodsId.subscribe((res) => {
      console.log(res)
      this.sadItemId = res;
      console.log("this.sadItemId: ", this.sadItemId)
      this.getDeclarationDetailsById(this.sadItemId);
      // this.getDeclarationById(this.sadItemId);
      // this.isAllSadItemsRacked = res.isSadItemsRacked;
      var query = {}
      this.getSadItemsById({ "id": this.sadItemId, ...(this.default_pagination) });
      this.getMessages({ "id": this.sadItemId, ...(this.default_pagination) })
    })
  }

  parseTimeString(timeString) {
    return moment(timeString).format('MMMM Do YYYY, h:mm a')
  }

  checkPermission(permission) {
    if (this.accessPermissions) {
      if (Object.keys(this.accessPermissions).length > 0) {
        for (var i = 0; i < this.accessPermissions?.length; i++) {
          if (this.accessPermissions.includes(permission)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  sorting(sortKey, sortDirection) {
    this.active_class = `${sortKey}${sortDirection}`;
    this.default_sorting = {
      sortKey,
      sortDirection
    }
    var query;
    query = { ...this.default_pagination, ...this.default_sorting, ...({ "id": this.sadItemId }) }
    this.getSadItemsById(query);
  }

  getDeclarationDetailsById(id) {
    this.declarationService.getDeclarationById({ "id": id }).subscribe((res) => {
      this.details = res.data;
      if (res.data) {
        this.warehouseCode = this.details.warehouselocation.warehouse.code
        this.warehouseName = this.details.warehouselocation.warehouse.name
        this.companyCode = this.details.warehouselocation.code
        this.companyName = this.details.warehouselocation.name
        this.office = this.details.office
        this.year = this.details.year
        this.serial = this.details.serial
        this.assessmentNumber = this.details.number
        this.statusCode = this.details.status;
        this.isAllSadItemsRacked = this.details.isSadItemsRacked
        console.log("this.statusCode: ", this.statusCode)
      }
    })
  }

  tabChanged(value) {
    this.messagesTabSelected = value;
    this.default_pagination = {
      limit: 10,
      skip: 0
    }

    this.inf_scroll_pagination = {
      limit: 10,
      skip: 0
    }
    if (this.messagesTabSelected) {
      var query = { "id": this.sadItemId, ...(this.default_pagination) }
      this.getMessages(query);
    }
    else {
      var query = { ...this.default_pagination, ...({ "id": this.sadItemId }) }
      this.getSadItemsById(query)
    }
  }

  getSadItemsById(query) {
    this.itemsRackedFlag = false;
    this.selectedItemId = null;
    this.declarationService.getSadItemsById(query).subscribe((res) => {
      this.sadItemList = res.data.rows;
      this.totalRecords = res.data.count;

      this.sadItemList.forEach(item => {
        console.log(item)
        if (item.isRacked) {
          this.itemsRackedFlag = true;
          return;
        }
      })
    })
  }

  getMessages(query) {
    this.declarationService.getMessages(query).subscribe((res) => {
      this.messageList = res.data.rows;
    })
  }

  // Select limit for pagination
  onLimitChange(event) {
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      skip: this.skip,
      limit: this.selected_limit
    };
    if (this.messagesTabSelected) {
      var query = { "id": this.sadItemId, ...(this.default_pagination) }
      this.getMessages(query);
    }
    else {
      var query = { ...this.default_pagination, ...({ "id": this.sadItemId }) }
      this.getSadItemsById(query);
    }
  }

  // This function call on page change event
  pageChanged(event) {
    this.page = event;
    this.skip = (this.page - 1) * this.selected_limit;
    this.default_pagination = {
      limit: this.selected_limit,
      skip: this.skip
    }
    if (this.messagesTabSelected) {
      var query = { "id": this.sadItemId, ...(this.default_pagination) }
      this.getMessages(query);
    }
    else {
      var query = { ...this.default_pagination, ...({ "id": this.sadItemId }) }
      this.getSadItemsById(query);
    }
  }

  goToGoodsReceived() {
    this.declarationService.changeGoodsDetailsValue(false);
  }

  getRackedItems(sadItemId, pagination) {
    var query = { "sadItemId": sadItemId, ...(pagination) }
    this.declarationService.getRackedItems({ "sadItemId": sadItemId }).subscribe((res) => {
      this.rackedItems = res.data.rows;
    })
  }

  upload() {
    this.modalService.openModal(UploadItemsComponent, { "details": this.details, "rackedItems": false }, MODAL_SIZE.MEDIUM)
  }

  // openUploadPopupForRackingItems(data) {
  //   this.modalService.openModal(UploadItemsComponent, { "details": data, "RackedItems": true }, MODAL_SIZE.MEDIUM)
  // }

  async approveDeclaration() {
    let swal_data = await this.swal.approveRackedItemsSwal('Click on confirm button to approve the declaration.', 'Approve Declaration');
    if (swal_data.value) {
      var data = {
        "id": this.sadItemId,
        "operation": DECLARATION_STATUS.APPROVED  // 1 approve, 2 reject
      }

      this.declarationService.approveRejectRackedItems(data).subscribe((res) => {
        this.toastService.showSuccess("Declaration Approved!")
        this.getDeclarationDetailsById(this.sadItemId);
      })
    }
  }

  async resetRackedItems(item) {

    console.log("item: ", item)
    let swal_data = await this.swal.warningSwal('Reset Racked Items', 'Click on confirm button to reset racked items.');
    var data;
    if (swal_data.value) {
      if (item == '') {
        data = {
          "declarationId": this.sadItemId
        }
        this.declarationService.resetRackedItems(data).subscribe((res) => {
          console.log(res)
          this.getSadItemsById({ "id": this.sadItemId, ...(this.default_pagination) });
          this.getDeclarationDetailsById(this.sadItemId);
          this.selectedItemId = null;
        })
      } else {
        data = {
          "sadItemId": item.id
        }
        this.declarationService.resetRackedItems(data).subscribe((res) => {
          console.log(res)
          this.getSadItemsById({ "id": this.sadItemId, ...(this.default_pagination) });
          this.getDeclarationDetailsById(this.sadItemId);
          this.selectedItemId = null;
        })
      }
      // this.declarationService.resetRackedItems(data).subscribe((res) => {
      //   console.log(res)
      //   this.getSadItemsById({ "id": this.sadItemId, ...(this.default_pagination) });
      //   this.selectedItemId = null;
      // })
    }
  }

  openReplyModal(data?) {
    this.modalService.openModal(ReplyComponent, { "messageData": data }, MODAL_SIZE.MEDIUM)
  }

  openRejectModal(data?) {
    this.modalService.openModal(RejectComponent, { "declarationId": data }, MODAL_SIZE.MEDIUM)
  }

  // show details
  showDetails(index, id?) {
    if (id == this.selectedItemId) {
      this.selectedItemId = null;
      return;
    } else {
      this.selectedItemId = id;
      this.getRackedItems(id, { limit: this.inf_scroll_pagination.limit, skip: (this.inf_scroll_pagination.limit + this.inf_scroll_pagination.skip) });
    }


    // if (event.target.checked == true) {
    // this.itemId = id;
    // } else {
    //   this.itemId = null;
    // }
  }

  //Select all
  onSelectAll(event) {
    // if (event.target.checked) {
    //   this.selectAll = true;
    // } else {
    //   this.selectAll = false;
    // }
  }

  openRackingPopUp(sadItem, value) {
    this.modalService.openModal(RackItemsComponent, { "sadItem": sadItem, "isRacked": value }, MODAL_SIZE.MEDIUM)
  }

  openRackingPopUpForModification(sadItem, value, declarationItem) {
    console.log("declarationItem: ", declarationItem)
    this.modalService.openModal(RackItemsComponent, { "sadItem": sadItem, "isRacked": value, "declarationItem": declarationItem }, MODAL_SIZE.MEDIUM)
  }

  // on infinite Scrolling 
  onScroll() {
    this.getRackedItems(this.selectedItemId, { limit: this.inf_scroll_pagination.limit, skip: (this.inf_scroll_pagination.limit + this.inf_scroll_pagination.skip) });
    // this.getWarehouseLocation(this.selectedWarehouseId, null, { limit: this.inf_scroll_pagination.limit, skip: (this.inf_scroll_pagination.limit + this.inf_scroll_pagination.skip) });
  }

  submitRackedItemsForApproval() {
    var data;
    if (this.statusCode == '2') {
      data = {
        "id": this.sadItemId,
        "resubmit": true
      }
    } else {
      data = {
        "id": this.sadItemId
      }
    }
    this.declarationService.submitRackedItemsForApproval(data).subscribe((res) => {
      this.toastService.showSuccess("Declaration has been submitted!")
      this.getDeclarationDetailsById(this.sadItemId);
    })
  }

}
