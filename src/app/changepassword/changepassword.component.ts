

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  showPassword: boolean = false;
  constructor(
    private authService: HelperService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.toastr.error('Please fill all required fields', 'Error');
      return;
    }

    const password = this.changePasswordForm.value.password;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;
    if (password.length < 8) {
      this.toastr.error('Password must be at least 8 characters long', 'Error');
      return;
    }
    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    const userid = localStorage.getItem('user_id');
    const data = {
      password: password,
      confirm_password: confirmPassword,
      id: userid
    }

    this.authService.changepassword(data).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message, 'Success');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error.status === 400) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('An error occurred. Please try again later.', 'Error');
        }
      }
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
