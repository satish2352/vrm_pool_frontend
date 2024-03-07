

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.sass']
})
export class ResetpasswordComponent implements OnInit {
  loginForm!: FormGroup;
  resetpasswordfrom!: FormGroup;
  response: any = [];
  resetpassworddata: any;
  otpSent: boolean = false; // Variable to track whether OTP is sent
  timer: any; // Variable to hold the timer reference
  remainingTime: number = 60; // Time in seconds
  showPassword: boolean = false;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder, 
    private helperService: HelperService, 
    private router: Router, 
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    });

    this.resetpasswordfrom = this.formBuilder.group({
      otp: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  // SendOtp() {
  //   if (this.loginForm.invalid) {
  //     this.toastr.error('Please enter a valid mobile number', 'Error');
  //     return;
  //   }

  //   this.helperService.getOtpbymobile(this.loginForm.value).subscribe(list => {
  //     if (list['result'] == true) {
  //       this.response = list;
  //       this.toastr.success('OTP Successfully Send On Register Mobile Number', 'Success');
  //       this.otpSent = true; // Set otpSent to true to disable the button
  //       this.startTimer(); // Start the timer
  //     }
  //   });
  // }
  SendOtp() {
    if (this.loginForm.controls['mobile'].errors && this.loginForm.controls['mobile'].errors['required']) {
      this.responseMessage = 'Please enter a mobile number before sending OTP';
      return;
    }
  
    if (this.loginForm.invalid) {
      this.responseMessage = 'Please enter a valid mobile number';
      return;
    }
  
    this.helperService.getOtpbymobile(this.loginForm.value).subscribe(
      list => {
        if (list['result'] == true) {
          this.response = list;
          this.responseMessage = 'OTP Successfully Sent to Registered Email ';
          this.otpSent = true; // Set otpSent to true to disable the button
          this.startTimer(); // Start the timer
        } else {
          this.responseMessage = 'Failed to send OTP. Please try again later.';
        }
      },
      error => {
        console.error('Error sending OTP:', error);
        this.responseMessage = 'Enter Register Mobile Number.';
      }
    );
  }


  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.otpSent = false; // Enable the button
        clearInterval(this.timer); // Stop the timer
        this.remainingTime = 60; // Reset remaining time
      }
    }, 1000);
  }

  resetpass() {
    if (this.resetpasswordfrom.invalid) {
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }

    if (this.resetpasswordfrom.value.password !== this.resetpasswordfrom.value.confirm_password) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    this.resetpassworddata = this.resetpasswordfrom.value;

    const data = {
      'password': this.resetpassworddata.password,
      'confirm_password': this.resetpassworddata.confirm_password,
      'otp': this.resetpassworddata.otp,
      'mobile': this.loginForm.value.mobile
    }

    this.helperService.resetpassword(data).subscribe(list => {
      if (list['result'] === true) {
        this.toastr.success('Password Successfully Changed', 'Success');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Invalid OTP', 'Error');
      }
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
