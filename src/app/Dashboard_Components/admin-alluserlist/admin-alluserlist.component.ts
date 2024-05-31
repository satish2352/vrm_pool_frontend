// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HelperService } from 'src/app/helper.service';
// import { ToastrService } from 'ngx-toastr';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-admin-alluserlist',
//   templateUrl: './admin-alluserlist.component.html',
//   styleUrls: ['./admin-alluserlist.component.css']
// })
// export class AdminAlluserlistComponent {
//   pagesize: number = 10;
//   currentpage: number = 1;
//   loading: boolean = false; // Add loading variable
//   supervisorsList1: any = [];
//   page:number=1;
//   totalItems!: number;
//   totalPages!: number;

//   constructor(private helperService: HelperService, private router: Router, private toastr: ToastrService
//   ) { }
//   ngOnInit(): void {

//     this.getAllSupervisorList();
//   }
//   pagerecords(val: any) {
//     this.pagesize = val.value;

//     // this.getAllSupervisorList();
//   }


//   getAllSupervisorList() {
//     let data = { 'page': this.page };
//     this.loading = true; // Show loader when fetching data
//     this.helperService.getAllUsersList(data).subscribe(list => {
//       if (list.result == true) {
//         this.supervisorsList1 = list.data;
//         this.totalItems = list.totalItems;
//         this.totalPages = list.totalPages;
//         this.currentpage = list.currentPage;
//         this.supervisorsList1 = list['data'];
//       }
//       this.loading = false; // Hide loader after data is fetched
//     },
//       (error) => {
//         console.error('Error fetching agent list:', error);
//         this.loading = false; // Hide loader if an error occurs
//       });
//   }

//   userspasschange(users: any) {

//     console.log(users);
//     this.router.navigate(['/admin-dashboard/', 'users-change-password', users]);

//   }
//   // userspassreset(users: any) {
//   //   const data = {
//   //     'mobile': users
//   //   }
//   //   console.log(users);
//   //   this.helperService.resetuserpassword(data).subscribe(
//   //     {
//   //       next: (response: any) => {
//   //         if (response.result === true) {
//   //           console.log('Password changed successfully', response);
//   //           this.toastr.success('Password changed successfully', 'Success');
//   //         }
//   //         else {
//   //           this.toastr.error('Error updating user data', 'Error');
//   //         }
//   //       },
//   //       error: (error: any) => {
//   //         console.error('Error changing password', error);
//   //         this.toastr.error('Error changing password', 'Error');
//   //         // Handle error scenario here
//   //       }
//   //     }
//   //   );


//   // }

//   userspassreset(users: any) {
//     const data = {
//       'mobile': users
//     };

//     Swal.fire({
//       title: 'Confirmation',
//       text: 'Are you sure you want to reset the password for this user?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, reset password!',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.helperService.resetuserpassword(data).subscribe({
//           next: (response: any) => {
//             if (response.result === true) {
//               console.log('Password changed successfully', response);
//               this.toastr.success('Password changed successfully', 'Success');
//             } else {
//               this.toastr.error('Error updating user data', 'Error');
//             }
//           },
//           error: (error: any) => {
//             console.error('Error changing password', error);
//             this.toastr.error('Error changing password', 'Error');
//           }
//         });
//       }
//     });
//   }

//   listsepration(users: any) {
//     let data = { 'user_type': users.value }
//     this.helperService.getAllUsersList1(data).subscribe(list => {
//       if (list['result'] == true) {
//         this.supervisorsList1 = list['data'];
//       }
//     });

//   }

//   // deleteUser(users: any) {
//   //   let data = { 'id': users };

//   //   Swal.fire({
//   //     title: 'Confirmation',
//   //     text: 'Are you sure you want to reset the password for this user?',
//   //     icon: 'warning',
//   //     showCancelButton: true,
//   //     confirmButtonText: 'Yes, reset password!',
//   //     cancelButtonText: 'Cancel'
//   //   })
//   //   .then((result) =>{
//   //   // Show confirmation alert
//   //   if (confirm('Are you sure you want to delete this user?')) {
//   //     this.helperService.deleteUser(data).subscribe(list => {
//   //       if (list['result'] == true) {
//   //         this.toastr.success('User Delete Successfully', 'Success');
//   //         this.getAllSupervisorList();
//   //       }
//   //       this.getAllSupervisorList();
//   //   });
//   //   }} )
//   // }
//   // deleteUser(users: any) {
//   //   let data = { 'id': users };
//   //   // Show confirmation alert
//   //   if (confirm('Are you sure you want to delete this user?')) {
//   //     this.helperService.deleteUser(data).subscribe(list => {
//   //       if (list['result'] == true) {
//   //         this.toastr.success('User Delete Successfully', 'Success');
//   //         // this.getAllSupervisorList();
//   //         let data = { 'user_type': '2' }
//   //         this.helperService.getAllUsersList1(data).subscribe(list => {
//   //           if (list['result'] == true) {
//   //             this.supervisorsList1 = list['data'];
//   //           }
//   //         });
//   //       }
//   //       // this.getAllSupervisorList();
//   //     });
//   //   } else {
//   //     // User canceled deletion, do nothing
//   //   }
//   // }


