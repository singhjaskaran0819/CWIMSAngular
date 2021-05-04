import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APIS } from '../../common/constants';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpService
  ) { }

  updateListFlag = new BehaviorSubject(false);
  updateProfileFlag = new BehaviorSubject(false);

  changeUpdateListFlagValue(value) {
    this.updateListFlag.next(value);
  }

  changeUpdateProfileFlagValue(value) {
    this.updateProfileFlag.next(value);
  }

  //get user info
  getUserDetail(userId?) {
    if (userId) {
      return this.http.getData(`${APIS.USER.USER_DETAILS}?userId=${userId}`)
    } else {
      return this.http.getData(`${APIS.USER.USER_DETAILS}`)
    }
  }

  fetchUserDetail(userId?) {
    if (userId) {
      return this.http.getData(`${APIS.USER.FETCH_USER_DETAILS}?userId=${userId}`)
    }
  }

  //update user profile
  updateUser(data) {
    return this.http.putData(APIS.USER.UPDATE_USER, data);
  }

  //delete user
  deleteUser(data) {
    return this.http.deleteData(APIS.USER.UPDATE_USER, data);
  }

  // update password
  updatePassword(data) {
    return this.http.putData(APIS.USER.CHANGE_PASSWORD, data);
  }

  // upload profile picture
  uploadeFile(data) {
    return this.http.postData(APIS.IMAGE.PROFILE_PIC, data);
  }
  // get user list 
  getUserList(paginate) {
    return this.http.getData(`${APIS.USER.USER_LIST}`, paginate);
  }

  approveRejectUser(data) {
    return this.http.putData(`${APIS.USER.APPROVE_USER}`, data);
  }

  addNewUser(data) {
    return this.http.postData(`${APIS.USER.ADD_NEW_USER}`, data);
  }

  updateUserRole(data) {
    return this.http.putData(APIS.USER.UPDATE_USER, data);
  }

  suspendUnsuspendUser(data) {
    return this.http.putData(`${APIS.USER.SUSPEND_UNSUSPEND_USER}`, data)
  }

  getUserListingFilters() {
    return this.http.getData(`${APIS.USER.GET_FILTERS}`)
  }

  getOrCreateRole(permissions?) {
    if (permissions) {
      return this.http.postData(`${APIS.ROLE.ROLE}`, permissions)
    }
    else {
      return this.http.getData(`${APIS.ROLE.ROLE}`)
    }
  }

  getRolesBasedOnType(roleType) {
    return this.http.getData(`${APIS.ROLE.ROLE}`, roleType)
  }

  updateRole(data?) {
    return this.http.putData(`${APIS.ROLE.ROLE}`, data)

  }

  deleteRole(query) {
    return this.http.deleteData(`${APIS.ROLE.ROLE}`, query)
  }

  getPermissionsByRole(data) {
    return this.http.getData(APIS.USER.GET_PERMISSIONS_BY_ROLE, data);
  }

  getLogs(data?) {
    return this.http.getData(APIS.LOGS.GET_LOGS, data);
  }

  getErrorLogs(data?) {
    return this.http.getData(APIS.LOGS.FETCH_ERROR_LOGS, data);
  }

  getLogsFilter(data?){
    return this.http.getData(APIS.LOGS.FILTERS, data);
 }
}
