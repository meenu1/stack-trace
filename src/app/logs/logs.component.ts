import { Component, OnInit } from '@angular/core';

import { LogsService } from './logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  private exceptionList: any[] = [];

  constructor(private logsService: LogsService) { }

  ngOnInit() {

    this.logsService.getExceptionList().subscribe((repsonse) => {
      this.exceptionList = repsonse;
    });
  }

}