//   deleteUser(users: any) {
//     let data = { 'id': users };

//     // Show SweetAlert confirmation dialog
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to delete this user?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, keep it'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // User confirmed deletion
//         this. loading=true
//         this.helperService.deleteUser(data).subscribe(
//           response => {

//             if (response['result'] === true) {

//               this.toastr.success('User Deleted Successfully', 'Success');
//               this. loading=false
//               // this.getAllSupervisorList(); // Fetch updated user list after deletion
//               let data = { 'user_type': '2' }
//               this.helperService.getAllUsersList1(data).subscribe(list => {
//                 if (list['result'] == true) {
//                   this. loading=false
//                   this.supervisorsList1 = list['data'];
//                 }
//               });
//             } else {
//               this. loading=false
//               // Display API error message if available
//               if (response['result'] === false) {
//                 this.loading= false
//                 Swal.fire({
//                   icon: 'error',
//                   title: 'Failed to delete user',
//                   text: response['message']
//                 });
//               } else {
//                 this. loading=false
//                 // Generic error message if no specific message received
//                 Swal.fire({
//                   icon: 'error',
//                   title: 'Failed to delete user',
//                   text: "User cant be deleted because relationship managers are mapped to this user"
//                 });
//               }
//             }
//           },
//           error => {
//             // Handle HTTP error (e.g., network error)
//             this. loading=false
//             console.error('Delete User API Error:', error);
//             Swal.fire({
//               icon: 'error',
//               title: 'Failed to delete user',
//               text: "User cant be deleted because relationship managers are mapped to this user"
//             });
//           }
//         );
//       }
//     });
//   }


//   // changeUserStatus(id: any, event: any) {
//   //   console.log(event.checked);

//   //   const statusValue = event.checked == true ? '1' : '0';

//   //   console.log('######################', statusValue);
//   //   const data = {
//   //     status: statusValue,
//   //     id: id
//   //   };


//   //   this.helperService.changeUserStatus(data).subscribe(list => {

//   //    if (list['result'] == true) {
//   //     alert("hjsdhjsahdh")
//   //       this.toastr.success(list.message, 'Success');
//   //     }

//   //   });

//   // }

//   changeUserStatus(id: any, event: any) {
//     console.log(event.checked);

//     const statusValue = event.checked == true ? '1' : '0';

//     console.log('######################', statusValue);
//     const data = {
//       status: statusValue,
//       id: id
//     };

//     try {
//       this.helperService.changeUserStatus(data).subscribe(list => {
//         if (list['result'] == true) {

//           this.toastr.success(list.message, 'Success');
//         }
//       }, error => {
//         console.error(error.message, error);

//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to Status Update',
//           text: error.error['message']
//         });
//         this.getAllSupervisorList()
//       });
//     } catch (error) {
//       console.error('Error occurred:', error);
//       this.toastr.error('An error occurred while changing user status.', 'Error');
//     }
//   }

//   updateusers(mobile: any) {
//     console.log(mobile);
//     this.router.navigate(['/admin-dashboard/', 'update-users-data', mobile]);
//   }
// }






import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-alluserlist',
  templateUrl: './admin-alluserlist.component.html',
  styleUrls: ['./admin-alluserlist.component.css']
})
export class AdminAlluserlistComponent implements OnInit {
  pageSize: number = 200;
  currentPage: number = 1;
  loading: boolean = false;
  supervisorsList1: any[] = [];
  totalItems!: number;
  totalPages!: number;
  dropusertype:string= '';

  constructor(
    private helperService: HelperService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllSupervisorList();
    
  }

  pagerecords(val: any) {
    this.pageSize = val.value ? val.value : 200;
    
    this.currentPage = 1; // Reset to first page
    this.getAllSupervisorList();
  }

  getAllSupervisorList() {
    console.log('))))))))))))))))))))))))))', this.dropusertype);
    
    let data = {
      'user_type':this.dropusertype,
      'page': this.currentPage,
      'pageSize': this.pageSize

    };

    this.loading = true;
    this.helperService.getAllUsersList(data).subscribe(
      response => {

        if (response.result) {
          // this.supervisorsList1 = [];
          this.supervisorsList1 = response.data;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
          console.log("response.currentPage",response);
          
        
        }
        this.loading = false;
      },
      error => {
        console.error('Error fetching supervisor list:', error);
        this.loading = false;
      }
    );
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllSupervisorList();
    }
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
    this.dropusertype=users.value
    console.log("this.dropusertype", this.dropusertype);
    
