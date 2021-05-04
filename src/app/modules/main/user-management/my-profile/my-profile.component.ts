import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import { SharedService } from 'src/app/core/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import * as countriesNames from "countries-names";
import * as _ from 'lodash';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  formForProfile: FormGroup;
  updatePassword: FormGroup
  userInfo;
  edit = false;

  submitNewPassword = false;
  roleName;

  passwordNotMatch = false;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Barbados];
  selectedCountryISO = CountryISO.Barbados;
  countryIso;
  phoneNumber;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastMessageService,
    private sharedService: SharedService,
  ) {
    this.formForProfile = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      // phone: [''],
      addressLine1: [''],
      street: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      postalCode: ['', Validators.compose([Validators.required])],
      profilePicture: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.EMAIL), Validators.maxLength(70)])]
    })

    this.updatePassword = this.fb.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    })

  }

  ngOnInit(): void {
    // get info of loged user
    this.getUserDetails();
  }

  get controls() {
    return this.formForProfile.controls;
  }

  getUserDetails() {
    this.userService.getUserDetail().subscribe(res => {
      this.userInfo = res.data;
      this.roleName = this.userInfo.userrole.title.toUpperCase();
      this.formForProfile.controls['phoneNumber'].patchValue({ number: this.userInfo.phoneNumber })
      this.phoneNumber = this.userInfo.phoneNumber;
      this.selectedCountryISO = this.userInfo.countryIso;

      if (this.userInfo.lastPasswordUpdated && this.userInfo.lastPasswordUpdated !== '')
        this.userInfo.lastPasswordUpdated = moment(new Date(this.userInfo.lastPasswordUpdated), "YYYYMMDD").fromNow()
      Object.keys(this.formForProfile.controls).forEach(key => {
        this.formForProfile.controls[key].patchValue(this.userInfo[key]);
      })
    })
  }

  // edit detail
  editDetail() {
    if (this.edit) {
      this.getUserDetails();
    }
    this.edit = !this.edit;
  }

  // update password
  updatePasswordSubmit() {
    this.submitNewPassword = true;
    if (this.updatePassword.valid) {
      if (this.updatePassword.value.newPassword !== this.updatePassword.value.confirmPassword) {
        this.toastr.showError('New password and confirm password missmatch');
        // this.passwordNotMatch = true;
        // this.updatePassword.controls['newPassword'].patchValue('');
        // this.updatePassword.controls['confirmPassword'].patchValue('');
        // this.updatePassword.controls['newPassword'].markAsTouched({ onlySelf: true });
        // this.updatePassword.controls['confirmPassword'].markAsTouched({ onlySelf: true });
        return;
      } else {
        this.userService.updatePassword({ password: this.updatePassword.value.oldPassword, newPassword: this.updatePassword.value.newPassword }).subscribe(res => {
          this.toastr.showSuccess("Password changed successfully!")
          this.submitNewPassword = false;
          this.updatePassword.reset();
        })
      }
    } else {
      Object.keys(this.updatePassword.controls).forEach(key => {
        this.updatePassword.controls[key].markAsTouched({ onlySelf: true })
      })
    }
  }

  // update profile
  updateProfile() {
    if (this.formForProfile.valid) {
      var userInfo = {
        "id": this.userInfo.id,
        "role": this.formForProfile.value.role,
        "firstName": this.formForProfile.value.firstName,
        "lastName": this.formForProfile.value.lastName,
        "email": this.formForProfile.value.email,
        "phoneNumber": this.formForProfile.value.phoneNumber.internationalNumber,
        "countryIso": this.countryIso,
        "street": this.formForProfile.value.street,
        "city": this.formForProfile.value.city,
        "country": this.formForProfile.value.country,
        "postalCode": this.formForProfile.value.zipCode,
        "warehouseCode": this.formForProfile.value.warehouseCode,
        // "profilePicture": this.url,
      }
      // this.userService.updateUser(this.formForProfile.value).subscribe(res => {
      this.userService.updateUser(userInfo).subscribe(res => {
        this.sharedService.accountUpdated();
        this.edit = !this.edit;
        this.getUserDetails();
        // Object.keys(this.formForProfile.controls).forEach(key => {
        //   this.userInfo[key] = this.formForProfile.value[key];
        // });
      });
    } else {
      Object.keys(this.formForProfile.controls).forEach(key => {
        this.formForProfile.controls[key].markAsTouched({ onlySelf: true });
      })
    }

  }

  // uploade new profile picture
  uploadNewProfile(event) {
    let file = event.target.files[0];
    let data = new FormData;
    data.append('file', file);

    this.userService.uploadeFile(data).subscribe(res => {
      this.formForProfile.controls['profilePicture'].patchValue(res.data.Location);
      var data = {
        "id": this.userInfo.id,
        "profilePicture": res.data.Location
      }
      this.userService.updateUser(data).subscribe(res => {
        this.toastr.showSuccess("Profile picture changed successfully!")
        this.userService.changeUpdateProfileFlagValue(true);
        this.getUserDetails();
      });

    })
  }

  // remove picture
  removeProfilePicture() {
    this.formForProfile.controls['profilePicture'].patchValue('');
    var data = {
      "id": this.userInfo.id,
      "profilePicture": ""
    }
    this.userService.updateUser(data).subscribe(res => {
      this.toastr.showSuccess("Profile picture removed successfully!")
      this.userService.changeUpdateProfileFlagValue(true);
    });
  }

  checkIfPatternError(pattern) {
    if (_.isPlainObject(pattern)) {
      return true;
    }
    return false;
  }

  selectCountry(event) {
  }

  countryChange(event) {
    this.countryIso = event.iso2;
  }

  selectedCountry;
  phoneNumberChange(event) {
    // if (event.target.value) {
    //   for (var key in CountryISO) {
    //     if (CountryISO[key].toUpperCase() == this.formForProfile.controls.phone?.value?.countryCode) {
    //       this.selectedCountry = key;
    //       this.formForProfile.patchValue({ country: this.selectedCountry })
    //     }
    //   }
    // }
  }
}
