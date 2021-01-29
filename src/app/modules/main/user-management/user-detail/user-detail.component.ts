import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId;
  userDetails;
  constructor(private userService: UserService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetail(this.userId).subscribe((res) => {
      this.userDetails = res.data;
    })
  }

  close() {
    this.modalService.closeModal();
  }

}
