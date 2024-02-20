

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: HelperService,private router: Router) { }


  login() {
    var data ={
      'email':this.email,
      'password':this.password
    }
    alert(this.email)
    this.authService.login(data).subscribe({
      next: (response: any) => {
        // Assuming response contains a token
        if (response && response.token) {
          // Handle successful login
          console.log('Login successful', response);
          this.authService.saveToken(response.token);
          console.log("Token saved successfully");
          this.router.navigate(['/admin-dashboard']);
        } else {
          // Handle error when token is missing
          console.error('Token missing in response');
          this.error = 'Authentication failed. Please try again.';
          alert('Enter Valid Data')
        }
      },
      error: (error: any) => {
        // Handle login error
        console.error('Login error', error);
        this.error = 'email or password is incorrect';
      }
    });
  }
}
