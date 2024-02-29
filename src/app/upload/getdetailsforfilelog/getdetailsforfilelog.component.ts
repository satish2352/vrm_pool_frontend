import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-getdetailsforfilelog',
  templateUrl: './getdetailsforfilelog.component.html',
  styleUrls: ['./getdetailsforfilelog.component.sass']
})
export class GetdetailsforfilelogComponent implements OnInit {


  submitted: boolean = false;
  formContent!: FormGroup;
  alllist: any;
  editdata: any;

  selectedFile!: File;
  pagesize: number = 10;
  currentpage: number = 1;
  supervisorList: any = [];
  supervisorSelected: any;

  constructor(

    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private helperService: HelperService,

    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.editdata = this.route.snapshot.params['id'];
    if (this.editdata) {
      var obj = { 'fileId': this.editdata };
      this.helperService.getAllFileIdWiseLog(obj).subscribe(list => {
        this.alllist = list['data'];
      });

    }
  }

}


