import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-reassign-permissions',
  templateUrl: './reassign-permissions.component.html',
  styleUrls: ['./reassign-permissions.component.scss']
})
export class ReassignPermissionsComponent implements OnInit {

  submitted = false;
  reassignRoleForm;
  userid;
  roles;
  role;
  roleId;
  roleType;
  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.initForm();
    this.reassignRoleForm.patchValue({ role: this.roleId })
    if (this.roleType) {
      this.getUserDefinedRole();
    }
  }

  initForm() {
    this.reassignRoleForm = this.formBuilder.group({
      role: ['', [Validators.required]]
    });
  }

  getUserDefinedRole() {
    this.userService.getRolesBasedOnType({ "type": this.roleType }).subscribe((res) => {
      this.roles = res.data.rows;
    })
  }
  get controls() {
    return this.reassignRoleForm.controls;
  }

  selectRole(event) {
  }
  cancel() {
    this.modalService.closeModal();
  }

  submit() {
    this.submitted = true;
    if (this.reassignRoleForm.invalid) {
      return;
    }
    var obj = {
      "userId": this.userid,
      "role": Number(this.reassignRoleForm.value.role)
    }

    this.userService.updateUserRole(obj).subscribe((res) => {
      this.userService.changeUpdateListFlagValue(true);
      this.modalService.closeModal();
    })
  }
}
