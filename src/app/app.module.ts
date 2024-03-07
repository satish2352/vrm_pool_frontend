import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Dashboard_Components/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { From1Component } from './Dashboard_Components/from1/from1.component';
import { Screen1Component } from './Dashboard_Components/screen1/screen1.component';
import { AllSupervisorComponent } from './Call_logs/all-supervisor/all-supervisor.component';
import { AllAgentComponent } from './Call_logs/all-agent/all-agent.component';
import { UploadsupervisorComponent } from './upload/uploadfilelog/uploadfilelog.component';
import { AllcalllogComponent } from './Dashboard_Components/allcalllog/allcalllog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor} from './jwt.interceptor'
import {ErrorInterceptor} from './errorinterceptor.interceptor';

import { AgentlistComponent } from './upload/agentlist/agentlist.component';
import { UploadalllogComponent } from './upload/uploadalllog/uploadalllog.component'
import { SupervisorlistComponent } from './upload/supervisorlist/supervisorlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { DashboardsuperComponent } from './supervisor/dashboardsuper/dashboardsuper.component';
import { AllcalllogsupervisorComponent } from './supervisor/allcalllogsupervisor/allcalllogsupervisor.component';
import { GetdetailsforfilelogComponent } from './upload/getdetailsforfilelog/getdetailsforfilelog.component';
import { AllagentlistComponent } from './supervisor/allagentlist/allagentlist.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminAlluserlistComponent } from './Dashboard_Components/admin-alluserlist/admin-alluserlist.component';
import { UsersChangePasswordComponent } from './Dashboard_Components/users-change-password/users-change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpdateusersdataComponent } from './Dashboard_Components/updateusersdata/updateusersdata.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OneAgetsUnderReportsComponent } from './Dashboard_Components/one-agets-under-reports/one-agets-under-reports.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    From1Component,
    Screen1Component,
    AllSupervisorComponent,
    AllAgentComponent,
    UploadsupervisorComponent,
    AllcalllogComponent,
    SupervisorlistComponent,
    AgentlistComponent,
    UploadalllogComponent,
    // DashboardsuperComponent,
    AllcalllogsupervisorComponent,
    GetdetailsforfilelogComponent,
    AllagentlistComponent,
    ChangePasswordComponent,
    AdminAlluserlistComponent,
    UsersChangePasswordComponent,
    ResetpasswordComponent,
    UpdateusersdataComponent,
    OneAgetsUnderReportsComponent,
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    ToastrModule.forRoot({
     
    }),
   
    
    
    
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
