
import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-allcalllogsupervisor',
  templateUrl: './allcalllogsupervisor.component.html',
  styleUrls: ['./allcalllogsupervisor.component.css']
})
export class AllcalllogsupervisorComponent {

  pagesize: number = 10;
  currentpage: number = 1;
 
  supervisorList: any = [];
  supervisorSelected: any;
  agentSelected: any;
  allagentbysupervisorList: any;
  totimeSelected: any;
  fromtimeSelected: any;
  fromdateSelected: any;
  todateSelected: any;
  agentList: any = [];
  maxDate:any
  listalldata:any
  filterList:any=[];
  searchTerm: string = '';
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true
  }; 
  selectedAgents: any[] = []; // To store selected agents
  data: any = {};
  minDate:any
  ignoreFirstChange = true
  timeselect:string="";
  loading: boolean = false; // Add loading variable




  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService,
    public router: Router) {
    this.supervisorSelected = localStorage.getItem('user_id')
    
    
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    this.maxDate = `${yyyy}-${mm}-${dd}`;
    // Calculate 6 months ago from today
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const minDd = String(sixMonthsAgo.getDate()).padStart(2, '0');
    const minMm = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0');
    const minYyyy = sixMonthsAgo.getFullYear();
    this.minDate = `${minYyyy}-${minMm}-${minDd}`;
  }


  ngOnInit(): void {

    this.getAllSupervisorList();
    var data = {
      'user_type': '',
      'fromdate': '',
      'todate': '',
      'status': '',
      'supervisor_id': localStorage.getItem('user_id'),
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
    this.loading = true; // Show loader when fetching data
    this.helperService.getAllAgentUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.agentList = list['data'];
      }
      this.loading = false; // Hide loader after data is fetched
    }
    ,
    (error) => {
      console.error('Error fetching agent list:', error);
      this.loading = false; // Hide loader if an error occurs
    });
  }
  calculateAbsoluteDifference(incomingCalls: number, missedCalls: number): number {
    return Math.abs(incomingCalls - missedCalls);
  }
  // ontimeselect(val: any) {
  //   this.timeselect = val.value;
  //   this.getAllAgentbySuperviserList()
  //   this.data = {}
  //   this.data = {
  //     'user_type': '',
  //     'fromdate': this.fromdateSelected,
  //     'todate': this.todateSelected,
  //     'status': '',
  //     'supervisor_id': '',
  //     // 'agent_id': this.agentSelected,
  //     'direction': '',
  //     'fromtime': this.fromtimeSelected,
  //     'totime': this.totimeSelected,
  //     'time': this.timeselect,

  //   }
  //   this.getCallLogSingleRow(this.data)
  // }


  ontimeselect(val: any) {
    this.timeselect = val.value;

    if (typeof this.fromtimeSelected === 'undefined' && typeof this.totimeSelected === 'undefined') {
      
      Swal.fire({
        icon: 'warning',
        title: 'Please select both From Time and To Time.',
        timer: 4000, // Close the alert after 4 seconds
        timerProgressBar: true,
        showConfirmButton: false
      });
      this.timeselect = "";
    } else {
      const currentDate = new Date().toISOString().slice(0, 10);
      this.fromdateSelected = currentDate;
      this.todateSelected = currentDate;
      this.data = {
        'user_type': '',
        'fromdate': this.fromdateSelected,
        'todate': this.todateSelected,
        'status': '',
        'supervisor_id': '',
        'agent_id': this.agentSelected,
        'direction': '',
        'fromtime': this.fromtimeSelected,
        'totime': this.totimeSelected,
        'time': this.timeselect,
      };
      this.getAllAgentbytimeframe(this.data);
    }
  }

  getAllAgentbytimeframe(data:any){
    this.loading = true; // Show loader when fetching data
    this.helperService.getAllAgentbytimeframe(data).subscribe(list => {
      if (list['result'] == true) {
        this.filterList = list['data'];
      }this.loading = false; // Hide loader after data is fetched
    });
  }
 pagerecords(val: any) {
    this.pagesize = val.value;

    this.getCallLogSingleRow(this.data)
    this.getAllAgentbytimeframe(this.data)

  }
  onSelectChangeAgent(val: any) {
    if (this.ignoreFirstChange) {
      this.ignoreFirstChange = false; // Reset the flag after first automatic trigger
      return; // Ignore the rest of the function during the first call
    }
  
    const keyToExtract = 'id';
  
    // Extract values based on the key
    this.agentSelected = val.map((obj: any) => obj[keyToExtract]);
  
    // Prepare data object
    let data: any = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      // 'agent_id': this.agentSelected, // Commented out since agent_id set separately
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,
    };
  
    // Set agent_id in data if agentSelected is not empty
    if (this.agentSelected.length > 0) {
      data.agent_id = this.agentSelected;
    }
  
    // Call appropriate function based on conditions
    if (this.timeselect.length > 0) {
      // Call getAllAgentbytimeframe if timeselect has elements
      this.getAllAgentbytimeframe(data);
    } else {
      // Call getCallLogSingleRow if timeselect is empty
      this.getCallLogSingleRow(data);
    }
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
    this.fromtimeSelected = val.value;
  
    // Create a new data object with updated values
    let data: any = {
      'user_type': '',
      'fromdate': this.fromdateSelected,
      'todate': this.todateSelected,
      'status': '',
      'supervisor_id': this.supervisorSelected,
      'direction': '',
      'fromtime': this.fromtimeSelected,
      'totime': this.totimeSelected,
    };
  
    // Set agent_id in data if agentSelected is not empty
    if (this.agentSelected && this.agentSelected.length > 0) {
      data.agent_id = this.agentSelected;
    }
  
    // Call appropriate function based on conditions
    if (this.timeselect.length > 0) {
      // Call getAllAgentbytimeframe if timeselect has elements
      this.getAllAgentbytimeframe(data);
    } else {
      // Call getCallLogSingleRow if timeselect is empty
      this.getCallLogSingleRow(data);
    }
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
   
    let data:any = {
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
    // Call appropriate function based on conditions
    if (this.timeselect.length > 0) {
      // Call getAllAgentbytimeframe if timeselect has elements
      this.getAllAgentbytimeframe(data);
    } else {
      // Call getCallLogSingleRow if timeselect is empty
      this.getCallLogSingleRow(data);
    }

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
   
  }
  viewagentreposrts(id:any){
    this.router.navigate(['/admin-dashboard/','agent-under-reports',id]);
  }





}



