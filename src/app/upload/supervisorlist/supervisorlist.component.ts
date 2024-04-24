import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-supervisorlist',
  templateUrl: './supervisorlist.component.html',
  styleUrls: ['./supervisorlist.component.css']
})
export class SupervisorlistComponent implements OnInit {
  selectedFile!: File;
  pagesize: number = 10;
  currentpage:number =1;
  alllist : any []= [];
  envvariable:any;
  // alllistFileWise: any = [];
  supervisorlist: any = [];
  loading: boolean = false; // Add loading variable


  constructor(
    private helperService: HelperService,
    public router: Router,
    private toastr: ToastrService
 ) { }

  ngOnInit() {
    this.getAllSupervisorList2();
    this.envvariable = environment.BASE_URL
  }

  getAllSupervisorList2() {
    this.loading = true; // Show loader when fetching data
    this.helperService.getAllSupervisorUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.supervisorlist = list['data'];
      }this.loading = false; // Hide loader after data is fetched
      
    },
    (error) => {
      console.error('Error fetching agent list:', error);
      this.loading = false; // Hide loader if an error occurs
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // onUpload(): void {
  //   this.helperService.uploadFile(this.selectedFile).subscribe({
  //     next: (response: any) => {
  //       if (response.result === true) {
  //         this.toastr.success('File uploaded successfully!', 'Success');
  //         // this.downLoadFile(response, "application/ms-excel");
          
  //       } else {
  //         this.toastr.error('File upload failed.', 'Error');
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error('Error uploading file:', error);
  //       this.toastr.error('Error uploading file. Please try again.', 'Error');
  //     }
  //   });
  // }
  onUpload(): void {
    this.helperService.uploadFile(this.selectedFile).subscribe({
      next: (response: any) => {
        if (response.result === true) {
          // Use SweetAlert2 for success message
          this.getAllSupervisorList2();
          Swal.fire('Success', `Inserted :${response.inserted}<br>Not Inserted : ${response.notInserted}`, 'success');
          
        } else {
          // Use SweetAlert2 for error message
          this.getAllSupervisorList2();
          Swal.fire('Error', response.message, 'error');
        }
      }, 
      error: (error: any) => {
        console.error('Error uploading file:', error);
        // Use SweetAlert2 for error message
        Swal.fire('Error',`${error['error'].message}`, 'error');
      }
    });
  }

  onSelectChange(val:any) {
   let data =  { fileId: val.value};
  }

  downloadFileIdWise(data: any) {
    const fileUrl = `${this.envvariable}/downloadFile?fileId=${data}` ;
        var preview = document.getElementById("hiddenLink"); //getElementById instead of querySelectorAll
        if (preview) {
            preview.setAttribute("href", fileUrl);
            preview.click();
        } else {
            console.error("Element with id 'hiddenLink' not found.");
        }
  }

  showDetails(data: any) {
    this.router.navigate(['/admin-dashboard/','get-details',data]);
  }
  pagerecords(val: any) {
    this.pagesize = val.value;
   
    this.getAllSupervisorList2();
  }
}
