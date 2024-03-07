import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Dashboard_Components/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { From1Component } from './Dashboard_Components/from1/from1.component';
import { Screen1Component } from './Dashboard_Components/screen1/screen1.component';
import { AllSupervisorComponent } from './Call_logs/all-supervisor/all-supervisor.component';
import { AllAgentComponent } from './Call_logs/all-agent/all-agent.component';
import { UploadsupervisorComponent } from './upload/uploadfilelog/uploadfilelog.component';
import { AllcalllogComponent } from './Dashboard_Components/allcalllog/allcalllog.component';
// import { SupervisorlistComponent } from './supervisorlist/supervisorlist.component';
// import { AgentlistComponent } from './upload/agentlist/agentlist.component';
import { UploadalllogComponent } from './upload/uploadalllog/uploadalllog.component';
import { AgentlistComponent } from './upload/agentlist/agentlist.component';
import { SupervisorlistComponent } from './upload/supervisorlist/supervisorlist.component';
import { AllcalllogsupervisorComponent } from './supervisor/allcalllogsupervisor/allcalllogsupervisor.component';
import { GetdetailsforfilelogComponent } from './upload/getdetailsforfilelog/getdetailsforfilelog.component';

import { AllagentlistComponent } from './supervisor/allagentlist/allagentlist.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { AdminAlluserlistComponent } from './Dashboard_Components/admin-alluserlist/admin-alluserlist.component';
import { UsersChangePasswordComponent } from './Dashboard_Components/users-change-password/users-change-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpdateusersdataComponent } from './Dashboard_Components/updateusersdata/updateusersdata.component';

import { AuthGuard } from './auth.guard';
import { OneAgetsUnderReportsComponent } from './Dashboard_Components/one-agets-under-reports/one-agets-under-reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent,
  },

  {
    path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [
      { path: 'screen1', component: Screen1Component , canActivate: [AuthGuard] },
    { path: 'from1', component: From1Component , canActivate: [AuthGuard] },
    { path: '', redirectTo: 'screen1', pathMatch: 'full' },
    { path: 'all-sup', component: AllSupervisorComponent , canActivate: [AuthGuard] },
    { path: 'all-agent', component: AllAgentComponent , canActivate: [AuthGuard] },
    { path: 'upload-all-users', component: UploadsupervisorComponent , canActivate: [AuthGuard] },
    { path: 'all-call-log-admin', component: AllcalllogComponent , canActivate: [AuthGuard] },
    { path: 'all-call-log-super', component: AllcalllogsupervisorComponent , canActivate: [AuthGuard] },
    { path: 'supervisor-list', component: SupervisorlistComponent , canActivate: [AuthGuard] },
    { path: 'agent-list', component: AgentlistComponent , canActivate: [AuthGuard] },
    { path: 'upload-all-log', component: UploadalllogComponent , canActivate: [AuthGuard] },
    { path: 'get-details/:id', component: GetdetailsforfilelogComponent , canActivate: [AuthGuard] },

    { path: 'supervisor/agent-list', component: AllagentlistComponent , canActivate: [AuthGuard] },
    { path: 'change-password', component: ChangePasswordComponent , canActivate: [AuthGuard] },
    { path: 'admin-all-user-list', component: AdminAlluserlistComponent , canActivate: [AuthGuard] },
    { path: 'users-change-password', component: UsersChangePasswordComponent , canActivate: [AuthGuard] },
    { path: 'update-users-data/:id', component: UpdateusersdataComponent , canActivate: [AuthGuard] },
    { path: 'agent-under-reports/:id', component: OneAgetsUnderReportsComponent , canActivate: [AuthGuard] },
    
    ]
  },
  // { path: '**', component: LoginComponent },
  {
    path: 'reset-password', component: ResetpasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

