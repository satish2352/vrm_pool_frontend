import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-uploadsupervisor',
  templateUrl: './uploadsupervisor.component.html',
  styleUrls: ['./uploadsupervisor.component.sass']
})
export class UploadsupervisorComponent {
  selectedFile!: File;
  p: number = 1;
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

}


