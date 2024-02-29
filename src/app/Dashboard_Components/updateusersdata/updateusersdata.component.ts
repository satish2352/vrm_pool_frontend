import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'app-updateusersdata',
  templateUrl: './updateusersdata.component.html',
  styleUrls: ['./updateusersdata.component.sass']
})
export class UpdateusersdataComponent implements OnInit {
  userdata: any = []
  editForm!: FormGroup
  alllist: any;
  id: any;


  constructor(private helperService: HelperService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService

  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params;

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],

      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });
    this.getuserdata();
  }
  getuserdata() {
    const data = {
      'id': this.id.id
    }
    console.log('***********', data);

    this.helperService.getsingleuser(data).subscribe((list: any) => {
      if (list['result'] == true) {
        this.userdata = list['data'];
        console.log('******************', this.userdata);
      }
    });

  }

  onSubmit() {
    if (this.editForm.controls['email'].dirty || this.editForm.controls['name'].dirty || this.editForm.controls['mobile'].dirty) {
      // Get the original user data
      const originalUserData = this.userdata;

      // Create an object to store the updated values
      const updatedValues: any = {};

      // Compare form values with the original data and add updated values to the object
      if (this.editForm.controls['name'].dirty) {
        updatedValues.name = this.editForm.value.name;
      }
      if (this.editForm.controls['email'].dirty) {
        updatedValues.email = this.editForm.value.email;
      }
      if (this.editForm.controls['mobile'].dirty) {
        updatedValues.mobile = this.editForm.value.mobile;
      }

      // Check if any values were updated
      if (Object.keys(updatedValues).length > 0) {
        // Add the user id to the updated values
        updatedValues.id = this.id.id;

        // Call the API to update user data with the updated values
        this.helperService.updateuser(updatedValues).subscribe({

          next: (response: any) => {
            if (response.result === true) {
              console.log('Password changed successfully', response);
              this.toastr.success('Password changed successfully', 'Success');
            }
            else {
              this.toastr.error('Error updating user data', 'Error');
            }
          },
          error: (error: any) => {
            console.error('Error changing password', error);
            this.toastr.error('Error changing password', 'Error');
            // Handle error scenario here
          }

        });
      }
    }
  }

}
