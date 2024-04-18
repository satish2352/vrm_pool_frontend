
import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
import { environment } from 'src/environments/environment.development';
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
  envvariable:any;

  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService) { }


  ngOnInit(): void {
 
    this.getAllSupervisorList();
    this.envvariable = environment.BASE_URL
  }

  


  getAllSupervisorList() {
    this.helperService.getAllSupervisorUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllistFileWise = list['data'];
      }
    });
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

}


