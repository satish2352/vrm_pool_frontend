import { Component } from '@angular/core';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-allagentlist',
  templateUrl: './allagentlist.component.html',
  styleUrls: ['./allagentlist.component.css']
})
export class AllagentlistComponent {
  pagesize: number = 10; 
  currentpage:number =1;
  allagentlist: any = [];
  supervisorSelected:any;
  loading: boolean = false; // Add loading variable
  constructor(
    private helperService: HelperService, 
 ) { }
 ngOnInit(): void {
  this.getAllAgentbySuperviserList();
}


getAllAgentbySuperviserList() {
  let data = {
    
    'superviserId': localStorage.getItem('user_id'),
    'user_type': 3
  }
  this.loading = true; // Show loader when fetching data
  
  this.helperService.getAllAgentbySuperviserList(data).subscribe(list => {
    if (list['result'] == true) {
      this.allagentlist = list['data'];
      this.loading = false; // Hide loader after data is fetched
    }
  });
}
pagerecords(val: any) {
  this.pagesize = val.value;
  console.log("page records called", this.pagesize);
  this.getAllAgentbySuperviserList();
}
}

