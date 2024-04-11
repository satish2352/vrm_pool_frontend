import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allcalllog',
  templateUrl: './allcalllog.component.html',
  styleUrls: ['./allcalllog.component.css']
})
export class AllcalllogComponent {
  pagesize: number = 10;
  currentpage: number = 1;
  alllist: any = [];
  listalldata: any = [];
  supervisorList: any = [];
  supervisorSelected: any;
  agentSelected: any;
  allagentbysupervisorList: any;
  data: any = {}
  fromdateSelected: any;
  todateSelected: any;
  totimeSelected: any;
  fromtimeSelected: any;
  agentList: any = [];
  ignoreFirstChange = true
  maxDate: string;
  activeSupervisors!: any[];
  filterList: any = []= [];
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

  sortedItems: any[] = [];



  selectedAgents: any[] = []; // To store selected agents
  timeselect:any;
  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService,
    public router: Router,) {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    this.maxDate = `${yyyy}-${mm}-${dd}`;




  }


  ngOnInit(): void {

    this.getAllSupervisorList();
    this.data = {}
    this.getCallLogSingleRow(this.data);
    this.getAllAgentList();
    this.getAllAgentbySuperviserList()
    // this.filteredList = this.alllist;
    // this.searchChanged('')

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
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }

    if (this.agentSelected! == '') {
      this.data.agent_id = this.agentSelected
    }
    this.getCallLogSingleRow(this.data)


  }
  ontimeselect(val: any) {
    this.timeselect = val.value;
    this.getAllAgentbySuperviserList()
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': '',
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,
      'time': this.timeselect,

    }

   
    this.getCallLogSingleRow(this.data)


  }

  onSelectChangeAgent(val: any) {

    if (this.ignoreFirstChange) {
      this.ignoreFirstChange = false; // Reset the flag after first automatic trigger
      return; // Ignore the rest of the function during the first call
    }

    const keyToExtract = 'id';

    // Extract values based on the key
    this.agentSelected = val.map((obj: any) => obj[keyToExtract]);

    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }

    if (this.agentSelected !== '') {
      this.data.agent_id = this.agentSelected
    }
    this.getCallLogSingleRow(this.data)
  }


  onSelectChange(val: any) {
    this.supervisorSelected = val.value;

    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    if (this.agentSelected! == '') {
      this.data.agent_id = this.agentSelected
    }

    this.getCallLogSingleRow(this.data)

  }


  fromdate(val: any) {
    console.log(val.value)

    this.fromdateSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    if (this.agentSelected! == '') {
      this.data.agent_id = this.agentSelected
    }
    this.getCallLogSingleRow(this.data)
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
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    if (this.agentSelected! == '') {
      this.data.agent_id = this.agentSelected
    }

    this.getCallLogSingleRow(this.data)
  }


  todate(val: any) {
    this.todateSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }
    if (this.agentSelected! == '') {
      this.data.agent_id = this.agentSelected
    }

    this.getCallLogSingleRow(this.data)
  }


  totime(val: any) {
    this.totimeSelected = val.value;
    this.data = {}
    this.data = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,

    }

    if (this.agentSelected! == '') {
      this.data.agent_id = this.agentSelected
    }

    this.getCallLogSingleRow(this.data)
  }



  getAllSupervisorList() {
    this.helperService.getAllSupervisorList().subscribe(list => {
      if (list['result'] == true) {
        console.log(list['data'])
        var dataNew = list['data']
        this.supervisorList = dataNew.filter((obj: any) => obj.is_active === "1");


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
        this.filterList = list['data'];


      }
    });
  }

  searchChanged(searchValue: string) {
    
    if (!searchValue) {
      let data = {}
      this.helperService.getCallLogSingleRow(data).subscribe(list => {
        if (list['result'] == true) {
          this.filterList = list['data'];

        }
      });
    } else {
      this.listalldata = this.filterList
      this.filterList = this.listalldata.filter((item: any) =>
        item.user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.user.email.includes(searchValue) || item.IncomingCalls.toString().includes(searchValue)
        || item.MissedCalls.toString().includes(searchValue) ||
        item.NoAnswer.toString().includes(searchValue) ||
        item.Busy.toString().includes(searchValue) ||
        item.Failed.toString().includes(searchValue) ||
        item.OutgoingCalls.toString().includes(searchValue) ||
        item.TotalCallDurationInMinutes.toString().includes(searchValue) ||
        item.AverageHandlingTimeInMinutes.toString().includes(searchValue) ||
        item.DeviceOnPercent.toString().includes(searchValue) ||
        item.DeviceOnHumanReadable.toString().includes(searchValue) ||
        item.user.mobile.toString().includes(searchValue) 
        // You can add more conditions here to filter by other properties
      );
    }
    this.sortOrder = 'asc';
  }

  key ='id';
  reverse:boolean=false;
  sortBy(key:any){
this.key=key;
this.reverse=!this.reverse;
  }

  viewagentreposrts(id: any) {
    this.router.navigate(['/admin-dashboard/', 'agent-under-reports', id]);
  }


  // sortColumn(columnName: string) {
  //   alert("sadhsad")
  //   this.filterList.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
  //     if (a[columnName] < b[columnName]) {
  //       return -1;
  //     }
  //     if (a[columnName] > b[columnName]) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  //   this.filterList = [...this.filterList]; // Create a new array instance
  // }


  sortColumn(columnName: string) {
    if (this.filterList === columnName) {
      // Same column clicked again, toggle sorting order
      this.isAscending = !this.isAscending;
    } else {
      // Different column clicked, default to ascending order
      this.filterList = columnName;
      this.isAscending = true;
    }

    // Apply sorting based on current sorting state
    this.sortedItems.sort((a, b) => {
      const comparison = a[columnName] < b[columnName] ? -1 : a[columnName] > b[columnName] ? 1 : 0;
      return this.isAscending ? comparison : -comparison; // Apply sorting order
    });
  }

}
