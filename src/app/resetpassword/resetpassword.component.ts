import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.sass']
})
export class ResetpasswordComponent {
  loginForm: FormGroup;
  resetpasswordfrom!: FormGroup
  response: any = []
  resetpassworddata: any
  constructor(private formBuilder: FormBuilder, private helperService: HelperService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      mobile: ['', Validators.required],

    });
    this.resetpasswordfrom = this.formBuilder.group({
      otp: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }
  SendOtp() {
    this.helperService.getOtpbymobile(this.loginForm.value).subscribe(list => {
      if (list['result'] == true) {
        this.response = list;
      }

    });
  }
  resetpass() {


    if (this.resetpasswordfrom.invalid) {
      console.log('Form Invalid');
      this.toastr.error('Form Password', 'Error');
      return;
    }
    this.resetpassworddata = this.resetpasswordfrom.value;
    console.log(this.resetpassworddata.otp);

    const data = {
      'password': this.resetpassworddata.password,
      'confirm_password': this.resetpassworddata.confirm_password,
      'otp': this.resetpassworddata.otp,
      'mobile': this.loginForm.value.mobile
    }
    if (this.resetpassworddata.password !== this.resetpassworddata.confirm_password) {
      console.log('Passwords do not match');
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    this.helperService.resetpassword(data).subscribe(list => {
      if (list['result'] === true) {
        this.toastr.success('Password Successfully Changed', 'Success');
        this.router.navigate(['/login']);
      }
      else {
        this.toastr.error('Invalid OTP', 'Error');
      }
    });



  }


}
