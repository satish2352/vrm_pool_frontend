import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-supervisorlist',
  templateUrl: './supervisorlist.component.html',
  styleUrls: ['./supervisorlist.component.sass']
})
export class SupervisorlistComponent implements OnInit {
  selectedFile!: File;
  pagesize: number = 10;
  currentpage:number =1;
  alllist : any []= [];
  // alllistFileWise: any = [];
  supervisorlist: any = [];


  constructor(
    private helperService: HelperService,
    public router: Router,
    private toastr: ToastrService
 ) { }

  ngOnInit() {
    this.getAllSupervisorList2();
  }

  getAllSupervisorList2() {
    this.helperService.getAllSupervisorUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.supervisorlist = list['data'];
      }
      
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
          Swal.fire('Success', `Inserted :${response.inserted}<br>Not Inserted : ${response.notInserted}`, 'success');
          this.getAllSupervisorList2();
        } else {
          // Use SweetAlert2 for error message
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: (error: any) => {
        console.error('Error uploading file:', error);
        // Use SweetAlert2 for error message
        Swal.fire('Error', 'Error uploading file. Please try again.', 'error');
      }
    });
  }

  onSelectChange(val:any) {
   let data =  { fileId: val.value};
  }

  downloadFileIdWise(data: any) {
        const fileUrl = "http://13.234.59.130:3000/api/downloadFile?fileId="+data;
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
}
