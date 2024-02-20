import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { From1Component } from './from1/from1.component';
import { Screen1Component } from './screen1/screen1.component';
import { AllSupervisorComponent } from './all-supervisor/all-supervisor.component';
import { AllAgentComponent } from './all-agent/all-agent.component';
import { UploadsupervisorComponent } from './upload/uploadsupervisor/uploadsupervisor.component';
import { UploadagentComponent } from './upload/uploadagent/uploadagent.component';
import { AllcalllogComponent } from './allcalllog/allcalllog.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [{ path: 'screen1', component: Screen1Component },
    { path: 'from1', component: From1Component },
    { path: '', redirectTo: 'screen1', pathMatch: 'full' },
    { path: 'allsup', component: AllSupervisorComponent },
    { path: 'allagent', component: AllAgentComponent },
    { path: 'uploadsupervisor', component: UploadsupervisorComponent },
    { path: 'uploadagent', component: UploadagentComponent },
    { path: 'allcalllog', component: AllcalllogComponent },

    ]
  },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

