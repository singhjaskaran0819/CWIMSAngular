import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  async logoutSwal() {
    return await Swal.fire({
      title: 'Logout',
      text: "You will be returned to the login screen.",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#2aa6f0',
      cancelButtonColor: '#fff',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      focusCancel: true
    })
  }

  async successSwal(text) {
    return await Swal.fire({
      icon: 'success',
      // title,
      text,
      showConfirmButton: false,
      timer: 3000
    })
  }

  async warningSwal(title, text) {
    return await Swal.fire({
      title,
      text,
      icon: 'warning',
      timer: 3000,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#2aa6f0',
      cancelButtonColor: '#fff',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      // focusCancel: true
    })
  }
}
