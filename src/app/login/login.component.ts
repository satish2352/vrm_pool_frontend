import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
          this.authService.saveToken(response.token);
          console.log("Token saved successfully");
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.error('Token missing in response');
          this.error = 'Authentication failed. Please try again.';
          alert('Enter Valid Data')
        }
      },
      error: (error: any) => {
        console.error('Login error', error);
        this.error = 'email or password is incorrect';
      }
    });
  }
  logout() {
    this.authService.logout(); 
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

