import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsComponent } from './logs/logs.component';
import { StackTraceComponent } from './stack-trace/stack-trace.component';

const routes: Routes = [
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'stack-trace/:logId',
    component: StackTraceComponent
  },
   { path: '',   redirectTo: '/logs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
