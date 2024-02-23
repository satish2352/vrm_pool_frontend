
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
  pagesize: number = 3;
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

  getDownload(fileId:any) {
    alert(fileId)

  }

}


