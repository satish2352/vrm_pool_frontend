import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-alluserlist',
  templateUrl: './admin-alluserlist.component.html',
  styleUrls: ['./admin-alluserlist.component.css']
})
export class AdminAlluserlistComponent {
  pagesize: number = 10;
  currentpage: number = 1;
  supervisorsList: any = [];
  supervisorsList1: any = [];

  constructor(private helperService: HelperService, private router: Router, private toastr: ToastrService
  ) { }
  ngOnInit(): void {

    this.getAllSupervisorList();
  }
 


  getAllSupervisorList() {
    this.helperService.getAllUsersList().subscribe(list => {
      if (list['result'] == true) {
        this.supervisorsList1 = list['data'];
      }
    });
  }
  
  userspasschange(users: any) {

    console.log(users);
    this.router.navigate(['/admin-dashboard/', 'users-change-password', users]);

  }
  // userspassreset(users: any) {
  //   const data = {
  //     'mobile': users
  //   }
  //   console.log(users);
  //   this.helperService.resetuserpassword(data).subscribe(
  //     {
  //       next: (response: any) => {
  //         if (response.result === true) {
  //           console.log('Password changed successfully', response);
  //           this.toastr.success('Password changed successfully', 'Success');
  //         }
  //         else {
  //           this.toastr.error('Error updating user data', 'Error');
  //         }
  //       },
  //       error: (error: any) => {
  //         console.error('Error changing password', error);
  //         this.toastr.error('Error changing password', 'Error');
  //         // Handle error scenario here
  //       }
  //     }
  //   );


  // }

  userspassreset(users: any) {
    const data = {
      'mobile': users
    };
  
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to reset the password for this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset password!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.helperService.resetuserpassword(data).subscribe({
          next: (response: any) => {
            if (response.result === true) {
              console.log('Password changed successfully', response);
              this.toastr.success('Password changed successfully', 'Success');
            } else {
              this.toastr.error('Error updating user data', 'Error');
            }
          },
          error: (error: any) => {
            console.error('Error changing password', error);
            this.toastr.error('Error changing password', 'Error');
          }
        });
      }
    });
  }
  
  listsepration(users: any) {
    let data = { 'user_type': users.value }
    this.helperService.getAllUsersList1(data).subscribe(list => {
      if (list['result'] == true) {
        this.supervisorsList1 = list['data'];
      }
    });

  }

  deleteUser(users: any) {
    let data = { 'id': users };
    // Show confirmation alert
    if (confirm('Are you sure you want to delete this user?')) {
        this.helperService.deleteUser(data).subscribe(list => {
            if (list['result'] == true) {
                this.toastr.success('User Delete Successfully', 'Success');
                this.getAllSupervisorList();
            }
        });
    } else {
        // User canceled deletion, do nothing
    }
}
  changeUserStatus(id: any, event: any) {
    console.log(event.checked);

    const statusValue = event.checked == true ? '1' : '0';

    console.log('######################', statusValue);
    const data = {
      status: statusValue,
      id: id
    };


    this.helperService.changeUserStatus(data).subscribe(list => {
      if (list['result'] == true) {
        this.toastr.success('User Status Updated Successfully', 'Success');
      }
    });

  }


  updateusers(mobile: any) {
    console.log(mobile);
    this.router.navigate(['/admin-dashboard/', 'update-users-data', mobile]);
  }
}
