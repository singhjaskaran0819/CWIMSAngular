import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX, ROLE_CODE, USER_POSITIONS } from '../../../common/constants';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { environment } from 'src/environments/environment';
import * as countriesNames from "countries-names";
// const countriesNames = require('countries-names');

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../login/login.component.scss']
})
export class SignUpComponent implements OnInit {

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
  siteKey = environment.siteKey;
  // siteKey = '6LepEc8ZAAAAAE7GIgABeAyYv86n2z7aToi8VwQQ';

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Barbados];
  countries;
  isLoggedIn;
  role;
  hideWarehouse = false;
  countryIso = CountryISO.Barbados;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.countries = countriesNames.all();
    this.getWarehouseList();
    this.getRoles();
    this.initForm();
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    this.role = sessionStorage.getItem('roleCode');
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
      warehouseCode: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL), Validators.maxLength(70)]],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD), Validators.maxLength(15)]],
      recaptcha: ['', Validators.required]
      // recaptcha: ['']
    });
  }

  getWarehouseList() {
    this.authService.getWarehouseDetails().subscribe((res) => {
      this.warehouseList = res.data;
    })
  }

  getRoles() {
    this.authService.getRoles().subscribe((res) => {
      this.roles = res.data;
    })
  }

  get controls() {
    return this.signUpForm.controls;
  }

  signIn() {
    this.router.navigateByUrl('/auth/login');
  }

  selectRole(event) {
    this.hideWarehouse = false;
    // this.signUpForm.patchValue({ position: '' })
    this.signUpForm.patchValue({ warehouseCode: '' })
    if (this.signUpForm.value.role.toUpperCase() == "3" || this.signUpForm.value.role.toUpperCase() == "4") {
      // this.userPositions = this.operatorPositions;
      // this.signUpForm.get('position').enable();
      // this.signUpForm.get('position').setValidators([Validators.required]);
      // this.signUpForm.get('position').updateValueAndValidity();
      this.signUpForm.get('warehouseCode').setValidators([Validators.required]);
      // this.signUpForm.get('warehouseCode').enable();
      this.signUpForm.get('warehouseCode').updateValueAndValidity();
    }
    if (this.signUpForm.value.role.toUpperCase() == "5" || this.signUpForm.value.role.toUpperCase() == "6") {

      // this.userPositions = this.officerPositions;
      // this.signUpForm.get('position').enable();
      // this.signUpForm.get('position').setValidators([Validators.required]);
      // this.signUpForm.get('position').updateValueAndValidity();
      this.signUpForm.get('warehouseCode').clearValidators();
      // this.signUpForm.get('warehouseCode').disable();
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.file = event.target.files[0];
      reader.onloadend = (event) => {
        this.imageUrl = event.target.result;
      }
    }
  }

  async signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    if (this.file) {
      let input = new FormData();
      input.append('file', this.file);
      await this.authService.uploadImage(input).subscribe((response: any) => {
        this.url = response.data.Location
        this.callSignUp();
      })
    }
    else {
      this.callSignUp();
    }
  }

  callSignUp() {
    var data = {
      "role": this.roleCode,
      // "position": this.positionCode,
      "firstName": this.signUpForm.value.firstName,
      "lastName": this.signUpForm.value.lastName,
      "email": this.signUpForm.value.email,
      "phoneNumber": this.signUpForm.value.phone.internationalNumber,
      // "address": this.signUpForm.value.address,
      "street": this.signUpForm.value.street,
      "city": this.signUpForm.value.city,
      "country": this.signUpForm.value.country,
      "postalCode": this.signUpForm.value.zipCode,
      "warehouseCode": this.signUpForm.value.warehouseCode,
      "profilePicture": this.url,
      "countryIso": this.countryIso,
      "password": this.signUpForm.value.password
    }
    if (data.warehouseCode == "") {
      delete data.warehouseCode;
    }

    this.authService.signUp(data).subscribe((res) => {
      // sessionStorage.setItem("token", res.data);
      sessionStorage.setItem("email", this.signUpForm.value.email)
      this.authService.changeOtpSent(true);
      sessionStorage.setItem("roleCode", this.roleCode);

      this.router.navigateByUrl('/auth/otp');
    })
  }

  togglePassword() {
    if (this.passwordType == 'text') {
      this.passwordType = 'password';
    } else if (this.passwordType == 'password') {
      this.passwordType = 'text';
    }
  }

  handleSuccessRecaptcha(event) {
    var data = {
      "recaptcha": event
    }

    this.authService.validateCaptcha(data).subscribe((res) => {
    })
  }

}
