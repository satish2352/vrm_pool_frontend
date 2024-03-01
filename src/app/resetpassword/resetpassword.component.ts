

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HelperService } from '../helper.service';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-resetpassword',
//   templateUrl: './resetpassword.component.html',
//   styleUrls: ['./resetpassword.component.sass']
// })
// export class ResetpasswordComponent {
//   loginForm: FormGroup;
//   resetpasswordfrom: FormGroup;
//   response: any = [];
//   resetpassworddata: any;
//   otpSent: boolean = false; // Variable to track whether OTP is sent

//   constructor(
//     private formBuilder: FormBuilder, 
//     private helperService: HelperService, 
//     private router: Router, 
//     private toastr: ToastrService
//   ) {
//     this.loginForm = this.formBuilder.group({
//       mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
//     });

//     this.resetpasswordfrom = this.formBuilder.group({
//       otp: ['', Validators.required],
//       password: ['', Validators.required],
//       confirm_password: ['', Validators.required],
//     });
//   }

//   SendOtp() {
//     if (this.loginForm.invalid) {
//       this.toastr.error('Please enter a valid mobile number', 'Error');
//       return;
//     }

//     this.helperService.getOtpbymobile(this.loginForm.value).subscribe(list => {
//       if (list['result'] == true) {
//         this.response = list;
//         this.otpSent = true; // Set otpSent to true to disable the button
//         setTimeout(() => {
//           this.otpSent = false; // Enable the button after 1 minute
//         }, 60000);
//       }
//     });
//   }

//   resetpass() {
//     if (this.resetpasswordfrom.invalid) {
//       this.toastr.error('Please fill in all fields', 'Error');
//       return;
//     }

//     if (this.resetpasswordfrom.value.password !== this.resetpasswordfrom.value.confirm_password) {
//       this.toastr.error('Passwords do not match', 'Error');
//       return;
//     }

//     this.resetpassworddata = this.resetpasswordfrom.value;

//     const data = {
//       'password': this.resetpassworddata.password,
//       'confirm_password': this.resetpassworddata.confirm_password,
//       'otp': this.resetpassworddata.otp,
//       'mobile': this.loginForm.value.mobile
//     }

//     this.helperService.resetpassword(data).subscribe(list => {
//       if (list['result'] === true) {
//         this.toastr.success('Password Successfully Changed', 'Success');
//         this.router.navigate(['/login']);
//       } else {
//         this.toastr.error('Invalid OTP', 'Error');
//       }
//     });
//   }
// }

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

  SendOtp() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter a valid mobile number', 'Error');
      return;
    }

    this.helperService.getOtpbymobile(this.loginForm.value).subscribe(list => {
      if (list['result'] == true) {
        this.response = list;
        this.otpSent = true; // Set otpSent to true to disable the button
        this.startTimer(); // Start the timer
      }
    });
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
}
