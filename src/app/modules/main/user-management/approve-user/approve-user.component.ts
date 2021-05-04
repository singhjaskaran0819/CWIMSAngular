import { Component, OnInit } from '@angular/core';
import { APPROVE_USER, MODAL_SIZE } from 'src/app/common/constants';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import { RejectUserComponent } from '../reject-user/reject-user.component';
@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.scss']
})
export class ApproveUserComponent implements OnInit {

  userDetails;
  role;
  roles
  constructor(private modalService: ModalService,
    private userService: UserService) { }

  ngOnInit(): void {

  }

  getUserDefinedRole() {
    this.userService.getOrCreateRole().subscribe((res) => {
      this.roles = res.data.rows;
    })
  }

  approveRejectUser(status) {

    var data = {
      "email": this.userDetails.email,
      "status": status
    }
    this.userService.approveRejectUser(data).subscribe((res) => {
      this.userService.changeUpdateListFlagValue(true);
      this.modalService.closeModal();
    })
  }

  cancelApproval() {
    this.modalService.closeModal();
  }

  acceptUser() {
    this.approveRejectUser(APPROVE_USER.Approved)
  }
  close() {
    this.modalService.closeModal();
  }
}
