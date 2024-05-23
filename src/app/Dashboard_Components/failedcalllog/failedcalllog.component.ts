import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-failedcalllog',
  templateUrl: './failedcalllog.component.html',
  styleUrls: ['./failedcalllog.component.css']
})
export class FailedcalllogComponent {

  selectedFile!: File;
  pagesize: number = 10;
  currentpage: number = 1;
  alllist1: any = [];

  envvariable: any;
  loading: boolean = false; // Add loading variable


  constructor(private helperService: HelperService,
    public router: Router,
    private fileDownloadService: FileDownloadService,
    private toastr: ToastrService) { }


  ngOnInit(): void {


    this.getAllfailedList();
    this.envvariable = environment.BASE_URL
  }

  getAllfailedList() {
    this.loading = true; // Show loader when fetching data
    this.helperService.getAllfailedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist1 = list['data'];
      } this.loading = false; // Hide loader after data is fetched
    },
    (error) => {
      console.error('Error fetching agent list:', error);
      this.loading = false; // Hide loader if an error occurs
    });
  }



  // downloadFileIdWise(data: any) {
  //   console.log(data);
  //   console.log(this.envvariable);
    
  //   const fileUrl = `${this.envvariable}/downloadNotInsertedDetailsFile?fileUrl=${data}`;
  //   var preview = document.getElementById("hiddenLink"); //getElementById instead of querySelectorAll
  //   if (preview) {
  //     preview.setAttribute("href", fileUrl);
  //     preview.click();
  //   } else {
  //     console.error("Element with id 'hiddenLink' not found.");
  //   }
  // }
  downloadFileIdWise(data: any) {
    console.log(data);
    console.log(this.envvariable);
    this.loading = true;
    const fileUrl = `${this.envvariable}/downloadNotInsertedDetailsFile?fileUrl=${data}`;
    let preview = document.getElementById("hiddenLink");
  
    if (!preview) {
      preview = document.createElement("a");
      preview.id = "hiddenLink";
      preview.style.display = "none";
      document.body.appendChild(preview);
    }
    preview.setAttribute("href", fileUrl);
    preview.setAttribute("download", "filename.extension"); // Optional: suggest a filename
    preview.click();
    this.loading = false;
  }
  
  pagerecords(val: any) {
    this.pagesize = val.value;
   
   this.getAllfailedList()
  }
  
}



