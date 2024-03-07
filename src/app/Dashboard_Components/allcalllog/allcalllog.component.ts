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
  filterList: any = [];
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

  selectedAgents: any[] = []; // To store selected agents

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
        item.user.mobile.includes(searchValue) || item.completed_count.toString().includes(searchValue)
        || item.missed_count.toString().includes(searchValue) ||
        item.incoming_count.toString().includes(searchValue) ||
        item.outgoing_count.toString().includes(searchValue) ||
        item.total_duration.toString().includes(searchValue) ||
        item.average_duration.toString().includes(searchValue) ||
        item.total_calls.toString().includes(searchValue)
        // You can add more conditions here to filter by other properties
      );
    }
    this.sortOrder = 'asc';
  }
  sortBy(key: string) {
    // Toggle sort order if the same key is clicked again
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortOrder = 'asc';
    }

    // Sort filterList based on sortKey and sortOrder
    this.filterList.sort((a: any, b: any) => {
      const valueA = a[this.sortKey];
      const valueB = b[this.sortKey];

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  viewagentreposrts(id: any) {
    this.router.navigate(['/admin-dashboard/', 'agent-under-reports', id]);
  }

}
