import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  // gotoform(){
  //   this.router.navigate(['/from1']);
  // }

}
