import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MODAL_SIZE, REGEX, ROLE_CODE, USER_POSITIONS } from 'src/app/common/constants';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { environment } from 'src/environments/environment';
import * as countriesNames from "countries-names";
import { AccessPermissionComponent } from '../access-permission/access-permission.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';

// const countriesNames = require('countries-names');
@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss', '../../../auth/sign-up/sign-up.component.scss', '../../../auth/login/login.component.scss']
})
export class AddNewUserComponent implements OnInit {

  passwordType = 'password';
  show: Boolean = false;
  signUpForm;
  submitted = false;
  roles;
  // operatorPositions;
  // officerPositions;
  roleCode;
  // userPositions = [];
  // positionCode;
  file;
  imageUrl;
  url;
  selectedPhoneCode;
  warehouseList;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Barbados];
  countries;
  isLoggedIn;
  role;
  hideWarehouse = true;
  countryIso = CountryISO.Barbados;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private modalService: ModalService, private userService: UserService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.roles = [];
    this.countries = countriesNames.all();
    this.getWarehouseList();
    this.getUserDefinedRole();
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      // position: [''],
      firstName: ['', [Validators.required, Validators.pattern(REGEX.ONLY_ALPHABETS), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.pattern(REGEX.ONLY_ALPHABETS), Validators.maxLength(15)]],
      phone: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.maxLength(70)]],
      zipCode: ['', [Validators.required, Validators.maxLength(6)]],
      country: ['', [Validators.required, Validators.maxLength(25)]],
      // address: ['', [Validators.required, , Validators.maxLength(30)]],
      warehouseCode: [''],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL), Validators.maxLength(70)]]
      // password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD), Validators.maxLength(15)]]
    });
  }

  getWarehouseList() {
    this.authService.getWarehouseDetails().subscribe((res) => {
      this.warehouseList = res.data;
    })
  }

  getUserDefinedRole() {
    this.userService.getOrCreateRole().subscribe((res) => {
      this.roles = res.data.rows;
    })
  }

  get controls() {
    return this.signUpForm.controls;
  }

  cancel() {
    this.modalService.closeModal();
  }

  selectRole(event) {
    console.log(event.target.value)
    // this.roleId = event.tartget.value;
    this.signUpForm.patchValue({ warehouseCode: '' })

    this.hideWarehouse = true;
    this.signUpForm.patchValue({ warehouseCode: '' })
    if (this.signUpForm.value.role.toUpperCase() == "3" || this.signUpForm.value.role.toUpperCase() == "4") {
      this.signUpForm.get('warehouseCode').setValidators([Validators.required]);
      this.signUpForm.get('warehouseCode').updateValueAndValidity();
      this.hideWarehouse = false;
    }
    if (this.signUpForm.value.role.toUpperCase() == "5" || this.signUpForm.value.role.toUpperCase() == "6") {
      this.signUpForm.get('warehouseCode').clearValidators();
      this.signUpForm.get('warehouseCode').updateValueAndValidity();
      this.hideWarehouse = true;
    }

    this.roleCode = event.target.value;

  }

  selectCountry(event) {
  }

  countryChange(event) {
    this.countryIso = event.iso2;
  }

  selectedCountry;
  phoneNumberChange(event) {

    if (event.target.value) {
      for (var key in CountryISO) {
        if (CountryISO[key].toUpperCase() == this.signUpForm.controls.phone?.value?.countryCode) {
          this.selectedCountry = key;
          this.signUpForm.patchValue({ country: this.selectedCountry })
        }
      }
    }
  }

  selectWarehouse(event) {
  }

  async submit() {

    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.callSignUp();
  }

  callSignUp() {
    var data = {
      "role": this.signUpForm.value.role,
      // "position": this.positionCode,
      "firstName": this.signUpForm.value.firstName,
      "lastName": this.signUpForm.value.lastName,
      "email": this.signUpForm.value.email,
      "phoneNumber": this.signUpForm.value.phone.internationalNumber,
      "countryIso": this.countryIso,
      // "address": this.signUpForm.value.address,
      "street": this.signUpForm.value.street,
      "city": this.signUpForm.value.city,
      "country": this.signUpForm.value.country,
      "postalCode": this.signUpForm.value.zipCode,
      "warehouseCode": this.signUpForm.value.warehouseCode,
      // "profilePicture": this.url,
      // "password": this.signUpForm.value.password
    }
    if (data.warehouseCode == "") {
      delete data.warehouseCode;
    }
    this.userService.addNewUser(data).subscribe((res) => {
      this.userService.changeUpdateListFlagValue(true);
      this.modalService.closeModal();
    })
  }

  // togglePassword() {
  //   if (this.passwordType == 'text') {
  //     this.passwordType = 'password';
  //   } else if (this.passwordType == 'password') {
  //     this.passwordType = 'text';
  //   }
  // }

}
