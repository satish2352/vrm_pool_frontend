import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.css']
})
export class AgentlistComponent {

  selectedFile!: File;
  pagesize: number = 10;
  currentpage: number = 1;
  alllist1: any = [];
  supervisorList: any = [];
  supervisorSelected: any;
  envvariable: any;
  constructor(private helperService: HelperService,
    public router: Router,
    private fileDownloadService: FileDownloadService,
    private toastr: ToastrService) { }


  ngOnInit(): void {

    this.getAllSupervisorList();
    this.getHistoryFileIdWise({});
    this.getAllAgentList();
    this.envvariable = environment.BASE_URL
  }



  getAllAgentList() {
    this.helperService.getAllAgentUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist1 = list['data'];
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
        this.alllist1 = list['data'];
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onUpload(): void {
    if (!this.selectedFile || !this.supervisorSelected) {
      this.toastr.error('Please select a file and supervisor.');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('superviserId', this.supervisorSelected);

    this.helperService.uploadFileAgent(formData)
      .subscribe(response => {
        // Show toast notification with API response
        this.getAllAgentList();
        Swal.fire('Success', `Inserted :${response.inserted}<br>Not Inserted : ${response.notInserted}`, 'success');
      }, error => {
        // Handle error cases
        this.getAllAgentList();
        Swal.fire('Error', 'Error uploading file. Please try again.', 'error');
      });
  }

  downloadFileIdWise(data: any) {
    const fileUrl = `${this.envvariable}/downloadFile?fileId=${data}`;
    var preview = document.getElementById("hiddenLink"); //getElementById instead of querySelectorAll
    if (preview) {
      preview.setAttribute("href", fileUrl);
      preview.click();
    } else {
      console.error("Element with id 'hiddenLink' not found.");
    }
  }

  showDetails(data: any) {
    this.router.navigate(['/admin-dashboard/', 'get-details', data]);
  }
  pagerecords(val: any) {
    this.pagesize = val.value;
   
    this.getAllSupervisorList();
  }
}



