


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string = '';
  submitted: boolean = false;
  adminLoginForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private authService: HelperService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]], // Mobile number should be 10 digits
      password: ['', Validators.required]
    });
  }

  get f() { return this.adminLoginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.adminLoginForm.invalid) {
      console.log('Form Invalid');
      return;
    }

    this.authService.login(this.adminLoginForm.value).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          console.log('Login successful', response);
          this.authService.saveToken(response.token, response.data.user_type, response.data.id);
          console.log("Token saved successfully");
          this.toastr.success('Login successfully', 'Success');
       
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.error('Token missing in response');
          this.error = 'Authentication failed. Please try again.';
         
          this.toastr.error('Authentication failed. Please try again.', 'Error');
        }
      },
      error: (error: any) => {
        console.error('Login error', error);
        this.error = 'Mobile or password is incorrect';
        this.toastr.error('Mobile or password is incorrect', 'Error');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  navigateToPage() {
    this.router.navigate(['/reset-password']);
  }

  resetpass() {
    alert('Change Password');
  }
}
