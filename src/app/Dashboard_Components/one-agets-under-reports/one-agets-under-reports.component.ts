import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-one-agets-under-reports',
  templateUrl: './one-agets-under-reports.component.html',
  styleUrls: ['./one-agets-under-reports.component.sass']
})
export class OneAgetsUnderReportsComponent {

  agentid: any;
  pagesize: number = 10;
  currentpage: number = 1;
  agentsunderreports: any = [];



  listalldata: any = [];
  agentSelected: any;
  data: any = {}
  fromdateSelected: any;
  todateSelected: any;
  totimeSelected: any;
  fromtimeSelected: any;
  agentList: any = [];
  ignoreFirstChange = true
  maxDate: string;
  activeSupervisors!: any[];
  filterList: any = [] = [];
  searchTerm: string = '';
  sortKey: string = ''; // Track the current sort key
  sortOrder: string = 'asc';
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
  };
  sortedColumn: string = ''; // Track the currently sorted column
  isAscending: boolean = true; // Track the sorting order (ascending or descending)
  agentEmailSortOrder: string = 'asc';

  selectedAgents: any[] = []; // To store selected agents
  timeselect: any;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    this.maxDate = `${yyyy}-${mm}-${dd}`;
  }

  ngOnInit(): void {
    this.agentid = this.route.snapshot.params['id'];
    if (this.agentid) {
      var obj = { 'id': this.agentid };
      this.helperService.getunderagentreports(obj).subscribe(list => {
        this.agentsunderreports = list['data'];
      });
    }

  }

  getagentlist(data: any) {
    this.helperService.getunderagentreports(data).subscribe(list => {
      if (list['result'] == true) {
        this.agentsunderreports = [];
        this.agentsunderreports = list['data'];
      }
    });

  }

  ontimeselect(val: any) {
    this.timeselect = val.value;

    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': '',
      'id': this.agentid,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,
      'time': this.timeselect,
    }
    this.getagentlist(this.data)
  }




  fromdate(val: any) {
    console.log(this.agentid)

    this.fromdateSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      // 'supervisor_id': this.supervisorSelected,
      'id': this.agentid,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }


    this.getagentlist(this.data);
  }

  fromtime(val: any) {
    console.log(val.value)
    this.fromtimeSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      // 'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected, 
      'totime': this.totimeSelected,
      'id': this.agentid,
    }
   
    this.getagentlist(this.data);
  }

  todate(val: any) {
    this.todateSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      // 'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,
      'id': this.agentid,
    }
    this.getagentlist(this.data);

  }


  totime(val: any) {
    this.totimeSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      // 'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,
      'id': this.agentid,
    }



    this.getagentlist(this.data)
  }

  // searchChanged(searchValue: string) {

  //   if (!searchValue) {
  //     let data = {}
  //     this.helperService.getCallLogSingleRow(data).subscribe(list => {
  //       if (list['result'] == true) {
  //         this.filterList = list['data'];

  //       }
  //     });
  //   } else {
  //     this.listalldata = this.filterList
  //     this.agentsunderreports = this.listalldata.filter((agent: any) =>
  //       agent.AgentName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       agent.AgentEmail.includes(searchValue) || agent.IncomingCalls.toString().includes(searchValue)
  //       || agent.GroupName.toString().includes(searchValue) ||
  //       agent.IncomingCalls.toString().includes(searchValue) ||
  //       agent.MissedCalls.toString().includes(searchValue) ||
  //       agent.NoAnswer.toString().includes(searchValue) ||
  //       agent.Busy.toString().includes(searchValue) ||
  //       agent.Failed.toString().includes(searchValue) ||
  //       agent.OutgoingCalls.toString().includes(searchValue) ||
  //       agent.TotalCallDurationInMinutes.toString().includes(searchValue) ||
  //       agent.AverageHandlingTimeInMinutes.toString().includes(searchValue) ||
  //       agent.DeviceOnPercent.toString().includes(searchValue) ||
  //       agent.DeviceOnHumanReadable.toString().includes(searchValue) ||
  //       agent.AgentPhoneNumber.toString().includes(searchValue) ||
  //       agent.createdAt.toString().includes(searchValue) ||
  //       agent.updatedAt.toString().includes(searchValue) ||
  //       agent.user_id.toString().includes(searchValue)
  //       // You can add more conditions here to filter by other properties
  //     );
  //   }

  // }

}
