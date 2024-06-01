import { Component } from '@angular/core';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-allagentlist',
  templateUrl: './allagentlist.component.html',
  styleUrls: ['./allagentlist.component.css']
})
export class AllagentlistComponent {
  pageSize: number = 200;
  currentPage: number = 1;
  allagentlist: any = [];
  totalItems!: number;
  totalPages!: number;
  dropusertype:string= '';
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
    'user_type': 3,
    'page': this.currentPage, 
    'pageSize': this.pageSize
  }
  
  this.loading = true; // Show loader when fetching data
  
  this.helperService.getAllAgentbySuperviserList(data).subscribe(list => {
    if (list['result'] == true) {
      this.allagentlist = list['data'];
      this.totalItems = list.totalItems;
      this.totalPages = list.totalPages;
      this.currentPage = list.currentPage;
      console.log("list.currentPage",list);
      this.loading = false; // Hide loader after data is fetched
    }
  });
}
pagerecords(val: any) {
  this.pageSize = val.value ? val.value : 200;
    
    this.currentPage = 1; // Reset to first page
  this.getAllAgentbySuperviserList();
}
onPageChange(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getAllAgentbySuperviserList();
  }

}
getPagination() {
  const delta = 7; // Number of pages to display before and after the current page
  const range = [];
  const rangeWithDots:any = [];
  let l:any;

  range.push(1);
  for (let i = this.currentPage - delta; i <= this.currentPage + delta; i++) {
    if (i < this.totalPages && i > 1) {
      range.push(i);
    }
  }
  range.push(this.totalPages);

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
}
}
