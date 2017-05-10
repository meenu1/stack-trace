import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { PopoverModule } from 'ng2-bootstrap/popover';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { LogsService } from './logs/logs.service';
import { StackTraceComponent } from './stack-trace/stack-trace.component';
import { StackTraceService } from './stack-trace/stack-trace.service';
import { ShowMultipleObjectComponent } from './stack-trace/stack-trace-mulitple-object.component';
import { ModalComponent } from './stack-trace/modal.component';
import {KeysPipe} from './app.pipe';
import {SanitizeHtml} from './app.sanitizePipe';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    SanitizeHtml,
    ShowMultipleObjectComponent,
    StackTraceComponent,
    LogsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [LogsService, StackTraceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
