// import { Component } from '@angular/core';
// import { FileDownloadService } from 'src/app/FileDownloadService'
// import { Router } from '@angular/router';
// import { HelperService } from 'src/app/helper.service';
// import { ToastrService } from 'ngx-toastr';
// import Swal from 'sweetalert2';
// import { environment } from 'src/environments/environment';
// @Component({
//   selector: 'app-failedcalllog',
//   templateUrl: './failedcalllog.component.html',
//   styleUrls: ['./failedcalllog.component.css']
// })
// export class FailedcalllogComponent {

//   selectedFile!: File;
//   pagesize: number = 10;
//   currentpage: number = 1;
//   alllist1: any = [];

//   envvariable: any;
//   loading: boolean = false; // Add loading variable


//   constructor(private helperService: HelperService,
//     public router: Router,
//     private fileDownloadService: FileDownloadService,
//     private toastr: ToastrService) { }


//   ngOnInit(): void {


//     this.getAllfailedList();
//     this.envvariable = environment.BASE_URL
//   }

//   getAllfailedList() {
//     this.loading = true; // Show loader when fetching data
//     this.helperService.getAllfailedList().subscribe(list => {
//       if (list['result'] == true) {
//         this.alllist1 = list['data'];
//       } this.loading = false; // Hide loader after data is fetched
//     },
//     (error) => {
//       console.error('Error fetching agent list:', error);
//       this.loading = false; // Hide loader if an error occurs
//     });
//   }



//   // downloadFileIdWise(data: any) {
//   //   console.log(data);
//   //   console.log(this.envvariable);

//   //   const fileUrl = `${this.envvariable}/downloadNotInsertedDetailsFile?fileUrl=${data}`;
//   //   var preview = document.getElementById("hiddenLink"); //getElementById instead of querySelectorAll
//   //   if (preview) {
//   //     preview.setAttribute("href", fileUrl);
//   //     preview.click();
//   //   } else {
//   //     console.error("Element with id 'hiddenLink' not found.");
//   //   }
//   // }


//   downloadFileIdWise(data: any) {
//     console.log(data);
//     console.log(this.envvariable);
//     this.loading = true;
//     const fileUrl = `${this.envvariable}/downloadNotInsertedDetailsFile?fileUrl=${data}`;
//     let preview = document.getElementById("hiddenLink");

//     if (!preview) {
//       preview = document.createElement("a");
//       preview.id = "hiddenLink";
//       preview.style.display = "none";
//       document.body.appendChild(preview);
//     }
//     preview.setAttribute("href", fileUrl);
//     preview.setAttribute("download", "filename.extension"); // Optional: suggest a filename
//     preview.click();
//     this.loading = false;
//   }

//   pagerecords(val: any) {
//     this.pagesize = val.value;

//    this.getAllfailedList()
//   }

// }




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


  alllist1: any = [];
  data: any = {};
  envvariable: any;
  loading: boolean = false; // Add loading variable
  pageSize: number = 200;
  currentPage: number = 1;
  totalItems!: number;
  totalPages!: number;
  constructor(private helperService: HelperService,
    public router: Router,
    private fileDownloadService: FileDownloadService,
    private toastr: ToastrService) { }


  ngOnInit(): void {


    this.getAllfailedList();
    this.envvariable = environment.BASE_URL;
   
  }

  getAllfailedList() {
    this.data = {

      'page': this.currentPage,
      'pageSize': this.pageSize

    };
    this.loading = true; // Show loader when fetching data
    this.helperService.getAllfailedList(this.data).subscribe(list => {
      // if (list['result'] == true) {
      this.alllist1 = list['reports'];


      this.totalItems = list.totalItems;
      this.totalPages = list.totalPages;
      this.currentPage = list.currentPage;

      this.loading = false; // Hide loader after data is fetched
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
    this.pageSize = val.value ? val.value : 200;

    this.currentPage = 1; // Reset to first page

    this.getAllfailedList()
  }
  getPagination() {
    const delta = 7; // Number of pages to display before and after the current page
    const range = [];
    const rangeWithDots: any = [];
    let l: any;

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

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllfailedList();
    }
  }

}



