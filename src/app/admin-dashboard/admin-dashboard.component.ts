import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  user_type :any
  loading: boolean = true;
  
  constructor(private router: Router,
    private helperService: HelperService) 
    
    {
    this.user_type = localStorage.getItem('user_type')
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; // Set loading to false after the delay
    }, 2000);
    
  }
  // gotoform(){
  //   this.router.navigate(['/from1']);
  // }

  logout() {
    this.helperService.logout()
    this.router.navigate(['/login']);
  }
  
}
