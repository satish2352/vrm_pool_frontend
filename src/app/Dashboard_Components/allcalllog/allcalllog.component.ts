import { Component } from '@angular/core';
import { FileDownloadService } from 'src/app/FileDownloadService'
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-allcalllog',
  templateUrl: './allcalllog.component.html',
  styleUrls: ['./allcalllog.component.css']
})


export class AllcalllogComponent {
  timeselect: string = "";
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
  maxDatef: string;
  maxDatet!: string;
  minDatef!: string;
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
  minDatet: any;
  sortColumn: string = '';
  sortedItems: any[] = [];
  loading: boolean = false; // Add loading variable







  selectedAgents: any[] = []; // To store selected agents
  // timeselect: any;
  constructor(private helperService: HelperService,
    private fileDownloadService: FileDownloadService,
    public router: Router,) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    this.maxDatef = `${yyyy}-${mm}-${dd}`;
    // Calculate 6 months ago from today
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const minDd = String(sixMonthsAgo.getDate()).padStart(2, '0');
    const minMm = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0');
    const minYyyy = sixMonthsAgo.getFullYear();
    this.minDatef = `${minYyyy}-${minMm}-${minDd}`;

  }

  private updateToDateRestriction() {
    if (this.fromdateSelected) {
      const fromDate = new Date(this.fromdateSelected);
      const thirtyDaysFromFromDate = new Date(fromDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const maxDd = String(thirtyDaysFromFromDate.getDate()).padStart(2, '0');
      const maxMm = String(thirtyDaysFromFromDate.getMonth() + 1).padStart(2, '0');
      const maxYyyy = thirtyDaysFromFromDate.getFullYear();
      this.maxDatet = `${maxYyyy}-${maxMm}-${maxDd}`;
      this.minDatet = this.minDatef;
    }
  }

//   private updateToDateRestriction() {
//     if (this.fromdateSelected) {
//         const fromDate = new Date(this.fromdateSelected);
//         const thirtyDaysFromFromDate = new Date(fromDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        
//         const today = new Date();
//         const maxDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));

//         const maxDd = String(thirtyDaysFromFromDate.getDate()).padStart(2, '0');
//         const maxMm = String(thirtyDaysFromFromDate.getMonth() + 1).padStart(2, '0');
//         const maxYyyy = thirtyDaysFromFromDate.getFullYear();
//         this.maxDatet = `${maxYyyy}-${maxMm}-${maxDd}`;

//         const maxDdToday = String(maxDate.getDate()).padStart(2, '0');
//         const maxMmToday = String(maxDate.getMonth() + 1).padStart(2, '0');
//         const maxYyyyToday = maxDate.getFullYear();
//         const maxDateToday = `${maxYyyyToday}-${maxMmToday}-${maxDdToday}`;
//         this.maxDatet = (maxDate.getTime() < thirtyDaysFromFromDate.getTime()) ? maxDateToday : this.maxDatet;
//     }
// }




  ngOnInit(): void {
 
    this.getAllSupervisorList();
    this.data = {}
    this.getCallLogSingleRow(this.data);
    this.getAllAgentList();
    this.getAllAgentbySuperviserList()
    // this.filteredList = this.alllist;
    // this.searchChanged('')
    this.agentSelected = this.allagentbysupervisorList.id





  }

  calculateAbsoluteDifference(incomingCalls: number, missedCalls: number): number {
    return Math.abs(incomingCalls - missedCalls);
  }

  getAllAgentList() {
    this.loading = true; // Show loader when fetching data
    this.helperService.getAllAgentUploadedList().subscribe(list => {
      if (list['result'] == true) {
        this.agentList = list['data'];
      }
      this.loading = false; // Hide loader after data is fetched
    },
      (error) => {
        console.error('Error fetching agent list:', error);
        this.loading = false; // Hide loader if an error occurs
      });
  }

  onSelectChangeSupervisor(val: any) {
    this.supervisorSelected = val.value;
    this.getAllAgentbySuperviserList() 
  }

  ontimeselect(val: any) {
    this.timeselect = val.value;
  }


  onSelectChangeAgent(val: any) {
    if (this.ignoreFirstChange) {
      this.ignoreFirstChange = false; // Reset the flag after first automatic trigger
      return; // Ignore the rest of the function during the first call
    }

    const keyToExtract = 'id';
    this.agentSelected = val.map((obj: any) => obj[keyToExtract]);

  }


  getAllAgentbytimeframe(data: any) {

    this.helperService.getAllAgentbytimeframe(data).subscribe(list => {
      if (list['result'] == true) {
        this.filterList = list['data'];
      }
    });
  }

  pagerecords(val: any) {
    this.pagesize = val.value;
    if (this.timeselect && this.timeselect.length > 0) {
        this.getAllAgentbytimeframe(this.data);
    } else {
      this.getCallLogSingleRow(this.data);
    }

  }


  fromdate(val: any) {
    this.fromdateSelected = val.value;
    this.updateToDateRestriction();
  }


  fromtime(val: any) {
    this.fromtimeSelected = val.value;

  }


  todate(val: any) {
    this.todateSelected = val.value;
  }

  totime(val: any) {
    this.totimeSelected = val.value;
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

  searchChanged(searchValue: any) {
console.log(searchValue);
    if (!searchValue) {
      let data = {}
      this.helperService.getCallLogSingleRow(data).subscribe(list => {
        if (list['result'] == true) {
          this.filterList = list['data'];

        }
      });
    } else {
      let data = {}
      this.helperService.getCallLogSingleRow(data).subscribe(list => {
        if (list['result'] == true) {
          this.filterList = list['data'];

          let filterListNew:any
          filterListNew = this.filterList
          filterListNew = filterListNew.filter((item: any) =>
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.user.name) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.user.email) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.IncomingCalls.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.MissedCalls.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.NoAnswer.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.Busy.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.Failed.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.OutgoingCalls.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.TotalCallDurationInMinutes.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.AverageHandlingTimeInMinutes.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.DeviceOnPercent.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.DeviceOnHumanReadable.toString()) ||
              new RegExp('\\b' + searchValue.trim(), 'i').test(item.user.mobile.toString())
              // You can add more conditions here to filter by other properties
          );
          this.filterList =filterListNew


        }
      });

   

    }

  }


  viewagentreposrts(id: any) {
    this.router.navigate(['/admin-dashboard/', 'agent-under-reports', id]);
  }



  sortAgentEmail(email: string) {
    // Toggle sort order
    this.agentEmailSortOrder = this.agentEmailSortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = 'email'
    // Sort the data based on Agent Email column and the current sort order
    this.filterList.sort((a: any, b: any) => {
      if (a.user[email] < b.user[email]) {
        return this.agentEmailSortOrder === 'asc' ? -1 : 1;
      } else if (a.user[email] > b.user[email]) {
        return this.agentEmailSortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }


  getArrowClass(column: string): string {
    // alert(this.sortColumn)
    if (column === this.sortColumn) {
      return this.agentEmailSortOrder === 'asc' ? 'fa-caret-up' : 'fa-caret-down';
    }
    return '';
  }


  getSearch() {
    if (!this.fromdateSelected || !this.todateSelected ) {
     
      return; // Exit the function if any required field is missing
  }

    var finaltoDate = new Date()
    if(this.todateSelected) {
      finaltoDate= this.todateSelected
    }

    var finalFromDate = new Date()
    if(this.fromdateSelected) {
      finalFromDate= this.fromdateSelected
    }


    var finalToTime = '23:59';
    if(this.totimeSelected) {
      finalToTime= this.totimeSelected
    }

    var finalFromTime = '00:00';
    if(this.fromtimeSelected) {
      finalFromTime= this.fromtimeSelected
    }

    var today = new Date(finalFromDate);
    // Get the year, month, and day
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ('0' + today.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    var finalDate = formattedDate + 'T' + finalFromTime; // Include 'T' for ISO 8601 format
    var localDateTime = new Date(finalDate);
    var fromtimeFormatedSingleRow = localDateTime.toISOString();

   

    var today_to = new Date(finaltoDate);
    // Get the year, month, and day
    var year_to = today_to.getFullYear();
    var month_to = ('0' + (today_to.getMonth() + 1)).slice(-2); // Months are zero-based
    var day_to = ('0' + today_to.getDate()).slice(-2);
    var formattedDate_to = year_to + '-' + month_to + '-' + day_to;
    var finalDate_to = formattedDate_to + 'T' + finalToTime; // Include 'T' for ISO 8601 format
    var localDateTime_to = new Date(finalDate_to);
    var totimeFormatedSingleRow = localDateTime_to.toISOString();


    if (fromtimeFormatedSingleRow > totimeFormatedSingleRow) {
      // alert("To time can't be less than from time");
      Swal.fire({
        icon: 'warning',
        title: "To Time and Date can't be less than from Time and Date ",
        timer: 4000, // Close the alert after 4 seconds
        timerProgressBar: true,
        showConfirmButton: false
      });
    
   
      
    } else {

      this.data = {
        'user_type': '',
        // 'fromdate': this.fromdateSelected,
        // 'todate': this.todateSelected,
        'status': '',
        'supervisor_id': this.supervisorSelected,
        'direction': '',
        'fromtime': fromtimeFormatedSingleRow,
        'totime': totimeFormatedSingleRow,
        'time': this.timeselect,
      };

      if (this.agentSelected && this.agentSelected.length > 0) {
        this.data.agent_id = this.agentSelected;
      }

      if (this.timeselect && this.timeselect.length > 0) {
        
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

          var today = new Date();
          // Get the year, month, and day
          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are zero-based
          var day = ('0' + today.getDate()).slice(-2);
          var formattedDate = year + '-' + month + '-' + day;
          var finalDate = formattedDate + 'T' + this.fromtimeSelected; // Include 'T' for ISO 8601 format
          var localDateTime = new Date(finalDate);
          var fromtimeFormated = localDateTime.toISOString();


          var today_to = new Date();
          // Get the year, month, and day
          var year_to = today_to.getFullYear();
          var month_to = ('0' + (today_to.getMonth() + 1)).slice(-2); // Months are zero-based
          var day_to = ('0' + today_to.getDate()).slice(-2);
          var formattedDate_to = year_to + '-' + month_to + '-' + day_to;
          var finalDate_to = formattedDate_to + 'T' + this.totimeSelected; // Include 'T' for ISO 8601 format
          var localDateTime_to = new Date(finalDate_to);
          var totimeFormated = localDateTime_to.toISOString();

          this.data.fromtime = fromtimeFormated;
          this.data.totime = totimeFormated;
          this.getAllAgentbytimeframe(this.data);
        }
      } else {
        this.getCallLogSingleRow(this.data);
      }
    }
  }



  clearSelections() {
    this.supervisorSelected = null;
    this.agentSelected = [];
    this.fromdateSelected = null;
    this.todateSelected = null;
    this.fromtimeSelected = null;
    this.totimeSelected = null;
    this.timeselect = '';
    this.data = {};
    this.getCallLogSingleRow(this.data);
  }
  failedcalllog() {
    this.router.navigate(['/admin-dashboard/', 'failed-call-log']);
  }
 
}
