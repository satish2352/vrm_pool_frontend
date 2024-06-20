import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  user_type: any;
  token: any;
  loading: boolean = true;
  isLogoClicked = false;

  constructor(private router: Router, private helperService: HelperService) {
    this.user_type = localStorage.getItem('user_type');
    this.token = localStorage.getItem('auth-token');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; // Set loading to false after the delay
    }, 2000);
    this.isLogoClicked = false;
  }

  logoClicked() {
    console.log(this.isLogoClicked);
    if (this.isLogoClicked) {
      this.isLogoClicked = false;
    } else {
      this.isLogoClicked = true;
    }
  }

  // logout() {
  //   this.helperService.logout()
  //   this.router.navigate(['/login']);
  // }
  logout() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, log out!',
      confirmButtonColor: 'red',

      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.helperService.logout().subscribe((list) => {
          if (list['result'] == true) {
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@', list);

            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_type');
            localStorage.removeItem('user_id');
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}
