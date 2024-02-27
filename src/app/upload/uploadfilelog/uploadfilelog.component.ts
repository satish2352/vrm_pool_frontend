import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-uploadsupervisor',
  templateUrl: './uploadfilelog.component.html',
  styleUrls: ['./uploadfilelog.component.sass']
})
export class UploadsupervisorComponent {
  selectedFile!: File;
  pagesize: number = 10;
  currentpage:number =1;
  alllist: any = [];
  alllistFileWise: any = [];

  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService) { }


  ngOnInit(): void {
 
    this.getAllSupervisorList();
    this.getHistoryFileIdWise({});
  }

  onSelectChange(val:any) {
    console.log()
    this.getHistoryFileIdWise({ fileId: val.value});
  }


  getAllSupervisorList() {
    this.helperService.getAllSupervisorUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllistFileWise = list['data'];
      }
    });
  }

  getHistoryFileIdWise(data:any) {
    this.helperService.getHistoryFileIdWise(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onUpload(): void {
    this.helperService.uploadFile(this.selectedFile)
      .subscribe(response => this.downLoadFile(response, "application/ms-excel"));
  }

  downLoadFile(data: any, type: string) {
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
}


