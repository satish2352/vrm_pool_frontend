import { Component } from '@angular/core';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-all-supervisor',
  templateUrl: './all-supervisor.component.html',
  styleUrls: ['./all-supervisor.component.sass']
})
export class AllSupervisorComponent {
  pagesize: number = 10;
  currentpage:number =1;
  alllist: any = [];

  constructor(
    private HelperService: HelperService,
 ) { }

  ngOnInit(): void {
    this.getAllSupervisorList();
  }
  
  getAllSupervisorList() {
    this.HelperService.getAllExotelSupervisorList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = [];
        this.alllist = list['data'];
      }
    });
  }
 
}
