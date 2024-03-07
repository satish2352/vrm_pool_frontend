import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelperService } from '../../helper.service';
@Component({
  selector: 'app-one-agets-under-reports',
  templateUrl: './one-agets-under-reports.component.html',
  styleUrls: ['./one-agets-under-reports.component.sass']
})
export class OneAgetsUnderReportsComponent {
 



  agentid:any;
  pagesize: number = 10;
  currentpage:number =1;
  agentsunderreports: any = [];

  constructor(
    private HelperService: HelperService,
    private route: ActivatedRoute,
 ) { }

  ngOnInit(): void {
    this.agentid = this.route.snapshot.params['id'];
    if (this.agentid) {
      var obj = { 'id': this.agentid };
      this.HelperService.getunderagentreports(obj).subscribe(list => {
        this.agentsunderreports = list['data'];
      });

    }
  }
  
 

}
