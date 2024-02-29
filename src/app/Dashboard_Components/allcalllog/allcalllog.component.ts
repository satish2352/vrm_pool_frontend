import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
@Component({
  selector: 'app-allcalllog',
  templateUrl: './allcalllog.component.html',
  styleUrls: ['./allcalllog.component.sass']
})
export class AllcalllogComponent {
  pagesize: number = 10;
  currentpage: number = 1;
  alllist: any = [];
  supervisorList: any = [];
  supervisorSelected: any;
  agentSelected: any;
  allagentbysupervisorList: any;

  fromdateSelected: any;
  todateSelected: any;
  totimeSelected: any;
  fromtimeSelected: any;
  agentList: any = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true
  };

  selectedAgents: any[] = []; // To store selected agents

  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService) { }


  ngOnInit(): void {

    this.getAllSupervisorList();
    var data = {
      'user_type': '',
      'fromdate': '',
      'todate': '',
      'status': '',
      'supervisor_id': '',
      'agent_id': '',
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    this.getCallLogSingleRow(data);
    this.getAllAgentList();
    this.getAllAgentbySuperviserList()

  }



  getAllAgentList() {
    this.helperService.getAllAgentUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.agentList = list['data'];
      }
    });
  }

  onSelectChangeSupervisor(val: any) {
    this.supervisorSelected = val.value;
    this.getAllAgentbySuperviserList()
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }

    this.getCallLogSingleRow(data)


  }

  onSelectChangeAgent(val: any) {

    const keyToExtract = 'id';

    // Extract values based on the key
    this.agentSelected = val.map((obj: any) => obj[keyToExtract]);


    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

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
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

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
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    this.getCallLogSingleRow(data)
  }

  fromtime(val: any) {
    console.log(val.value)
    this.fromtimeSelected = val.value;
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

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
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }

    this.getCallLogSingleRow(data)
  }


  totime(val: any) {
    this.totimeSelected = val.value;
    var data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    this.getCallLogSingleRow(data)
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
      'superviserId': this.supervisorSelected,
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


  //   onSelectedAgentsChange(val:any) {

  //  console.log(val);



  //   }




  // onSelectAgents(item: any) {
  //   console.log('Selected agents:', this.selectedAgents);
  //   // Add your logic here
  // }

  onDeSelectAgents(item: any) {
    console.log('Deselected agents:', this.selectedAgents);
    // Add your logic here
  }



}



