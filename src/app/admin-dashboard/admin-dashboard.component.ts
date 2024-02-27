import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent {
  user_type :any
  constructor(private router: Router,
    private helperService: HelperService) {
    this.user_type = localStorage.getItem('user_type')
  }


  ngOnInit(): void {
    
  }
  // gotoform(){
  //   this.router.navigate(['/from1']);
  // }

  logout() {
    this.helperService.logout()
    this.router.navigate(['/login']);
  }
}
