import { Component } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-supervisorlist',
  templateUrl: './supervisorlist.component.html',
  styleUrls: ['./supervisorlist.component.sass']
})
export class SupervisorlistComponent {
  selectedFile!: File;
  p: number = 1;
  alllist: any = [];
  alllistFileWise: any = [];

  constructor(
    private helperService: HelperService,
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

  onUpload(): void {
    this.helperService.uploadFile(this.selectedFile)
      .subscribe(response => this.downLoadFile(response, "application/ms-excel"));
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
}
