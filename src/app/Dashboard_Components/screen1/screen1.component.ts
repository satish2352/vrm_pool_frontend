import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.sass']
})
export class Screen1Component {
  user_type: any;
  dashboarddata: any = []
  constructor(
    private helperService: HelperService,
    public router: Router,
    
  ) { 
    this.user_type = localStorage.getItem('user_type');
  }
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
  
}
