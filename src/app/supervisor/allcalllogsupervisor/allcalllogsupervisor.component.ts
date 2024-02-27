
import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-allcalllogsupervisor',
  templateUrl: './allcalllogsupervisor.component.html',
  styleUrls: ['./allcalllogsupervisor.component.sass']
})
export class AllcalllogsupervisorComponent {

  pagesize: number = 10;
  currentpage: number = 1;
  alllist: any = [];
  supervisorList: any = [];
  supervisorSelected: any;
  agentSelected: any;
  allagentbysupervisorList: any;

  fromdateSelected: any;
  todateSelected: any;
  agentList: any = []
  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService) {
      this.supervisorSelected = localStorage.getItem('user_id')
     }


  ngOnInit(): void {

    this.getAllSupervisorList();
    var data = {
      'user_type': '',
      'fromdate': '',
      'todate': '',
      'status': '',
      'supervisor_id': '',
      'agent_id': '',
      'direction': ''

    }
    this.getCallLogSingleRow(data);
    this.getAllAgentList();
    this. getAllAgentbySuperviserList()

  }



  getAllAgentList() {
    this.helperService.getAllAgentUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.agentList = list['data'];
      }
    });
  }



  onSelectChangeAgent(val: any) {
    this.agentSelected = val.value;
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': ''

    }

    this.getCallLogSingleRow(data)
  }


  onSelectChange(val: any) {
    this.supervisorSelected = val.value;
 
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': ''

    }

    this.getCallLogSingleRow(data)
    
  }


  fromdate(val: any) {
    console.log(val.value)
    this.fromdateSelected = val.value;
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': ''

    }
    this.getCallLogSingleRow(data)
  }

  todate(val: any) {
    this.todateSelected = val.value;
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': ''

    }

    this.getCallLogSingleRow(data)
  }


  onSelectChangeStatus(val:any) {

  }




  getAllSupervisorList() {
    this.helperService.getAllSupervisorList().subscribe(list => {
      if (list['result'] == true) {
        this.supervisorList = list['data'];
      }
    });
  }
  getAllAgentbySuperviserList() {
    let data = {
      'superviserId':this.supervisorSelected,
      'user_type': 3
    }
    this.helperService.getAllAgentbySuperviserList(data).subscribe(list => {
      if (list['result'] == true) {
        this.allagentbysupervisorList = list['data'];
      }
    });
  }

  getCallLogSingleRow(data: any) {
    this.helperService.getCallLogSingleRow(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }
    });
  }




}



