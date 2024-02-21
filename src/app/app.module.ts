import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { From1Component } from './from1/from1.component';
import { Screen1Component } from './screen1/screen1.component';
import { AllSupervisorComponent } from './all-supervisor/all-supervisor.component';
import { AllAgentComponent } from './all-agent/all-agent.component';
import { UploadsupervisorComponent } from './upload/uploadsupervisor/uploadsupervisor.component';
import { UploadagentComponent } from './upload/uploadagent/uploadagent.component';
import { AllcalllogComponent } from './allcalllog/allcalllog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




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
    UploadagentComponent,
    AllcalllogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  
    

    
  
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