    let data = { 'user_type': users.value,
    'page': this.currentPage,
    'pageSize': this.pageSize

     }
    this.helperService.getAllUsersList1(data).subscribe(response => {
      if (response['result'] == true) {
        this.supervisorsList1 = response['data'];
     
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
          console.log("response.currentPage",response);
      }
    });

  }

  // deleteUser(users: any) {
  //   let data = { 'id': users };

  //   Swal.fire({
  //     title: 'Confirmation',
  //     text: 'Are you sure you want to reset the password for this user?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, reset password!',
  //     cancelButtonText: 'Cancel'
  //   })
  //   .then((result) =>{
  //   // Show confirmation alert
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     this.helperService.deleteUser(data).subscribe(list => {
  //       if (list['result'] == true) {
  //         this.toastr.success('User Delete Successfully', 'Success');
  //         this.getAllSupervisorList();
  //       }
  //       this.getAllSupervisorList();
  //   });
  //   }} )
  // }
  // deleteUser(users: any) {
  //   let data = { 'id': users };
  //   // Show confirmation alert
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     this.helperService.deleteUser(data).subscribe(list => {
  //       if (list['result'] == true) {
  //         this.toastr.success('User Delete Successfully', 'Success');
  //         // this.getAllSupervisorList();
  //         let data = { 'user_type': '2' }
  //         this.helperService.getAllUsersList1(data).subscribe(list => {
  //           if (list['result'] == true) {
  //             this.supervisorsList1 = list['data'];
  //           }
  //         });
  //       }
  //       // this.getAllSupervisorList();
  //     });
  //   } else {
  //     // User canceled deletion, do nothing
  //   }
  // }


  deleteUser(users: any) {
    let data = { 'id': users };

    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion
        this.loading = true
        this.helperService.deleteUser(data).subscribe(
          response => {

            if (response['result'] === true) {

              this.toastr.success('User Deleted Successfully', 'Success');
              this.loading = false
              // this.getAllSupervisorList(); // Fetch updated user list after deletion
              let data = { 'user_type': '2' }
              this.helperService.getAllUsersList1(data).subscribe(list => {
                if (list['result'] == true) {
                  this.loading = false
                  this.supervisorsList1 = list['data'];
                }
              });
            } else {
              this.loading = false
              // Display API error message if available
              if (response['result'] === false) {
                this.loading = false
                Swal.fire({
                  icon: 'error',
                  title: 'Failed to delete user',
                  text: response['message']
                });
              } else {
                this.loading = false
                // Generic error message if no specific message received
                Swal.fire({
                  icon: 'error',
                  title: 'Failed to delete user',
                  text: "User cant be deleted because relationship managers are mapped to this user"
                });
              }
            }
          },
          error => {
            // Handle HTTP error (e.g., network error)
            this.loading = false
            console.error('Delete User API Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete user',
              text: "User cant be deleted because relationship managers are mapped to this user"
            });
          }
        );
      }
    });
  }


  // changeUserStatus(id: any, event: any) {
  //   console.log(event.checked);

  //   const statusValue = event.checked == true ? '1' : '0';

  //   console.log('######################', statusValue);
  //   const data = {
  //     status: statusValue,
  //     id: id
  //   };


  //   this.helperService.changeUserStatus(data).subscribe(list => {

  //    if (list['result'] == true) {
  //     alert("hjsdhjsahdh")
  //       this.toastr.success(list.message, 'Success');
  //     }

  //   });

  // }

  changeUserStatus(id: any, event: any) {
    console.log(event.checked);

    const statusValue = event.checked == true ? '1' : '0';

    console.log('######################', statusValue);
    const data = {
      status: statusValue,
      id: id
    };

    try {
      this.helperService.changeUserStatus(data).subscribe(list => {
        if (list['result'] == true) {

          this.toastr.success(list.message, 'Success');
        }
      }, error => {
        console.error(error.message, error);

        Swal.fire({
          icon: 'error',
          title: 'Failed to Status Update',
          text: error.error['message']
        });
        this.getAllSupervisorList()
      });
    } catch (error) {
      console.error('Error occurred:', error);
      this.toastr.error('An error occurred while changing user status.', 'Error');
    }
  }

  updateusers(mobile: any) {
    console.log(mobile);
    this.router.navigate(['/admin-dashboard/', 'update-users-data', mobile]);
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




