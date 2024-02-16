import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {} 
  signIn() {
    // Perform authentication logic here


    // Navigate to the admin dashboard on successful sign-in
    this.router.navigate(['/admin-dashboard']);
  }
}
