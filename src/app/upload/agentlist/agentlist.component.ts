import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.sass']
})
export class AgentlistComponent {

  selectedFile!: File;
  p: number = 1;
  alllist: any = [];
  supervisorList: any = [];
  supervisorSelected: any;

  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService) { }


  ngOnInit(): void {

    this.getAllSupervisorList();
    this.getHistoryFileIdWise({});
    this.getAllAgentList();
  }



  getAllAgentList() {
    this.helperService.getAllAgentUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }
    });
  }

  onSelectChange(val: any) {
    console.log()
    this.supervisorSelected = val.value;
  }


  getAllSupervisorList() {
    this.helperService.getAllSupervisorList().subscribe(list => {
      if (list['result'] == true) {
        this.supervisorList = list['data'];
      }
    });
  }

  getHistoryFileIdWise(data: any) {
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
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile,this.selectedFile.name);
    formData.append('superviserId', this.supervisorSelected);
    this.helperService.uploadFileAgent(formData)
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



