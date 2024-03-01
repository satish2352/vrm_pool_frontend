import { Component } from '@angular/core';
import { HelperService } from 'src/app/helper.service';
@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.sass']
})
export class Screen1Component {
  dashboarddata:any=[]
  constructor(
    private helperService: HelperService,
 ) { }
 ngOnInit(): void {
  this.getDashboardStats();
}



 getDashboardStats() {
  this.helperService.getDashboardStats().subscribe(list => {
    if (list['result'] == true) {
      this.dashboarddata = list['data'];
      console.log(this.dashboarddata);
    }
  });
}
}
 