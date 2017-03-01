import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { PopoverModule } from 'ng2-bootstrap/popover';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { LogsService } from './logs/logs.service';
import { StackTraceComponent } from './stack-trace/stack-trace.component';
import { StackTraceService } from './stack-trace/stack-trace.service';


@NgModule({
  declarations: [
    AppComponent,
    StackTraceComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    AppRoutingModule
  ],
  providers: [LogsService, StackTraceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
