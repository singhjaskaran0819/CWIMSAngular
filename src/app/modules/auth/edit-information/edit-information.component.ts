
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MODAL_SIZE, REGEX } from '../../../common/constants';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { environment } from 'src/environments/environment';
import * as countriesNames from "countries-names";
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwalService } from 'src/app/common/swal.service';
import { timer, Subscription } from "rxjs";
@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss', '../login/login.component.scss', '../sign-up/sign-up.component.scss']
})
export class EditInformationComponent implements OnInit {

  // passwordType = 'password';
  show: Boolean = false;
  InfoForm;
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
  selectedCountryISO = CountryISO.Barbados

  countries;
  isLoggedIn;
  role;
  hideWarehouse = false;
  userId;
  userDetails;
  saveClicked = false;

  otpSent = false;
  otp = "";
  countDown: Subscription;
  counter = 180;
  tick = 1000;

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private modalService: ModalService, private swal: SwalService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId')
    });

    if (this.userId) {
      this.getUserDetails();
    }
    this.countries = countriesNames.all();
    this.getWarehouseList();
    this.getRoles();
    this.initForm();
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    this.role = sessionStorage.getItem('roleCode');

    this.authService.otpSent.subscribe((res) => {
      console.log("res: ", res)
      this.otpSent = res;
      if (this.otpSent) {
        this.expirationCounter();
      }
      // else {
      //   this.router.navigateByUrl('/auth/login');
      // }
    })
  }

  expirationCounter() {
    // this.countDown: Subscription;
    this.counter = 180;
    // this.tick = 1000;
    console.log(this.counter)
    timer(0, 1000).subscribe(() => {
      if (this.counter != 0) {
        --this.counter
      }
    });
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  verifyOtp() {
    let data = {
      "otp": this.otp,
      // "role": sessionStorage.getItem("roleCode"),
      "email": sessionStorage.getItem("email")
    }

    this.authService.verifyOtp(data).subscribe((res) => {
      if (res) {
        // this.swal.successSwal(res.msg);
        this.editInfo();
        // this.router.navigateByUrl('/auth/login');
      }
    })
  }
  signIn() {
    this.router.navigateByUrl('/auth/login');
  }

  resendOtp() {
    var data = {
      // "role": sessionStorage.getItem("roleCode"),
      "email": sessionStorage.getItem("email")
    }
    this.authService.resendOtp(data).subscribe((res) => {
      if (res) {
        if (res.statusCode == 200) {
          this.authService.changeOtpSent(true);
          // this.countDown.unsubscribe();
          this.swal.successSwal(res.msg);
          this.editInfo();
          this.expirationCounter();
        }
      }
    })
  }

  ngOnDestroy() {
    this.countDown = null;
  }

  initForm() {
    this.InfoForm = this.formBuilder.group({
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
      // password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD), Validators.maxLength(15)]],
      recaptcha: ['', Validators.required]
      // recaptcha: ['']

    });
  }

  getUserDetails() {
    this.userService.fetchUserDetail(this.userId).subscribe((res) => {
      this.userDetails = res.data;
      if (this.userDetails) {

        sessionStorage.setItem("roleCode", this.userDetails.userrole.id);
        sessionStorage.setItem("email", this.userDetails.email)

        this.InfoForm.patchValue({ role: this.userDetails.userrole.title })
        this.InfoForm.patchValue({ firstName: this.userDetails.firstName })
        this.InfoForm.patchValue({ lastName: this.userDetails.lastName })
        this.InfoForm.controls['phone'].patchValue({ number: this.userDetails.phoneNumber })
        this.selectedCountryISO = this.userDetails.countryIso

        this.InfoForm.patchValue({ street: this.userDetails.street })
        this.InfoForm.patchValue({ city: this.userDetails.city })
        this.InfoForm.patchValue({ country: this.userDetails.country })
        this.InfoForm.patchValue({ zipCode: this.userDetails.postalCode })
        this.InfoForm.patchValue({ email: this.userDetails.email })
        this.InfoForm.patchValue({ warehouseCode: this.userDetails.warehouseCode })
      }
    })
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
    return this.InfoForm.controls;
  }

  selectCountry(event) {
  }

  countryChange(event) {
  }

  selectedCountry;
  phoneNumberChange(event) {
    if (event.target.value) {
      for (var key in CountryISO) {
        if (CountryISO[key].toUpperCase() == this.InfoForm.controls.phone?.value?.countryCode) {
          this.selectedCountry = key;
          this.InfoForm.patchValue({ country: this.selectedCountry })
        }
      }
    }
  }

  selectWarehouse(event) {
  }

  infoEditted() {
    this.submitted = true;
    this.saveClicked = true;
    if (this.InfoForm.invalid) {
      return;
    }
    else {
      this.authService.getOtp({ "id": this.userId }).subscribe((res) => {
        console.log("res: ", res)
        if (res.statusCode == 200) {
          this.authService.changeOtpSent(true);
          sessionStorage.setItem("email", this.InfoForm.value.email)
        }
      })
    }
    // this.editInfo();
  }

  editInfo() {

    var data = {
      "id": this.userId,
      "role": this.roleCode,
      // "position": this.positionCode,
      "firstName": this.InfoForm.value.firstName,
      "lastName": this.InfoForm.value.lastName,
      "email": this.InfoForm.value.email,
      "phoneNumber": this.InfoForm.value.phone.internationalNumber,
      // "address": this.InfoForm.value.address,
      "street": this.InfoForm.value.street,
      "city": this.InfoForm.value.city,
      "country": this.InfoForm.value.country,
      "postalCode": this.InfoForm.value.zipCode,
      "warehouseCode": this.InfoForm.value.warehouseCode
      // "profilePicture": this.url
      // "password": this.InfoForm.value.password
    }
    if (data.warehouseCode == "") {
      delete data.warehouseCode;
    }
    var queryParams = { "moreInfo": true }
    this.authService.signUp(data, queryParams).subscribe((res) => {
      console.log(res)
      // sessionStorage.setItem("token", res.data);
      // sessionStorage.setItem("roleCode", this.roleCode);
      if (res) {
        if (res.statusCode == 200) {
          this.swal.successSwal(res.msg);
          // this.authService.changeOtpSent(true);
          // sessionStorage.setItem("email", this.InfoForm.value.email)
          this.router.navigateByUrl('/auth/login');
        }
      }
    })
  }

  // togglePassword() {
  //   if (this.passwordType == 'text') {
  //     this.passwordType = 'password';
  //   } else if (this.passwordType == 'password') {
  //     this.passwordType = 'text';
  //   }
  // }

  handleSuccessRecaptcha(event) {
    var data = {
      "recaptcha": event
    }

    this.authService.validateCaptcha(data).subscribe((res) => {
    })
  }

}

