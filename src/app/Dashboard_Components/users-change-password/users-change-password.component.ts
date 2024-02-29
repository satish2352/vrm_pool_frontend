import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ActivatedRoute, Params, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-change-password',
  templateUrl: './users-change-password.component.html',
  styleUrls: ['./users-change-password.component.sass']
})
export class UsersChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  id: any;
  constructor(private authService: HelperService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.toastr.error('Invalid Password', 'Error');
      return;
    }

    const password = this.changePasswordForm.value.password;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;
    const userid = this.id
    const data = {

      password: this.changePasswordForm.value.password,
      confirm_password: this.changePasswordForm.value.confirmPassword,
      id: userid
    }
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    this.authService.changepassword(data).subscribe(
      {
        next: (response: any) => {
          if (response.result === true) {
          console.log('Password changed successfully', response);
          this.toastr.success('Password changed successfully', 'Success');
          }
          else {
            this.toastr.error('Error updating user data', 'Error');
          }
        },
        error: (error: any) => {
          console.error('Error changing password', error);
          this.toastr.error('Error changing password', 'Error');
          // Handle error scenario here
        }
      }
    );
  }
}
