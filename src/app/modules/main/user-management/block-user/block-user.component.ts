import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import { APPROVE_USER } from 'src/app/common/constants';
@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent implements OnInit {

  constructor(private modalService: ModalService, private userService: UserService) { }

  data;
  ngOnInit(): void {
  }

  suspendUnsuspendUser(value) {
    var data = {
      "userId": this.data.id,
      "isSuspended": value
    }
    this.userService.suspendUnsuspendUser(data).subscribe((res) => {
      this.userService.changeUpdateListFlagValue(true);
      this.modalService.closeModal();
    })
  }

  cancel() {
    this.modalService.closeModal();
  }

}
