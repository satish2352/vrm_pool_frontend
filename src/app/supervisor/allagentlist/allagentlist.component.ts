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
 
  
  this.helperService.getAllAgentbySuperviserList(data).subscribe(list => {
    if (list['result'] == true) {
      this.allagentlist = list['data'];
    }
  });
}

}

