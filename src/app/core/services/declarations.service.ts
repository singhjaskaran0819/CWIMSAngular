import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIS } from '../../common/constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationsService {
  goodsDetails = new BehaviorSubject(false);
  goodsId = new BehaviorSubject('');
  areItemsRacked = new BehaviorSubject(false);
  messagesUpdated = new BehaviorSubject(false);
  sadItemsUploaded = new BehaviorSubject(false);

  // goodsDetails = false;
  constructor(private http: HttpService) { }

  changeGoodsDetailsValue(value) {
    this.goodsDetails.next(value);
  }

  changeGoodsId(item) {
    this.goodsId.next(item);
  }

  changeItemsRacked(value) {
    this.areItemsRacked.next(value);
  }

  changeUpdatedMessage(value) {
    this.messagesUpdated.next(value);
  }

  changeSadUploadedItems(value) {
    this.sadItemsUploaded.next(value);
  }

  getGoodsReceived(data?) {
    return this.http.getData(APIS.DECLARATION.GET_GOODS_RECEIVED, data)
  }

  getDeclarationById(data?) {
    return this.http.getData(APIS.DECLARATION.FETCH_DECLARATION_BY_ID, data)
  }

  deleteDeclaration(data?) {
    return this.http.deleteData(APIS.DECLARATION.DELETE_DECLARATION, data)
  }

  getSadItemsById(data?) {
    return this.http.getData(APIS.DECLARATION.FETCH_SAD_ITEMS, data)
  }

  rackItems(data, params?) {
    return this.http.postData(APIS.DECLARATION.RACK_ITEMS, data, params);
  }

  getRackedItems(sadItemId?) {
    return this.http.getData(APIS.DECLARATION.FETCH_RACKED_ITEMS, sadItemId)
  }

  getFilters() {
    return this.http.getData(APIS.DECLARATION.FILTERS_FOR_SAD_ITEM_LIST)
  }

  // uploadSADItemsFile(data, declarationId) {
  //   let url = APIS.DECLARATION.UPLOAD_FILE;
  //   url = `${url}?declarationId=${declarationId}`;
  //   return this.http.postUploadData(url, data)
  // }

  uploadRackedItemsFile(data, declarationId) {
    let url = APIS.DECLARATION.UPLOAD_FILE;
    url = `${url}?declarationId=${declarationId}`;
    return this.http.postUploadData(url, data)
  }

  approveRejectRackedItems(data?) {
    return this.http.postData(APIS.DECLARATION.APPROVE_REJECT_RACKED_ITEMS, data)
  }

  submitRackedItemsForApproval(data?) {
    return this.http.postData(APIS.DECLARATION.SUBMIT_RACKED_ITEMS, data)
  }

  getMessages(data?) {
    return this.http.getData(APIS.DECLARATION.GET_MESSAGES, data)
    // return this.http.getData('/v1​/declaration​/get-messages', data)
  }

  replyToMessage(data?) {
    return this.http.postData(APIS.DECLARATION.REPLY_TO_MESSAGE, data)
  }

  resetRackedItems(data?) {
    return this.http.postData(APIS.DECLARATION.RESET_RACKED_ITEMS, data)
  }

  modifyRackedItems(data?) {
    return this.http.putData(APIS.DECLARATION.MODIFY_RACKED_ITEMS, data)
  }
}
