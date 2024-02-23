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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [{ path: 'screen1', component: Screen1Component },
    { path: 'from1', component: From1Component },
    { path: '', redirectTo: 'screen1', pathMatch: 'full' },
    { path: 'all-sup', component: AllSupervisorComponent },
    { path: 'all-agent', component: AllAgentComponent },
    { path: 'upload-all-users', component: UploadsupervisorComponent },
    { path: 'all-call-log', component: AllcalllogComponent },
    { path: 'supervisor-list', component: SupervisorlistComponent },
    { path: 'agent-list', component: AgentlistComponent },
    { path: 'upload-all-log', component: UploadalllogComponent },

    ]
  },
  // { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

