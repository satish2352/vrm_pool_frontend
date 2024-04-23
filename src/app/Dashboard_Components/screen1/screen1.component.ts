import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.sass']
})
export class Screen1Component {
  dashboarddata: any = []
   user_type :any=localStorage.getItem('user_type');
  constructor(
    private helperService: HelperService,
    public router: Router,
  ) { }
  ngOnInit(): void {
    this.getDashboardStats();
 
  }


  calculateAbsoluteDifference(incomingCalls: number, missedCalls: number): number {
    return Math.abs(incomingCalls - missedCalls);
  }

  // getDashboardStats() {

  //   this.helperService.getDashboardStats().subscribe(list => {
  //     if (list['result'] == true) {
  //       this.dashboarddata = list['data'];
  //       console.log(this.dashboarddata);
  //     }
  //   });
  // }

  getDashboardStats() {
    if (this.user_type == 2) {
      const userId = localStorage.getItem('user_id') 
      this.helperService.getDashboardStatsagents(userId).subscribe(list => {
        if (list['result'] == true) {
          this.dashboarddata = list['data'];
          console.log(this.dashboarddata);
        }
      });
    } else {
      this.helperService.getDashboardStatss().subscribe(list => {
        if (list['result'] == true) {
          this.dashboarddata = list['data'];
          console.log(this.dashboarddata);
        }
      });
    }
  }
  
  viewreposts() {
    this.router.navigate(['/admin-dashboard', 'admin-all-user-list']);
  }
  viewagentreposts() {
    
    this.router.navigate(['/admin-dashboard', 'admin-all-user-list']);
  }
  viewrepostsdetails() {
    
    this.router.navigate(['/admin-dashboard', 'all-call-log-admin']);
  }
}
