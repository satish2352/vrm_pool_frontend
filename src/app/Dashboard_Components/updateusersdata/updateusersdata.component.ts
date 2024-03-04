

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
  editForm!: FormGroup;
  id: string | null = null;

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    if (this.id) {
      this.getUserData();
    }
  }

  initializeForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getUserData(): void {
    this.helperService.getsingleuser({ id: this.id }).subscribe({
      next: (response: any) => {
        if (response.result) {
          this.editForm.patchValue(response.data);
        } else {
          this.toastr.error(response.message || 'User data not found', 'Error');
        }
      },
      error: (error: any) => {
        this.toastr.error(this.parseErrorResponse(error), 'Error');
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.id) {
      this.helperService.updateuser({ ...this.editForm.value, id: this.id }).subscribe({
        next: (response: any) => {
          if (response.result) {
            this.toastr.success(response.message || 'User updated successfully', 'Success');
            this.router.navigate(['/admin-dashboard/','admin-all-user-list']); // Adjust the navigation path as needed
          } else {
            this.toastr.error(response.message || 'Error updating user data', 'Error');
          }
        },
        error: (error: any) => {
          this.toastr.error(this.parseErrorResponse(error), 'Error');
        }
      });
    }
  }

  // Helper function to parse and concatenate error messages from the response
  private parseErrorResponse(error: any): string {
    if (error && error.error && error.error.errors && Array.isArray(error.error.errors)) {
      return error.error.errors.map((err: any) => `${err.msg}`).join(', ');
    }
    return error.error.message || 'An unexpected error occurred';
  }
}
