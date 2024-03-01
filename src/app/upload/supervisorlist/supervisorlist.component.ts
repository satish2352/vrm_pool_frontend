import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-supervisorlist',
  templateUrl: './supervisorlist.component.html',
  styleUrls: ['./supervisorlist.component.sass']
})
export class SupervisorlistComponent {
  selectedFile!: File;
  pagesize: number = 10;
  currentpage:number =1;
  alllist: any = [];
  alllistFileWise: any = [];

  constructor(
    private helperService: HelperService,
    public router: Router,
    private toastr: ToastrService
 ) { }

  ngOnInit(): void {
    this.getAllSupervisorList();
  }
  
  getAllSupervisorList() {
    this.helperService.getAllSupervisorUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // onUpload(): void {
  //   this.helperService.uploadFile(this.selectedFile)
  //     .subscribe(response => this.downLoadFile(response, "application/ms-excel"));
  // }
  onUpload(): void {
    this.helperService.uploadFile(this.selectedFile).subscribe({
      next: (response: any) => {
        if (response.result === true) {
          this.toastr.success('File uploaded successfully!', 'Success');
          this.downLoadFile(response, "application/ms-excel");
          
        } else {
          this.toastr.error('File upload failed.', 'Error');
        }
      },
      error: (error: any) => {
        console.error('Error uploading file:', error);
        this.toastr.error('Error uploading file. Please try again.', 'Error');
      }
    });
  }
  
  

  onSelectChange(val:any) {
   let data =  { fileId: val.value};
  }

  downLoadFile(data: any, type: string) {
    this.getAllSupervisorList()
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
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

