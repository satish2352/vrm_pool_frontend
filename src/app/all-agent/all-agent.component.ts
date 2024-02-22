import { Component } from '@angular/core';

import { HelperService } from '../helper.service';
@Component({
  selector: 'app-all-agent',
  templateUrl: './all-agent.component.html',
  styleUrls: ['./all-agent.component.sass']
})
export class AllAgentComponent {
  p: number = 1;
  alllist: any = [];

  constructor(
    private HelperService: HelperService,
 ) { }

  ngOnInit(): void {
    this.getAllAgentList();
  }
  
  getAllAgentList() {
    this.HelperService.getAllExotelAgentList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }
    });
  }
 

}
