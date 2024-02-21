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

  constructor(
    private authService: HelperService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
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
}


//done wala code
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HelperService } from '../helper.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   error: string = '';

//   constructor(private authService: HelperService,private router: Router) { }


//   login() {
//     var data ={
//       'email':this.email,
//       'password':this.password
//     }
//     alert(this.email)
//     this.authService.login(data).subscribe({
//       next: (response: any) => {
//         // Assuming response contains a token
//         if (response && response.token) {
//           // Handle successful login
//           console.log('Login successful', response);
//           this.authService.saveToken(response.token);
//           console.log("Token saved successfully");
//           this.router.navigate(['/admin-dashboard']);
//         } else {
//           // Handle error when token is missing
//           console.error('Token missing in response');
//           this.error = 'Authentication failed. Please try again.';
//           alert('Enter Valid Data')
//         }
//       },
//       error: (error: any) => {
//         // Handle login error
//         console.error('Login error', error);
//         this.error = 'email or password is incorrect';
//       }
//     });
//   }
// }