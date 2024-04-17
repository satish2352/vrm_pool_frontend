
import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
@Component({
  selector: 'app-uploadalllog',
  templateUrl: './uploadalllog.component.html',
  styleUrls: ['./uploadalllog.component.sass']
})
export class UploadalllogComponent {
 

  selectedFile!: File;
  pagesize: number = 10;
  currentpage:number =1;
  alllist: any = [];
  alllistFileWise: any = [];

  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService) { }


  ngOnInit(): void {
 
    this.getAllSupervisorList();
  }

  


  getAllSupervisorList() {
    this.helperService.getAllSupervisorUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllistFileWise = list['data'];
      }
    });
  }

  downloadFileIdWise(data: any) {
    const fileUrl = "http://35.154.44.56:3000/api/downloadFile?fileId="+data;
    var preview = document.getElementById("hiddenLink"); //getElementById instead of querySelectorAll
    if (preview) {
        preview.setAttribute("href", fileUrl);
        preview.click();
    } else {
        console.error("Element with id 'hiddenLink' not found.");
    }
}

}


