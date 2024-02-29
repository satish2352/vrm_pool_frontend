import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-admin-alluserlist',
  templateUrl: './admin-alluserlist.component.html',
  styleUrls: ['./admin-alluserlist.component.sass']
})
export class AdminAlluserlistComponent {
  pagesize: number = 10;
  currentpage: number = 1;
  supervisorsList: any = [];
  supervisorsList1: any = [];

  constructor(private helperService: HelperService, private router: Router
  ) { }
  ngOnInit(): void {
    
    this.getAllSupervisorList();
  }



  getAllSupervisorList() {
    this.helperService.getAllUsersList().subscribe(list => {
      if (list['result'] == true) {
        this.supervisorsList1  = list['data'];
      }
    });
  }
  userspasschange(users: any) {

    console.log(users);
    this.router.navigate(['/admin-dashboard/', 'users-change-password', users]);

  }
  listsepration(users: any) {
    let data = {'user_type' : users.value}
    this.helperService.getAllUsersList1(data).subscribe(list => {
      if (list['result'] == true) {
        this.supervisorsList1 = list['data'];
      }
    });

  }
  updateusers(mobile:any){
    console.log(mobile);
    
    this.router.navigate(['/admin-dashboard/', 'update-users-data', mobile]);
  }
}
